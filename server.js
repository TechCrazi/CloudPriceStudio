const path = require("path");
const express = require("express");
const { PricingClient, GetProductsCommand } = require("@aws-sdk/client-pricing");

const fetcher =
  global.fetch ||
  ((...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args)));

const app = express();
const PORT = process.env.PORT || 3000;
const HOURS_IN_MONTH = 730;
const MIN_CPU = 8;
const MIN_MEMORY = 8;
const MIN_NETWORK_GBPS = 10;
const PRICING_WARMUP_ENABLED = process.env.PRICING_CACHE_WARMUP !== "false";
const PRICING_WARMUP_CONCURRENCY = Math.max(
  1,
  Number.parseInt(process.env.PRICING_CACHE_CONCURRENCY || "4", 10) || 4
);
const BACKUP_RETENTION_DAYS = 15;
const BACKUP_DAILY_DELTA_PERCENT = 10;
const K8S_OS_DISK_MIN_GB = 32;
const K8S_MIN_NODE_COUNT = 3;
const VMWARE_VCPU_PER_SOCKET = 3;
const K8S_CONTROL_PLANE_HOURLY = {
  aws: 0.5,
  azure: 0.6,
  gcp: 0.5,
};

const REGION_MAP = {
  "us-east": {
    label: "US East",
    aws: { region: "us-east-1", location: "US East (N. Virginia)" },
    azure: { region: "eastus", location: "East US" },
    gcp: { region: "us-east1", location: "South Carolina" },
  },
  "us-central": {
    label: "US Central",
    aws: { region: "us-east-2", location: "US East (Ohio)" },
    azure: { region: "centralus", location: "Central US" },
    gcp: { region: "us-central1", location: "Iowa" },
  },
  "us-west": {
    label: "US West",
    aws: { region: "us-west-2", location: "US West (Oregon)" },
    azure: { region: "westus2", location: "West US 2" },
    gcp: { region: "us-west1", location: "Oregon" },
  },
  "us-west-1": {
    label: "US West (N. California)",
    aws: { region: "us-west-1", location: "US West (N. California)" },
    azure: { region: "westus", location: "West US" },
    gcp: { region: "us-west2", location: "Los Angeles" },
  },
  "ca-central": {
    label: "Canada Central",
    aws: { region: "ca-central-1", location: "Canada (Central)" },
    azure: { region: "canadacentral", location: "Canada Central" },
    gcp: { region: "northamerica-northeast1", location: "Montreal" },
  },
  "eu-west": {
    label: "EU West",
    aws: { region: "eu-west-1", location: "EU (Ireland)" },
    azure: { region: "westeurope", location: "West Europe" },
    gcp: { region: "europe-west1", location: "Belgium" },
  },
  "eu-central": {
    label: "EU Central",
    aws: { region: "eu-central-1", location: "EU (Frankfurt)" },
    azure: { region: "germanywestcentral", location: "Germany West Central" },
    gcp: { region: "europe-west3", location: "Frankfurt" },
  },
  "eu-uk": {
    label: "UK South",
    aws: { region: "eu-west-2", location: "EU (London)" },
    azure: { region: "uksouth", location: "UK South" },
    gcp: { region: "europe-west2", location: "London" },
  },
  "eu-north": {
    label: "EU North",
    aws: { region: "eu-north-1", location: "EU (Stockholm)" },
    azure: { region: "northeurope", location: "North Europe" },
    gcp: { region: "europe-north1", location: "Finland" },
  },
  "ap-sg": {
    label: "Asia Pacific (Singapore)",
    aws: { region: "ap-southeast-1", location: "Asia Pacific (Singapore)" },
    azure: { region: "southeastasia", location: "Southeast Asia" },
    gcp: { region: "asia-southeast1", location: "Singapore" },
  },
  "ap-jp": {
    label: "Japan East",
    aws: { region: "ap-northeast-1", location: "Asia Pacific (Tokyo)" },
    azure: { region: "japaneast", location: "Japan East" },
    gcp: { region: "asia-northeast1", location: "Tokyo" },
  },
  "ap-in": {
    label: "India Central",
    aws: { region: "ap-south-1", location: "Asia Pacific (Mumbai)" },
    azure: { region: "centralindia", location: "Central India" },
    gcp: { region: "asia-south1", location: "Mumbai" },
  },
  "ap-au": {
    label: "Australia East",
    aws: { region: "ap-southeast-2", location: "Asia Pacific (Sydney)" },
    azure: { region: "australiaeast", location: "Australia East" },
    gcp: { region: "australia-southeast1", location: "Sydney" },
  },
  "sa-east": {
    label: "South America (Sao Paulo)",
    aws: { region: "sa-east-1", location: "South America (Sao Paulo)" },
    azure: { region: "brazilsouth", location: "Brazil South" },
    gcp: { region: "southamerica-east1", location: "Sao Paulo" },
  },
  "af-south": {
    label: "Africa South",
    aws: { region: "af-south-1", location: "Africa (Cape Town)" },
    azure: { region: "southafricanorth", location: "South Africa North" },
    gcp: { region: "africa-south1", location: "Johannesburg" },
  },
};

const AWS_FAMILIES = {
  general: {
    label: "General Purpose (M6i)",
    sizes: [
      { type: "m6i.large", vcpu: 2, memory: 8, networkGbps: 12.5, localDisk: false },
      { type: "m6i.xlarge", vcpu: 4, memory: 16, networkGbps: 12.5, localDisk: false },
      { type: "m6i.2xlarge", vcpu: 8, memory: 32, networkGbps: 12.5, localDisk: false },
      { type: "m6i.4xlarge", vcpu: 16, memory: 64, networkGbps: 25, localDisk: false },
      { type: "m6i.8xlarge", vcpu: 32, memory: 128, networkGbps: 25, localDisk: false },
      { type: "m6i.12xlarge", vcpu: 48, memory: 192, networkGbps: 50, localDisk: false },
      { type: "m6i.16xlarge", vcpu: 64, memory: 256, networkGbps: 50, localDisk: false },
      { type: "m6i.24xlarge", vcpu: 96, memory: 384, networkGbps: 50, localDisk: false },
      { type: "m6i.32xlarge", vcpu: 128, memory: 512, networkGbps: 50, localDisk: false },
    ],
  },
  compute: {
    label: "Compute Optimized (C6i)",
    sizes: [
      { type: "c6i.large", vcpu: 2, memory: 4, networkGbps: 12.5, localDisk: false },
      { type: "c6i.xlarge", vcpu: 4, memory: 8, networkGbps: 12.5, localDisk: false },
      { type: "c6i.2xlarge", vcpu: 8, memory: 16, networkGbps: 12.5, localDisk: false },
      { type: "c6i.4xlarge", vcpu: 16, memory: 32, networkGbps: 25, localDisk: false },
      { type: "c6i.8xlarge", vcpu: 32, memory: 64, networkGbps: 25, localDisk: false },
      { type: "c6i.12xlarge", vcpu: 48, memory: 96, networkGbps: 50, localDisk: false },
      { type: "c6i.16xlarge", vcpu: 64, memory: 128, networkGbps: 50, localDisk: false },
      { type: "c6i.24xlarge", vcpu: 96, memory: 192, networkGbps: 50, localDisk: false },
      { type: "c6i.32xlarge", vcpu: 128, memory: 256, networkGbps: 50, localDisk: false },
    ],
  },
  memory: {
    label: "Memory Optimized (R6i + X2idn)",
    sizes: [
      { type: "r6i.large", vcpu: 2, memory: 16, networkGbps: 12.5, localDisk: false },
      { type: "r6i.xlarge", vcpu: 4, memory: 32, networkGbps: 12.5, localDisk: false },
      { type: "r6i.2xlarge", vcpu: 8, memory: 64, networkGbps: 12.5, localDisk: false },
      { type: "r6i.4xlarge", vcpu: 16, memory: 128, networkGbps: 25, localDisk: false },
      { type: "r6i.8xlarge", vcpu: 32, memory: 256, networkGbps: 25, localDisk: false },
      { type: "r6i.12xlarge", vcpu: 48, memory: 384, networkGbps: 50, localDisk: false },
      { type: "r6i.16xlarge", vcpu: 64, memory: 512, networkGbps: 50, localDisk: false },
      { type: "r6i.24xlarge", vcpu: 96, memory: 768, networkGbps: 50, localDisk: false },
      { type: "r6i.32xlarge", vcpu: 128, memory: 1024, networkGbps: 50, localDisk: false },
      { type: "x2idn.16xlarge", vcpu: 64, memory: 1024, networkGbps: 50, localDisk: false },
      { type: "x2idn.32xlarge", vcpu: 128, memory: 2048, networkGbps: 50, localDisk: false },
    ],
  },
};

const AZURE_FAMILIES = {
  general: {
    label: "General Purpose (Dsv5)",
    sizes: [
      { type: "Standard_D2s_v5", vcpu: 2, memory: 8, networkGbps: 10, localDisk: false },
      { type: "Standard_D4s_v5", vcpu: 4, memory: 16, networkGbps: 10, localDisk: false },
      { type: "Standard_D8s_v5", vcpu: 8, memory: 32, networkGbps: 10, localDisk: false },
      { type: "Standard_D16s_v5", vcpu: 16, memory: 64, networkGbps: 10, localDisk: false },
      { type: "Standard_D32s_v5", vcpu: 32, memory: 128, networkGbps: 10, localDisk: false },
      { type: "Standard_D64s_v5", vcpu: 64, memory: 256, networkGbps: 10, localDisk: false },
      { type: "Standard_D96s_v5", vcpu: 96, memory: 384, networkGbps: 10, localDisk: false },
    ],
  },
  compute: {
    label: "Compute Optimized (Fsv2)",
    sizes: [
      { type: "Standard_F2s_v2", vcpu: 2, memory: 4, networkGbps: 10, localDisk: false },
      { type: "Standard_F4s_v2", vcpu: 4, memory: 8, networkGbps: 10, localDisk: false },
      { type: "Standard_F8s_v2", vcpu: 8, memory: 16, networkGbps: 10, localDisk: false },
      { type: "Standard_F16s_v2", vcpu: 16, memory: 32, networkGbps: 10, localDisk: false },
      { type: "Standard_F32s_v2", vcpu: 32, memory: 64, networkGbps: 10, localDisk: false },
      { type: "Standard_F64s_v2", vcpu: 64, memory: 128, networkGbps: 10, localDisk: false },
      { type: "Standard_F72s_v2", vcpu: 72, memory: 144, networkGbps: 10, localDisk: false },
    ],
  },
  memory: {
    label: "Memory Optimized (Esv5 + M series)",
    sizes: [
      { type: "Standard_E2s_v5", vcpu: 2, memory: 16, networkGbps: 10, localDisk: false },
      { type: "Standard_E4s_v5", vcpu: 4, memory: 32, networkGbps: 10, localDisk: false },
      { type: "Standard_E8s_v5", vcpu: 8, memory: 64, networkGbps: 10, localDisk: false },
      { type: "Standard_E16s_v5", vcpu: 16, memory: 128, networkGbps: 10, localDisk: false },
      { type: "Standard_E32s_v5", vcpu: 32, memory: 256, networkGbps: 10, localDisk: false },
      { type: "Standard_E64s_v5", vcpu: 64, memory: 512, networkGbps: 10, localDisk: false },
      { type: "Standard_E96s_v5", vcpu: 96, memory: 672, networkGbps: 10, localDisk: false },
      { type: "Standard_M64s", vcpu: 64, memory: 1024, networkGbps: 10, localDisk: false },
      { type: "Standard_M128s", vcpu: 128, memory: 2048, networkGbps: 10, localDisk: false },
      { type: "Standard_M128ms", vcpu: 128, memory: 3892, networkGbps: 10, localDisk: false },
    ],
  },
};

const VM_WORKLOADS = {
  general: {
    label: "General purpose",
    flavors: {
      aws: ["general", "compute", "memory"],
      azure: ["general", "compute", "memory"],
      gcp: ["general", "compute", "memory"],
    },
    defaults: {
      aws: "general",
      azure: "general",
      gcp: "general",
    },
  },
  sql: {
    label: "SQL Server",
    flavors: {
      aws: ["memory", "general"],
      azure: ["memory", "general"],
      gcp: ["memory", "general"],
    },
    defaults: {
      aws: "memory",
      azure: "memory",
      gcp: "memory",
    },
  },
  web: {
    label: "Web Server",
    flavors: {
      aws: ["compute", "general"],
      azure: ["compute", "general"],
      gcp: ["compute", "general"],
    },
    defaults: {
      aws: "compute",
      azure: "compute",
      gcp: "compute",
    },
  },
};

const K8S_FLAVORS = {
  aws: ["general", "compute"],
  azure: ["general", "compute"],
  gcp: ["general", "compute"],
};
const K8S_DEFAULT_FLAVORS = {
  aws: "general",
  azure: "general",
  gcp: "general",
};

const DISK_TIERS = {
  premium: {
    label: "Premium SSD",
    storageRates: {
      aws: 0.125,
      azure: 0.12,
      gcp: 0.17,
    },
    snapshotRates: {
      aws: 0.125,
      azure: 0.12,
      gcp: 0.17,
    },
  },
  max: {
    label: "Max performance (Ultra/Extreme/io2 BE)",
    storageRates: {
      aws: 0.25,
      azure: 0.24,
      gcp: 0.34,
    },
    snapshotRates: {
      aws: 0.25,
      azure: 0.24,
      gcp: 0.34,
    },
  },
};
const DEFAULT_DISK_TIER = "max";

const K8S_SHARED_STORAGE_DEFAULT_RATES = {
  aws: 0.3,
  azure: 0.16,
  gcp: 0.3,
};
const K8S_SHARED_STORAGE_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const AWS_EFS_REGION_INDEX_URL =
  "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEFS/current/region_index.json";
const GCP_FILESTORE_PRICING_URL = "https://cloud.google.com/filestore/pricing";

const EGRESS_RATES = {
  aws: 0.09,
  azure: 0.087,
  gcp: 0.12,
};
const NETWORK_ADDON_OPTIONS = {
  aws: {
    vpc: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      { key: "vpc-base", label: "VPC (base)", pricing: { type: "static", hourly: 0 } },
      {
        key: "transit-gateway",
        label: "Transit Gateway (per hour)",
        pricing: {
          type: "aws-price-list",
          serviceCode: "AmazonVPC",
          usagetypeIncludes: "TransitGateway-Hours",
          operationIncludes: "TransitGatewayVPC",
        },
      },
    ],
    firewall: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      {
        key: "standard",
        label: "Network Firewall (Standard)",
        pricing: {
          type: "aws-price-list",
          serviceCode: "AWSNetworkFirewall",
          usagetypeIncludes: /\\bEndpoint-Hour\\b/i,
          subcategoryIncludes: /^Endpoint$/i,
        },
      },
      {
        key: "advanced",
        label: "Network Firewall (Advanced inspection)",
        pricing: {
          type: "aws-price-list",
          serviceCode: "AWSNetworkFirewall",
          usagetypeIncludes: /Advanced-Inspection-Endpoint-Hour/i,
          subcategoryIncludes: /Endpoint-Advanced/i,
        },
      },
    ],
    loadBalancer: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      {
        key: "classic",
        label: "Classic ELB",
        pricing: {
          type: "aws-price-list",
          serviceCode: "AWSELB",
          usagetypeIncludes: "LoadBalancerUsage",
        },
      },
      {
        key: "application",
        label: "Application LB (ALB)",
        pricing: {
          type: "aws-price-list",
          serviceCode: "AWSELB",
          usagetypeIncludes: "LoadBalancerUsage",
        },
      },
      {
        key: "network",
        label: "Network LB (NLB)",
        pricing: {
          type: "aws-price-list",
          serviceCode: "AWSELB",
          usagetypeIncludes: "LoadBalancerUsage",
        },
      },
      {
        key: "gateway",
        label: "Gateway LB (GWLB)",
        pricing: {
          type: "aws-price-list",
          serviceCode: "AWSELB",
          usagetypeIncludes: "LoadBalancerUsage",
        },
      },
    ],
  },
  azure: {
    vpc: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      { key: "vnet-base", label: "VNet (base)", pricing: { type: "static", hourly: 0 } },
      {
        key: "vpn-basic",
        label: "VPN Gateway Basic",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "Basic",
          meterNameIncludes: "Basic",
        },
      },
      {
        key: "vpn-gw1",
        label: "VPN Gateway VpnGw1",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw1",
          meterNameIncludes: "VpnGw1",
        },
      },
      {
        key: "vpn-gw1az",
        label: "VPN Gateway VpnGw1AZ",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw1AZ",
          meterNameIncludes: "VpnGw1AZ",
        },
      },
      {
        key: "vpn-gw2",
        label: "VPN Gateway VpnGw2",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw2",
          meterNameIncludes: "VpnGw2",
        },
      },
      {
        key: "vpn-gw2az",
        label: "VPN Gateway VpnGw2AZ",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw2AZ",
          meterNameIncludes: "VpnGw2AZ",
        },
      },
      {
        key: "vpn-gw3",
        label: "VPN Gateway VpnGw3",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw3",
          meterNameIncludes: "VpnGw3",
        },
      },
      {
        key: "vpn-gw3az",
        label: "VPN Gateway VpnGw3AZ",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw3AZ",
          meterNameIncludes: "VpnGw3AZ",
        },
      },
      {
        key: "vpn-gw4",
        label: "VPN Gateway VpnGw4",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw4",
          meterNameIncludes: "VpnGw4",
        },
      },
      {
        key: "vpn-gw4az",
        label: "VPN Gateway VpnGw4AZ",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw4AZ",
          meterNameIncludes: "VpnGw4AZ",
        },
      },
      {
        key: "vpn-gw5",
        label: "VPN Gateway VpnGw5",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw5",
          meterNameIncludes: "VpnGw5",
        },
      },
      {
        key: "vpn-gw5az",
        label: "VPN Gateway VpnGw5AZ",
        pricing: {
          type: "azure-retail",
          serviceName: "VPN Gateway",
          skuName: "VpnGw5AZ",
          meterNameIncludes: "VpnGw5AZ",
        },
      },
    ],
    firewall: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      {
        key: "basic",
        label: "Azure Firewall Basic",
        pricing: {
          type: "azure-retail",
          serviceName: "Azure Firewall",
          skuName: "Basic",
          meterNameIncludes: "Deployment",
        },
      },
      {
        key: "standard",
        label: "Azure Firewall Standard",
        pricing: {
          type: "azure-retail",
          serviceName: "Azure Firewall",
          skuName: "Standard",
          meterNameIncludes: "Deployment",
        },
      },
      {
        key: "premium",
        label: "Azure Firewall Premium",
        pricing: {
          type: "azure-retail",
          serviceName: "Azure Firewall",
          skuName: "Premium",
          meterNameIncludes: "Deployment",
        },
      },
    ],
    loadBalancer: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      {
        key: "standard",
        label: "Standard Load Balancer (L4)",
        pricing: {
          type: "azure-retail",
          serviceName: "Load Balancer",
          skuName: "Standard",
          unitIncludes: "Hour",
        },
      },
      {
        key: "appgw-basic-small",
        label: "App Gateway Basic (Small)",
        pricing: {
          type: "azure-retail",
          serviceName: "Application Gateway",
          productNameIncludes: "Basic Application Gateway",
          meterNameIncludes: "Small Gateway",
        },
      },
      {
        key: "appgw-basic-medium",
        label: "App Gateway Basic (Medium)",
        pricing: {
          type: "azure-retail",
          serviceName: "Application Gateway",
          productNameIncludes: "Basic Application Gateway",
          meterNameIncludes: "Medium Gateway",
        },
      },
      {
        key: "appgw-basic-large",
        label: "App Gateway Basic (Large)",
        pricing: {
          type: "azure-retail",
          serviceName: "Application Gateway",
          productNameIncludes: "Basic Application Gateway",
          meterNameIncludes: "Large Gateway",
        },
      },
      {
        key: "appgw-waf-medium",
        label: "App Gateway WAF (Medium)",
        pricing: {
          type: "azure-retail",
          serviceName: "Application Gateway",
          productNameIncludes: "WAF Application Gateway",
          meterNameIncludes: "Medium Gateway",
        },
      },
      {
        key: "appgw-waf-large",
        label: "App Gateway WAF (Large)",
        pricing: {
          type: "azure-retail",
          serviceName: "Application Gateway",
          productNameIncludes: "WAF Application Gateway",
          meterNameIncludes: "Large Gateway",
        },
      },
    ],
  },
  gcp: {
    vpc: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      { key: "vpc-base", label: "VPC (base)", pricing: { type: "static", hourly: 0 } },
      {
        key: "cloud-vpn",
        label: "Cloud VPN (HA)",
        pricing: {
          type: "gcp-billing",
          serviceName: "Cloud VPN",
          descriptionPatterns: ["VPN", "tunnel"],
        },
      },
    ],
    firewall: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      { key: "vpc-firewall", label: "VPC Firewall (rules)", pricing: { type: "static", hourly: 0 } },
      {
        key: "cloud-armor",
        label: "Cloud Armor (WAF)",
        pricing: {
          type: "gcp-billing",
          serviceName: "Cloud Armor",
          descriptionPatterns: ["policy"],
        },
      },
    ],
    loadBalancer: [
      { key: "none", label: "None", pricing: { type: "static", hourly: 0 } },
      {
        key: "external-http",
        label: "External HTTP(S) LB",
        pricing: {
          type: "gcp-billing",
          serviceName: "Cloud Load Balancing",
          descriptionPatterns: ["Forwarding Rule", "HTTP"],
        },
      },
      {
        key: "external-tcp",
        label: "External TCP/UDP LB",
        pricing: {
          type: "gcp-billing",
          serviceName: "Cloud Load Balancing",
          descriptionPatterns: ["Forwarding Rule"],
        },
      },
      {
        key: "internal",
        label: "Internal LB",
        pricing: {
          type: "gcp-billing",
          serviceName: "Cloud Load Balancing",
          descriptionPatterns: ["Forwarding Rule", "Internal"],
        },
      },
    ],
  },
};
const NETWORK_ADDON_DEFAULTS = {
  aws: { vpc: "none", firewall: "none", loadBalancer: "none" },
  azure: { vpc: "none", firewall: "none", loadBalancer: "none" },
  gcp: { vpc: "none", firewall: "none", loadBalancer: "none" },
};

const SQL_LICENSE_RATES = {
  standard: 0.35,
  enterprise: 0.5,
};

const AWS_PUBLIC_PRICING_URL = "https://instances.vantage.sh/instances.json";
const AWS_PUBLIC_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const AWS_PRICE_LIST_BASE_URL = "https://pricing.us-east-1.amazonaws.com";
const AWS_PRICE_LIST_REGION_INDEX_URL =
  "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/region_index.json";
const AWS_PRICE_LIST_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const AZURE_PUBLIC_PRICING_URL = "https://instances.vantage.sh/azure/instances.json";
const AZURE_PUBLIC_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const GCP_PUBLIC_PRICING_URL = "https://instances.vantage.sh/gcp/instances.json";
const GCP_PUBLIC_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const GCP_BILLING_SERVICE_ID = "6F81-5844-456A";
const GCP_BILLING_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const AZURE_PUBLIC_RESERVED_KEYS = {
  1: "yrTerm1Standard.allUpfront",
  3: "yrTerm3Standard.allUpfront",
};
const AWS_RESERVED_KEYS = {
  standard: {
    1: "yrTerm1Standard.noUpfront",
    3: "yrTerm3Standard.noUpfront",
  },
  convertible: {
    1: "yrTerm1Convertible.noUpfront",
    3: "yrTerm3Convertible.noUpfront",
  },
};
const AZURE_RESERVATION_TERM_HOURS = {
  1: 8760,
  3: 26280,
};
const AZURE_VANTAGE_REGION_MAP = {
  eastus: "us-east",
  centralus: "us-central",
  westus: "us-west",
  westus2: "us-west-2",
  canadacentral: "canada-central",
  westeurope: "europe-west",
  germanywestcentral: "germany-west-central",
  uksouth: "united-kingdom-south",
  northeurope: "europe-north",
  southeastasia: "asia-pacific-southeast",
  japaneast: "japan-east",
  centralindia: "central-india",
  australiaeast: "australia-east",
  brazilsouth: "brazil-south",
  southafricanorth: "south-africa-north",
};
const GCP_FLAVOR_MAP = {
  general: ["General purpose"],
  compute: ["Compute optimized"],
  memory: ["Memory optimized"],
};
const GCP_FLAVOR_LABELS = {
  general: "General purpose",
  compute: "Compute optimized",
  memory: "Memory optimized",
};
const GCP_FAMILY_TO_FLAVOR = Object.entries(GCP_FLAVOR_MAP).reduce(
  (acc, [flavorKey, families]) => {
    families.forEach((family) => {
      acc[family] = flavorKey;
    });
    return acc;
  },
  {}
);

const awsPricingClient = new PricingClient({ region: "us-east-1" });
const awsCache = new Map();
const awsPublicCache = { loadedAt: 0, data: null };
const awsPriceListIndexCache = { loadedAt: 0, data: null };
const awsPriceListRegionCache = new Map();
const awsServiceIndexCache = new Map();
const awsServiceRegionCache = new Map();
const azureCache = new Map();
const azureReservedCache = new Map();
const azurePublicCache = { loadedAt: 0, data: null };
const azureNetworkCache = new Map();
const gcpPublicCache = { loadedAt: 0, data: null };
const gcpBillingCache = { loadedAt: 0, data: null };
const gcpApiCache = new Map();
const gcpServiceCache = { loadedAt: 0, data: null };
const gcpServiceSkuCache = new Map();
const awsEfsRegionIndexCache = { loadedAt: 0, data: null };
const k8sSharedStorageCache = new Map();

app.use(express.json({ limit: "200kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/options", async (req, res) => {
  try {
    const options = await buildSizeOptions();
    res.json(options);
  } catch (error) {
    res.status(500).json({
      error: error?.message || "Failed to build size options.",
    });
  }
});

function isSizeEligible(size, options) {
  const { minCpu, minMemory, minNetworkGbps, requireNetwork } = options;
  if (!Number.isFinite(size.vcpu) || size.vcpu < minCpu) {
    return false;
  }
  if (!Number.isFinite(size.memory) || size.memory < minMemory) {
    return false;
  }
  if (size.localDisk === true) {
    return false;
  }
  const networkGbps = Number.isFinite(size.networkGbps)
    ? size.networkGbps
    : null;
  if (requireNetwork) {
    return Number.isFinite(networkGbps) && networkGbps >= minNetworkGbps;
  }
  if (Number.isFinite(networkGbps) && networkGbps < minNetworkGbps) {
    return false;
  }
  return true;
}

function filterSizes(sizes, options) {
  return sizes.filter((size) => isSizeEligible(size, options));
}

function buildProviderFlavorSizes(families, options) {
  const output = {};
  for (const [key, family] of Object.entries(families)) {
    output[key] = {
      label: family.label,
      sizes: filterSizes(family.sizes, options),
    };
  }
  return output;
}

function buildEmptyGcpFlavors() {
  const output = {};
  for (const [key, label] of Object.entries(GCP_FLAVOR_LABELS)) {
    output[key] = { label, sizes: [] };
  }
  return output;
}

function buildNetworkAddonOptions() {
  const providers = {};
  const defaults = {};
  for (const [providerKey, addonMap] of Object.entries(
    NETWORK_ADDON_OPTIONS
  )) {
    providers[providerKey] = {};
    defaults[providerKey] = NETWORK_ADDON_DEFAULTS[providerKey] || {};
    for (const [addonKey, options] of Object.entries(addonMap)) {
      providers[providerKey][addonKey] = options.map((option) => ({
        key: option.key,
        label: option.label,
      }));
    }
  }
  return { providers, defaults };
}

function buildGcpFlavorSizesFromList(list, options) {
  const output = buildEmptyGcpFlavors();
  const seen = new Set();
  list.forEach((item) => {
    const flavorKey = GCP_FAMILY_TO_FLAVOR[item.family];
    if (!flavorKey || !output[flavorKey]) {
      return;
    }
    if (item.local_ssd || item.shared_cpu) {
      return;
    }
    const size = {
      type: item.instance_type,
      vcpu: Number(item.vCPU),
      memory: Number(item.memory),
      networkGbps: null,
      networkLabel: "Variable",
      localDisk: false,
    };
    if (!isSizeEligible(size, options)) {
      return;
    }
    if (seen.has(size.type)) {
      return;
    }
    output[flavorKey].sizes.push(size);
    seen.add(size.type);
  });
  return output;
}

async function buildSizeOptions() {
  const workloads = {};
  for (const [key, config] of Object.entries(VM_WORKLOADS)) {
    workloads[key] = {
      label: config.label,
      flavors: config.flavors,
      defaults: config.defaults,
    };
  }

  const coreConstraints = {
    minCpu: MIN_CPU,
    minMemory: MIN_MEMORY,
    minNetworkGbps: MIN_NETWORK_GBPS,
    requireNetwork: true,
  };
  const gcpConstraints = {
    minCpu: MIN_CPU,
    minMemory: MIN_MEMORY,
    minNetworkGbps: MIN_NETWORK_GBPS,
    requireNetwork: false,
  };

  const awsFlavors = buildProviderFlavorSizes(AWS_FAMILIES, coreConstraints);
  const azureFlavors = buildProviderFlavorSizes(AZURE_FAMILIES, coreConstraints);
  let gcpFlavors = buildEmptyGcpFlavors();
  try {
    const list = await loadGcpPublicPricing();
    gcpFlavors = buildGcpFlavorSizesFromList(list, gcpConstraints);
  } catch (error) {
    logPricingWarning(
      "gcp",
      { source: "public-pricing" },
      "Failed to load GCP public pricing list."
    );
    gcpFlavors = buildEmptyGcpFlavors();
  }

  return {
    minCpu: MIN_CPU,
    minMemory: MIN_MEMORY,
    workloads,
    k8s: {
      flavors: K8S_FLAVORS,
      defaults: K8S_DEFAULT_FLAVORS,
    },
    providers: {
      aws: { flavors: awsFlavors },
      azure: { flavors: azureFlavors },
      gcp: { flavors: gcpFlavors },
    },
    networkAddons: buildNetworkAddonOptions(),
  };
}

function toNumber(value, fallback) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBoolean(value) {
  return value === true || value === "true" || value === "on";
}

function logPricingWarning(provider, context, message) {
  if (context?.silent) {
    return;
  }
  console.warn(`[pricing:${provider}] ${message}`, context);
}

function logPricingError(provider, context, error) {
  if (context?.silent) {
    return;
  }
  const details = error?.stack || error?.message || String(error);
  console.error(`[pricing:${provider}] ${details}`, context);
}

function hasAwsApiCredentials() {
  return Boolean(
    process.env.AWS_PROFILE ||
      (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
  );
}

function getGcpApiKey() {
  return (
    process.env.GCP_PRICING_API_KEY ||
    process.env.GCP_API_KEY ||
    process.env.GOOGLE_API_KEY
  );
}

function hasGcpApiCredentials() {
  return Boolean(getGcpApiKey());
}

function resolvePricingProvider(body) {
  if (body.pricingProvider === "api" || body.pricingProvider === "retail") {
    return body.pricingProvider;
  }
  if (body.azurePricingSource === "retail") {
    return "api";
  }
  if (body.azurePricingSource === "vantage") {
    return "retail";
  }
  return "retail";
}

function normalizeSqlEdition(value) {
  if (value === "standard" || value === "enterprise") {
    return value;
  }
  return "none";
}

function sortSizes(sizes) {
  return sizes.slice().sort((a, b) => {
    if (a.vcpu === b.vcpu) {
      return a.memory - b.memory;
    }
    return a.vcpu - b.vcpu;
  });
}

function flattenFlavorSizes(flavors) {
  const sizes = [];
  const seen = new Set();
  Object.values(flavors || {}).forEach((flavor) => {
    (flavor.sizes || []).forEach((size) => {
      if (seen.has(size.type)) {
        return;
      }
      sizes.push(size);
      seen.add(size.type);
    });
  });
  return sizes;
}

async function runWithConcurrency(tasks, limit) {
  const executing = new Set();
  const results = [];
  for (const task of tasks) {
    const promise = Promise.resolve().then(task);
    results.push(promise);
    executing.add(promise);
    const cleanup = () => executing.delete(promise);
    promise.then(cleanup, cleanup);
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.allSettled(results);
}

async function warmPricingCaches() {
  const startedAt = Date.now();
  const summary = {
    aws: { ok: 0, fail: 0 },
    azure: { ok: 0, fail: 0, reservedOk: 0, reservedFail: 0 },
    gcp: { ok: 0, fail: 0 },
    public: { aws: false, azure: false, gcp: false },
    sharedStorage: { ok: 0, fail: 0 },
  };
  const warmContext = { warmup: true, silent: true };
  console.log("[pricing] Cache warm-up starting...");

  const publicTasks = [
    () =>
      loadAwsPublicPricing()
        .then(() => {
          summary.public.aws = true;
        })
        .catch(() => {
          summary.public.aws = false;
        }),
    () =>
      loadAzurePublicPricing()
        .then(() => {
          summary.public.azure = true;
        })
        .catch(() => {
          summary.public.azure = false;
        }),
    () =>
      loadGcpPublicPricing()
        .then(() => {
          summary.public.gcp = true;
        })
        .catch(() => {
          summary.public.gcp = false;
        }),
  ];
  await Promise.allSettled(publicTasks.map((task) => task()));

  if (hasGcpApiCredentials()) {
    try {
      await loadGcpBillingSkus(getGcpApiKey());
    } catch (error) {
      logPricingError("gcp", { warmup: true }, error);
    }
  }

  let options;
  try {
    options = await buildSizeOptions();
  } catch (error) {
    logPricingError("pricing", { warmup: true }, error);
    return;
  }

  const awsSizes = flattenFlavorSizes(options.providers.aws.flavors);
  const azureSizes = flattenFlavorSizes(options.providers.azure.flavors);
  const gcpSizes = flattenFlavorSizes(options.providers.gcp.flavors);
  const regions = Object.values(REGION_MAP);

  const tasks = [];

  if (hasAwsApiCredentials()) {
    regions.forEach((region) => {
      awsSizes.forEach((size) => {
        ["windows", "linux"].forEach((os) => {
          tasks.push(async () => {
            try {
              await getAwsOnDemandPrice({
                instanceType: size.type,
                location: region.aws.location,
                os,
                sqlEdition: "none",
                logContext: warmContext,
              });
              summary.aws.ok += 1;
            } catch (error) {
              summary.aws.fail += 1;
            }
          });
        });
      });
    });
  } else {
    console.log(
      "[pricing] Cache warm-up skipped for AWS API (missing credentials)."
    );
  }

  regions.forEach((region) => {
    azureSizes.forEach((size) => {
      ["windows", "linux"].forEach((os) => {
        tasks.push(async () => {
          try {
            await getAzureOnDemandPrice({
              skuName: size.type,
              region: region.azure.region,
              os,
            });
            summary.azure.ok += 1;
          } catch (error) {
            summary.azure.fail += 1;
          }
        });
        [1, 3].forEach((termYears) => {
          tasks.push(async () => {
            try {
              await getAzureReservedPrice({
                skuName: size.type,
                region: region.azure.region,
                os,
                termYears,
              });
              summary.azure.reservedOk += 1;
            } catch (error) {
              summary.azure.reservedFail += 1;
            }
          });
        });
      });
    });
  });

  if (hasGcpApiCredentials()) {
    regions.forEach((region) => {
      gcpSizes.forEach((size) => {
        ["windows", "linux"].forEach((os) => {
          tasks.push(async () => {
            try {
              await getGcpApiOnDemandPrice({
                instanceType: size.type,
                vcpu: size.vcpu,
                memory: size.memory,
                region: region.gcp.region,
                os,
                apiKey: getGcpApiKey(),
              });
              summary.gcp.ok += 1;
            } catch (error) {
              summary.gcp.fail += 1;
            }
          });
        });
      });
    });
  } else {
    console.log(
      "[pricing] Cache warm-up skipped for GCP API (missing credentials)."
    );
  }

  regions.forEach((region) => {
    tasks.push(async () => {
      try {
        await resolveK8sSharedStorageRates(region);
        summary.sharedStorage.ok += 1;
      } catch (error) {
        summary.sharedStorage.fail += 1;
      }
    });
  });

  await runWithConcurrency(tasks, PRICING_WARMUP_CONCURRENCY);

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(
    `[pricing] Cache warm-up complete in ${elapsed}s.`,
    summary
  );
}

function pickSizeByCpu(sizes, cpu) {
  if (!sizes.length) {
    return null;
  }
  const sorted = sortSizes(sizes);
  const exact = sorted.find((size) => size.vcpu === cpu);
  if (exact) {
    return exact;
  }
  const higher = sorted.find((size) => size.vcpu > cpu);
  if (higher) {
    return higher;
  }
  return sorted[sorted.length - 1] || null;
}

function selectSizeByTypeOrCpu(sizes, instanceType, cpu) {
  if (instanceType) {
    const match = sizes.find((size) => size.type === instanceType);
    if (match) {
      return { size: match, reason: "type" };
    }
  }
  const fallback = pickSizeByCpu(sizes, cpu);
  if (!fallback) {
    return { size: null, reason: "none" };
  }
  return {
    size: fallback,
    reason: instanceType ? "fallback" : "cpu",
  };
}

function collectProviderSizes(families, flavorKeys, options) {
  const sizes = [];
  const seen = new Set();
  (flavorKeys || []).forEach((flavorKey) => {
    const family = families[flavorKey];
    if (!family?.sizes) {
      return;
    }
    const filtered = filterSizes(family.sizes, options);
    filtered.forEach((size) => {
      if (seen.has(size.type)) {
        return;
      }
      sizes.push({ ...size, flavorKey });
      seen.add(size.type);
    });
  });
  return sizes;
}

function collectGcpSizesFromList(list, flavorKeys, options) {
  const familySet = new Set();
  (flavorKeys || []).forEach((flavorKey) => {
    const families = GCP_FLAVOR_MAP[flavorKey] || [];
    families.forEach((family) => familySet.add(family));
  });
  const sizes = [];
  const seen = new Set();
  list.forEach((item) => {
    if (!familySet.has(item.family)) {
      return;
    }
    if (item.local_ssd || item.shared_cpu) {
      return;
    }
    const size = {
      type: item.instance_type,
      vcpu: Number(item.vCPU),
      memory: Number(item.memory),
      networkGbps: null,
      networkLabel: "Variable",
      localDisk: false,
      flavorKey: GCP_FAMILY_TO_FLAVOR[item.family],
    };
    if (!isSizeEligible(size, options)) {
      return;
    }
    if (seen.has(size.type)) {
      return;
    }
    sizes.push(size);
    seen.add(size.type);
  });
  return sizes;
}

function isMissingAwsCredentials(error) {
  const message = (error?.message || "").toLowerCase();
  const name = (error?.name || "").toLowerCase();
  return (
    name.includes("credential") ||
    message.includes("credential") ||
    message.includes("could not load") ||
    message.includes("missing credentials")
  );
}

async function loadAwsPublicPricing() {
  if (
    awsPublicCache.data &&
    Date.now() - awsPublicCache.loadedAt < AWS_PUBLIC_CACHE_TTL_MS
  ) {
    return awsPublicCache.data;
  }

  const response = await fetcher(AWS_PUBLIC_PRICING_URL, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Public AWS pricing fetch failed: ${response.status}`
    );
  }
  const list = await response.json();
  const pricingMap = new Map();
  for (const item of list) {
    if (item?.instance_type && item?.pricing) {
      pricingMap.set(item.instance_type, item.pricing);
    }
  }
  awsPublicCache.data = pricingMap;
  awsPublicCache.loadedAt = Date.now();
  return pricingMap;
}

function resolveAwsPublicKey(os, sqlEdition) {
  if (sqlEdition === "standard") {
    return os === "windows" ? "mswinSQL" : "linuxSQL";
  }
  if (sqlEdition === "enterprise") {
    return os === "windows" ? "mswinSQLEnterprise" : "linuxSQLEnterprise";
  }
  return os === "windows" ? "mswin" : "linux";
}

async function getAwsPublicPrice({
  instanceType,
  region,
  os,
  sqlEdition,
}) {
  const pricingMap = await loadAwsPublicPricing();
  const instancePricing = pricingMap.get(instanceType);
  if (!instancePricing) {
    throw new Error("Public AWS pricing missing for instance type.");
  }
  const regionPricing = instancePricing[region];
  if (!regionPricing) {
    throw new Error("Public AWS pricing missing for region.");
  }
  const pricingKey = resolveAwsPublicKey(os, sqlEdition);
  const rateValue = regionPricing?.[pricingKey]?.ondemand;
  const rate = Number.parseFloat(rateValue || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Public AWS pricing missing for OS/SQL combo.");
  }
  return rate;
}

async function getAwsPublicReservedPrice({
  instanceType,
  region,
  os,
  sqlEdition,
  termYears,
  reservedType,
}) {
  const pricingMap = await loadAwsPublicPricing();
  const instancePricing = pricingMap.get(instanceType);
  if (!instancePricing) {
    throw new Error("Public AWS pricing missing for instance type.");
  }
  const regionPricing = instancePricing[region];
  if (!regionPricing) {
    throw new Error("Public AWS pricing missing for region.");
  }
  const pricingKey = resolveAwsPublicKey(os, sqlEdition);
  const reservedKey = AWS_RESERVED_KEYS[reservedType]?.[termYears];
  if (!reservedKey) {
    throw new Error("Unsupported reservation term.");
  }
  const rateValue = regionPricing?.[pricingKey]?.reserved?.[reservedKey];
  const rate = Number.parseFloat(rateValue || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Public AWS reserved pricing missing.");
  }
  return rate;
}

function mapAzureSkuToVantageType(skuName) {
  return skuName
    .toLowerCase()
    .replace(/^standard_/, "")
    .replace(/_/g, "");
}

async function loadAzurePublicPricing() {
  if (
    azurePublicCache.data &&
    Date.now() - azurePublicCache.loadedAt < AZURE_PUBLIC_CACHE_TTL_MS
  ) {
    return azurePublicCache.data;
  }

  const response = await fetcher(AZURE_PUBLIC_PRICING_URL, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Public Azure pricing fetch failed: ${response.status}`
    );
  }
  const list = await response.json();
  const pricingMap = new Map();
  for (const item of list) {
    if (item?.instance_type && item?.pricing) {
      pricingMap.set(item.instance_type, item.pricing);
    }
  }
  azurePublicCache.data = pricingMap;
  azurePublicCache.loadedAt = Date.now();
  return pricingMap;
}

async function getAzurePublicPrice({ skuName, region, os }) {
  const pricingMap = await loadAzurePublicPricing();
  const instanceKey = mapAzureSkuToVantageType(skuName);
  const instancePricing = pricingMap.get(instanceKey);
  if (!instancePricing) {
    throw new Error("Public Azure pricing missing for instance type.");
  }
  const vantageRegion = AZURE_VANTAGE_REGION_MAP[region];
  if (!vantageRegion) {
    throw new Error("Public Azure pricing missing for region.");
  }
  const regionPricing = instancePricing[vantageRegion];
  const osKey = os === "windows" ? "windows" : "linux";
  const rateValue = regionPricing?.[osKey]?.ondemand;
  const rate = Number.parseFloat(rateValue || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Public Azure pricing missing for OS.");
  }
  return rate;
}

async function getAzurePublicReservedPrice({ skuName, region, os, termYears }) {
  const pricingMap = await loadAzurePublicPricing();
  const instanceKey = mapAzureSkuToVantageType(skuName);
  const instancePricing = pricingMap.get(instanceKey);
  if (!instancePricing) {
    throw new Error("Public Azure pricing missing for instance type.");
  }
  const vantageRegion = AZURE_VANTAGE_REGION_MAP[region];
  if (!vantageRegion) {
    throw new Error("Public Azure pricing missing for region.");
  }
  const regionPricing = instancePricing[vantageRegion];
  const osKey = os === "windows" ? "windows" : "linux";
  const reservedKey = AZURE_PUBLIC_RESERVED_KEYS[termYears];
  if (!reservedKey) {
    throw new Error("Unsupported reservation term.");
  }
  const rateValue = regionPricing?.[osKey]?.reserved?.[reservedKey];
  const rate = Number.parseFloat(rateValue || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Public Azure reserved pricing missing.");
  }
  return rate;
}

async function loadGcpPublicPricing() {
  if (
    gcpPublicCache.data &&
    Date.now() - gcpPublicCache.loadedAt < GCP_PUBLIC_CACHE_TTL_MS
  ) {
    return gcpPublicCache.data;
  }

  const response = await fetcher(GCP_PUBLIC_PRICING_URL, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Public GCP pricing fetch failed: ${response.status}`);
  }
  const list = await response.json();
  gcpPublicCache.data = list;
  gcpPublicCache.loadedAt = Date.now();
  return list;
}

async function getGcpOnDemandPrice({
  flavorKeys,
  instanceType,
  cpu,
  region,
  os,
  requirePricing = true,
}) {
  const list = await loadGcpPublicPricing();
  const candidates = list.filter((item) => {
    if (!flavorKeys?.length) {
      return false;
    }
    const flavorKey = GCP_FAMILY_TO_FLAVOR[item.family];
    if (!flavorKey || !flavorKeys.includes(flavorKey)) {
      return false;
    }
    if (item.local_ssd || item.shared_cpu) {
      return false;
    }
    const regionPricing = item.pricing?.[region];
    if (!regionPricing) {
      return false;
    }
    if (!requirePricing) {
      return true;
    }
    const osPricing = regionPricing?.[os];
    return Boolean(osPricing?.ondemand);
  });

  const gcpConstraints = {
    minCpu: MIN_CPU,
    minMemory: MIN_MEMORY,
    minNetworkGbps: MIN_NETWORK_GBPS,
    requireNetwork: false,
  };
  const sizeList = candidates
    .map((item) => ({
      type: item.instance_type,
      vcpu: Number(item.vCPU),
      memory: Number(item.memory),
      networkGbps: null,
      networkLabel: "Variable",
      localDisk: false,
      flavorKey: GCP_FAMILY_TO_FLAVOR[item.family],
    }))
    .filter((size) => isSizeEligible(size, gcpConstraints));

  const selection = selectSizeByTypeOrCpu(sizeList, instanceType, cpu);
  if (!selection.size) {
    throw new Error("No GCP instance meets the requirements.");
  }

  const matched = candidates.find(
    (item) => item.instance_type === selection.size.type
  );
  if (!requirePricing) {
    return { size: selection.size, rate: null, selection };
  }

  const rateValue = matched?.pricing?.[region]?.[os]?.ondemand;
  const rate = Number.parseFloat(rateValue || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid GCP hourly rate.");
  }

  return { size: selection.size, rate, selection };
}

function unitPriceToNumber(price) {
  if (!price) {
    return 0;
  }
  const units = Number.parseFloat(price.units || "0");
  const nanos = Number.parseFloat(price.nanos || "0");
  if (!Number.isFinite(units) && !Number.isFinite(nanos)) {
    return 0;
  }
  return (Number.isFinite(units) ? units : 0) +
    (Number.isFinite(nanos) ? nanos : 0) / 1e9;
}

async function loadGcpBillingSkus(apiKey) {
  if (
    gcpBillingCache.data &&
    Date.now() - gcpBillingCache.loadedAt < GCP_BILLING_CACHE_TTL_MS
  ) {
    return gcpBillingCache.data;
  }

  let url =
    `https://cloudbilling.googleapis.com/v1/services/${GCP_BILLING_SERVICE_ID}/skus?key=` +
    encodeURIComponent(apiKey);
  const skus = [];

  while (url) {
    const response = await fetcher(url);
    if (!response.ok) {
      throw new Error(`GCP Billing API error: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data.skus)) {
      skus.push(...data.skus);
    }
    if (data.nextPageToken) {
      url =
        `https://cloudbilling.googleapis.com/v1/services/${GCP_BILLING_SERVICE_ID}/skus?key=` +
        encodeURIComponent(apiKey) +
        `&pageToken=${encodeURIComponent(data.nextPageToken)}`;
    } else {
      url = null;
    }
  }

  gcpBillingCache.data = skus;
  gcpBillingCache.loadedAt = Date.now();
  return skus;
}

function findGcpSkuRate({
  skus,
  familyToken,
  region,
  os,
  kind,
}) {
  const token = familyToken.toUpperCase();
  const isWindows = os === "windows";
  const pattern =
    kind === "cpu"
      ? new RegExp(`${token}.*instance core`, "i")
      : new RegExp(`${token}.*instance ram`, "i");
  const candidate = skus.find((sku) => {
    if (sku.category?.resourceFamily !== "Compute") {
      return false;
    }
    if (sku.category?.usageType !== "OnDemand") {
      return false;
    }
    const regions = sku.serviceRegions || [];
    if (!regions.includes(region) && !regions.includes("global")) {
      return false;
    }
    const description = sku.description || "";
    if (!pattern.test(description)) {
      return false;
    }
    const hasWindows = /windows/i.test(description);
    if (isWindows && !hasWindows) {
      return false;
    }
    if (!isWindows && hasWindows) {
      return false;
    }
    return true;
  });

  const price =
    candidate?.pricingInfo?.[0]?.pricingExpression?.tieredRates?.[0]
      ?.unitPrice;
  const rate = unitPriceToNumber(price);
  return Number.isFinite(rate) && rate > 0 ? rate : null;
}

async function getGcpApiOnDemandPrice({
  instanceType,
  vcpu,
  memory,
  region,
  os,
  apiKey,
}) {
  const cacheKey = [instanceType, region, os].join("|");
  if (gcpApiCache.has(cacheKey)) {
    return gcpApiCache.get(cacheKey);
  }
  const familyToken = instanceType.split("-")[0] || "";
  const skus = await loadGcpBillingSkus(apiKey);
  const cpuRate = findGcpSkuRate({
    skus,
    familyToken,
    region,
    os,
    kind: "cpu",
  });
  const ramRate = findGcpSkuRate({
    skus,
    familyToken,
    region,
    os,
    kind: "ram",
  });
  if (!Number.isFinite(cpuRate) || !Number.isFinite(ramRate)) {
    throw new Error("GCP API pricing missing for instance family.");
  }
  const rate = cpuRate * vcpu + ramRate * memory;
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid GCP API hourly rate.");
  }
  const result = { rate, source: "gcp-cloud-billing" };
  gcpApiCache.set(cacheKey, result);
  return result;
}

function readSharedStorageCache(key) {
  const cached = k8sSharedStorageCache.get(key);
  if (!cached) {
    return null;
  }
  if (Date.now() > cached.expiresAt) {
    k8sSharedStorageCache.delete(key);
    return null;
  }
  return cached;
}

function writeSharedStorageCache(key, rate, source) {
  k8sSharedStorageCache.set(key, {
    rate,
    source,
    expiresAt: Date.now() + K8S_SHARED_STORAGE_CACHE_TTL_MS,
  });
}

async function loadAwsEfsRegionIndex() {
  if (
    awsEfsRegionIndexCache.data &&
    Date.now() - awsEfsRegionIndexCache.loadedAt <
      K8S_SHARED_STORAGE_CACHE_TTL_MS
  ) {
    return awsEfsRegionIndexCache.data;
  }

  const response = await fetcher(AWS_EFS_REGION_INDEX_URL, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `AWS EFS price index fetch failed: ${response.status}`
    );
  }
  const data = await response.json();
  awsEfsRegionIndexCache.data = data;
  awsEfsRegionIndexCache.loadedAt = Date.now();
  return data;
}

async function getAwsEfsStandardRate(regionCode) {
  const cacheKey = `aws:${regionCode}`;
  const cached = readSharedStorageCache(cacheKey);
  if (cached) {
    return cached;
  }

  const index = await loadAwsEfsRegionIndex();
  const regionEntry = index?.regions?.[regionCode];
  if (!regionEntry?.currentVersionUrl) {
    throw new Error("AWS EFS pricing missing for region.");
  }

  const url = `https://pricing.us-east-1.amazonaws.com${regionEntry.currentVersionUrl}`;
  const response = await fetcher(url, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`AWS EFS pricing fetch failed: ${response.status}`);
  }
  const data = await response.json();
  let rate = null;

  for (const [sku, product] of Object.entries(data.products || {})) {
    const attrs = product.attributes || {};
    if (product.productFamily !== "Storage") {
      continue;
    }
    if (attrs.storageClass !== "General Purpose") {
      continue;
    }
    if (attrs.regionCode && attrs.regionCode !== regionCode) {
      continue;
    }
    const terms = data.terms?.OnDemand?.[sku];
    if (!terms) {
      continue;
    }
    for (const term of Object.values(terms)) {
      for (const dimension of Object.values(term.priceDimensions || {})) {
        if (dimension.unit !== "GB-Mo") {
          continue;
        }
        if (
          dimension.description &&
          !/standard storage/i.test(dimension.description)
        ) {
          continue;
        }
        const candidateRate = Number.parseFloat(
          dimension.pricePerUnit?.USD || "0"
        );
        if (Number.isFinite(candidateRate) && candidateRate > 0) {
          rate = candidateRate;
          break;
        }
      }
      if (rate) {
        break;
      }
    }
    if (rate) {
      break;
    }
  }

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid AWS EFS storage rate.");
  }

  const result = { rate, source: "aws-efs-price-list" };
  writeSharedStorageCache(cacheKey, result.rate, result.source);
  return result;
}

async function getAzurePremiumFilesRate(region) {
  const cacheKey = `azure:${region}`;
  const cached = readSharedStorageCache(cacheKey);
  if (cached) {
    return cached;
  }

  const query = [
    "serviceName eq 'Storage'",
    `armRegionName eq '${region}'`,
    "productName eq 'Premium Files'",
    "contains(meterName, 'Provisioned')",
  ].join(" and ");
  const url =
    "https://prices.azure.com/api/retail/prices?$filter=" +
    encodeURIComponent(query);
  const response = await fetcher(url);
  if (!response.ok) {
    throw new Error(`Azure pricing API error: ${response.status}`);
  }
  const data = await response.json();
  const items = data.Items || [];
  const preferred = items.find(
    (item) =>
      /premium lrs/i.test(item.skuName || "") &&
      /provisioned/i.test(item.meterName || "")
  );
  const candidate =
    preferred ||
    items.find((item) => /provisioned/i.test(item.meterName || ""));
  const rate = Number.parseFloat(candidate?.retailPrice || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid Azure premium files rate.");
  }

  const result = { rate, source: "azure-retail-premium-files" };
  writeSharedStorageCache(cacheKey, result.rate, result.source);
  return result;
}

async function getGcpFilestoreEnterpriseRate() {
  const cacheKey = "gcp:filestore";
  const cached = readSharedStorageCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetcher(GCP_FILESTORE_PRICING_URL, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "text/html",
    },
  });
  if (!response.ok) {
    throw new Error(
      `GCP Filestore pricing fetch failed: ${response.status}`
    );
  }
  const text = await response.text();
  const enterpriseMatch = text.match(
    />Enterprise<\/p><\/td>[\s\S]*?\$([0-9.]+)\s*\/\s*1\s*gibibyte hour/i
  );
  const highScaleMatch = text.match(
    />High-Scale<\/p><\/td>[\s\S]*?\$([0-9.]+)\s*\/\s*1\s*gibibyte hour/i
  );
  const ratePerGiBHour = Number.parseFloat(
    enterpriseMatch?.[1] || highScaleMatch?.[1] || "0"
  );
  if (!Number.isFinite(ratePerGiBHour) || ratePerGiBHour <= 0) {
    throw new Error("Invalid GCP Filestore rate.");
  }
  const rate = ratePerGiBHour * HOURS_IN_MONTH;
  const result = { rate, source: "gcp-filestore-pricing-page" };
  writeSharedStorageCache(cacheKey, result.rate, result.source);
  return result;
}

async function resolveK8sSharedStorageRates(region) {
  const rates = { ...K8S_SHARED_STORAGE_DEFAULT_RATES };
  const sources = {
    aws: "fallback-default",
    azure: "fallback-default",
    gcp: "fallback-default",
  };

  const tasks = [
    ["aws", () => getAwsEfsStandardRate(region.aws.region)],
    ["azure", () => getAzurePremiumFilesRate(region.azure.region)],
    ["gcp", () => getGcpFilestoreEnterpriseRate()],
  ];

  const results = await Promise.allSettled(tasks.map(([, task]) => task()));
  results.forEach((result, index) => {
    const key = tasks[index][0];
    if (result.status === "fulfilled") {
      const value = result.value;
      if (Number.isFinite(value?.rate)) {
        rates[key] = value.rate;
        sources[key] = value.source;
      }
    }
  });

  return { rates, sources };
}

async function getAzureReservedPrice({ skuName, region, os, termYears }) {
  const cacheKey = [skuName, region, os, termYears].join("|");
  if (azureReservedCache.has(cacheKey)) {
    return azureReservedCache.get(cacheKey);
  }

  const reservationTerm = termYears === 3 ? "3 Years" : "1 Year";
  const query = [
    `armRegionName eq '${region}'`,
    "serviceName eq 'Virtual Machines'",
    `armSkuName eq '${skuName}'`,
    "type eq 'Reservation'",
    `reservationTerm eq '${reservationTerm}'`,
  ].join(" and ");

  const url =
    "https://prices.azure.com/api/retail/prices?$filter=" +
    encodeURIComponent(query);
  const response = await fetcher(url);
  if (!response.ok) {
    throw new Error(`Azure pricing API error: ${response.status}`);
  }
  const data = await response.json();
  const items = data.Items || [];
  if (!items.length) {
    throw new Error("Azure reservation pricing not found.");
  }

  const isWindows = os === "windows";
  const windowsMatch = isWindows
    ? items.find((item) => /windows/i.test(item.productName || ""))
    : null;
  const candidate = windowsMatch || items[0];

  const rawRate = Number.parseFloat(candidate?.retailPrice || "0");
  if (!Number.isFinite(rawRate) || rawRate <= 0) {
    throw new Error("Invalid Azure reservation rate.");
  }

  const termHours = AZURE_RESERVATION_TERM_HOURS[termYears] || 8760;
  const hourlyRate = rawRate / termHours;
  let note =
    "Reservation price converted from term total to a monthly equivalent.";
  if (isWindows && !windowsMatch) {
    note = `${note} Azure reservation prices are not OS-specific in the retail API.`;
  }

  const result = { hourlyRate, note };
  azureReservedCache.set(cacheKey, result);
  return result;
}

function normalizeAwsAttribute(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ");
}

function matchesAwsOperatingSystem(value, os) {
  const normalized = normalizeAwsAttribute(value);
  if (!normalized) {
    return false;
  }
  if (os === "windows") {
    return normalized === "windows";
  }
  return normalized.startsWith("linux");
}

function matchesAwsLicenseModel(value, os, sqlEdition) {
  const normalized = normalizeAwsAttribute(value);
  if (os === "windows" && sqlEdition === "none") {
    if (!normalized) {
      return true;
    }
    return normalized === "no license required";
  }
  return true;
}

function matchesAwsSqlEdition(preInstalledSw, sqlEdition) {
  const normalized = normalizeAwsAttribute(preInstalledSw);
  if (sqlEdition === "standard") {
    return normalized.includes("sql") && normalized.includes("std");
  }
  if (sqlEdition === "enterprise") {
    return normalized.includes("sql") && normalized.includes("ent");
  }
  return normalized === "" || !normalized.includes("sql");
}

function filterAwsPriceList(priceList, { os, sqlEdition }) {
  return priceList.filter((item) => {
    const attrs = item.product?.attributes || {};
    const osValue = normalizeAwsAttribute(attrs.operatingSystem);
    const tenancyValue = normalizeAwsAttribute(attrs.tenancy);
    const capacityValue = normalizeAwsAttribute(attrs.capacitystatus);
    if (os === "windows" && osValue && osValue !== "windows") {
      return false;
    }
    if (os !== "windows" && osValue && osValue !== "linux") {
      return false;
    }
    if (tenancyValue && tenancyValue !== "shared") {
      return false;
    }
    if (capacityValue && capacityValue !== "used") {
      return false;
    }
    if (!matchesAwsLicenseModel(attrs.licenseModel, os, sqlEdition)) {
      return false;
    }
    return matchesAwsSqlEdition(attrs.preInstalledSw, sqlEdition);
  });
}

function extractAwsOnDemand(priceList) {
  return priceList
    .flatMap((item) => Object.values(item.terms?.OnDemand || {}))
    .flatMap((term) => Object.values(term.priceDimensions || {}));
}

async function loadAwsPriceListRegionIndex() {
  if (
    awsPriceListIndexCache.data &&
    Date.now() - awsPriceListIndexCache.loadedAt < AWS_PRICE_LIST_CACHE_TTL_MS
  ) {
    return awsPriceListIndexCache.data;
  }
  const response = await fetcher(AWS_PRICE_LIST_REGION_INDEX_URL, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `AWS price list region index fetch failed: ${response.status}`
    );
  }
  const data = await response.json();
  const regions = data?.regions || {};
  awsPriceListIndexCache.data = regions;
  awsPriceListIndexCache.loadedAt = Date.now();
  return regions;
}

async function loadAwsPriceListRegion(regionCode) {
  const cached = awsPriceListRegionCache.get(regionCode);
  if (cached && Date.now() - cached.loadedAt < AWS_PRICE_LIST_CACHE_TTL_MS) {
    return cached.data;
  }
  const regions = await loadAwsPriceListRegionIndex();
  const entry = regions[regionCode];
  if (!entry?.currentVersionUrl) {
    throw new Error("AWS price list missing region.");
  }
  const url = `${AWS_PRICE_LIST_BASE_URL}${entry.currentVersionUrl}`;
  const response = await fetcher(url, {
    headers: {
      "User-Agent": "cloud-price/0.1",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`AWS price list fetch failed: ${response.status}`);
  }
  const data = await response.json();
  awsPriceListRegionCache.set(regionCode, {
    loadedAt: Date.now(),
    data,
  });
  return data;
}

async function getAwsPriceListOnDemandRate({
  instanceType,
  region,
  location,
  os,
  sqlEdition,
  logContext,
}) {
  const data = await loadAwsPriceListRegion(region);
  const products = data?.products || {};
  const onDemandTerms = data?.terms?.OnDemand || {};
  const candidates = [];

  for (const [sku, product] of Object.entries(products)) {
    const attrs = product?.attributes || {};
    if (attrs.instanceType !== instanceType) {
      continue;
    }
    if (attrs.location !== location) {
      continue;
    }
    if (!matchesAwsOperatingSystem(attrs.operatingSystem, os)) {
      continue;
    }
    if (attrs.tenancy && attrs.tenancy !== "Shared") {
      continue;
    }
    if (!matchesAwsLicenseModel(attrs.licenseModel, os, sqlEdition)) {
      continue;
    }
    if (!matchesAwsSqlEdition(attrs.preInstalledSw, sqlEdition)) {
      continue;
    }
    candidates.push({ sku, attrs });
  }

  if (!candidates.length) {
    throw new Error("AWS price list missing matching SKU.");
  }

  const usedCandidate = candidates.find(
    (candidate) =>
      normalizeAwsAttribute(candidate.attrs.capacitystatus) === "used"
  );
  const selected = usedCandidate || candidates[0];
  const termMap = onDemandTerms[selected.sku] || {};
  const priceDimensions = Object.values(termMap).flatMap((term) =>
    Object.values(term.priceDimensions || {})
  );

  if (!priceDimensions.length) {
    logPricingWarning(
      "aws",
      { ...logContext, source: "price-list", sku: selected.sku },
      "AWS price list missing on-demand dimensions."
    );
    throw new Error("AWS price list missing on-demand price dimensions.");
  }

  const unitMatches = new Set(["Hrs", "Hour", "Hours", "hrs", "hour", "hours"]);
  let hourly = priceDimensions.find((dimension) =>
    unitMatches.has(dimension.unit)
  );
  if (!hourly) {
    hourly =
      priceDimensions.find((dimension) =>
        /per\s+hour/i.test(dimension.description || "")
      ) || priceDimensions[0];
  }

  const rate = Number.parseFloat(hourly?.pricePerUnit?.USD || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid AWS price list hourly rate.");
  }

  return rate;
}

async function reconcileAwsApiRate({
  awsResponse,
  awsSize,
  region,
  os,
  sqlEdition,
  logContext,
}) {
  if (!Number.isFinite(awsResponse.hourlyRate)) {
    return;
  }
  if (awsResponse.source === "aws-price-list") {
    return;
  }
  try {
    const priceListRate = await getAwsPriceListOnDemandRate({
      instanceType: awsSize.type,
      region: region.aws.region,
      location: region.aws.location,
      os,
      sqlEdition,
      logContext,
    });
    if (
      Number.isFinite(priceListRate) &&
      awsResponse.hourlyRate < priceListRate
    ) {
      logPricingWarning(
        "aws",
        {
          ...logContext,
          apiRate: awsResponse.hourlyRate,
          priceListRate,
        },
        "AWS API rate below price list; using AWS price list."
      );
      awsResponse.hourlyRate = priceListRate;
      awsResponse.source = "aws-price-list";
      awsResponse.message = "Using AWS price list for consistency.";
    }
  } catch (error) {
    logPricingError(
      "aws",
      {
        ...logContext,
        instanceType: awsSize.type,
        region: region.aws.region,
        os,
        sqlEdition,
        source: "price-list",
      },
      error
    );
  }
}

async function getAwsOnDemandPrice({
  instanceType,
  location,
  os,
  sqlEdition,
  logContext,
}) {
  const preInstalledSw =
    sqlEdition === "standard"
      ? "SQL Std"
      : sqlEdition === "enterprise"
      ? "SQL Ent"
      : "NA";
  const cacheKey = [instanceType, location, os, preInstalledSw].join("|");
  if (awsCache.has(cacheKey)) {
    return awsCache.get(cacheKey);
  }

  const baseFilters = [
    { Type: "TERM_MATCH", Field: "instanceType", Value: instanceType },
    { Type: "TERM_MATCH", Field: "location", Value: location },
  ];
  const osFilter = {
    Type: "TERM_MATCH",
    Field: "operatingSystem",
    Value: os === "windows" ? "Windows" : "Linux",
  };
  const strictFilters = [
    ...baseFilters,
    osFilter,
    { Type: "TERM_MATCH", Field: "tenancy", Value: "Shared" },
    { Type: "TERM_MATCH", Field: "preInstalledSw", Value: preInstalledSw },
    { Type: "TERM_MATCH", Field: "capacitystatus", Value: "Used" },
  ];
  const noPreinstallFilters = [
    ...baseFilters,
    osFilter,
    { Type: "TERM_MATCH", Field: "tenancy", Value: "Shared" },
    { Type: "TERM_MATCH", Field: "capacitystatus", Value: "Used" },
  ];
  const relaxedFilters = [
    ...baseFilters,
    osFilter,
    { Type: "TERM_MATCH", Field: "tenancy", Value: "Shared" },
  ];
  const fallbackFilters = [...baseFilters, osFilter];
  const filterSets = [
    { name: "strict", filters: strictFilters, localFilter: null },
    {
      name: "no-preinstall",
      filters: noPreinstallFilters,
      localFilter: (list) => filterAwsPriceList(list, { os, sqlEdition }),
    },
    {
      name: "no-capacity",
      filters: relaxedFilters,
      localFilter: (list) => filterAwsPriceList(list, { os, sqlEdition }),
    },
    {
      name: "fallback",
      filters: fallbackFilters,
      localFilter: (list) => filterAwsPriceList(list, { os, sqlEdition }),
    },
  ];

  let onDemand = [];
  for (const set of filterSets) {
    const command = new GetProductsCommand({
      ServiceCode: "AmazonEC2",
      Filters: set.filters,
      FormatVersion: "aws_v1",
      MaxResults: 100,
    });
    const response = await awsPricingClient.send(command);
    const priceList = (response.PriceList || []).map((item) =>
      typeof item === "string" ? JSON.parse(item) : item
    );
    if (!priceList.length) {
      logPricingWarning(
        "aws",
        { ...logContext, filterSet: set.name },
        "AWS pricing API returned no products."
      );
      continue;
    }
    const filteredList = set.localFilter ? set.localFilter(priceList) : priceList;
    onDemand = extractAwsOnDemand(filteredList);
    if (onDemand.length) {
      break;
    }
    const termKeys = Array.from(
      new Set(
        priceList.flatMap((item) => Object.keys(item.terms || {}))
      )
    );
    logPricingWarning(
      "aws",
      {
        ...logContext,
        filterSet: set.name,
        productCount: priceList.length,
        filteredCount: filteredList.length,
        termKeys,
      },
      "No AWS on-demand price dimensions found for filter set."
    );
  }
  if (!onDemand.length) {
    throw new Error("No AWS on-demand price dimensions found.");
  }

  const unitMatches = new Set(["Hrs", "Hour", "Hours", "hrs", "hour", "hours"]);
  let hourly = onDemand.find((dimension) => unitMatches.has(dimension.unit));
  if (!hourly) {
    const units = Array.from(
      new Set(onDemand.map((dimension) => dimension.unit).filter(Boolean))
    );
    logPricingWarning(
      "aws",
      { ...logContext, units },
      "No hourly unit found in AWS price dimensions; using fallback."
    );
    hourly =
      onDemand.find((dimension) =>
        /per\s+hour/i.test(dimension.description || "")
      ) || onDemand[0];
  }

  const rate = Number.parseFloat(hourly.pricePerUnit?.USD || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid AWS hourly rate.");
  }

  awsCache.set(cacheKey, rate);
  return rate;
}

async function getAzureOnDemandPrice({ skuName, region, os }) {
  const cacheKey = [skuName, region, os].join("|");
  if (azureCache.has(cacheKey)) {
    return azureCache.get(cacheKey);
  }

  const query = [
    `armRegionName eq '${region}'`,
    "serviceName eq 'Virtual Machines'",
    `armSkuName eq '${skuName}'`,
    "priceType eq 'Consumption'",
  ].join(" and ");

  const url =
    "https://prices.azure.com/api/retail/prices?$filter=" +
    encodeURIComponent(query);
  const response = await fetcher(url);
  if (!response.ok) {
    throw new Error(`Azure pricing API error: ${response.status}`);
  }
  const data = await response.json();
  const items = data.Items || [];
  const isWindows = os === "windows";
  const filtered = items.filter((item) => {
    const label = `${item.productName || ""} ${item.skuName || ""} ${
      item.meterName || ""
    }`;
    if (/spot|low priority/i.test(label)) {
      return false;
    }
    if (isWindows) {
      return /windows/i.test(item.productName || "");
    }
    return !/windows/i.test(item.productName || "");
  });
  const candidate = filtered[0] || items[0];
  const rate = Number.parseFloat(candidate?.retailPrice || "0");
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("Invalid Azure hourly rate.");
  }
  azureCache.set(cacheKey, rate);
  return rate;
}

function toText(value) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function includesMatch(value, matcher) {
  if (!matcher) {
    return true;
  }
  const text = toText(value);
  if (!text) {
    return false;
  }
  if (matcher instanceof RegExp) {
    return matcher.test(text);
  }
  return text.toLowerCase().includes(toText(matcher).toLowerCase());
}

function listIncludes(list, matcher) {
  if (!matcher) {
    return true;
  }
  if (!Array.isArray(list)) {
    return false;
  }
  const needle = toText(matcher).toLowerCase();
  return list.some((item) => toText(item).toLowerCase().includes(needle));
}

function isHourlyUnit(unit) {
  return /hour/i.test(toText(unit));
}

async function loadAwsServiceRegionIndex(serviceCode) {
  const cached = awsServiceIndexCache.get(serviceCode);
  if (cached && Date.now() - cached.loadedAt < AWS_PRICE_LIST_CACHE_TTL_MS) {
    return cached.data;
  }
  const url = `${AWS_PRICE_LIST_BASE_URL}/offers/v1.0/aws/${serviceCode}/current/region_index.json`;
  const response = await fetcher(url, {
    headers: { "User-Agent": "cloud-price/0.1", Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`AWS ${serviceCode} price index fetch failed: ${response.status}`);
  }
  const data = await response.json();
  awsServiceIndexCache.set(serviceCode, {
    loadedAt: Date.now(),
    data,
  });
  return data;
}

async function loadAwsServicePriceList(serviceCode, regionCode) {
  const cacheKey = `${serviceCode}|${regionCode}`;
  const cached = awsServiceRegionCache.get(cacheKey);
  if (cached && Date.now() - cached.loadedAt < AWS_PRICE_LIST_CACHE_TTL_MS) {
    return cached.data;
  }
  const index = await loadAwsServiceRegionIndex(serviceCode);
  const regionEntry = index?.regions?.[regionCode];
  if (!regionEntry?.currentVersionUrl) {
    throw new Error(`AWS ${serviceCode} pricing missing for region.`);
  }
  const url = `${AWS_PRICE_LIST_BASE_URL}${regionEntry.currentVersionUrl}`;
  const response = await fetcher(url, {
    headers: { "User-Agent": "cloud-price/0.1", Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`AWS ${serviceCode} pricing fetch failed: ${response.status}`);
  }
  const data = await response.json();
  awsServiceRegionCache.set(cacheKey, {
    loadedAt: Date.now(),
    data,
  });
  return data;
}

async function getAwsServiceHourlyRate({
  serviceCode,
  regionCode,
  location,
  matchers,
}) {
  const data = await loadAwsServicePriceList(serviceCode, regionCode);
  const products = data.products || {};
  const candidates = [];
  for (const [sku, product] of Object.entries(products)) {
    const attrs = product.attributes || {};
    if (location && attrs.location && attrs.location !== location) {
      continue;
    }
    if (
      matchers?.productFamily &&
      product.productFamily &&
      product.productFamily !== matchers.productFamily
    ) {
      continue;
    }
    if (
      matchers?.usagetypeIncludes &&
      !includesMatch(attrs.usagetype, matchers.usagetypeIncludes)
    ) {
      continue;
    }
    if (
      matchers?.operationIncludes &&
      !includesMatch(attrs.operation, matchers.operationIncludes)
    ) {
      continue;
    }
    if (
      matchers?.groupDescriptionIncludes &&
      !includesMatch(attrs.groupDescription, matchers.groupDescriptionIncludes)
    ) {
      continue;
    }
    if (
      matchers?.subcategoryIncludes &&
      !includesMatch(attrs.subcategory, matchers.subcategoryIncludes)
    ) {
      continue;
    }
    candidates.push({ sku, attrs });
  }
  for (const candidate of candidates) {
    const terms = data.terms?.OnDemand?.[candidate.sku] || {};
    for (const term of Object.values(terms)) {
      for (const dimension of Object.values(term.priceDimensions || {})) {
        if (!isHourlyUnit(dimension.unit)) {
          continue;
        }
        const rate = Number.parseFloat(dimension.pricePerUnit?.USD || "0");
        if (Number.isFinite(rate) && rate > 0) {
          return rate;
        }
      }
    }
  }
  throw new Error(`AWS ${serviceCode} hourly rate not found.`);
}

async function getAzureRetailHourlyRate({
  serviceName,
  region,
  skuName,
  productNameIncludes,
  meterNameIncludes,
  unitIncludes,
  allowRegionFallback = true,
}) {
  const cacheKey = [
    serviceName,
    region,
    skuName || "",
    productNameIncludes || "",
    meterNameIncludes || "",
    unitIncludes || "",
  ].join("|");
  if (azureNetworkCache.has(cacheKey)) {
    return azureNetworkCache.get(cacheKey);
  }
  const baseQuery = [
    `serviceName eq '${serviceName}'`,
    region ? `armRegionName eq '${region}'` : null,
  ]
    .filter(Boolean)
    .join(" and ");
  let url =
    "https://prices.azure.com/api/retail/prices?$filter=" +
    encodeURIComponent(baseQuery);
  while (url) {
    const response = await fetcher(url);
    if (!response.ok) {
      throw new Error(`Azure pricing API error: ${response.status}`);
    }
    const data = await response.json();
    const items = data.Items || [];
    const filtered = items.filter((item) => {
      if (!isHourlyUnit(item.unitOfMeasure)) {
        return false;
      }
      if (unitIncludes && !includesMatch(item.unitOfMeasure, unitIncludes)) {
        return false;
      }
      if (skuName && item.skuName !== skuName) {
        return false;
      }
      if (productNameIncludes && !includesMatch(item.productName, productNameIncludes)) {
        return false;
      }
      if (meterNameIncludes && !includesMatch(item.meterName, meterNameIncludes)) {
        return false;
      }
      return true;
    });
    const candidate = filtered[0] || null;
    if (candidate) {
      const rate = Number.parseFloat(candidate.retailPrice || "0");
      if (Number.isFinite(rate)) {
        azureNetworkCache.set(cacheKey, rate);
        return rate;
      }
    }
    url = data.NextPageLink || null;
  }
  if (region && allowRegionFallback) {
    return getAzureRetailHourlyRate({
      serviceName,
      region: null,
      skuName,
      productNameIncludes,
      meterNameIncludes,
      unitIncludes,
      allowRegionFallback: false,
    });
  }
  throw new Error("Azure hourly rate not found.");
}

async function loadGcpServices(apiKey) {
  if (
    gcpServiceCache.data &&
    Date.now() - gcpServiceCache.loadedAt < GCP_BILLING_CACHE_TTL_MS
  ) {
    return gcpServiceCache.data;
  }
  let url =
    "https://cloudbilling.googleapis.com/v1/services?key=" +
    encodeURIComponent(apiKey);
  const services = [];
  while (url) {
    const response = await fetcher(url);
    if (!response.ok) {
      throw new Error(`GCP Billing API error: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data.services)) {
      services.push(...data.services);
    }
    if (data.nextPageToken) {
      url =
        "https://cloudbilling.googleapis.com/v1/services?key=" +
        encodeURIComponent(apiKey) +
        `&pageToken=${encodeURIComponent(data.nextPageToken)}`;
    } else {
      url = null;
    }
  }
  gcpServiceCache.data = services;
  gcpServiceCache.loadedAt = Date.now();
  return services;
}

async function getGcpServiceIdByName(apiKey, displayName) {
  const services = await loadGcpServices(apiKey);
  const normalized = toText(displayName).toLowerCase();
  const exact = services.find(
    (service) => toText(service.displayName).toLowerCase() === normalized
  );
  if (exact) {
    return exact.name?.split("/").pop();
  }
  const partial = services.find((service) =>
    toText(service.displayName).toLowerCase().includes(normalized)
  );
  if (!partial) {
    throw new Error(`GCP service not found: ${displayName}`);
  }
  return partial.name?.split("/").pop();
}

async function loadGcpServiceSkus(apiKey, serviceId) {
  const cached = gcpServiceSkuCache.get(serviceId);
  if (cached && Date.now() - cached.loadedAt < GCP_BILLING_CACHE_TTL_MS) {
    return cached.data;
  }
  let url =
    `https://cloudbilling.googleapis.com/v1/services/${serviceId}/skus?key=` +
    encodeURIComponent(apiKey);
  const skus = [];
  while (url) {
    const response = await fetcher(url);
    if (!response.ok) {
      throw new Error(`GCP Billing API error: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data.skus)) {
      skus.push(...data.skus);
    }
    if (data.nextPageToken) {
      url =
        `https://cloudbilling.googleapis.com/v1/services/${serviceId}/skus?key=` +
        encodeURIComponent(apiKey) +
        `&pageToken=${encodeURIComponent(data.nextPageToken)}`;
    } else {
      url = null;
    }
  }
  gcpServiceSkuCache.set(serviceId, { data: skus, loadedAt: Date.now() });
  return skus;
}

function findGcpHourlySkuRate({ skus, region, descriptionPatterns }) {
  const patterns = (descriptionPatterns || []).map((pattern) =>
    pattern instanceof RegExp ? pattern : new RegExp(pattern, "i")
  );
  const candidate = skus.find((sku) => {
    const description = toText(sku.description);
    if (!patterns.every((pattern) => pattern.test(description))) {
      return false;
    }
    const regions = sku.serviceRegions || [];
    if (!listIncludes(regions, region) && !regions.includes("global")) {
      return false;
    }
    const pricingInfo = sku.pricingInfo || [];
    const usageUnit = pricingInfo[0]?.pricingExpression?.usageUnit;
    const usageDesc = pricingInfo[0]?.pricingExpression?.usageUnitDescription;
    if (!isHourlyUnit(usageUnit) && !isHourlyUnit(usageDesc)) {
      return false;
    }
    return true;
  });
  const price =
    candidate?.pricingInfo?.[0]?.pricingExpression?.tieredRates?.[0]
      ?.unitPrice;
  const rate = unitPriceToNumber(price);
  if (!Number.isFinite(rate) || rate <= 0) {
    return null;
  }
  return rate;
}

function resolveNetworkFlavor(providerKey, addonKey, flavorKey) {
  const options = NETWORK_ADDON_OPTIONS[providerKey]?.[addonKey] || [];
  const defaults = NETWORK_ADDON_DEFAULTS[providerKey] || {};
  const fallbackKey = defaults[addonKey] || (options[0] ? options[0].key : "");
  const resolvedKey = flavorKey || fallbackKey;
  return (
    options.find((option) => option.key === resolvedKey) ||
    options.find((option) => option.key === fallbackKey) ||
    options[0] ||
    null
  );
}

async function resolveNetworkAddonRate({
  providerKey,
  addonKey,
  flavor,
  region,
}) {
  const pricing = flavor?.pricing || {};
  if (pricing.type === "static") {
    return { hourlyRate: pricing.hourly || 0, source: "static" };
  }
  if (pricing.type === "aws-price-list") {
    const rate = await getAwsServiceHourlyRate({
      serviceCode: pricing.serviceCode,
      regionCode: region.aws.region,
      location: region.aws.location,
      matchers: pricing,
    });
    return { hourlyRate: rate, source: "aws-price-list" };
  }
  if (pricing.type === "azure-retail") {
    const rate = await getAzureRetailHourlyRate({
      serviceName: pricing.serviceName,
      region: region.azure.region,
      skuName: pricing.skuName,
      productNameIncludes: pricing.productNameIncludes,
      meterNameIncludes: pricing.meterNameIncludes,
      unitIncludes: pricing.unitIncludes,
    });
    return { hourlyRate: rate, source: "azure-retail-api" };
  }
  if (pricing.type === "gcp-billing") {
    if (!hasGcpApiCredentials()) {
      throw new Error("GCP API key missing.");
    }
    const serviceId = await getGcpServiceIdByName(
      getGcpApiKey(),
      pricing.serviceName
    );
    const skus = await loadGcpServiceSkus(getGcpApiKey(), serviceId);
    const rate = findGcpHourlySkuRate({
      skus,
      region: region.gcp.region,
      descriptionPatterns: pricing.descriptionPatterns,
    });
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error("GCP hourly rate not found.");
    }
    return { hourlyRate: rate, source: "gcp-cloud-billing" };
  }
  return { hourlyRate: 0, source: "unknown" };
}

async function resolveNetworkAddonsForProvider({
  providerKey,
  region,
  selections,
  hours,
}) {
  const items = [];
  const errors = [];
  let hourlyTotal = 0;
  for (const addonKey of ["vpc", "firewall", "loadBalancer"]) {
    const flavor = resolveNetworkFlavor(
      providerKey,
      addonKey,
      selections?.[addonKey]
    );
    if (!flavor || flavor.key === "none") {
      continue;
    }
    try {
      const { hourlyRate, source } = await resolveNetworkAddonRate({
        providerKey,
        addonKey,
        flavor,
        region,
      });
      hourlyTotal += hourlyRate;
      items.push({
        addonKey,
        key: flavor.key,
        label: flavor.label,
        hourlyRate,
        source,
        status: "ok",
      });
    } catch (error) {
      errors.push(`${addonKey}:${flavor.label}`);
      items.push({
        addonKey,
        key: flavor.key,
        label: flavor.label,
        hourlyRate: 0,
        source: "missing",
        status: "error",
      });
    }
  }
  const monthlyTotal = Number.isFinite(hours) ? hours * hourlyTotal : 0;
  const note = errors.length
    ? `Network add-on pricing missing for ${errors.join(", ")}.`
    : null;
  return {
    items,
    hourlyTotal,
    monthlyTotal,
    note,
  };
}

function computeTotals({
  hourlyRate,
  osDiskGb,
  dataDiskGb,
  snapshotGb,
  egressGb,
  hours,
  storageRate,
  dataStorageRate,
  snapshotRate,
  egressRate,
  networkMonthly,
  sqlLicenseRate,
  windowsLicenseMonthly,
  vcpu,
  drPercent,
  vmCount,
  controlPlaneMonthly,
  egressScale,
  osScale,
  dataScale,
}) {
  const computeBase = hourlyRate ? hourlyRate * hours : 0;
  const osGb = Number.isFinite(osDiskGb) ? osDiskGb : 0;
  const dataGb = Number.isFinite(dataDiskGb) ? dataDiskGb : 0;
  const dataRate = Number.isFinite(dataStorageRate)
    ? dataStorageRate
    : storageRate;
  const osBase = osGb * storageRate;
  const dataBase = dataGb * dataRate;
  const backupBase = snapshotGb * snapshotRate;
  const egressBase = egressGb * egressRate;
  const sqlBase = sqlLicenseRate * vcpu * hours;
  const scale = Number.isFinite(vmCount) && vmCount > 0 ? vmCount : 1;
  const controlPlane = Number.isFinite(controlPlaneMonthly)
    ? controlPlaneMonthly
    : 0;
  const osMultiplier =
    Number.isFinite(osScale) && osScale > 0 ? osScale : scale;
  const dataMultiplier =
    Number.isFinite(dataScale) && dataScale > 0 ? dataScale : scale;
  const egressMultiplier =
    Number.isFinite(egressScale) && egressScale > 0
      ? egressScale
      : scale;
  const computeMonthly = computeBase * scale;
  const storageMonthly =
    osBase * osMultiplier + dataBase * dataMultiplier;
  const backupMonthly = backupBase * scale;
  const egressMonthly = egressBase * egressMultiplier;
  const sqlMonthly = sqlBase * scale;
  const windowsLicenseMonthlyTotal = Number.isFinite(windowsLicenseMonthly)
    ? windowsLicenseMonthly * scale
    : 0;
  const networkBase = Number.isFinite(networkMonthly) ? networkMonthly : 0;
  const drRate = Number.isFinite(drPercent) ? drPercent / 100 : 0;
  const drMonthly =
    drRate > 0
      ? (computeMonthly + storageMonthly + backupMonthly + sqlMonthly) *
        drRate
      : 0;
  const total =
    computeMonthly +
    storageMonthly +
    backupMonthly +
    egressMonthly +
    sqlMonthly +
    windowsLicenseMonthlyTotal +
    drMonthly +
    networkBase +
    controlPlane;
  return {
    computeMonthly,
    controlPlaneMonthly: controlPlane,
    storageMonthly,
    backupMonthly,
    egressMonthly,
    sqlMonthly,
    windowsLicenseMonthly: windowsLicenseMonthlyTotal,
    networkMonthly: networkBase,
    drMonthly,
    total,
  };
}

function computeTotalsOrNull(params) {
  if (!Number.isFinite(params.hourlyRate)) {
    return null;
  }
  return computeTotals(params);
}

app.post("/api/compare", async (req, res) => {
  const body = req.body || {};
  const requestId = `req-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
  const cpu = Math.max(MIN_CPU, Math.round(toNumber(body.cpu, MIN_CPU)));
  const awsInstanceType =
    typeof body.awsInstanceType === "string"
      ? body.awsInstanceType.trim()
      : "";
  const azureInstanceType =
    typeof body.azureInstanceType === "string"
      ? body.azureInstanceType.trim()
      : "";
  const gcpInstanceType =
    typeof body.gcpInstanceType === "string"
      ? body.gcpInstanceType.trim()
      : "";
  const mode = body.mode === "k8s" ? "k8s" : "vm";
  const osDiskMin = mode === "k8s" ? K8S_OS_DISK_MIN_GB : 0;
  const osDiskDefault = mode === "k8s" ? K8S_OS_DISK_MIN_GB : 256;
  const osDiskGb = Math.max(
    osDiskMin,
    toNumber(body.osDiskGb, osDiskDefault)
  );
  const dataDiskTb = Math.max(0, toNumber(body.dataDiskTb, 1));
  const dataDiskGb = dataDiskTb * 1024;
  const storageGb = osDiskGb + dataDiskGb;
  const backupEnabled = toBoolean(body.backupEnabled);
  const awsVpcFlavor =
    typeof body.awsVpcFlavor === "string" ? body.awsVpcFlavor.trim() : "";
  const awsFirewallFlavor =
    typeof body.awsFirewallFlavor === "string"
      ? body.awsFirewallFlavor.trim()
      : "";
  const awsLoadBalancerFlavor =
    typeof body.awsLoadBalancerFlavor === "string"
      ? body.awsLoadBalancerFlavor.trim()
      : "";
  const azureVpcFlavor =
    typeof body.azureVpcFlavor === "string" ? body.azureVpcFlavor.trim() : "";
  const azureFirewallFlavor =
    typeof body.azureFirewallFlavor === "string"
      ? body.azureFirewallFlavor.trim()
      : "";
  const azureLoadBalancerFlavor =
    typeof body.azureLoadBalancerFlavor === "string"
      ? body.azureLoadBalancerFlavor.trim()
      : "";
  const gcpVpcFlavor =
    typeof body.gcpVpcFlavor === "string" ? body.gcpVpcFlavor.trim() : "";
  const gcpFirewallFlavor =
    typeof body.gcpFirewallFlavor === "string"
      ? body.gcpFirewallFlavor.trim()
      : "";
  const gcpLoadBalancerFlavor =
    typeof body.gcpLoadBalancerFlavor === "string"
      ? body.gcpLoadBalancerFlavor.trim()
      : "";
  const snapshotMultiplier =
    1 +
    Math.max(0, BACKUP_RETENTION_DAYS - 1) *
      (BACKUP_DAILY_DELTA_PERCENT / 100);
  const snapshotBaseGb = mode === "k8s" ? osDiskGb : storageGb;
  const snapshotGb = backupEnabled ? snapshotBaseGb * snapshotMultiplier : 0;
  const egressTb = Math.max(0, toNumber(body.egressTb, 0));
  const egressGb = egressTb * 1024;
  const hours = Math.max(1, toNumber(body.hours, HOURS_IN_MONTH));
  const drPercent = Math.max(0, toNumber(body.drPercent, 0));
  const vmCountMin = mode === "k8s" ? K8S_MIN_NODE_COUNT : 1;
  const vmCount = Math.max(
    vmCountMin,
    Math.round(toNumber(body.vmCount, vmCountMin))
  );
  const egressScale = mode === "vm" ? vmCount : 1;
  const osScale = vmCount;
  const dataScale = mode === "k8s" ? 1 : vmCount;
  const workloadKey =
    mode === "vm" && body.workload in VM_WORKLOADS
      ? body.workload
      : "general";
  const workloadConfig = VM_WORKLOADS[workloadKey];
  const allowedFlavors =
    mode === "k8s" ? K8S_FLAVORS : workloadConfig.flavors;
  const pricingProvider = resolvePricingProvider(body);
  const diskTierKey =
    typeof body.diskTier === "string" &&
    Object.prototype.hasOwnProperty.call(DISK_TIERS, body.diskTier)
      ? body.diskTier
      : DEFAULT_DISK_TIER;
  const diskTier = DISK_TIERS[diskTierKey] || DISK_TIERS[DEFAULT_DISK_TIER];
  const regionKey = body.regionKey in REGION_MAP ? body.regionKey : "us-east";
  const sqlEdition =
    mode === "k8s" ? "none" : normalizeSqlEdition(body.sqlEdition);
  const awsSqlPricingEdition = "none";
  const os = mode === "k8s" ? "linux" : "windows";
  const awsReservedType = "convertible";
  const sqlLicenseRate =
    mode === "k8s"
      ? 0
      : sqlEdition === "none"
      ? 0
      : toNumber(body.sqlLicenseRate, SQL_LICENSE_RATES[sqlEdition]);
  const privateEnabled = toBoolean(body.privateEnabled);
  const privateVmwareMonthly = Math.max(
    0,
    toNumber(body.privateVmwareMonthly, 0)
  );
  const privateWindowsLicenseMonthly = Math.max(
    0,
    toNumber(body.privateWindowsLicenseMonthly, 0)
  );
  const privateNodeCount = Math.max(
    2,
    Math.round(toNumber(body.privateNodeCount, 2))
  );
  const privateNodeCpu = Math.max(0, toNumber(body.privateNodeCpu, 0));
  const privateNodeRam = Math.max(0, toNumber(body.privateNodeRam, 0));
  const privateNodeStorageTb = Math.max(
    0,
    toNumber(body.privateNodeStorageTb, 0)
  );
  const privateNodeVcpuCapacity =
    privateNodeCpu > 0 ? privateNodeCpu * VMWARE_VCPU_PER_SOCKET : 0;
  const privateVmOsDiskGb = Math.max(
    1,
    toNumber(body.privateVmOsDiskGb, osDiskGb)
  );
  const privateVmMemoryOverride = toNumber(body.privateVmMemory, null);
  const privateSanUsableTb = Math.max(
    0,
    toNumber(body.privateSanUsableTb, 0)
  );
  const privateSanTotalMonthly = Math.max(
    0,
    toNumber(body.privateSanTotalMonthly, 0)
  );
  let privateStoragePerTb = Math.max(
    0,
    toNumber(body.privateStoragePerTb, 0)
  );
  if (
    privateStoragePerTb === 0 &&
    privateSanUsableTb > 0 &&
    privateSanTotalMonthly > 0
  ) {
    privateStoragePerTb = privateSanTotalMonthly / privateSanUsableTb;
  }
  const privateNetworkMonthly = Math.max(
    0,
    toNumber(body.privateNetworkMonthly, 0)
  );
  const privateFirewallMonthly = Math.max(
    0,
    toNumber(body.privateFirewallMonthly, 0)
  );
  const privateLoadBalancerMonthly = Math.max(
    0,
    toNumber(body.privateLoadBalancerMonthly, 0)
  );
  const privateNetworkMonthlyTotal =
    privateNetworkMonthly + privateFirewallMonthly + privateLoadBalancerMonthly;
  const privateStorageRate =
    privateStoragePerTb > 0 ? privateStoragePerTb / 1024 : 0;
  let privateHourlyRate = null;
  let privateVmPerNode = 1;
  let privateCapacityNote = null;

  const sizeConstraints = {
    minCpu: MIN_CPU,
    minMemory: MIN_MEMORY,
    minNetworkGbps: MIN_NETWORK_GBPS,
    requireNetwork: true,
  };
  const region = REGION_MAP[regionKey];
  const privateRegion = { location: "Private DC" };
  const regionPayload = { ...region, private: privateRegion };
  const logContext = {
    requestId,
    mode,
    pricingProvider,
    regionKey,
    cpu,
    awsInstanceType,
    azureInstanceType,
    gcpInstanceType,
  };
  let sharedStorageRates = K8S_SHARED_STORAGE_DEFAULT_RATES;
  let sharedStorageSources = null;
  if (mode === "k8s") {
    const sharedStorage = await resolveK8sSharedStorageRates(region);
    sharedStorageRates = sharedStorage.rates;
    sharedStorageSources = sharedStorage.sources;
  }
  const awsNetworkSelections = {
    vpc: awsVpcFlavor,
    firewall: awsFirewallFlavor,
    loadBalancer: awsLoadBalancerFlavor,
  };
  const azureNetworkSelections = {
    vpc: azureVpcFlavor,
    firewall: azureFirewallFlavor,
    loadBalancer: azureLoadBalancerFlavor,
  };
  const gcpNetworkSelections = {
    vpc: gcpVpcFlavor,
    firewall: gcpFirewallFlavor,
    loadBalancer: gcpLoadBalancerFlavor,
  };
  const [
    awsNetworkAddons,
    azureNetworkAddons,
    gcpNetworkAddons,
  ] = await Promise.all([
    resolveNetworkAddonsForProvider({
      providerKey: "aws",
      region,
      selections: awsNetworkSelections,
      hours,
    }),
    resolveNetworkAddonsForProvider({
      providerKey: "azure",
      region,
      selections: azureNetworkSelections,
      hours,
    }),
    resolveNetworkAddonsForProvider({
      providerKey: "gcp",
      region,
      selections: gcpNetworkSelections,
      hours,
    }),
  ]);

  const awsSizes = collectProviderSizes(
    AWS_FAMILIES,
    allowedFlavors.aws,
    sizeConstraints
  );
  const azureSizes = collectProviderSizes(
    AZURE_FAMILIES,
    allowedFlavors.azure,
    sizeConstraints
  );
  const awsSelection = selectSizeByTypeOrCpu(
    awsSizes,
    awsInstanceType,
    cpu
  );
  const azureSelection = selectSizeByTypeOrCpu(
    azureSizes,
    azureInstanceType,
    cpu
  );
  const awsSize = awsSelection.size;
  const azureSize = azureSelection.size;

  if (!awsSize || !azureSize) {
    res.status(400).json({
      error:
        `No instance sizes meet the ${
          mode === "k8s" ? "Linux" : "Windows"
        }, premium disk, and network constraints.`,
    });
    return;
  }

  const awsFamily = AWS_FAMILIES[awsSize.flavorKey];
  const azureFamily = AZURE_FAMILIES[azureSize.flavorKey];

  const sizeNotes = [];
  const addSelectionNote = (providerLabel, requestedType, selection) => {
    if (!selection?.size) {
      return;
    }
    if (requestedType && selection.reason === "fallback") {
      sizeNotes.push(
        `${providerLabel} instance ${requestedType} not available for ${cpu} vCPU; using ${selection.size.type}.`
      );
      return;
    }
    if (selection.size.vcpu !== cpu) {
      sizeNotes.push(
        `${providerLabel} capped at ${selection.size.vcpu} vCPU (request was ${cpu} vCPU).`
      );
    }
  };
  addSelectionNote("AWS", awsInstanceType, awsSelection);
  addSelectionNote("Azure", azureInstanceType, azureSelection);

  const useApiPricing = pricingProvider === "api";

  const awsResponse = {
    status: useApiPricing ? "api" : "retail",
    message: null,
    instance: awsSize,
    hourlyRate: null,
    source: useApiPricing ? "aws-pricing-api" : "vantage",
  };

  if (useApiPricing) {
    if (!hasAwsApiCredentials()) {
      logPricingWarning(
        "aws",
        { ...logContext, instanceType: awsSize.type },
        "Missing AWS credentials."
      );
      awsResponse.status = "error";
      awsResponse.message =
        "AWS API key missing. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY or AWS_PROFILE.";
    } else {
      try {
        const rate = await getAwsOnDemandPrice({
          instanceType: awsSize.type,
          location: region.aws.location,
          os,
          sqlEdition: awsSqlPricingEdition,
          logContext,
        });
        awsResponse.hourlyRate = rate;
      } catch (error) {
        logPricingError(
          "aws",
          {
            ...logContext,
            instanceType: awsSize.type,
            location: region.aws.location,
            os,
            sqlEdition: awsSqlPricingEdition,
          },
          error
        );
        try {
          const fallbackRate = await getAwsPriceListOnDemandRate({
            instanceType: awsSize.type,
            region: region.aws.region,
            location: region.aws.location,
            os,
            sqlEdition: awsSqlPricingEdition,
            logContext,
          });
          awsResponse.hourlyRate = fallbackRate;
          awsResponse.source = "aws-price-list";
          awsResponse.message =
            "AWS pricing API missing terms; using AWS price list.";
        } catch (fallbackError) {
          logPricingError(
            "aws",
            {
              ...logContext,
              instanceType: awsSize.type,
              region: region.aws.region,
              os,
              sqlEdition: awsSqlPricingEdition,
              source: "price-list",
            },
            fallbackError
          );
          awsResponse.status = "error";
          awsResponse.message =
            fallbackError?.message || "AWS pricing lookup failed.";
        }
      }
      await reconcileAwsApiRate({
        awsResponse,
        awsSize,
        region,
        os,
        sqlEdition: awsSqlPricingEdition,
        logContext,
      });
    }
  } else {
    try {
      const rate = await getAwsPublicPrice({
        instanceType: awsSize.type,
        region: region.aws.region,
        os,
        sqlEdition: awsSqlPricingEdition,
      });
      awsResponse.hourlyRate = rate;
      awsResponse.message =
        "Using public AWS pricing snapshot (instances.vantage.sh).";
    } catch (error) {
      logPricingError(
        "aws",
        {
          ...logContext,
          instanceType: awsSize.type,
          region: region.aws.region,
          os,
          sqlEdition: awsSqlPricingEdition,
          source: "public-snapshot",
        },
        error
      );
      awsResponse.status = "error";
      awsResponse.message =
        error?.message || "AWS public pricing lookup failed.";
    }
  }

  const azureResponse = {
    status: useApiPricing ? "api" : "retail",
    message: null,
    instance: azureSize,
    hourlyRate: null,
    source: useApiPricing ? "azure-retail-api" : "vantage",
  };

  if (useApiPricing) {
    try {
      const rate = await getAzureOnDemandPrice({
        skuName: azureSize.type,
        region: region.azure.region,
        os,
      });
      azureResponse.hourlyRate = rate;
    } catch (error) {
      logPricingError(
        "azure",
        {
          ...logContext,
          instanceType: azureSize.type,
          region: region.azure.region,
          os,
        },
        error
      );
      azureResponse.status = "error";
      azureResponse.message =
        error?.message || "Azure pricing lookup failed.";
    }
  } else {
    try {
      const rate = await getAzurePublicPrice({
        skuName: azureSize.type,
        region: region.azure.region,
        os,
      });
      azureResponse.hourlyRate = rate;
      azureResponse.message =
        "Using Azure public pricing snapshot (instances.vantage.sh/azure).";
    } catch (error) {
      logPricingError(
        "azure",
        {
          ...logContext,
          instanceType: azureSize.type,
          region: region.azure.region,
          os,
          source: "public-snapshot",
        },
        error
      );
      azureResponse.status = "error";
      azureResponse.message =
        error?.message || "Azure public pricing lookup failed.";
    }
  }

  let awsReserved1Rate = null;
  let awsReserved3Rate = null;
  let awsReservationNote = null;
  try {
    awsReserved1Rate = await getAwsPublicReservedPrice({
      instanceType: awsSize.type,
      region: region.aws.region,
      os,
      sqlEdition: awsSqlPricingEdition,
      termYears: 1,
      reservedType: awsReservedType,
    });
    awsReservationNote =
      `AWS reserved pricing uses ${awsReservedType} no-upfront rates from the public snapshot.`;
  } catch (error) {
    awsReserved1Rate = null;
  }

  try {
    awsReserved3Rate = await getAwsPublicReservedPrice({
      instanceType: awsSize.type,
      region: region.aws.region,
      os,
      sqlEdition: awsSqlPricingEdition,
      termYears: 3,
      reservedType: awsReservedType,
    });
    awsReservationNote =
      `AWS reserved pricing uses ${awsReservedType} no-upfront rates from the public snapshot.`;
  } catch (error) {
    awsReserved3Rate = null;
  }

  if (useApiPricing) {
    const reservedRates = [awsReserved1Rate, awsReserved3Rate].filter(
      (rate) => Number.isFinite(rate)
    );
    const minReserved = reservedRates.length
      ? Math.min(...reservedRates)
      : null;
    if (
      Number.isFinite(minReserved) &&
      Number.isFinite(awsResponse.hourlyRate) &&
      awsResponse.hourlyRate < minReserved
    ) {
      try {
        const priceListRate = await getAwsPriceListOnDemandRate({
          instanceType: awsSize.type,
          region: region.aws.region,
          location: region.aws.location,
          os,
          sqlEdition: awsSqlPricingEdition,
          logContext,
        });
        if (
          Number.isFinite(priceListRate) &&
          priceListRate >= minReserved
        ) {
          logPricingWarning(
            "aws",
            {
              ...logContext,
              apiRate: awsResponse.hourlyRate,
              priceListRate,
              minReserved,
            },
            "AWS API rate below reserved; using price list for consistency."
          );
          awsResponse.hourlyRate = priceListRate;
          awsResponse.source = "aws-price-list";
          awsResponse.message =
            "AWS API rate below reserved; using AWS price list for consistency.";
        }
      } catch (error) {
        logPricingError(
          "aws",
          {
            ...logContext,
            instanceType: awsSize.type,
            region: region.aws.region,
            os,
            sqlEdition: awsSqlPricingEdition,
            source: "price-list",
          },
          error
        );
      }
    }
  }

  let azureReserved1Rate = null;
  let azureReserved3Rate = null;
  let azureReservationNote = null;

  try {
    if (useApiPricing) {
      const result = await getAzureReservedPrice({
        skuName: azureSize.type,
        region: region.azure.region,
        os,
        termYears: 1,
      });
      azureReserved1Rate = result.hourlyRate;
      if (result.note) {
        azureReservationNote = result.note;
      }
    } else {
      azureReserved1Rate = await getAzurePublicReservedPrice({
        skuName: azureSize.type,
        region: region.azure.region,
        os,
        termYears: 1,
      });
      azureReservationNote =
        "Azure reserved pricing uses monthly (no-upfront) effective rates from the public snapshot.";
    }
  } catch (error) {
    azureReservationNote = null;
  }

  try {
    if (useApiPricing) {
      const result = await getAzureReservedPrice({
        skuName: azureSize.type,
        region: region.azure.region,
        os,
        termYears: 3,
      });
      azureReserved3Rate = result.hourlyRate;
      if (result.note && !azureReservationNote) {
        azureReservationNote = result.note;
      }
    } else {
      azureReserved3Rate = await getAzurePublicReservedPrice({
        skuName: azureSize.type,
        region: region.azure.region,
        os,
        termYears: 3,
      });
      azureReservationNote =
        azureReservationNote ||
        "Azure reserved pricing uses monthly (no-upfront) effective rates from the public snapshot.";
    }
  } catch (error) {
    azureReservationNote = azureReservationNote || null;
  }

  const gcpResponse = {
    status: useApiPricing ? "api" : "retail",
    message: null,
    instance: null,
    hourlyRate: null,
    source: useApiPricing ? "cloud-api" : "vantage",
  };

  let gcpSize = null;
  let gcpSelection = null;
  if (useApiPricing) {
    if (!hasGcpApiCredentials()) {
      logPricingWarning(
        "gcp",
        { ...logContext, instanceType: gcpInstanceType || null },
        "Missing GCP API key."
      );
      gcpResponse.status = "error";
      gcpResponse.message =
        "GCP API key missing. Set GCP_PRICING_API_KEY.";
    } else {
      try {
        const sizeResult = await getGcpOnDemandPrice({
          flavorKeys: allowedFlavors.gcp,
          instanceType: gcpInstanceType,
          cpu,
          region: region.gcp.region,
          os,
          requirePricing: false,
        });
        gcpSize = sizeResult.size;
        gcpSelection = sizeResult.selection;
        gcpResponse.instance = sizeResult.size;
        const apiResult = await getGcpApiOnDemandPrice({
          instanceType: gcpSize.type,
          vcpu: gcpSize.vcpu,
          memory: gcpSize.memory,
          region: region.gcp.region,
          os,
          apiKey: getGcpApiKey(),
        });
        gcpResponse.hourlyRate = apiResult.rate;
        gcpResponse.source = apiResult.source;
      } catch (error) {
        logPricingError(
          "gcp",
          {
            ...logContext,
            instanceType: gcpInstanceType,
            region: region.gcp.region,
            os,
          },
          error
        );
        gcpResponse.status = "error";
        gcpResponse.message =
          error?.message || "GCP pricing lookup failed.";
      }
    }
  } else {
    try {
      const result = await getGcpOnDemandPrice({
        flavorKeys: allowedFlavors.gcp,
        instanceType: gcpInstanceType,
        cpu,
        region: region.gcp.region,
        os,
      });
      gcpSize = result.size;
      gcpSelection = result.selection;
      gcpResponse.instance = result.size;
      gcpResponse.hourlyRate = result.rate;
      gcpResponse.message =
        "Using GCP public pricing snapshot (instances.vantage.sh/gcp).";
    } catch (error) {
      logPricingError(
        "gcp",
        {
          ...logContext,
          instanceType: gcpInstanceType,
          region: region.gcp.region,
          os,
          source: "public-snapshot",
        },
        error
      );
      gcpResponse.status = "error";
      gcpResponse.message =
        error?.message || "GCP pricing lookup failed.";
    }
  }
  addSelectionNote("GCP", gcpInstanceType, gcpSelection);

  const privateInstance = {
    type: "Private custom",
    vcpu: cpu,
    memory:
      Number.isFinite(privateVmMemoryOverride)
        ? privateVmMemoryOverride
        : awsSize?.memory ?? azureSize?.memory ?? gcpSize?.memory ?? null,
    networkGbps: null,
    networkLabel: "Custom",
    localDisk: false,
  };
  const privateVmMemory = privateInstance.memory;
  const privateCapacityInputs =
    privateNodeCpu > 0 || privateNodeRam > 0 || privateNodeStorageTb > 0;
  if (privateEnabled) {
    const capacityLimits = [];
    if (privateNodeVcpuCapacity > 0 && cpu > 0) {
      capacityLimits.push(
        Math.floor(privateNodeVcpuCapacity / cpu)
      );
    }
    if (
      privateNodeRam > 0 &&
      Number.isFinite(privateVmMemory) &&
      privateVmMemory > 0
    ) {
      capacityLimits.push(Math.floor(privateNodeRam / privateVmMemory));
    }
    const nodeStorageGb =
      privateNodeStorageTb > 0 ? privateNodeStorageTb * 1024 : 0;
    if (nodeStorageGb > 0 && privateVmOsDiskGb > 0) {
      capacityLimits.push(
        Math.floor(nodeStorageGb / privateVmOsDiskGb)
      );
    }
    if (capacityLimits.length) {
      const minCapacity = Math.min(...capacityLimits);
      if (Number.isFinite(minCapacity) && minCapacity > 0) {
        privateVmPerNode = minCapacity;
      }
    }
    const privateClusterVmwareMonthly =
      privateVmwareMonthly * privateNodeCount;
    const privateUsableNodes = Math.max(privateNodeCount - 1, 1);
    const privateClusterVmCapacity = privateVmPerNode * privateUsableNodes;
    privateHourlyRate =
      privateClusterVmCapacity > 0
        ? privateClusterVmwareMonthly / hours / privateClusterVmCapacity
        : null;
    if (privateCapacityInputs) {
      privateCapacityNote = `Compute assumes ${privateVmPerNode} VM${
        privateVmPerNode === 1 ? "" : "s"
      } per node, ${privateNodeCount} nodes with N+1 spare (${privateUsableNodes} usable).`;
    }
  }
  const privateNetworkItems = [];
  if (privateNetworkMonthly > 0) {
    privateNetworkItems.push({ key: "network", label: "Network" });
  }
  if (privateFirewallMonthly > 0) {
    privateNetworkItems.push({ key: "firewall", label: "Firewall" });
  }
  if (privateLoadBalancerMonthly > 0) {
    privateNetworkItems.push({ key: "loadBalancer", label: "Load balancer" });
  }
  const privateNetworkAddons = {
    items: privateNetworkItems,
    monthlyTotal: privateNetworkMonthlyTotal,
    note:
      privateEnabled && privateNetworkItems.length
        ? "Manual network inputs."
        : null,
  };

  const dataStorageRates =
    mode === "k8s" ? sharedStorageRates : diskTier.storageRates;
  const awsControlPlaneMonthly =
    mode === "k8s" ? K8S_CONTROL_PLANE_HOURLY.aws * hours : 0;
  const azureControlPlaneMonthly =
    mode === "k8s" ? K8S_CONTROL_PLANE_HOURLY.azure * hours : 0;
  const gcpControlPlaneMonthly =
    mode === "k8s" ? K8S_CONTROL_PLANE_HOURLY.gcp * hours : 0;

  const awsTotals = computeTotalsOrNull({
    hourlyRate: awsResponse.hourlyRate,
    osDiskGb,
    dataDiskGb,
    snapshotGb,
    egressGb,
    hours,
    storageRate: diskTier.storageRates.aws,
    dataStorageRate: dataStorageRates.aws,
    snapshotRate: diskTier.snapshotRates.aws,
    egressRate: EGRESS_RATES.aws,
    networkMonthly: awsNetworkAddons.monthlyTotal,
    sqlLicenseRate,
    vcpu: awsSize.vcpu,
    drPercent,
    vmCount,
    controlPlaneMonthly: awsControlPlaneMonthly,
    egressScale,
    osScale,
    dataScale,
  });

  const azureTotals = computeTotalsOrNull({
    hourlyRate: azureResponse.hourlyRate,
    osDiskGb,
    dataDiskGb,
    snapshotGb,
    egressGb,
    hours,
    storageRate: diskTier.storageRates.azure,
    dataStorageRate: dataStorageRates.azure,
    snapshotRate: diskTier.snapshotRates.azure,
    egressRate: EGRESS_RATES.azure,
    networkMonthly: azureNetworkAddons.monthlyTotal,
    sqlLicenseRate,
    vcpu: azureSize.vcpu,
    drPercent,
    vmCount,
    controlPlaneMonthly: azureControlPlaneMonthly,
    egressScale,
    osScale,
    dataScale,
  });

  const awsReserved1Totals = computeTotalsOrNull({
    hourlyRate: awsReserved1Rate,
    osDiskGb,
    dataDiskGb,
    snapshotGb,
    egressGb,
    hours,
    storageRate: diskTier.storageRates.aws,
    dataStorageRate: dataStorageRates.aws,
    snapshotRate: diskTier.snapshotRates.aws,
    egressRate: EGRESS_RATES.aws,
    networkMonthly: awsNetworkAddons.monthlyTotal,
    sqlLicenseRate,
    vcpu: awsSize.vcpu,
    drPercent,
    vmCount,
    controlPlaneMonthly: awsControlPlaneMonthly,
    egressScale,
    osScale,
    dataScale,
  });

  const awsReserved3Totals = computeTotalsOrNull({
    hourlyRate: awsReserved3Rate,
    osDiskGb,
    dataDiskGb,
    snapshotGb,
    egressGb,
    hours,
    storageRate: diskTier.storageRates.aws,
    dataStorageRate: dataStorageRates.aws,
    snapshotRate: diskTier.snapshotRates.aws,
    egressRate: EGRESS_RATES.aws,
    networkMonthly: awsNetworkAddons.monthlyTotal,
    sqlLicenseRate,
    vcpu: awsSize.vcpu,
    drPercent,
    vmCount,
    controlPlaneMonthly: awsControlPlaneMonthly,
    egressScale,
    osScale,
    dataScale,
  });

  const azureReserved1Totals = computeTotalsOrNull({
    hourlyRate: azureReserved1Rate,
    osDiskGb,
    dataDiskGb,
    snapshotGb,
    egressGb,
    hours,
    storageRate: diskTier.storageRates.azure,
    dataStorageRate: dataStorageRates.azure,
    snapshotRate: diskTier.snapshotRates.azure,
    egressRate: EGRESS_RATES.azure,
    networkMonthly: azureNetworkAddons.monthlyTotal,
    sqlLicenseRate,
    vcpu: azureSize.vcpu,
    drPercent,
    vmCount,
    controlPlaneMonthly: azureControlPlaneMonthly,
    egressScale,
    osScale,
    dataScale,
  });

  const azureReserved3Totals = computeTotalsOrNull({
    hourlyRate: azureReserved3Rate,
    osDiskGb,
    dataDiskGb,
    snapshotGb,
    egressGb,
    hours,
    storageRate: diskTier.storageRates.azure,
    dataStorageRate: dataStorageRates.azure,
    snapshotRate: diskTier.snapshotRates.azure,
    egressRate: EGRESS_RATES.azure,
    networkMonthly: azureNetworkAddons.monthlyTotal,
    sqlLicenseRate,
    vcpu: azureSize.vcpu,
    drPercent,
    vmCount,
    controlPlaneMonthly: azureControlPlaneMonthly,
    egressScale,
    osScale,
    dataScale,
  });

  const gcpTotals = computeTotalsOrNull({
    hourlyRate: gcpResponse.hourlyRate,
    osDiskGb,
    dataDiskGb,
    snapshotGb,
    egressGb,
    hours,
    storageRate: diskTier.storageRates.gcp,
    dataStorageRate: dataStorageRates.gcp,
    snapshotRate: diskTier.snapshotRates.gcp,
    egressRate: EGRESS_RATES.gcp,
    networkMonthly: gcpNetworkAddons.monthlyTotal,
    sqlLicenseRate,
    vcpu: gcpSize?.vcpu || cpu,
    drPercent,
    vmCount,
    controlPlaneMonthly: gcpControlPlaneMonthly,
    egressScale,
    osScale,
    dataScale,
  });

  const privateTotals = privateEnabled
    ? computeTotalsOrNull({
        hourlyRate: privateHourlyRate,
        osDiskGb,
        dataDiskGb,
        snapshotGb,
        egressGb,
        hours,
        storageRate: privateStorageRate,
        dataStorageRate: privateStorageRate,
        snapshotRate: privateStorageRate,
        egressRate: 0,
        networkMonthly: privateNetworkMonthlyTotal,
        sqlLicenseRate,
        windowsLicenseMonthly: privateWindowsLicenseMonthly,
        vcpu: cpu,
        drPercent,
        vmCount,
        controlPlaneMonthly: 0,
        egressScale,
        osScale,
        dataScale,
      })
    : null;

  const gcpReserved1Totals = null;
  const gcpReserved3Totals = null;
  const privateReserved1Totals = null;
  const privateReserved3Totals = null;
  const azureOnDemandSource =
    useApiPricing ? "azure-retail-consumption" : "public-snapshot";
  const azureReservedSource =
    useApiPricing ? "azure-retail-reservation" : "public-snapshot";
  const constraintsNote =
    mode === "k8s"
      ? "Kubernetes mode: node sizing uses VM families. Control plane fees use premium tiers. Linux-only. Minimum node count 3. OS disk minimum 32 GB. Shared data storage uses EFS/Azure Files/Filestore public pricing (cached; falls back to defaults) and is cluster-level. SQL pricing disabled. Disk tier selectable (Premium or Max performance). Optional network add-ons: VPC/VNet, firewall, load balancer. No local or temp disks. Network >= 10 Gbps (GCP network listed as variable). Minimum 8 vCPU and 8 GB RAM."
      : "Windows-only. Disk tier selectable (Premium or Max performance). Optional network add-ons: VPC/VNet, firewall, load balancer. No local or temp disks. Network >= 10 Gbps (GCP network listed as variable). Minimum 8 vCPU and 8 GB RAM.";

  res.json({
    input: {
      cpu,
      awsInstanceType: awsSize?.type || null,
      azureInstanceType: azureSize?.type || null,
      gcpInstanceType: gcpSize?.type || null,
      osDiskGb,
      dataDiskTb,
      dataDiskGb,
      snapshotGb,
      storageGb,
      egressTb,
      egressGb,
      hours,
      backupEnabled,
      backupRetentionDays: BACKUP_RETENTION_DAYS,
      backupDailyDeltaPercent: BACKUP_DAILY_DELTA_PERCENT,
      drPercent,
      vmCount,
      mode,
      workload: workloadKey,
      regionKey,
      sqlEdition,
      os,
      awsReservedType,
      pricingProvider,
      sqlLicenseRate,
      diskTier: diskTierKey,
      diskTierLabel: diskTier.label,
      awsVpcFlavor,
      awsFirewallFlavor,
      awsLoadBalancerFlavor,
      azureVpcFlavor,
      azureFirewallFlavor,
      azureLoadBalancerFlavor,
      gcpVpcFlavor,
      gcpFirewallFlavor,
      gcpLoadBalancerFlavor,
      privateEnabled,
      privateVmwareMonthly,
      privateWindowsLicenseMonthly,
      privateNodeCount,
      privateStoragePerTb,
      privateNetworkMonthly,
      privateFirewallMonthly,
      privateLoadBalancerMonthly,
      privateNetworkMonthlyTotal,
      privateNodeCpu,
      privateNodeRam,
      privateNodeStorageTb,
      privateVmOsDiskGb,
      privateVmMemory: Number.isFinite(privateVmMemoryOverride)
        ? privateVmMemoryOverride
        : null,
      privateSanUsableTb,
      privateSanTotalMonthly,
      privateVmPerNode,
    },
    region: regionPayload,
    aws: {
      ...awsResponse,
      family: awsFamily?.label || "AWS",
      reservationNote: awsReservationNote,
      storage: {
        osDiskGb,
        dataDiskTb,
        dataDiskGb,
        totalGb: storageGb,
      },
      backup: {
        enabled: backupEnabled,
        snapshotGb,
        retentionDays: BACKUP_RETENTION_DAYS,
        dailyDeltaPercent: BACKUP_DAILY_DELTA_PERCENT,
      },
      networkAddons: awsNetworkAddons,
      dr: {
        percent: drPercent,
      },
      totals: awsTotals,
      pricingTiers: {
        onDemand: {
          hourlyRate: awsResponse.hourlyRate,
          totals: awsTotals,
          source: awsResponse.source,
        },
        reserved1yr: {
          hourlyRate: awsReserved1Rate,
          totals: awsReserved1Totals,
          source: "public-snapshot",
          reservedType: awsReservedType,
        },
        reserved3yr: {
          hourlyRate: awsReserved3Rate,
          totals: awsReserved3Totals,
          source: "public-snapshot",
          reservedType: awsReservedType,
        },
      },
      storageRate: diskTier.storageRates.aws,
      snapshotRate: diskTier.snapshotRates.aws,
      egressRate: EGRESS_RATES.aws,
      egress: {
        egressTb,
        egressGb,
      },
      sqlNote:
        mode === "k8s"
          ? null
          : sqlEdition === "none"
          ? "No SQL Server license."
          : "SQL license add-on estimated per vCPU-hour (BYOL).",
    },
    azure: {
      ...azureResponse,
      family: azureFamily?.label || "Azure",
      reservationNote: azureReservationNote,
      storage: {
        osDiskGb,
        dataDiskTb,
        dataDiskGb,
        totalGb: storageGb,
      },
      backup: {
        enabled: backupEnabled,
        snapshotGb,
        retentionDays: BACKUP_RETENTION_DAYS,
        dailyDeltaPercent: BACKUP_DAILY_DELTA_PERCENT,
      },
      networkAddons: azureNetworkAddons,
      dr: {
        percent: drPercent,
      },
      totals: azureTotals,
      pricingTiers: {
        onDemand: {
          hourlyRate: azureResponse.hourlyRate,
          totals: azureTotals,
          source: azureOnDemandSource,
        },
        reserved1yr: {
          hourlyRate: azureReserved1Rate,
          totals: azureReserved1Totals,
          source: azureReservedSource,
        },
        reserved3yr: {
          hourlyRate: azureReserved3Rate,
          totals: azureReserved3Totals,
          source: azureReservedSource,
        },
      },
      storageRate: diskTier.storageRates.azure,
      snapshotRate: diskTier.snapshotRates.azure,
      egressRate: EGRESS_RATES.azure,
      egress: {
        egressTb,
        egressGb,
      },
      sqlNote:
        mode === "k8s"
          ? null
          : sqlEdition === "none"
          ? "No SQL Server license."
          : "SQL license add-on estimated per vCPU-hour.",
    },
    gcp: {
      ...gcpResponse,
      family: GCP_FLAVOR_LABELS[gcpSize?.flavorKey] || "GCP",
      storage: {
        osDiskGb,
        dataDiskTb,
        dataDiskGb,
        totalGb: storageGb,
      },
      backup: {
        enabled: backupEnabled,
        snapshotGb,
        retentionDays: BACKUP_RETENTION_DAYS,
        dailyDeltaPercent: BACKUP_DAILY_DELTA_PERCENT,
      },
      networkAddons: gcpNetworkAddons,
      dr: {
        percent: drPercent,
      },
      totals: gcpTotals,
      pricingTiers: {
        onDemand: {
          hourlyRate: gcpResponse.hourlyRate,
          totals: gcpTotals,
          source: "public-snapshot",
        },
        reserved1yr: {
          hourlyRate: null,
          totals: gcpReserved1Totals,
          source: "n/a",
        },
        reserved3yr: {
          hourlyRate: null,
          totals: gcpReserved3Totals,
          source: "n/a",
        },
      },
      storageRate: diskTier.storageRates.gcp,
      snapshotRate: diskTier.snapshotRates.gcp,
      egressRate: EGRESS_RATES.gcp,
      egress: {
        egressTb,
        egressGb,
      },
      sqlNote:
        mode === "k8s"
          ? null
          : sqlEdition === "none"
          ? "No SQL Server license."
          : "SQL license add-on estimated per vCPU-hour.",
    },
    private: {
      status: privateEnabled ? "manual" : "off",
      message: privateEnabled
        ? ["Manual private cloud inputs.", privateCapacityNote]
            .filter(Boolean)
            .join(" ")
        : "Enable private cloud to include manual pricing.",
      enabled: privateEnabled,
      instance: privateInstance,
      hourlyRate: privateHourlyRate,
      vmPerNode: privateVmPerNode,
      windowsLicenseMonthly: privateWindowsLicenseMonthly,
      nodeCount: privateNodeCount,
      source: "manual",
      family: "Private cloud",
      storage: {
        osDiskGb,
        dataDiskTb,
        dataDiskGb,
        totalGb: storageGb,
      },
      backup: {
        enabled: backupEnabled,
        snapshotGb,
        retentionDays: BACKUP_RETENTION_DAYS,
        dailyDeltaPercent: BACKUP_DAILY_DELTA_PERCENT,
      },
      networkAddons: privateNetworkAddons,
      dr: {
        percent: drPercent,
      },
      totals: privateTotals,
      pricingTiers: {
        onDemand: {
          hourlyRate: privateHourlyRate,
          totals: privateTotals,
          source: "manual",
        },
        reserved1yr: {
          hourlyRate: null,
          totals: privateReserved1Totals,
          source: "n/a",
        },
        reserved3yr: {
          hourlyRate: null,
          totals: privateReserved3Totals,
          source: "n/a",
        },
      },
      storageRate: privateStorageRate,
      snapshotRate: privateStorageRate,
      egressRate: 0,
      egress: {
        egressTb,
        egressGb,
      },
      sqlNote:
        mode === "k8s"
          ? null
          : sqlEdition === "none"
          ? "No SQL Server license."
          : "SQL license add-on estimated per vCPU-hour.",
    },
    notes: {
      constraints: constraintsNote,
      sizeCap: sizeNotes.length ? sizeNotes.join(" ") : null,
      sharedStorageSources: mode === "k8s" ? sharedStorageSources : null,
    },
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Cloud price app running at http://localhost:${PORT}`);
    if (PRICING_WARMUP_ENABLED) {
      warmPricingCaches().catch((error) => {
        console.error("[pricing] Cache warm-up failed.", error);
      });
    } else {
      console.log("[pricing] Cache warm-up disabled.");
    }
  });
}

module.exports = app;
