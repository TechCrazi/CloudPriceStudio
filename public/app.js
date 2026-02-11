const form = document.getElementById("pricing-form");
const formNote = document.getElementById("form-note");
const delta = document.getElementById("delta");
const exportButton = document.getElementById("export-csv");
const modeInput = document.getElementById("mode-input");
const pricingFocusInput = document.getElementById("pricing-focus");
const modeTabs = document.querySelectorAll(".mode-tab");
const formTitle = document.getElementById("form-title");
const formSubtitle = document.getElementById("form-subtitle");
const resultsTitle = document.getElementById("results-title");
const resultsSubtitle = document.getElementById("results-subtitle");
const cpuLabel = document.getElementById("cpu-label");
const vmCountLabel = document.getElementById("vm-count-label");
const egressLabel = document.getElementById("egress-label");
const osDiskLabel = document.getElementById("os-disk-label");
const dataDiskLabel = document.getElementById("data-disk-label");
const workloadField = document.getElementById("workload-field");
const sqlEditionField = document.getElementById("sql-edition-field");
const sqlRateField = document.getElementById("sql-rate-field");
const awsTitle = document.getElementById("aws-title");
const azureTitle = document.getElementById("azure-title");
const gcpTitle = document.getElementById("gcp-title");
const cpuSelect = form.querySelector("[name='cpu']");
const workloadSelect = form.querySelector("[name='workload']");
const awsInstanceSelect = document.getElementById("aws-instance");
const azureInstanceSelect = document.getElementById("azure-instance");
const gcpInstanceSelect = document.getElementById("gcp-instance");
const awsVpcSelect = document.getElementById("aws-vpc-flavor");
const awsFirewallSelect = document.getElementById("aws-firewall-flavor");
const awsLbSelect = document.getElementById("aws-lb-flavor");
const azureVpcSelect = document.getElementById("azure-vnet-flavor");
const azureFirewallSelect = document.getElementById("azure-firewall-flavor");
const azureLbSelect = document.getElementById("azure-lb-flavor");
const gcpVpcSelect = document.getElementById("gcp-vpc-flavor");
const gcpFirewallSelect = document.getElementById("gcp-firewall-flavor");
const gcpLbSelect = document.getElementById("gcp-lb-flavor");
const diskTierSelect = form.querySelector("[name='diskTier']");
const sqlEditionSelect = form.querySelector("[name='sqlEdition']");
const sqlRateInput = form.querySelector("[name='sqlLicenseRate']");
const osDiskInput = form.querySelector("[name='osDiskGb']");
const vmCountInput = form.querySelector("[name='vmCount']");
const regionSelect = form.querySelector("[name='regionKey']");
const pricingProviderSelect = form.querySelector("[name='pricingProvider']");
const hoursInput = form.querySelector("[name='hours']");
const egressInput = form.querySelector("[name='egressTb']");
const interVlanInput = form.querySelector("[name='interVlanTb']");
const intraVlanInput = form.querySelector("[name='intraVlanTb']");
const interRegionInput = form.querySelector("[name='interRegionTb']");
const storageIopsInput = form.querySelector("[name='storageIops']");
const storageThroughputInput = form.querySelector(
  "[name='storageThroughputMbps']"
);
const storageRequestInput = form.querySelector(
  "[name='storageRequestUnitsMillion']"
);
const storageOperationInput = form.querySelector(
  "[name='storageOperationUnitsMillion']"
);
const dataDiskInput = form.querySelector("[name='dataDiskTb']");
const backupEnabledInput = form.querySelector("[name='backupEnabled']");
const drPercentInput = form.querySelector("[name='drPercent']");
const awsObjectStorageInput = form.querySelector(
  "[name='awsObjectStorageRate']"
);
const azureObjectStorageInput = form.querySelector(
  "[name='azureObjectStorageRate']"
);
const gcpObjectStorageInput = form.querySelector(
  "[name='gcpObjectStorageRate']"
);
const storageRateSection = document.getElementById("storage-rate-section");
const storageRateFields = document.getElementById("storage-rate-fields");
const hoursField = hoursInput?.closest("label");
const cpuField = cpuSelect?.closest("label");
const vmCountField = vmCountInput?.closest("label");
const diskTierField = diskTierSelect?.closest("label");
const osDiskField = osDiskInput?.closest("label");
const dataDiskField = dataDiskInput?.closest("label");
const backupField = backupEnabledInput?.closest("label");
const egressField = egressInput?.closest("label");
const interVlanField = interVlanInput?.closest("label");
const intraVlanField = intraVlanInput?.closest("label");
const interRegionField = interRegionInput?.closest("label");
const storageIopsField = storageIopsInput?.closest("label");
const storageThroughputField = storageThroughputInput?.closest("label");
const storageRequestField = storageRequestInput?.closest("label");
const storageOperationField = storageOperationInput?.closest("label");
const drField = drPercentInput?.closest("label");
const networkSection = document.getElementById("network-section");
const networkFields = document.getElementById("network-fields");
const networkAddonFocusInput = document.getElementById("network-addon-focus");
const networkAddonTabs = document.getElementById("network-addon-tabs");
const networkAddonTabButtons = document.querySelectorAll(".network-addon-tab");
const networkAddonGroups = document.querySelectorAll(".network-addon-group");
const scenarioNameInput = document.getElementById("scenario-name");
const scenarioList = document.getElementById("scenario-list");
const scenarioNote = document.getElementById("scenario-note");
const scenarioDelta = document.getElementById("scenario-delta");
const scenarioComponentDelta = document.getElementById(
  "scenario-component-delta"
);
const saveScenarioButton = document.getElementById("save-scenario");
const loadScenarioButton = document.getElementById("load-scenario");
const cloneScenarioButton = document.getElementById("clone-scenario");
const compareScenarioButton = document.getElementById("compare-scenario");
const deleteScenarioButton = document.getElementById("delete-scenario");
const importScenarioButton = document.getElementById("import-scenario");
const importScenarioInput = document.getElementById("import-scenario-file");
const importScenarioCsvButton = document.getElementById(
  "import-scenario-csv"
);
const importScenarioCsvInput = document.getElementById(
  "import-scenario-csv-file"
);
const awsInstanceFilter = document.getElementById("aws-instance-filter");
const azureInstanceFilter = document.getElementById("azure-instance-filter");
const gcpInstanceFilter = document.getElementById("gcp-instance-filter");
const awsCard = document.getElementById("aws-card");
const azureCard = document.getElementById("azure-card");
const gcpCard = document.getElementById("gcp-card");
const compareGrid = document.getElementById("compare-grid");
const vendorGrid = document.getElementById("vendor-grid");
const networkFocusPanel = document.getElementById("network-focus-panel");
const storageFocusPanel = document.getElementById("storage-focus-panel");
const networkFocusTable = document.getElementById("network-focus-table");
const storageFocusTable = document.getElementById("storage-focus-table");
const networkProviderCards = document.getElementById("network-provider-cards");
const storageProviderCards = document.getElementById("storage-provider-cards");
const networkInsightPanel = document.getElementById("network-focus-insight");
const networkInsightChart = document.getElementById("network-insight-chart");
const networkInsightNote = document.getElementById("network-insight-note");
const storageInsightPanel = document.getElementById("storage-focus-insight");
const storageInsightChart = document.getElementById("storage-insight-chart");
const storageInsightNote = document.getElementById("storage-insight-note");
const networkResultTabs = document.querySelectorAll("[data-network-result]");
const storageResultTabs = document.querySelectorAll("[data-storage-result]");
const disclaimer = document.querySelector(".disclaimer");
const defaultDisclaimerText = disclaimer
  ? disclaimer.textContent.replace(/\s+/g, " ").trim()
  : "";
const vendorCardTemplate = document.getElementById("vendor-card-template");
const privateOptionTemplate = document.getElementById("private-option-template");
const privateCompareTemplate = document.getElementById(
  "private-compare-template"
);
const privateCompareContainer = document.getElementById("private-compare-cards");
const viewTabs = document.getElementById("vm-view-tabs");
const viewTabButtons = document.querySelectorAll(".view-tab");
const privateViewTab = viewTabs?.querySelector("[data-view='private']");
const cloudPanel = document.getElementById("cloud-panel");
const privatePanel = document.getElementById("private-panel");
const scenariosPanel = document.getElementById("scenarios-panel");
const layout = document.querySelector(".layout");
const formCard = document.querySelector(".form-card");
const privateSaveNote = document.getElementById("private-save-note");
const privateProvidersList = document.getElementById(
  "private-providers-list"
);
const privateProviderTemplate = document.getElementById(
  "private-provider-template"
);
const addPrivateProviderButton = document.getElementById(
  "add-private-provider"
);
const exportPrivateProvidersButton = document.getElementById(
  "export-private-providers"
);
const importPrivateProvidersButton = document.getElementById(
  "import-private-providers"
);
const importPrivateProvidersInput = document.getElementById(
  "import-private-providers-file"
);
const resultsTabs = document.getElementById("results-tabs");
const resultsTabButtons = document.querySelectorAll(".results-tab");
const pricingPanel = document.getElementById("pricing-panel");
const savedComparePanel = document.getElementById("saved-compare-panel");
const billingPanel = document.getElementById("billing-panel");
const billingProviderTabs = document.querySelectorAll("[data-billing-provider]");
const billingImportButton = document.getElementById("billing-import-csv");
const billingImportInput = document.getElementById("billing-import-file");
const billingClearButton = document.getElementById("billing-clear");
const billingClearAllButton = document.getElementById("billing-clear-all");
const billingNote = document.getElementById("billing-note");
const billingFormatHint = document.getElementById("billing-format-hint");
const billingSummary = document.getElementById("billing-summary");
const billingChart = document.getElementById("billing-chart");
const billingTable = document.getElementById("billing-table");
const savedCompareTable = document.getElementById("saved-compare-table");
const savedCompareNote = document.getElementById("saved-compare-note");
const savedCompareRefresh = document.getElementById("saved-compare-refresh");
const savedCompareScenarioList = document.getElementById(
  "saved-compare-scenarios"
);
const savedComparePrivateList = document.getElementById(
  "saved-compare-private"
);
const savedComparePrivateRun = document.getElementById(
  "saved-compare-private-run"
);
const savedComparePrivateTable = document.getElementById(
  "saved-compare-private-table"
);
const savedComparePrivateNote = document.getElementById(
  "saved-compare-private-note"
);
const insightPanel = document.getElementById("insight-panel");
const insightChart = document.getElementById("insight-chart");
const insightNote = document.getElementById("insight-note");
const qualityPanel = document.getElementById("quality-panel");
const qualityMeta = document.getElementById("quality-meta");
const qualityList = document.getElementById("quality-list");
const unitEconPanel = document.getElementById("unit-econ-panel");
const unitEconTable = document.getElementById("unit-econ-table");
const unitEconNote = document.getElementById("unit-econ-note");
const recommendPanel = document.getElementById("recommend-panel");
const recommendList = document.getElementById("recommend-list");
const recommendNote = document.getElementById("recommend-note");
const recommendProviderFilter = document.getElementById(
  "recommend-provider-filter"
);
const recommendLimitInput = document.getElementById("recommend-limit");
const runRecommendationsButton = document.getElementById(
  "run-recommendations"
);
const commitPanel = document.getElementById("commit-panel");
const commitNote = document.getElementById("commit-note");
const commitDiscountInputs = {
  aws: document.querySelector("[data-commit-discount='aws']"),
  azure: document.querySelector("[data-commit-discount='azure']"),
  gcp: document.querySelector("[data-commit-discount='gcp']"),
};
const commitTypeInputs = {
  aws: document.querySelector("[data-commit-type='aws']"),
  azure: document.querySelector("[data-commit-type='azure']"),
  gcp: document.querySelector("[data-commit-type='gcp']"),
};
const commitFields = {
  aws: {
    base: {
      compute: document.querySelector("[data-commit='aws-base-compute']"),
      control: document.querySelector("[data-commit='aws-base-control']"),
      storage: document.querySelector("[data-commit='aws-base-storage']"),
      backup: document.querySelector("[data-commit='aws-base-backup']"),
      egress: document.querySelector("[data-commit='aws-base-egress']"),
      network: document.querySelector("[data-commit='aws-base-network']"),
      sql: document.querySelector("[data-commit='aws-base-sql']"),
      windows: document.querySelector("[data-commit='aws-base-windows']"),
      dr: document.querySelector("[data-commit='aws-base-dr']"),
      total: document.querySelector("[data-commit='aws-base-total']"),
    },
    commit: {
      compute: document.querySelector("[data-commit='aws-commit-compute']"),
      control: document.querySelector("[data-commit='aws-commit-control']"),
      storage: document.querySelector("[data-commit='aws-commit-storage']"),
      backup: document.querySelector("[data-commit='aws-commit-backup']"),
      egress: document.querySelector("[data-commit='aws-commit-egress']"),
      network: document.querySelector("[data-commit='aws-commit-network']"),
      sql: document.querySelector("[data-commit='aws-commit-sql']"),
      windows: document.querySelector("[data-commit='aws-commit-windows']"),
      dr: document.querySelector("[data-commit='aws-commit-dr']"),
      savings: document.querySelector("[data-commit='aws-commit-savings']"),
      total: document.querySelector("[data-commit='aws-commit-total']"),
    },
    note: document.querySelector("[data-commit='aws-note']"),
  },
  azure: {
    base: {
      compute: document.querySelector("[data-commit='azure-base-compute']"),
      control: document.querySelector("[data-commit='azure-base-control']"),
      storage: document.querySelector("[data-commit='azure-base-storage']"),
      backup: document.querySelector("[data-commit='azure-base-backup']"),
      egress: document.querySelector("[data-commit='azure-base-egress']"),
      network: document.querySelector("[data-commit='azure-base-network']"),
      sql: document.querySelector("[data-commit='azure-base-sql']"),
      windows: document.querySelector("[data-commit='azure-base-windows']"),
      dr: document.querySelector("[data-commit='azure-base-dr']"),
      total: document.querySelector("[data-commit='azure-base-total']"),
    },
    commit: {
      compute: document.querySelector("[data-commit='azure-commit-compute']"),
      control: document.querySelector("[data-commit='azure-commit-control']"),
      storage: document.querySelector("[data-commit='azure-commit-storage']"),
      backup: document.querySelector("[data-commit='azure-commit-backup']"),
      egress: document.querySelector("[data-commit='azure-commit-egress']"),
      network: document.querySelector("[data-commit='azure-commit-network']"),
      sql: document.querySelector("[data-commit='azure-commit-sql']"),
      windows: document.querySelector("[data-commit='azure-commit-windows']"),
      dr: document.querySelector("[data-commit='azure-commit-dr']"),
      savings: document.querySelector("[data-commit='azure-commit-savings']"),
      total: document.querySelector("[data-commit='azure-commit-total']"),
    },
    note: document.querySelector("[data-commit='azure-note']"),
  },
  gcp: {
    base: {
      compute: document.querySelector("[data-commit='gcp-base-compute']"),
      control: document.querySelector("[data-commit='gcp-base-control']"),
      storage: document.querySelector("[data-commit='gcp-base-storage']"),
      backup: document.querySelector("[data-commit='gcp-base-backup']"),
      egress: document.querySelector("[data-commit='gcp-base-egress']"),
      network: document.querySelector("[data-commit='gcp-base-network']"),
      sql: document.querySelector("[data-commit='gcp-base-sql']"),
      windows: document.querySelector("[data-commit='gcp-base-windows']"),
      dr: document.querySelector("[data-commit='gcp-base-dr']"),
      total: document.querySelector("[data-commit='gcp-base-total']"),
    },
    commit: {
      compute: document.querySelector("[data-commit='gcp-commit-compute']"),
      control: document.querySelector("[data-commit='gcp-commit-control']"),
      storage: document.querySelector("[data-commit='gcp-commit-storage']"),
      backup: document.querySelector("[data-commit='gcp-commit-backup']"),
      egress: document.querySelector("[data-commit='gcp-commit-egress']"),
      network: document.querySelector("[data-commit='gcp-commit-network']"),
      sql: document.querySelector("[data-commit='gcp-commit-sql']"),
      windows: document.querySelector("[data-commit='gcp-commit-windows']"),
      dr: document.querySelector("[data-commit='gcp-commit-dr']"),
      savings: document.querySelector("[data-commit='gcp-commit-savings']"),
      total: document.querySelector("[data-commit='gcp-commit-total']"),
    },
    note: document.querySelector("[data-commit='gcp-note']"),
  },
};
const commitInsightFields = {
  aws: {
    base: document.querySelector("[data-commit-insight-base='aws']"),
    commit: document.querySelector("[data-commit-insight-commit='aws']"),
    save: document.querySelector("[data-commit-insight-save='aws']"),
    baseBar: document.querySelector("[data-commit-insight-bar='aws-base']"),
    commitBar: document.querySelector("[data-commit-insight-bar='aws-commit']"),
  },
  azure: {
    base: document.querySelector("[data-commit-insight-base='azure']"),
    commit: document.querySelector("[data-commit-insight-commit='azure']"),
    save: document.querySelector("[data-commit-insight-save='azure']"),
    baseBar: document.querySelector("[data-commit-insight-bar='azure-base']"),
    commitBar: document.querySelector("[data-commit-insight-bar='azure-commit']"),
  },
  gcp: {
    base: document.querySelector("[data-commit-insight-base='gcp']"),
    commit: document.querySelector("[data-commit-insight-commit='gcp']"),
    save: document.querySelector("[data-commit-insight-save='gcp']"),
    baseBar: document.querySelector("[data-commit-insight-bar='gcp-base']"),
    commitBar: document.querySelector("[data-commit-insight-bar='gcp-commit']"),
  },
};
const vendorSubtabs = document.getElementById("vendor-subtabs");
const vendorSubtabButtons = document.querySelectorAll(".vendor-subtab");
const vendorRegionPanel = document.getElementById("vendor-region-panel");
const vendorRegionPicker = document.getElementById("vendor-region-picker");
const vendorRegionTable = document.getElementById("region-compare-table");
const vendorRegionNote = document.getElementById("region-compare-note");
const runRegionCompareButton = document.getElementById("run-region-compare");

const SQL_DEFAULTS = {
  none: 0,
  standard: 0.35,
  enterprise: 0.5,
};
const DEFAULT_RATE_EPSILON = 0.0001;
const DISK_TIER_LABELS = {
  premium: "Premium SSD",
  max: "Max performance",
};
const SCENARIO_STORAGE_KEY = "cloud-price-scenarios";
const SAVED_COMPARE_SCENARIOS_KEY = "cloud-price-saved-compare-scenarios";
const SAVED_COMPARE_PRIVATE_KEY = "cloud-price-saved-compare-private";
const PRIVATE_STORAGE_KEY = "cloud-price-private";
const PRIVATE_PROVIDERS_KEY = "cloud-price-private-providers";
const PRIVATE_COMPARE_KEY = "cloud-price-private-compare";
const PRIVATE_COMPARE_SLOTS = 2;
const VMWARE_VCPU_PER_SOCKET = 3;
const MAX_VENDOR_OPTIONS = 4;
const BILLING_IMPORT_KEY = "cloud-price-billing-import";
const SCENARIO_SCHEMA_VERSION = 2;
const QUALITY_WARNING_LIMIT = 8;
const COMMITMENT_TYPE_DEFAULTS = {
  aws: "aws-savings-plan",
  azure: "azure-reservation",
  gcp: "gcp-cud-1y",
};
const COMMITMENT_TYPE_PROFILES = {
  "aws-savings-plan": {
    label: "AWS Savings Plan",
    recommendedDiscount: 25,
  },
  "aws-reserved-instance": {
    label: "AWS Reserved Instance",
    recommendedDiscount: 30,
  },
  "azure-reservation": {
    label: "Azure Reservation",
    recommendedDiscount: 28,
  },
  "azure-savings-plan": {
    label: "Azure Savings Plan",
    recommendedDiscount: 22,
  },
  "gcp-cud-1y": {
    label: "GCP CUD 1-year",
    recommendedDiscount: 20,
  },
  "gcp-cud-3y": {
    label: "GCP CUD 3-year",
    recommendedDiscount: 40,
  },
};
let sqlRateTouched = false;
let sizeOptions = null;
let lastPricing = null;
let currentMode = "vm";
let activePanel = "vm";
let currentView = "compare";
let currentResultsTab = "pricing";
let currentVendorView = "options";
let currentNetworkResult = "vpc";
let currentStorageResult = "object";
let currentBillingProvider = "aws";
let savedCompareRows = [];
let savedComparePrivateRows = [];
let savedCompareScenarioSelections = null;
let savedComparePrivateSelections = null;
let privateProviderStore = { activeId: null, providers: [] };
let privateCompareSelections = [];
let privateProviderCards = new Map();
const vendorOptionState = {
  aws: [],
  azure: [],
  gcp: [],
  private: [],
};
let scenarioStore = [];
let billingImportStore = { aws: null, azure: null, gcp: null, rackspace: null };
const billingExpandedServices = {
  aws: new Set(),
  azure: new Set(),
  gcp: new Set(),
  rackspace: new Set(),
};
const instancePools = {
  aws: [],
  azure: [],
  gcp: [],
};
const PRIVATE_FLAVORS = [
  { key: "8-16", vcpu: 8, ram: 16 },
  { key: "12-24", vcpu: 12, ram: 24 },
  { key: "16-32", vcpu: 16, ram: 32 },
  { key: "24-48", vcpu: 24, ram: 48 },
  { key: "48-64", vcpu: 48, ram: 64 },
  { key: "64-128", vcpu: 64, ram: 128 },
  { key: "128-512", vcpu: 128, ram: 512 },
];
const DEFAULT_PRIVATE_CONFIG = {
  enabled: false,
  vmwareMonthly: 0,
  windowsLicenseMonthly: 0,
  nodeCount: 2,
  storagePerTb: 0,
  networkMonthly: 0,
  firewallMonthly: 0,
  loadBalancerMonthly: 0,
  nodeCpu: 1,
  nodeRam: 128,
  nodeStorageTb: 2,
  vmOsDiskGb: 256,
  sanUsableTb: 0,
  sanTotalMonthly: 0,
};
const SCENARIO_CSV_FIELDS = [
  { key: "name", label: "Scenario", type: "string" },
  { key: "mode", label: "Mode", type: "string" },
  { key: "pricingFocus", label: "Pricing_Focus", type: "string" },
  { key: "networkAddonFocus", label: "Network_Addon_Focus", type: "string" },
  { key: "interVlanTb", label: "Inter_VLAN_TB", type: "number" },
  { key: "intraVlanTb", label: "Intra_VLAN_TB", type: "number" },
  { key: "interRegionTb", label: "Inter_Region_TB", type: "number" },
  { key: "storageIops", label: "Storage_IOPS", type: "number" },
  { key: "storageThroughputMbps", label: "Storage_Throughput_MBps", type: "number" },
  {
    key: "storageRequestUnitsMillion",
    label: "Storage_Request_Units_Million",
    type: "number",
  },
  {
    key: "storageOperationUnitsMillion",
    label: "Storage_Operation_Units_Million",
    type: "number",
  },
  { key: "workload", label: "Workload", type: "string" },
  { key: "regionKey", label: "Region_Key", type: "string" },
  { key: "pricingProvider", label: "Pricing_Provider", type: "string" },
  { key: "cpu", label: "vCPU", type: "number" },
  { key: "vmCount", label: "VM_Count", type: "number" },
  { key: "awsInstanceType", label: "AWS_Instance", type: "string" },
  { key: "azureInstanceType", label: "Azure_Instance", type: "string" },
  { key: "gcpInstanceType", label: "GCP_Instance", type: "string" },
  { key: "diskTier", label: "Disk_Tier", type: "string" },
  { key: "osDiskGb", label: "OS_Disk_GB", type: "number" },
  { key: "dataDiskTb", label: "Data_Disk_TB", type: "number" },
  { key: "egressTb", label: "Egress_TB", type: "number" },
  { key: "hours", label: "Hours", type: "number" },
  { key: "backupEnabled", label: "Backups_Enabled", type: "boolean" },
  { key: "drPercent", label: "DR_Percent", type: "number" },
  { key: "sqlEdition", label: "SQL_Edition", type: "string" },
  { key: "sqlLicenseRate", label: "SQL_License_Rate", type: "number" },
  { key: "awsVpcFlavor", label: "AWS_VPC", type: "string" },
  { key: "awsFirewallFlavor", label: "AWS_Firewall", type: "string" },
  { key: "awsLoadBalancerFlavor", label: "AWS_Load_Balancer", type: "string" },
  { key: "azureVpcFlavor", label: "Azure_VNet", type: "string" },
  { key: "azureFirewallFlavor", label: "Azure_Firewall", type: "string" },
  { key: "azureLoadBalancerFlavor", label: "Azure_Load_Balancer", type: "string" },
  { key: "gcpVpcFlavor", label: "GCP_VPC", type: "string" },
  { key: "gcpFirewallFlavor", label: "GCP_Firewall", type: "string" },
  { key: "gcpLoadBalancerFlavor", label: "GCP_Load_Balancer", type: "string" },
  {
    key: "awsNetworkVpcFlavor",
    label: "AWS_Network_VPC_Flavor",
    type: "string",
  },
  { key: "awsNetworkVpcCount", label: "AWS_Network_VPC_Count", type: "number" },
  { key: "awsNetworkVpcDataTb", label: "AWS_Network_VPC_Data_TB", type: "number" },
  {
    key: "awsNetworkGatewayFlavor",
    label: "AWS_Network_Gateway_Flavor",
    type: "string",
  },
  {
    key: "awsNetworkGatewayCount",
    label: "AWS_Network_Gateway_Count",
    type: "number",
  },
  {
    key: "awsNetworkGatewayDataTb",
    label: "AWS_Network_Gateway_Data_TB",
    type: "number",
  },
  {
    key: "awsNetworkLoadBalancerFlavor",
    label: "AWS_Network_LB_Flavor",
    type: "string",
  },
  {
    key: "awsNetworkLoadBalancerCount",
    label: "AWS_Network_LB_Count",
    type: "number",
  },
  {
    key: "awsNetworkLoadBalancerDataTb",
    label: "AWS_Network_LB_Data_TB",
    type: "number",
  },
  {
    key: "azureNetworkVpcFlavor",
    label: "Azure_Network_VPC_Flavor",
    type: "string",
  },
  {
    key: "azureNetworkVpcCount",
    label: "Azure_Network_VPC_Count",
    type: "number",
  },
  {
    key: "azureNetworkVpcDataTb",
    label: "Azure_Network_VPC_Data_TB",
    type: "number",
  },
  {
    key: "azureNetworkGatewayFlavor",
    label: "Azure_Network_Gateway_Flavor",
    type: "string",
  },
  {
    key: "azureNetworkGatewayCount",
    label: "Azure_Network_Gateway_Count",
    type: "number",
  },
  {
    key: "azureNetworkGatewayDataTb",
    label: "Azure_Network_Gateway_Data_TB",
    type: "number",
  },
  {
    key: "azureNetworkLoadBalancerFlavor",
    label: "Azure_Network_LB_Flavor",
    type: "string",
  },
  {
    key: "azureNetworkLoadBalancerCount",
    label: "Azure_Network_LB_Count",
    type: "number",
  },
  {
    key: "azureNetworkLoadBalancerDataTb",
    label: "Azure_Network_LB_Data_TB",
    type: "number",
  },
  {
    key: "gcpNetworkVpcFlavor",
    label: "GCP_Network_VPC_Flavor",
    type: "string",
  },
  {
    key: "gcpNetworkVpcCount",
    label: "GCP_Network_VPC_Count",
    type: "number",
  },
  {
    key: "gcpNetworkVpcDataTb",
    label: "GCP_Network_VPC_Data_TB",
    type: "number",
  },
  {
    key: "gcpNetworkGatewayFlavor",
    label: "GCP_Network_Gateway_Flavor",
    type: "string",
  },
  {
    key: "gcpNetworkGatewayCount",
    label: "GCP_Network_Gateway_Count",
    type: "number",
  },
  {
    key: "gcpNetworkGatewayDataTb",
    label: "GCP_Network_Gateway_Data_TB",
    type: "number",
  },
  {
    key: "gcpNetworkLoadBalancerFlavor",
    label: "GCP_Network_LB_Flavor",
    type: "string",
  },
  {
    key: "gcpNetworkLoadBalancerCount",
    label: "GCP_Network_LB_Count",
    type: "number",
  },
  {
    key: "gcpNetworkLoadBalancerDataTb",
    label: "GCP_Network_LB_Data_TB",
    type: "number",
  },
  { key: "awsObjectStorageRate", label: "AWS_Object_Storage_TB", type: "number" },
  { key: "azureObjectStorageRate", label: "Azure_Object_Storage_TB", type: "number" },
  { key: "gcpObjectStorageRate", label: "GCP_Object_Storage_TB", type: "number" },
  {
    key: "awsStorageAccountCount",
    label: "AWS_Storage_Account_Count",
    type: "number",
  },
  { key: "awsStorageDrEnabled", label: "AWS_Storage_DR", type: "boolean" },
  { key: "awsStorageDrDeltaTb", label: "AWS_Storage_DR_Delta_TB", type: "number" },
  { key: "awsStorageObjectTb", label: "AWS_Storage_Object_TB", type: "number" },
  { key: "awsStorageFileTb", label: "AWS_Storage_File_TB", type: "number" },
  { key: "awsStorageTableTb", label: "AWS_Storage_Table_TB", type: "number" },
  { key: "awsStorageQueueTb", label: "AWS_Storage_Queue_TB", type: "number" },
  {
    key: "azureStorageAccountCount",
    label: "Azure_Storage_Account_Count",
    type: "number",
  },
  { key: "azureStorageDrEnabled", label: "Azure_Storage_DR", type: "boolean" },
  { key: "azureStorageDrDeltaTb", label: "Azure_Storage_DR_Delta_TB", type: "number" },
  { key: "azureStorageObjectTb", label: "Azure_Storage_Object_TB", type: "number" },
  { key: "azureStorageFileTb", label: "Azure_Storage_File_TB", type: "number" },
  { key: "azureStorageTableTb", label: "Azure_Storage_Table_TB", type: "number" },
  { key: "azureStorageQueueTb", label: "Azure_Storage_Queue_TB", type: "number" },
  {
    key: "gcpStorageAccountCount",
    label: "GCP_Storage_Account_Count",
    type: "number",
  },
  { key: "gcpStorageDrEnabled", label: "GCP_Storage_DR", type: "boolean" },
  { key: "gcpStorageDrDeltaTb", label: "GCP_Storage_DR_Delta_TB", type: "number" },
  { key: "gcpStorageObjectTb", label: "GCP_Storage_Object_TB", type: "number" },
  { key: "gcpStorageFileTb", label: "GCP_Storage_File_TB", type: "number" },
  { key: "gcpStorageTableTb", label: "GCP_Storage_Table_TB", type: "number" },
  { key: "gcpStorageQueueTb", label: "GCP_Storage_Queue_TB", type: "number" },
  { key: "privateEnabled", label: "Private_Enabled", type: "boolean" },
  { key: "privateVmwareMonthly", label: "Private_VMware_Monthly", type: "number" },
  { key: "privateWindowsLicenseMonthly", label: "Private_Windows_License", type: "number" },
  { key: "privateNodeCount", label: "Private_Node_Count", type: "number" },
  { key: "privateStoragePerTb", label: "Private_SAN_per_TB", type: "number" },
  { key: "privateNetworkMonthly", label: "Private_Network_Monthly", type: "number" },
  { key: "privateFirewallMonthly", label: "Private_Firewall_Monthly", type: "number" },
  { key: "privateLoadBalancerMonthly", label: "Private_Load_Balancer", type: "number" },
  { key: "privateNodeCpu", label: "Private_Node_CPU", type: "number" },
  { key: "privateNodeRam", label: "Private_Node_RAM", type: "number" },
  { key: "privateNodeStorageTb", label: "Private_Node_Storage_TB", type: "number" },
  { key: "privateVmOsDiskGb", label: "Private_VM_OS_GB", type: "number" },
  { key: "privateSanUsableTb", label: "Private_SAN_Usable_TB", type: "number" },
  { key: "privateSanTotalMonthly", label: "Private_SAN_Total_Monthly", type: "number" },
];
const PRIVATE_PROVIDER_CSV_FIELDS = [
  { key: "name", label: "Provider", type: "string" },
  { key: "enabled", label: "Enabled", type: "boolean" },
  { key: "vmwareMonthly", label: "VMware_Monthly", type: "number" },
  { key: "windowsLicenseMonthly", label: "Windows_License_Monthly", type: "number" },
  { key: "nodeCount", label: "Node_Count", type: "number" },
  { key: "nodeCpu", label: "Node_CPU", type: "number" },
  { key: "nodeRam", label: "Node_RAM", type: "number" },
  { key: "nodeStorageTb", label: "Node_Storage_TB", type: "number" },
  { key: "vmOsDiskGb", label: "VM_OS_GB", type: "number" },
  { key: "sanUsableTb", label: "SAN_Usable_TB", type: "number" },
  { key: "sanTotalMonthly", label: "SAN_Total_Monthly", type: "number" },
  { key: "storagePerTb", label: "SAN_per_TB", type: "number" },
  { key: "networkMonthly", label: "Network_Monthly", type: "number" },
  { key: "firewallMonthly", label: "Firewall_Monthly", type: "number" },
  { key: "loadBalancerMonthly", label: "Load_Balancer_Monthly", type: "number" },
];
let sqlState = {
  edition: sqlEditionSelect.value,
  rate: sqlRateInput.value,
};
const K8S_OS_DISK_MIN_GB = 32;
const K8S_MIN_NODE_COUNT = 3;

const MODE_COPY = {
  vm: {
    formTitle: "Workload inputs",
    formSubtitle:
      "Windows only, no local or temp disks, disk tier selectable, network >= 10 Gbps.",
    resultsTitle: "Price comparison",
    resultsSubtitle: "Live compute rates + estimated storage, egress, and SQL.",
    cpuLabel: "vCPU count (min 8)",
    countLabel: "VM count",
    egressLabel: "Egress (TB / month per VM)",
    awsTitle: "AWS",
    azureTitle: "Azure",
    gcpTitle: "GCP",
    privateTitle: "Private",
  },
  k8s: {
    formTitle: "Kubernetes inputs",
    formSubtitle:
      "Premium managed Kubernetes tiers (Linux nodes). Disk tier selectable for OS disks.",
    resultsTitle: "Kubernetes price comparison",
    resultsSubtitle:
      "Node compute rates + control plane fees + storage and egress.",
    cpuLabel: "Node vCPU count (min 8)",
    countLabel: "Node count (min 3)",
    egressLabel: "Egress (TB / month per cluster)",
    awsTitle: "EKS",
    azureTitle: "AKS",
    gcpTitle: "GKE",
    privateTitle: "Private",
  },
  network: {
    formTitle: "Network pricing inputs",
    formSubtitle:
      "Public-cloud networking only (VPC/VNet, gateway, load balancer, inter/intra VLAN, inter-region transfer, and egress).",
    resultsTitle: "Network pricing",
    resultsSubtitle:
      "VPC/VNet, VPC/VPN gateway, and load balancer pricing across AWS, Azure, and GCP.",
    cpuLabel: "vCPU count (min 8)",
    countLabel: "VM count",
    egressLabel: "Egress (TB / month)",
    awsTitle: "AWS",
    azureTitle: "Azure",
    gcpTitle: "GCP",
    privateTitle: "Private",
  },
  storage: {
    formTitle: "Storage pricing inputs",
    formSubtitle:
      "Public storage services only (object, file, table, queue, and DR replication delta).",
    resultsTitle: "Storage pricing",
    resultsSubtitle:
      "Shared storage pricing across AWS, Azure, and GCP.",
    cpuLabel: "vCPU count (min 8)",
    countLabel: "VM count",
    egressLabel: "Egress (TB / month)",
    awsTitle: "AWS",
    azureTitle: "Azure",
    gcpTitle: "GCP",
    privateTitle: "Private",
  },
};

const COMMIT_COMPONENTS = [
  { key: "compute", field: "computeMonthly" },
  { key: "control", field: "controlPlaneMonthly" },
  { key: "storage", field: "storageMonthly" },
  { key: "backup", field: "backupMonthly" },
  { key: "egress", field: "egressMonthly" },
  { key: "network", field: "networkMonthly" },
  { key: "sql", field: "sqlMonthly" },
  { key: "windows", field: "windowsLicenseMonthly" },
  { key: "dr", field: "drMonthly" },
];

const RESULTS_TAB_COPY = {
  saved: {
    title: "Saved Compare",
    subtitle: "Run saved scenarios in a multi-provider dashboard.",
  },
  insight: {
    title: "Insight",
    subtitle: "Cost-driver breakdown across compute, storage, egress, and licenses.",
  },
  commit: {
    title: "Cloud Commit",
    subtitle:
      "Apply per-provider discounts to compute only and compare committed totals.",
  },
};

const SCENARIO_BREAKDOWN_COMPONENTS = [
  { label: "Compute", field: "computeMonthly" },
  { label: "Control plane", field: "controlPlaneMonthly" },
  { label: "Storage", field: "storageMonthly" },
  { label: "Backups", field: "backupMonthly" },
  { label: "Network", field: "networkMonthly" },
  { label: "Inter-region", field: "interRegionMonthly" },
  { label: "Egress", field: "egressMonthly" },
  { label: "Licenses", field: "licenseMonthly" },
  { label: "DR", field: "drMonthly" },
];

const NETWORK_HARDCODED_RATES = {
  egress: { aws: 0.09, azure: 0.087, gcp: 0.12 },
  interVlan: { aws: 0.01, azure: 0.01, gcp: 0.01 },
  intraVlan: { aws: 0, azure: 0, gcp: 0 },
  interRegion: { aws: 0.02, azure: 0.02, gcp: 0.02 },
  addonData: {
    aws: { gateway: 0.02, firewall: 0.01, loadBalancer: 0.008 },
    azure: { gateway: 0.018, firewall: 0.016, loadBalancer: 0.008 },
    gcp: { gateway: 0.018, firewall: 0.01, loadBalancer: 0.01 },
  },
};

const STORAGE_HARDCODED_RATES = {
  aws: { object: 0.023, file: 0.3, table: 0.25, queue: 0, replication: 0.02 },
  azure: {
    object: 0.018,
    file: 0.16,
    table: 0.06,
    queue: 0.06,
    replication: 0.02,
  },
  gcp: { object: 0.02, file: 0.3, table: 0.17, queue: 0.08, replication: 0.02 },
};

const fields = {
  aws: {
    status: document.getElementById("aws-status"),
    family: document.getElementById("aws-family"),
    instance: document.getElementById("aws-instance"),
    shape: document.getElementById("aws-shape"),
    region: document.getElementById("aws-region"),
    hourly: document.getElementById("aws-hourly"),
    network: document.getElementById("aws-network"),
    tiers: {
      onDemand: {
        total: document.getElementById("aws-od-total"),
        rate: document.getElementById("aws-od-rate"),
      },
      year1: {
        total: document.getElementById("aws-1y-total"),
        rate: document.getElementById("aws-1y-rate"),
      },
      year3: {
        total: document.getElementById("aws-3y-total"),
        rate: document.getElementById("aws-3y-rate"),
      },
    },
    savings: document.getElementById("aws-savings"),
    breakdown: document.getElementById("aws-breakdown"),
    note: document.getElementById("aws-note"),
  },
  azure: {
    status: document.getElementById("azure-status"),
    family: document.getElementById("azure-family"),
    instance: document.getElementById("azure-instance"),
    shape: document.getElementById("azure-shape"),
    region: document.getElementById("azure-region"),
    hourly: document.getElementById("azure-hourly"),
    network: document.getElementById("azure-network"),
    tiers: {
      onDemand: {
        total: document.getElementById("azure-od-total"),
        rate: document.getElementById("azure-od-rate"),
      },
      year1: {
        total: document.getElementById("azure-1y-total"),
        rate: document.getElementById("azure-1y-rate"),
      },
      year3: {
        total: document.getElementById("azure-3y-total"),
        rate: document.getElementById("azure-3y-rate"),
      },
    },
    savings: document.getElementById("azure-savings"),
    breakdown: document.getElementById("azure-breakdown"),
    note: document.getElementById("azure-note"),
  },
  gcp: {
    status: document.getElementById("gcp-status"),
    family: document.getElementById("gcp-family"),
    instance: document.getElementById("gcp-instance"),
    shape: document.getElementById("gcp-shape"),
    region: document.getElementById("gcp-region"),
    hourly: document.getElementById("gcp-hourly"),
    network: document.getElementById("gcp-network"),
    tiers: {
      onDemand: {
        total: document.getElementById("gcp-od-total"),
        rate: document.getElementById("gcp-od-rate"),
      },
      year1: {
        total: document.getElementById("gcp-1y-total"),
        rate: document.getElementById("gcp-1y-rate"),
      },
      year3: {
        total: document.getElementById("gcp-3y-total"),
        rate: document.getElementById("gcp-3y-rate"),
      },
    },
    savings: document.getElementById("gcp-savings"),
    breakdown: document.getElementById("gcp-breakdown"),
    note: document.getElementById("gcp-note"),
  },
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const rateFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 4,
});

function formatMoney(value) {
  if (!Number.isFinite(value)) {
    return "N/A";
  }
  return currency.format(value);
}

function formatRate(value) {
  if (!Number.isFinite(value)) {
    return "N/A";
  }
  return `${rateFormatter.format(value)}/hr`;
}

function formatMonthly(value) {
  if (!Number.isFinite(value)) {
    return "N/A";
  }
  return `${currency.format(value)}/mo`;
}

function isDefaultSqlRate(rate, edition) {
  const defaultRate = SQL_DEFAULTS[edition] ?? 0;
  if (!Number.isFinite(rate)) {
    return false;
  }
  return Math.abs(rate - defaultRate) <= DEFAULT_RATE_EPSILON;
}

function normalizeNetworkAddonFocus(value) {
  if (value === "firewall") {
    return "gateway";
  }
  if (value === "loadBalancer" || value === "gateway") {
    return value;
  }
  return "vpc";
}

function isApiSource(source) {
  if (typeof source !== "string" || !source) {
    return false;
  }
  return (
    source.includes("api") ||
    source.includes("price-list") ||
    source.includes("cloud-billing") ||
    source.includes("pricing-page")
  );
}

function isFallbackSource(source) {
  return (
    !source ||
    source === "fallback-default" ||
    source === "missing" ||
    source === "static" ||
    source === "unknown"
  );
}

function formatSourceDetail(source) {
  if (typeof source !== "string" || !source) {
    return "unknown";
  }
  if (source === "public-snapshot") {
    return "retail snapshot";
  }
  if (source === "manual") {
    return "manual input";
  }
  if (isApiSource(source)) {
    return "API";
  }
  if (isFallbackSource(source)) {
    return "fallback";
  }
  return source;
}

function summarizeItemSources(items) {
  if (!Array.isArray(items) || !items.length) {
    return "none";
  }
  const api = items.filter((item) => isApiSource(item?.source)).length;
  const fallback = items.filter((item) => isFallbackSource(item?.source)).length;
  if (api === items.length) {
    return "API";
  }
  if (fallback === items.length) {
    return "fallback";
  }
  return "mixed";
}

function formatRateNumber(value, max = 4) {
  if (!Number.isFinite(value)) {
    return "0";
  }
  return value.toFixed(max).replace(/\.?0+$/, "");
}

function getNetworkCardSourceLabel(input, provider) {
  const items = Array.isArray(provider?.networkAddons?.items)
    ? provider.networkAddons.items
    : [];
  const selected = [
    {
      addonKey: "vpc",
      flavor: input?.networkVpcFlavor,
      count: input?.networkVpcCount,
    },
    {
      addonKey: "gateway",
      flavor: input?.networkGatewayFlavor,
      count: input?.networkGatewayCount,
    },
    {
      addonKey: "loadBalancer",
      flavor: input?.networkLoadBalancerFlavor,
      count: input?.networkLoadBalancerCount,
    },
  ].filter(
    (entry) =>
      entry.flavor && entry.flavor !== "none" && Number.isFinite(entry.count) && entry.count > 0
  );
  const selectedUsesFallback = selected.some((entry) => {
    const item = items.find((networkItem) => networkItem.addonKey === entry.addonKey);
    return !isApiSource(item?.source);
  });
  const trafficUsesFallback =
    (input?.egressTb || 0) > 0 ||
    (input?.interVlanTb || 0) > 0 ||
    (input?.intraVlanTb || 0) > 0 ||
    (input?.interRegionTb || 0) > 0;
  return selectedUsesFallback || trafficUsesFallback ? "HARDCODED" : "API";
}

function getStorageCardSourceLabel(input, storageServices) {
  const sources = storageServices?.sources || {};
  const activeChecks = [
    { used: (input?.objectTb || 0) > 0, key: "object" },
    { used: (input?.fileTb || 0) > 0, key: "file" },
    { used: (input?.tableTb || 0) > 0, key: "table" },
    { used: (input?.queueTb || 0) > 0, key: "queue" },
    {
      used: Boolean(input?.drEnabled) && (input?.drDeltaTb || 0) > 0,
      key: "replication",
    },
  ];
  const fallbackUsed = activeChecks.some(
    (entry) => entry.used && isFallbackSource(sources[entry.key])
  );
  return fallbackUsed ? "HARDCODED" : "API";
}

function buildNetworkDisclaimerText() {
  const egress = NETWORK_HARDCODED_RATES.egress;
  const inter = NETWORK_HARDCODED_RATES.interVlan;
  const intra = NETWORK_HARDCODED_RATES.intraVlan;
  const interRegion = NETWORK_HARDCODED_RATES.interRegion;
  const addon = NETWORK_HARDCODED_RATES.addonData;
  return [
    "Source badge: API = live provider API/price list; HARDCODED = static or fallback values were used.",
    "Hardcoded rates ($/GB):",
    `Egress AWS ${formatRateNumber(egress.aws)}, Azure ${formatRateNumber(
      egress.azure
    )}, GCP ${formatRateNumber(egress.gcp)}.`,
    `Inter-VLAN AWS ${formatRateNumber(inter.aws)}, Azure ${formatRateNumber(
      inter.azure
    )}, GCP ${formatRateNumber(inter.gcp)}.`,
    `Intra-VLAN AWS ${formatRateNumber(intra.aws)}, Azure ${formatRateNumber(
      intra.azure
    )}, GCP ${formatRateNumber(intra.gcp)}.`,
    `Inter-region AWS ${formatRateNumber(interRegion.aws)}, Azure ${formatRateNumber(
      interRegion.azure
    )}, GCP ${formatRateNumber(interRegion.gcp)}.`,
    `Add-on data transfer: AWS gateway ${formatRateNumber(
      addon.aws.gateway
    )}, firewall ${formatRateNumber(addon.aws.firewall)}, LB ${formatRateNumber(
      addon.aws.loadBalancer
    )}; Azure gateway ${formatRateNumber(
      addon.azure.gateway
    )}, firewall ${formatRateNumber(addon.azure.firewall)}, LB ${formatRateNumber(
      addon.azure.loadBalancer
    )}; GCP gateway ${formatRateNumber(
      addon.gcp.gateway
    )}, firewall ${formatRateNumber(addon.gcp.firewall)}, LB ${formatRateNumber(
      addon.gcp.loadBalancer
    )}.`,
  ].join(" ");
}

function buildStorageDisclaimerText(data) {
  const fallbackUsedByProvider = [];
  const providerMap = [
    { key: "aws", label: "AWS" },
    { key: "azure", label: "Azure" },
    { key: "gcp", label: "GCP" },
  ];
  providerMap.forEach(({ key, label }) => {
    const services = data?.[key]?.storageServices || {};
    const sources = services.sources || {};
    const input = data?.input || {};
    const prefix = key;
    const used = [];
    if ((input[`${prefix}StorageObjectTb`] || 0) > 0 && isFallbackSource(sources.object)) {
      used.push("object");
    }
    if ((input[`${prefix}StorageFileTb`] || 0) > 0 && isFallbackSource(sources.file)) {
      used.push("file");
    }
    if ((input[`${prefix}StorageTableTb`] || 0) > 0 && isFallbackSource(sources.table)) {
      used.push("table");
    }
    if ((input[`${prefix}StorageQueueTb`] || 0) > 0 && isFallbackSource(sources.queue)) {
      used.push("queue");
    }
    if (
      input[`${prefix}StorageDrEnabled`] &&
      (input[`${prefix}StorageDrDeltaTb`] || 0) > 0 &&
      isFallbackSource(sources.replication)
    ) {
      used.push("replication");
    }
    if (used.length) {
      fallbackUsedByProvider.push(`${label}: ${used.join(", ")}`);
    }
  });
  const defaults = STORAGE_HARDCODED_RATES;
  const fallbackSummary = fallbackUsedByProvider.length
    ? `Fallback used for ${fallbackUsedByProvider.join(" | ")}.`
    : "No active fallback components detected in current inputs.";
  return [
    "Source badge: API = live provider API/price list; HARDCODED = fallback-default values were used.",
    fallbackSummary,
    "Hardcoded fallback rates ($/GB-month):",
    `AWS object ${formatRateNumber(defaults.aws.object)}, file ${formatRateNumber(
      defaults.aws.file
    )}, table ${formatRateNumber(defaults.aws.table)}, queue ${formatRateNumber(
      defaults.aws.queue
    )}, replication ${formatRateNumber(defaults.aws.replication)}.`,
    `Azure object ${formatRateNumber(defaults.azure.object)}, file ${formatRateNumber(
      defaults.azure.file
    )}, table ${formatRateNumber(defaults.azure.table)}, queue ${formatRateNumber(
      defaults.azure.queue
    )}, replication ${formatRateNumber(defaults.azure.replication)}.`,
    `GCP object ${formatRateNumber(defaults.gcp.object)}, file ${formatRateNumber(
      defaults.gcp.file
    )}, table ${formatRateNumber(defaults.gcp.table)}, queue ${formatRateNumber(
      defaults.gcp.queue
    )}, replication ${formatRateNumber(defaults.gcp.replication)}.`,
    "Conversion note: 1 TB = 1024 GB.",
  ].join(" ");
}

function updateDisclaimerText(data) {
  if (!disclaimer) {
    return;
  }
  if (currentMode === "network") {
    disclaimer.textContent = buildNetworkDisclaimerText();
    return;
  }
  if (currentMode === "storage") {
    disclaimer.textContent = buildStorageDisclaimerText(data);
    return;
  }
  disclaimer.textContent = defaultDisclaimerText;
}

function updateNetworkAddonFocusUi() {
  const focus = normalizeNetworkAddonFocus(
    networkAddonFocusInput?.value
  );
  networkAddonTabButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.networkFocus === focus
    );
  });
  const isNetworkMode = currentMode === "network";
  networkAddonGroups.forEach((group) => {
    if (!(group instanceof HTMLElement)) {
      return;
    }
    const groupFocus = group.dataset.networkAddon;
    const hideGroup = isNetworkMode && groupFocus !== focus;
    group.classList.toggle("is-hidden", hideGroup);
  });
}

function setNetworkAddonFocus(focus, options = {}) {
  if (!networkAddonFocusInput) {
    return;
  }
  networkAddonFocusInput.value = normalizeNetworkAddonFocus(focus);
  updateNetworkAddonFocusUi();
  currentNetworkResult = networkAddonFocusInput.value;
  networkResultTabs.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.networkResult === currentNetworkResult
    );
  });
  if (!options.silent && currentMode === "network") {
    handleCompare();
  }
}

function setNetworkFocusView(showInsight) {
  if (networkInsightPanel) {
    networkInsightPanel.classList.toggle("is-hidden", !showInsight);
  }
}

function setStorageFocusView(showInsight) {
  if (storageInsightPanel) {
    storageInsightPanel.classList.toggle("is-hidden", !showInsight);
  }
}

function setNetworkResultTab(tab, options = {}) {
  const nextTab =
    tab === "insight" ? "insight" : normalizeNetworkAddonFocus(tab);
  currentNetworkResult = nextTab;
  networkResultTabs.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.networkResult === currentNetworkResult
    );
  });
  setResultsTab("pricing", { silent: true });
  if (currentNetworkResult !== "insight") {
    setNetworkAddonFocus(currentNetworkResult, { silent: true });
  }
  setNetworkFocusView(currentNetworkResult === "insight");
  if (currentNetworkResult === "insight") {
    renderFocusInsight(lastPricing, "network");
  } else if (lastPricing && currentMode === "network") {
    renderNetworkFocusTable(lastPricing);
  }
  if (!options.silent) {
    // Keep focus-tab navigation responsive: switching to Insight should
    // not force a fresh compare that can reset focus state.
    if (currentNetworkResult === "insight") {
      if (!lastPricing) {
        handleCompare();
      }
      return;
    }
    handleCompare();
  }
}

function setStorageResultTab(tab, options = {}) {
  currentStorageResult =
    tab === "insight" ? "insight" : tab === "performance" ? "performance" : "object";
  storageResultTabs.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.storageResult === currentStorageResult
    );
  });
  setResultsTab("pricing", { silent: true });
  setStorageFocusView(currentStorageResult === "insight");
  if (currentStorageResult === "insight") {
    renderFocusInsight(lastPricing, "storage");
  } else if (lastPricing && currentMode === "storage") {
    renderStorageFocusTable(lastPricing);
  }
  if (!options.silent) {
    // Keep focus-tab navigation responsive: switching to Insight should
    // not force a fresh compare that can reset focus state.
    if (currentStorageResult === "insight") {
      if (!lastPricing) {
        handleCompare();
      }
      return;
    }
    handleCompare();
  }
}

function setMode(mode) {
  const wasK8s = currentMode === "k8s";
  const nextMode =
    mode === "k8s"
      ? "k8s"
      : mode === "network"
      ? "network"
      : mode === "storage"
      ? "storage"
      : mode === "saved"
      ? "saved"
      : "vm";
  const leavingVm = currentMode === "vm" && nextMode !== "vm";
  if (leavingVm) {
    sqlState = {
      edition: sqlEditionSelect.value,
      rate: sqlRateInput.value,
    };
  }
  currentMode = nextMode;
  modeInput.value = currentMode === "k8s" ? "k8s" : "vm";
  if (pricingFocusInput) {
    pricingFocusInput.value =
      currentMode === "network"
        ? "network"
        : currentMode === "storage"
        ? "storage"
        : "all";
  }
  const copy = MODE_COPY[currentMode] || MODE_COPY.vm;
  formTitle.textContent = copy.formTitle;
  formSubtitle.textContent = copy.formSubtitle;
  cpuLabel.textContent = copy.cpuLabel;
  vmCountLabel.textContent = copy.countLabel;
  egressLabel.textContent = copy.egressLabel;
  awsTitle.textContent = copy.awsTitle;
  azureTitle.textContent = copy.azureTitle;
  gcpTitle.textContent = copy.gcpTitle;
  updateResultsHeading();

  const isK8s = currentMode === "k8s";
  const isNetwork = currentMode === "network";
  const isStorage = currentMode === "storage";
  const isPublicOnlyMode = isNetwork || isStorage;
  document.body.classList.toggle("focus-network", isNetwork);
  document.body.classList.toggle("focus-storage", isStorage);
  const hideWorkload = isK8s || isNetwork || isStorage;
  const hideSql = isK8s || isNetwork || isStorage;
  workloadField.classList.toggle("is-hidden", hideWorkload);
  sqlEditionField.classList.toggle("is-hidden", hideSql);
  sqlRateField.classList.toggle("is-hidden", hideSql);
  sqlEditionSelect.disabled = hideSql;
  sqlRateInput.disabled = hideSql;
  if (isK8s) {
    sqlEditionSelect.value = "none";
    sqlRateInput.value = "0";
    osDiskLabel.textContent = `OS disk (GB, min ${K8S_OS_DISK_MIN_GB})`;
    osDiskInput.min = K8S_OS_DISK_MIN_GB.toString();
    const currentOs = Number.parseFloat(osDiskInput.value);
    if (!wasK8s || !Number.isFinite(currentOs) || currentOs < K8S_OS_DISK_MIN_GB) {
      osDiskInput.value = K8S_OS_DISK_MIN_GB.toString();
    }
    vmCountInput.min = K8S_MIN_NODE_COUNT.toString();
    const currentCount = Number.parseInt(vmCountInput.value, 10);
    if (!Number.isFinite(currentCount) || currentCount < K8S_MIN_NODE_COUNT) {
      vmCountInput.value = K8S_MIN_NODE_COUNT.toString();
    }
    dataDiskLabel.textContent = "Shared storage (TB)";
  } else {
    if (hideSql) {
      sqlEditionSelect.value = "none";
      sqlRateInput.value = "0";
    } else {
      sqlEditionSelect.value = sqlState.edition || "none";
      sqlRateInput.value = sqlState.rate || "0";
    }
    osDiskLabel.textContent = "OS disk (GB)";
    osDiskInput.min = "0";
    vmCountInput.min = "1";
    const currentCount = Number.parseInt(vmCountInput.value, 10);
    if (!Number.isFinite(currentCount) || currentCount < 1) {
      vmCountInput.value = "1";
    }
    dataDiskLabel.textContent = isStorage
      ? "Shared storage (TB)"
      : "Data disk (TB)";
    if (isStorage) {
      osDiskInput.value = "0";
    }
    if (isNetwork && dataDiskInput) {
      osDiskInput.value = "0";
      dataDiskInput.value = "0";
    }
  }

  if (cpuField) {
    cpuField.classList.toggle("is-hidden", isNetwork || isStorage);
  }
  if (vmCountField) {
    vmCountField.classList.toggle("is-hidden", isNetwork || isStorage);
  }
  if (diskTierField) {
    diskTierField.classList.toggle("is-hidden", isNetwork || isStorage);
  }
  if (osDiskField) {
    osDiskField.classList.toggle("is-hidden", isNetwork || isStorage);
  }
  if (dataDiskField) {
    dataDiskField.classList.toggle("is-hidden", isNetwork || isStorage);
  }
  if (backupField) {
    backupField.classList.toggle("is-hidden", isNetwork || isStorage);
  }
  if (egressField) {
    egressField.classList.toggle("is-hidden", isStorage);
  }
  if (interVlanField) {
    interVlanField.classList.toggle("is-hidden", !isNetwork);
  }
  if (intraVlanField) {
    intraVlanField.classList.toggle("is-hidden", !isNetwork);
  }
  if (interRegionField) {
    interRegionField.classList.toggle("is-hidden", !isNetwork);
  }
  if (storageIopsField) {
    storageIopsField.classList.toggle("is-hidden", !isStorage);
  }
  if (storageThroughputField) {
    storageThroughputField.classList.toggle("is-hidden", !isStorage);
  }
  if (storageRequestField) {
    storageRequestField.classList.toggle("is-hidden", !isStorage);
  }
  if (storageOperationField) {
    storageOperationField.classList.toggle("is-hidden", !isStorage);
  }
  if (drField) {
    drField.classList.toggle("is-hidden", isNetwork || isStorage);
  }
  if (hoursField) {
    hoursField.classList.toggle("is-hidden", isStorage);
  }
  if (networkSection) {
    networkSection.classList.toggle("is-hidden", isStorage || isNetwork);
  }
  if (networkFields) {
    networkFields.classList.toggle("is-hidden", isStorage || isNetwork);
  }
  if (networkAddonTabs) {
    networkAddonTabs.classList.add("is-hidden");
  }
  if (storageRateSection) {
    storageRateSection.classList.add("is-hidden");
  }
  if (storageRateFields) {
    storageRateFields.classList.add("is-hidden");
  }
  if (isStorage && backupEnabledInput) {
    backupEnabledInput.checked = false;
  }
  if ((isStorage || isNetwork) && drPercentInput) {
    drPercentInput.value = "0";
  }
  if (isStorage && egressInput) {
    egressInput.value = "0";
  }
  if (isNetwork && backupEnabledInput) {
    backupEnabledInput.checked = false;
  }
  if (networkAddonFocusInput) {
    if (isNetwork) {
      setNetworkAddonFocus(networkAddonFocusInput.value || "vpc", {
        silent: true,
      });
    } else {
      updateNetworkAddonFocusUi();
    }
  }
  if (isNetwork) {
    setNetworkFocusView(currentNetworkResult === "insight");
  }
  if (isStorage) {
    setStorageFocusView(currentStorageResult === "insight");
  }
  networkResultTabs.forEach((button) => {
    const key = button.dataset.networkResult;
    button.classList.toggle(
      "active",
      key === currentNetworkResult
    );
  });
  storageResultTabs.forEach((button) => {
    const key = button.dataset.storageResult;
    button.classList.toggle(
      "active",
      key === currentStorageResult
    );
  });
  if (privateViewTab) {
    privateViewTab.classList.toggle("is-hidden", isPublicOnlyMode);
  }
  if (privateCompareContainer) {
    privateCompareContainer.classList.toggle("is-hidden", isPublicOnlyMode);
  }
  if (isPublicOnlyMode && currentView === "private") {
    currentView = "compare";
  }
  if (isPublicOnlyMode) {
    setView("compare");
  }
  if (pricingProviderSelect) {
    if (isPublicOnlyMode) {
      pricingProviderSelect.value = "api";
      pricingProviderSelect.disabled = true;
    } else {
      pricingProviderSelect.disabled = false;
    }
  }
  if (disclaimer) {
    disclaimer.classList.remove("is-hidden");
  }

  if (sizeOptions) {
    updateCpuOptions();
    updateInstanceOptions();
  }
  updateViewTabsVisibility();
}

function updateResultsHeading() {
  if (!resultsTitle || !resultsSubtitle) {
    return;
  }
  if (activePanel === "private") {
    resultsTitle.textContent = "Private cloud profiles";
    resultsSubtitle.textContent =
      "Create and save private provider profiles for VM comparisons.";
    return;
  }
  if (activePanel === "scenarios") {
    resultsTitle.textContent = "Private/Public Cloud";
    resultsSubtitle.textContent =
      "Compare saved public scenarios against private cloud providers.";
    return;
  }
  if (activePanel === "saved") {
    resultsTitle.textContent = RESULTS_TAB_COPY.saved.title;
    resultsSubtitle.textContent = RESULTS_TAB_COPY.saved.subtitle;
    return;
  }
  if (activePanel === "billing") {
    resultsTitle.textContent = "Billing Import";
    resultsSubtitle.textContent =
      "Import provider billing CSVs and visualize cost allocation by service.";
    return;
  }
  if (currentResultsTab === "saved") {
    if (currentMode === "network") {
      resultsTitle.textContent = "Network Saved Compare";
      resultsSubtitle.textContent =
        "Run saved network scenarios in a multi-provider dashboard.";
      return;
    }
    if (currentMode === "storage") {
      resultsTitle.textContent = "Storage Saved Compare";
      resultsSubtitle.textContent =
        "Run saved storage scenarios in a multi-provider dashboard.";
      return;
    }
    resultsTitle.textContent = RESULTS_TAB_COPY.saved.title;
    resultsSubtitle.textContent = RESULTS_TAB_COPY.saved.subtitle;
    return;
  }
  if (currentResultsTab === "insight") {
    if (currentMode === "network") {
      resultsTitle.textContent = "Network Insight";
      resultsSubtitle.textContent =
        "Breakdown of networking costs: VPC/VNet, VPC/VPN gateway, load balancer, VLAN transfer, and egress.";
      return;
    }
    if (currentMode === "storage") {
      resultsTitle.textContent = "Storage Insight";
      resultsSubtitle.textContent =
        "Breakdown of storage service costs and DR replication by provider.";
      return;
    }
    resultsTitle.textContent = RESULTS_TAB_COPY.insight.title;
    resultsSubtitle.textContent = RESULTS_TAB_COPY.insight.subtitle;
    return;
  }
  if (currentResultsTab === "commit") {
    resultsTitle.textContent = RESULTS_TAB_COPY.commit.title;
    resultsSubtitle.textContent = RESULTS_TAB_COPY.commit.subtitle;
    return;
  }
  const copy = MODE_COPY[currentMode] || MODE_COPY.vm;
  resultsTitle.textContent = copy.resultsTitle;
  resultsSubtitle.textContent = copy.resultsSubtitle;
}

function updateResultsTabsVisibility() {
  if (!resultsTabs) {
    return;
  }
  const isFocusMode = currentMode === "network" || currentMode === "storage";
  const showTabs =
    activePanel !== "private" &&
    activePanel !== "scenarios" &&
    activePanel !== "saved" &&
    activePanel !== "billing";
  resultsTabs.classList.toggle("is-hidden", !showTabs || isFocusMode);
  if (!showTabs) {
    currentResultsTab = "pricing";
    if (pricingPanel) {
      pricingPanel.classList.add("is-hidden");
    }
    if (savedComparePanel) {
      savedComparePanel.classList.toggle("is-hidden", activePanel !== "saved");
    }
    if (insightPanel) {
      insightPanel.classList.add("is-hidden");
    }
    if (commitPanel) {
      commitPanel.classList.add("is-hidden");
    }
    updateResultsHeading();
  }
}

function setResultsTab(tab, options = {}) {
  const isFocusMode = currentMode === "network" || currentMode === "storage";
  const nextTab =
    !isFocusMode &&
    (tab === "saved" || tab === "insight" || tab === "commit")
      ? tab
      : "pricing";
  currentResultsTab = nextTab;
  resultsTabButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.results === nextTab
    );
  });
  if (pricingPanel) {
    pricingPanel.classList.toggle("is-hidden", nextTab !== "pricing");
  }
  if (savedComparePanel) {
    savedComparePanel.classList.toggle("is-hidden", nextTab !== "saved");
  }
  if (insightPanel) {
    insightPanel.classList.toggle("is-hidden", nextTab !== "insight");
  }
  if (commitPanel) {
    commitPanel.classList.toggle("is-hidden", nextTab !== "commit");
  }
  if (!isFocusMode) {
    networkResultTabs.forEach((button) => {
      const key = button.dataset.networkResult;
      button.classList.toggle(
        "active",
        (nextTab === "insight" && key === "insight") ||
          (nextTab === "pricing" && key === currentNetworkResult)
      );
    });
    storageResultTabs.forEach((button) => {
      const key = button.dataset.storageResult;
      button.classList.toggle(
        "active",
        (nextTab === "insight" && key === "insight") ||
          (nextTab === "pricing" && key === currentStorageResult)
      );
    });
  }
  updateResultsHeading();
  updateViewTabsVisibility();
  updateVendorSubtabs();
  if (nextTab === "pricing") {
    setView(currentView);
  }
  if (options.silent) {
    return;
  }
  if (nextTab === "saved") {
    refreshSavedCompare();
  }
  if (nextTab === "insight") {
    renderInsight(lastPricing);
  }
  if (nextTab === "commit") {
    renderCommit(lastPricing);
  }
}

function setPanel(panel) {
  const nextPanel =
    panel === "private"
      ? "private"
      : panel === "scenarios"
      ? "scenarios"
      : panel === "billing"
      ? "billing"
      : panel === "k8s"
      ? "k8s"
      : panel === "network"
      ? "network"
      : panel === "storage"
      ? "storage"
      : panel === "saved"
      ? "saved"
      : "vm";
  activePanel = nextPanel;
  modeTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === nextPanel);
  });
  if (
    nextPanel === "private" ||
    nextPanel === "scenarios" ||
    nextPanel === "saved" ||
    nextPanel === "billing"
  ) {
    if (cloudPanel) {
      cloudPanel.classList.add("is-hidden");
    }
    if (privatePanel) {
      privatePanel.classList.toggle("is-hidden", nextPanel !== "private");
    }
    if (scenariosPanel) {
      scenariosPanel.classList.toggle("is-hidden", nextPanel !== "scenarios");
    }
    if (savedComparePanel) {
      savedComparePanel.classList.toggle("is-hidden", nextPanel !== "saved");
    }
    if (billingPanel) {
      billingPanel.classList.toggle("is-hidden", nextPanel !== "billing");
    }
    if (formCard) {
      formCard.classList.add("is-hidden");
    }
    if (layout) {
      layout.classList.add("single");
    }
    if (pricingPanel) {
      pricingPanel.classList.add("is-hidden");
    }
    if (insightPanel) {
      insightPanel.classList.add("is-hidden");
    }
    if (commitPanel) {
      commitPanel.classList.add("is-hidden");
    }
    updateResultsTabsVisibility();
    updateResultsHeading();
    updateViewTabsVisibility();
    if (nextPanel === "saved") {
      refreshSavedCompare();
    }
    if (nextPanel === "billing") {
      setBillingProvider(currentBillingProvider);
    }
    return;
  }
  if (cloudPanel) {
    cloudPanel.classList.remove("is-hidden");
  }
  if (privatePanel) {
    privatePanel.classList.add("is-hidden");
  }
  if (scenariosPanel) {
    scenariosPanel.classList.add("is-hidden");
  }
  if (savedComparePanel) {
    savedComparePanel.classList.add("is-hidden");
  }
  if (billingPanel) {
    billingPanel.classList.add("is-hidden");
  }
  if (formCard) {
    formCard.classList.remove("is-hidden");
  }
  if (layout) {
    layout.classList.remove("single");
  }
  setMode(nextPanel);
  if (nextPanel === "network" || nextPanel === "storage") {
    currentResultsTab = "pricing";
  }
  updateResultsTabsVisibility();
  setResultsTab(currentResultsTab, { silent: true });
  setView(currentView);
}

function updateViewTabsVisibility() {
  if (!viewTabs) {
    return;
  }
  const showTabs =
    activePanel !== "private" &&
    activePanel !== "scenarios" &&
    activePanel !== "saved" &&
    activePanel !== "billing" &&
    currentResultsTab === "pricing" &&
    currentMode !== "network" &&
    currentMode !== "storage";
  viewTabs.classList.toggle("is-hidden", !showTabs);
  if (
    !showTabs &&
    (activePanel === "private" ||
      activePanel === "scenarios" ||
      activePanel === "saved" ||
      activePanel === "billing") &&
    currentView !== "compare"
  ) {
    currentView = "compare";
    setView("compare");
  }
}

function setView(view) {
  const isFocusMode = currentMode === "network" || currentMode === "storage";
  if (isFocusMode) {
    const showNetworkPanel = currentMode === "network";
    const showStoragePanel = currentMode === "storage";
    currentView = "compare";
    viewTabButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.view === "compare");
    });
    if (compareGrid) {
      compareGrid.classList.add("is-hidden");
    }
    if (vendorGrid) {
      vendorGrid.classList.add("is-hidden");
    }
    if (delta) {
      delta.classList.add("is-hidden");
    }
    if (scenarioDelta) {
      scenarioDelta.classList.add("is-hidden");
    }
    if (networkFocusPanel) {
      networkFocusPanel.classList.toggle("is-hidden", !showNetworkPanel);
    }
    if (storageFocusPanel) {
      storageFocusPanel.classList.toggle("is-hidden", !showStoragePanel);
    }
    if (showNetworkPanel) {
      setNetworkFocusView(currentNetworkResult === "insight");
    }
    if (showStoragePanel) {
      setStorageFocusView(currentStorageResult === "insight");
    }
    updateVendorSubtabs();
    return;
  }
  if (networkFocusPanel) {
    networkFocusPanel.classList.add("is-hidden");
  }
  if (storageFocusPanel) {
    storageFocusPanel.classList.add("is-hidden");
  }
  const privateViewBlocked =
    currentMode === "network" || currentMode === "storage";
  const nextView =
    view === "aws" || view === "azure" || view === "gcp"
      ? view
      : view === "private" && !privateViewBlocked
      ? view
      : "compare";
  currentView = nextView;
  viewTabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === nextView);
  });
  const showAll = nextView === "compare";
  if (awsCard) {
    awsCard.classList.toggle("is-hidden", !(showAll || nextView === "aws"));
  }
  if (azureCard) {
    azureCard.classList.toggle("is-hidden", !(showAll || nextView === "azure"));
  }
  if (gcpCard) {
    gcpCard.classList.toggle("is-hidden", !(showAll || nextView === "gcp"));
  }
  if (compareGrid) {
    compareGrid.classList.toggle("single", !showAll);
    compareGrid.classList.toggle("is-hidden", !showAll);
  }
  if (vendorGrid) {
    vendorGrid.classList.toggle("is-hidden", showAll);
  }
  delta.classList.toggle("is-hidden", !showAll);
  if (scenarioDelta) {
    scenarioDelta.classList.toggle("is-hidden", !showAll);
  }
  updateVendorSubtabs();
}

function updateVendorSubtabs() {
  if (!vendorSubtabs || !vendorRegionPanel) {
    return;
  }
  const isProviderView =
    currentView === "aws" || currentView === "azure" || currentView === "gcp";
  const showSubtabs = currentResultsTab === "pricing" && isProviderView;
  vendorSubtabs.classList.toggle("is-hidden", !showSubtabs);
  if (!showSubtabs) {
    vendorRegionPanel.classList.add("is-hidden");
    return;
  }
  setVendorSubtab(currentVendorView, { silent: true });
}

function setVendorSubtab(view, options = {}) {
  const nextView = view === "regions" ? "regions" : "options";
  currentVendorView = nextView;
  vendorSubtabButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.vendorView === nextView
    );
  });
  const isProviderView =
    currentView === "aws" || currentView === "azure" || currentView === "gcp";
  if (!isProviderView || currentResultsTab !== "pricing") {
    return;
  }
  const showOptions = nextView === "options";
  if (vendorGrid) {
    vendorGrid.classList.toggle("is-hidden", !showOptions);
  }
  if (vendorRegionPanel) {
    vendorRegionPanel.classList.toggle("is-hidden", showOptions);
  }
  if (!options.silent && nextView === "regions") {
    runRegionCompare();
  }
}

function getProviderLabelForMode(providerKey, mode) {
  const copy = MODE_COPY[mode] || MODE_COPY.vm;
  if (providerKey === "aws") {
    return copy.awsTitle;
  }
  if (providerKey === "azure") {
    return copy.azureTitle;
  }
  if (providerKey === "gcp") {
    return copy.gcpTitle;
  }
  return copy.privateTitle || "Private";
}

function getProviderLabel(providerKey) {
  return getProviderLabelForMode(providerKey, currentMode);
}

function updateTier(target, tierData, options = {}) {
  if (!tierData || !Number.isFinite(tierData.hourlyRate) || !tierData.totals) {
    target.total.textContent = "N/A";
    target.rate.textContent = "Rate unavailable";
    return;
  }
  target.total.textContent = formatMoney(tierData.totals.total);
  if (options.showMonthlyRate) {
    target.rate.textContent = `Compute ${formatMonthly(
      tierData.totals.computeMonthly
    )}`;
  } else {
    target.rate.textContent = formatRate(tierData.hourlyRate);
  }
}

function formatSavings(label, onDemandTotal, reservedTotal) {
  if (!Number.isFinite(onDemandTotal) || !Number.isFinite(reservedTotal)) {
    return `${label} N/A`;
  }
  const diff = onDemandTotal - reservedTotal;
  if (diff === 0) {
    return `${label} no change`;
  }
  const verb = diff > 0 ? "saves" : "adds";
  return `${label} ${verb} ${formatMoney(Math.abs(diff))}/mo`;
}

function setStatus(element, status, message) {
  element.textContent = status;
  element.classList.toggle("error", status === "error");
  element.title = message || "";
}

function syncInstanceSelect(select, instance) {
  if (!(select instanceof HTMLSelectElement)) {
    select.textContent = instance?.type || "-";
    return;
  }
  if (!instance?.type) {
    if (select.options.length) {
      select.selectedIndex = 0;
    }
    return;
  }
  const value = instance.type;
  const existing = Array.from(select.options).find(
    (option) => option.value === value
  );
  if (!existing) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `${value} — ${instance.vcpu} vCPU / ${instance.memory} GB`;
    select.appendChild(option);
  }
  select.value = value;
}

function buildProviderFieldsFromCard(card) {
  const instanceSelect = card.querySelector("[data-field='instanceSelect']");
  const instance = instanceSelect || card.querySelector("[data-field='instance']");
  return {
    family: card.querySelector("[data-field='family']"),
    instance,
    shape: card.querySelector("[data-field='shape']"),
    region: card.querySelector("[data-field='region']"),
    hourly: card.querySelector("[data-field='hourly']"),
    network: card.querySelector("[data-field='network']"),
    status: card.querySelector("[data-field='status']"),
    tiers: {
      onDemand: {
        total: card.querySelector("[data-field='od-total']"),
        rate: card.querySelector("[data-field='od-rate']"),
      },
      year1: {
        total: card.querySelector("[data-field='1y-total']"),
        rate: card.querySelector("[data-field='1y-rate']"),
      },
      year3: {
        total: card.querySelector("[data-field='3y-total']"),
        rate: card.querySelector("[data-field='3y-rate']"),
      },
    },
    savings: card.querySelector("[data-field='savings']"),
    breakdown: card.querySelector("[data-field='breakdown']"),
    note: card.querySelector("[data-field='note']"),
  };
}

function buildProviderSourceConfidence(provider, options = {}, totals = null) {
  const pricingFocus =
    options.pricingFocus === "network"
      ? "network"
      : options.pricingFocus === "storage"
      ? "storage"
      : "all";
  const computeSource = formatSourceDetail(
    provider?.pricingTiers?.onDemand?.source || provider?.source
  );
  const networkSource = summarizeItemSources(provider?.networkAddons?.items || []);
  const egressUsesFallback =
    Number.isFinite(totals?.egressMonthly) && totals.egressMonthly > 0;
  if (pricingFocus === "network") {
    return `Source confidence: compute excluded, network add-ons ${networkSource}, traffic transfer ${egressUsesFallback ? "fallback" : "none"}.`;
  }
  if (pricingFocus === "storage") {
    const sourceValues = Object.values(provider?.storageServices?.sources || {});
    const storageSource = sourceValues.length
      ? summarizeItemSources(sourceValues.map((value) => ({ source: value })))
      : "none selected";
    return `Source confidence: compute excluded, storage services ${storageSource}.`;
  }
  const reserved1Source = formatSourceDetail(provider?.pricingTiers?.reserved1yr?.source);
  const reserved3Source = formatSourceDetail(provider?.pricingTiers?.reserved3yr?.source);
  const storageSource =
    options.mode === "k8s"
      ? formatSourceDetail(
          options.sharedStorageSources?.[options.providerKey] || "fallback-default"
        )
      : "disk-tier model";
  return `Source confidence: compute ${computeSource}, 1-year ${reserved1Source}, 3-year ${reserved3Source}, network add-ons ${networkSource}, traffic transfer ${egressUsesFallback ? "fallback" : "none"}, storage ${storageSource}.`;
}

function updateProvider(target, provider, region, options = {}) {
  const pricingFocus =
    options.pricingFocus === "network"
      ? "network"
      : options.pricingFocus === "storage"
      ? "storage"
      : "all";
  const statusOverride =
    pricingFocus === "all"
      ? null
      : options.pricingProvider === "api"
      ? "api"
      : "retail";
  target.family.textContent =
    pricingFocus === "network"
      ? "Networking"
      : pricingFocus === "storage"
      ? "Shared storage"
      : provider.family || "-";
  if (target.instance) {
    syncInstanceSelect(target.instance, provider.instance);
  }
  const vcpu = provider.instance?.vcpu;
  const memory = provider.instance?.memory;
  if (Number.isFinite(vcpu) && Number.isFinite(memory)) {
    target.shape.textContent = `${vcpu} vCPU / ${memory} GB`;
  } else if (Number.isFinite(vcpu)) {
    target.shape.textContent = `${vcpu} vCPU`;
  } else {
    target.shape.textContent = "-";
  }
  target.region.textContent = region?.location || "-";
  const networkGbps = provider.instance?.networkGbps;
  if (pricingFocus === "network") {
    const selectedAddons = Array.isArray(provider.networkAddons?.items)
      ? provider.networkAddons.items
      : [];
    target.network.textContent = selectedAddons.length
      ? selectedAddons.map((item) => item.label).join(" + ")
      : "None selected";
  } else if (pricingFocus === "storage") {
    target.network.textContent = "-";
  } else if (Number.isFinite(networkGbps)) {
    target.network.textContent = `>= ${networkGbps} Gbps`;
  } else if (provider.instance?.networkLabel) {
    target.network.textContent = provider.instance.networkLabel;
  } else {
    target.network.textContent = "-";
  }

  setStatus(
    target.status,
    statusOverride || provider.status,
    pricingFocus === "all" ? provider.message : null
  );

  const onDemandTier = provider.pricingTiers?.onDemand;
  const hourlyRate = onDemandTier?.hourlyRate ?? provider.hourlyRate;
  if (options.showMonthlyRate && onDemandTier?.totals?.computeMonthly) {
    target.hourly.textContent = formatMonthly(
      onDemandTier.totals.computeMonthly
    );
  } else {
    target.hourly.textContent = formatRate(hourlyRate);
  }

  updateTier(target.tiers.onDemand, onDemandTier, {
    showMonthlyRate: options.showMonthlyRate,
  });
  updateTier(target.tiers.year1, provider.pricingTiers?.reserved1yr, {
    showMonthlyRate: options.showMonthlyRate,
  });
  updateTier(target.tiers.year3, provider.pricingTiers?.reserved3yr, {
    showMonthlyRate: options.showMonthlyRate,
  });

  const breakdownTotals = onDemandTier?.totals ?? provider.totals;
  if (!breakdownTotals || !Number.isFinite(breakdownTotals.total)) {
    target.breakdown.textContent =
      pricingFocus === "all" ? "Compute rate unavailable." : "Rate unavailable.";
  } else {
    const dataLabel = options.mode === "k8s" ? "Shared" : "Data";
    const storageInfo = provider.storage
      ? `(OS ${provider.storage.osDiskGb} GB + ${dataLabel} ${provider.storage.dataDiskTb} TB)`
      : "";
    const backupInfo = provider.backup
      ? provider.backup.enabled
        ? `(Snapshots ${Math.round(
            provider.backup.snapshotGb
          )} GB, ${provider.backup.retentionDays}d @ ${
            provider.backup.dailyDeltaPercent
          }%)`
        : "(Disabled)"
      : "";
    const drInfo = provider.dr ? `(DR ${provider.dr.percent}%)` : "";
    const showSql = options.mode !== "k8s" && pricingFocus === "all";
    const sqlIncluded = showSql && provider.sqlNote
      ? provider.sqlNote.toLowerCase().includes("included")
      : false;
    const sqlLine = showSql
      ? sqlIncluded
        ? "SQL included"
        : `SQL ${formatMoney(breakdownTotals.sqlMonthly)}`
      : null;
    const windowsLine =
      Number.isFinite(breakdownTotals.windowsLicenseMonthly) &&
      breakdownTotals.windowsLicenseMonthly > 0
        ? `Windows ${formatMoney(breakdownTotals.windowsLicenseMonthly)}`
        : null;
    const countLabel = options.mode === "k8s" ? "Nodes" : "VMs";
    const vmLabel =
      pricingFocus === "all" && options.vmCount && options.vmCount > 1
        ? `${countLabel} ${options.vmCount}`
        : null;
    const controlPlaneMonthly = breakdownTotals.controlPlaneMonthly;
    let controlPlaneLine = null;
    if (
      Number.isFinite(controlPlaneMonthly) &&
      controlPlaneMonthly > 0
    ) {
      const perHost =
        options.mode === "k8s" && options.vmCount
          ? controlPlaneMonthly / options.vmCount
          : null;
      const perHostLabel = Number.isFinite(perHost)
        ? ` (${formatMoney(perHost)}/host)`
        : "";
      controlPlaneLine = `Control plane ${formatMoney(
        controlPlaneMonthly
      )}${perHostLabel}`;
    }
    const networkItems = Array.isArray(provider.networkAddons?.items)
      ? provider.networkAddons.items
      : [];
    let networkLine = null;
    if (networkItems.length) {
      const labels = networkItems.map((item) => item.label);
      const networkMonthly = breakdownTotals.networkMonthly;
      networkLine = `Network ${formatMoney(networkMonthly)} (${labels.join(
        " + "
      )})`;
    }
    const defaultBreakdownLines = [
      `Compute ${formatMoney(breakdownTotals.computeMonthly)}`,
      controlPlaneLine,
      `Storage ${formatMoney(breakdownTotals.storageMonthly)} ${storageInfo}`.trim(),
      `Backups ${formatMoney(breakdownTotals.backupMonthly)} ${backupInfo}`.trim(),
      `DR ${formatMoney(breakdownTotals.drMonthly)} ${drInfo}`.trim(),
      networkLine,
      `Egress ${formatMoney(breakdownTotals.egressMonthly)}`,
      windowsLine,
      sqlLine,
    ].filter(Boolean);
    const networkBreakdownLine =
      networkLine || `Network ${formatMoney(breakdownTotals.networkMonthly)}`;
    const storageBreakdownLines = [
      `Storage ${formatMoney(breakdownTotals.storageMonthly)} ${storageInfo}`.trim(),
      `Backups ${formatMoney(breakdownTotals.backupMonthly)} ${backupInfo}`.trim(),
    ].filter(Boolean);
    const breakdownLines =
      pricingFocus === "network"
        ? [networkBreakdownLine]
        : pricingFocus === "storage"
        ? storageBreakdownLines
        : defaultBreakdownLines;
    if (vmLabel) {
      breakdownLines.unshift(vmLabel);
    }
    target.breakdown.textContent = breakdownLines.join(" | ");
  }

  const onDemandTotal = onDemandTier?.totals?.total;
  const year1Total = provider.pricingTiers?.reserved1yr?.totals?.total;
  const year3Total = provider.pricingTiers?.reserved3yr?.totals?.total;
  target.savings.textContent = [
    formatSavings("1-year", onDemandTotal, year1Total),
    formatSavings("3-year", onDemandTotal, year3Total),
  ].join(" | ");
  const year1Diff = onDemandTotal - year1Total;
  const year3Diff = onDemandTotal - year3Total;
  target.savings.classList.toggle(
    "negative",
    (Number.isFinite(year1Diff) && year1Diff < 0) ||
      (Number.isFinite(year3Diff) && year3Diff < 0)
  );

  const noteParts = [];
  if (provider.message && pricingFocus === "all") {
    noteParts.push(provider.message);
  }
  if (provider.networkAddons?.note && pricingFocus !== "storage") {
    noteParts.push(provider.networkAddons.note);
  }
  if (options.mode !== "k8s" && pricingFocus === "all" && provider.sqlNote) {
    noteParts.push(provider.sqlNote);
  }
  if (
    pricingFocus === "all" &&
    options.showReservationNote &&
    provider.reservationNote
  ) {
    noteParts.push(provider.reservationNote);
  }
  if (provider && provider.status !== "error") {
    noteParts.push(buildProviderSourceConfidence(provider, options, breakdownTotals));
  }
  target.note.textContent = noteParts.join(" ");
}

function sortSizesByResources(sizes) {
  return [...sizes].sort((a, b) => {
    if (a.vcpu === b.vcpu) {
      return a.memory - b.memory;
    }
    return a.vcpu - b.vcpu;
  });
}

function getProviderSelect(providerKey) {
  if (providerKey === "aws") {
    return awsInstanceSelect;
  }
  if (providerKey === "azure") {
    return azureInstanceSelect;
  }
  if (providerKey === "gcp") {
    return gcpInstanceSelect;
  }
  return null;
}

function buildAutoInstanceTypes(providerKey, sizes) {
  const sorted = sortSizesByResources(sizes);
  const selected = [];
  const current = getProviderSelect(providerKey)?.value;
  if (current && sorted.some((size) => size.type === current)) {
    selected.push(current);
  }
  for (const size of sorted) {
    if (selected.length >= MAX_VENDOR_OPTIONS) {
      break;
    }
    if (!selected.includes(size.type)) {
      selected.push(size.type);
    }
  }
  return selected;
}

function resolveVendorInstanceTypes(providerKey, sizes) {
  if (!sizes.length) {
    vendorOptionState[providerKey] = [];
    return [];
  }
  const available = new Set(sizes.map((size) => size.type));
  const stored = Array.isArray(vendorOptionState[providerKey])
    ? vendorOptionState[providerKey]
    : [];
  const resolved = stored.filter((type) => available.has(type));
  const autoTypes = buildAutoInstanceTypes(providerKey, sizes);
  autoTypes.forEach((type) => {
    if (resolved.length >= MAX_VENDOR_OPTIONS) {
      return;
    }
    if (!resolved.includes(type)) {
      resolved.push(type);
    }
  });
  vendorOptionState[providerKey] = resolved.slice(0, MAX_VENDOR_OPTIONS);
  return vendorOptionState[providerKey];
}

function buildPrivateOptionDefaults() {
  const primaryProvider = getPrimaryPrivateProvider();
  const primaryConfig = normalizePrivateConfig(
    primaryProvider?.config || buildDefaultPrivateConfig()
  );
  const osDefault = Number.parseFloat(primaryConfig?.vmOsDiskGb);
  const osDisk =
    Number.isFinite(osDefault) && osDefault > 0
      ? osDefault
      : Number.parseFloat(osDiskInput?.value) || 256;
  const dataTb = Number.parseFloat(dataDiskInput?.value);
  const dataGb = Number.isFinite(dataTb) ? dataTb * 1024 : 1024;
  return PRIVATE_FLAVORS.slice(0, MAX_VENDOR_OPTIONS).map((flavor) => ({
    vcpu: flavor.vcpu,
    ram: flavor.ram,
    osDiskGb: osDisk,
    dataDiskGb: dataGb,
    providerId: primaryProvider?.id || "",
  }));
}

function resolvePrivateOptions() {
  const defaults = buildPrivateOptionDefaults();
  const stored = Array.isArray(vendorOptionState.private)
    ? vendorOptionState.private
    : [];
  const options = defaults.map((def, index) => ({
    ...def,
    ...(stored[index] || {}),
  }));
  vendorOptionState.private = options;
  return options;
}

function createVendorOptionCard(providerKey, optionIndex, sizes, selectedType) {
  if (!vendorCardTemplate?.content?.firstElementChild) {
    return null;
  }
  const card = vendorCardTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.provider = providerKey;
  card.dataset.option = (optionIndex + 1).toString();
  const title = card.querySelector("[data-field='title']");
  if (title) {
    title.textContent = `${getProviderLabel(providerKey)} Option ${optionIndex + 1}`;
  }
  const instanceSelect = card.querySelector("[data-field='instanceSelect']");
  if (instanceSelect instanceof HTMLSelectElement) {
    setInstanceOptions(instanceSelect, sizes, selectedType);
  }
  return {
    element: card,
    fields: buildProviderFieldsFromCard(card),
    instanceSelect,
    providerKey,
    optionIndex,
  };
}

function createPrivateOptionCard(optionIndex, option) {
  if (!privateOptionTemplate?.content?.firstElementChild) {
    return null;
  }
  const card = privateOptionTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.provider = "private";
  card.dataset.option = (optionIndex + 1).toString();
  const title = card.querySelector("[data-field='title']");
  if (title) {
    title.textContent = `Private Option ${optionIndex + 1}`;
  }
  const vcpuInput = card.querySelector("[data-field='spec-vcpu']");
  const ramInput = card.querySelector("[data-field='spec-ram']");
  const osInput = card.querySelector("[data-field='spec-os']");
  const dataInput = card.querySelector("[data-field='spec-data']");
  const providerSelect = card.querySelector("[data-field='providerSelect']");
  const selectedProviderId =
    option.providerId ||
    getPrimaryPrivateProvider()?.id ||
    privateProviderStore.providers[0]?.id ||
    "";
  fillPrivateProviderSelect(providerSelect, selectedProviderId);
  if (providerSelect instanceof HTMLSelectElement) {
    providerSelect.disabled = privateProviderStore.providers.length < 2;
  }
  if (vcpuInput) {
    vcpuInput.value = option.vcpu;
  }
  if (ramInput) {
    ramInput.value = option.ram;
  }
  if (osInput) {
    osInput.value = option.osDiskGb;
  }
  if (dataInput) {
    dataInput.value = option.dataDiskGb;
  }
  return {
    element: card,
    fields: buildProviderFieldsFromCard(card),
    specInputs: {
      vcpuInput,
      ramInput,
      osInput,
      dataInput,
    },
    providerSelect,
    providerId: selectedProviderId,
    providerKey: "private",
    optionIndex,
  };
}

function buildVendorPayload(basePayload, cardState) {
  let payload = { ...basePayload };
  if (cardState.providerKey === "aws") {
    payload.awsInstanceType = cardState.instanceSelect?.value || "";
  }
  if (cardState.providerKey === "azure") {
    payload.azureInstanceType = cardState.instanceSelect?.value || "";
  }
  if (cardState.providerKey === "gcp") {
    payload.gcpInstanceType = cardState.instanceSelect?.value || "";
  }
  if (cardState.providerKey === "private") {
    const selectedProviderId =
      cardState.providerSelect?.value || cardState.providerId || "";
    const selectedProvider = selectedProviderId
      ? getPrivateProviderById(selectedProviderId)
      : null;
    if (selectedProvider?.config) {
      payload = applyPrivateConfigToPayload(payload, selectedProvider.config, {
        forceEnable: true,
      });
    } else {
      payload.privateEnabled = false;
    }
    const vcpu = Number.parseFloat(cardState.specInputs.vcpuInput?.value);
    const ram = Number.parseFloat(cardState.specInputs.ramInput?.value);
    const osDiskGb = Number.parseFloat(cardState.specInputs.osInput?.value);
    const dataDiskGb = Number.parseFloat(cardState.specInputs.dataInput?.value);
    payload.cpu = Number.isFinite(vcpu) ? vcpu : payload.cpu;
    payload.privateVmMemory = Number.isFinite(ram) ? ram : null;
    payload.osDiskGb = Number.isFinite(osDiskGb) ? osDiskGb : payload.osDiskGb;
    if (Number.isFinite(dataDiskGb) && dataDiskGb >= 0) {
      payload.dataDiskTb = dataDiskGb / 1024;
    }
    payload.privateVmOsDiskGb = payload.osDiskGb;
  }
  return payload;
}

async function fetchVendorCard(cardState, basePayload) {
  const payload = buildVendorPayload(basePayload, cardState);
  if (cardState.providerKey === "private" && !payload.privateEnabled) {
    updateProvider(
      cardState.fields,
      {
        status: "manual",
        message:
          privateProviderStore.providers.length > 0
            ? "Select a private provider profile."
            : "Create and save a private provider profile first.",
        family: "Private cloud",
        instance: {},
        pricingTiers: {},
      },
      { location: "Private DC" },
      {
        showMonthlyRate: false,
        showReservationNote: false,
        vmCount: basePayload.vmCount,
        mode: basePayload.mode || currentMode,
        providerKey: "private",
        pricingFocus: basePayload.pricingFocus,
        pricingProvider: basePayload.pricingProvider,
      }
    );
    return null;
  }
  const data = await comparePricing(payload);
  const providerKey = cardState.providerKey;
  let providerData = data[providerKey];
  if (providerKey === "private") {
    const selectedProvider = getPrivateProviderById(
      cardState.providerSelect?.value || cardState.providerId || ""
    );
    if (selectedProvider) {
      providerData = {
        ...providerData,
        family: `Private cloud (${selectedProvider.name})`,
      };
    }
  }
  const vmCount = data.input?.vmCount ?? payload.vmCount;
  const mode = data.input?.mode ?? payload.mode ?? "vm";
  updateProvider(cardState.fields, providerData, data.region[providerKey], {
    showMonthlyRate: false,
    showReservationNote: providerKey === "aws",
    vmCount,
    mode,
    providerKey,
    sharedStorageSources: data.notes?.sharedStorageSources || null,
    pricingFocus: data.input?.pricingFocus,
    pricingProvider: data.input?.pricingProvider,
  });
  return providerData;
}

async function fetchVendorOptions() {
  if (!vendorGrid) {
    return;
  }
  const basePayload = serializeForm(form);
  const providerKey = currentView;
  vendorGrid.innerHTML = "";
  const cards = [];
  if (providerKey === "private") {
    const options = resolvePrivateOptions();
    options.forEach((option, index) => {
      const cardState = createPrivateOptionCard(index, option);
      if (!cardState) {
        return;
      }
      vendorGrid.appendChild(cardState.element);
      cards.push(cardState);
      const onChange = async () => {
        cardState.providerId = cardState.providerSelect?.value || "";
        vendorOptionState.private[index] = {
          vcpu: Number.parseFloat(cardState.specInputs.vcpuInput?.value),
          ram: Number.parseFloat(cardState.specInputs.ramInput?.value),
          osDiskGb: Number.parseFloat(cardState.specInputs.osInput?.value),
          dataDiskGb: Number.parseFloat(cardState.specInputs.dataInput?.value),
          providerId: cardState.providerId,
        };
        try {
          await fetchVendorCard(cardState, serializeForm(form));
        } catch (error) {
          formNote.textContent =
            error?.message || "Could not fetch pricing. Try again.";
        }
      };
      Object.values(cardState.specInputs).forEach((input) => {
        if (input) {
          input.addEventListener("change", onChange);
        }
      });
      if (cardState.providerSelect) {
        cardState.providerSelect.addEventListener("change", onChange);
      }
    });
  } else {
    const sizes = instancePools[providerKey] || [];
    const selections = resolveVendorInstanceTypes(providerKey, sizes);
    selections.forEach((instanceType, index) => {
      const cardState = createVendorOptionCard(
        providerKey,
        index,
        sizes,
        instanceType
      );
      if (!cardState) {
        return;
      }
      vendorGrid.appendChild(cardState.element);
      cards.push(cardState);
      if (cardState.instanceSelect) {
        cardState.instanceSelect.addEventListener("change", async () => {
          vendorOptionState[providerKey][index] =
            cardState.instanceSelect.value;
          try {
            await fetchVendorCard(cardState, serializeForm(form));
          } catch (error) {
            formNote.textContent =
              error?.message || "Could not fetch pricing. Try again.";
          }
        });
      }
    });
  }
  if (!cards.length) {
    formNote.textContent = "No matching flavors for that CPU selection.";
    return;
  }
  await Promise.all(
    cards.map((cardState) => fetchVendorCard(cardState, basePayload))
  );
  formNote.textContent = "Vendor options loaded.";
}

function updateDelta(aws, azure, gcp, privateProvider) {
  const providers = [
    {
      name: getProviderLabel("aws"),
      total:
        aws.pricingTiers?.onDemand?.totals?.total ?? aws.totals?.total,
    },
    {
      name: getProviderLabel("azure"),
      total:
        azure.pricingTiers?.onDemand?.totals?.total ??
        azure.totals?.total,
    },
    {
      name: getProviderLabel("gcp"),
      total:
        gcp?.pricingTiers?.onDemand?.totals?.total ??
        gcp?.totals?.total,
    },
  ];
  const allowPrivateCompare = currentMode === "vm" || currentMode === "k8s";
  if (allowPrivateCompare && privateProvider?.enabled) {
    providers.push({
      name: getProviderLabel("private"),
      total:
        privateProvider.pricingTiers?.onDemand?.totals?.total ??
        privateProvider.totals?.total,
    });
  }

  const available = providers.filter((item) =>
    Number.isFinite(item.total)
  );
  if (available.length < 2) {
    delta.textContent =
      "Waiting for at least two provider rates to compare totals.";
    delta.classList.remove("negative");
    return;
  }

  available.sort((a, b) => a.total - b.total);
  const lowest = available[0];
  const highest = available[available.length - 1];
  const spread = highest.total - lowest.total;

  if (spread < 0.01) {
    delta.textContent =
      "All providers are estimated at the same monthly cost.";
    delta.classList.remove("negative");
    return;
  }

  const comparisons = available.slice(1).map((item) => {
    const diff = item.total - lowest.total;
    if (diff < 0.01) {
      return `${item.name} same`;
    }
    return `${item.name} +${formatMoney(diff)}/mo`;
  });

  delta.textContent = `Lowest: ${lowest.name} ${formatMonthly(
    lowest.total
  )}. ${comparisons.join(" | ")}.`;

  const awsTotal =
    aws.pricingTiers?.onDemand?.totals?.total ?? aws.totals?.total;
  delta.classList.toggle(
    "negative",
    Number.isFinite(awsTotal) && awsTotal > lowest.total
  );
}

function buildOptionHtml(options, selectedKey) {
  return (options || [])
    .map((option) => {
      const selected = option.key === selectedKey ? " selected" : "";
      return `<option value="${option.key}"${selected}>${option.label}</option>`;
    })
    .join("");
}

function getFocusAddonOptions(providerKey, addonKey) {
  const providerAddons = sizeOptions?.networkAddons?.providers?.[providerKey];
  if (!providerAddons) {
    return [{ key: "none", label: "None" }];
  }
  if (addonKey !== "gateway") {
    return providerAddons[addonKey] || [{ key: "none", label: "None" }];
  }
  const explicit = providerAddons.gateway;
  if (Array.isArray(explicit) && explicit.length) {
    return explicit;
  }
  const vpc = providerAddons.vpc || [];
  const derived = vpc.filter((option) =>
    /gateway|vpn|transit/i.test(option.label || option.key || "")
  );
  if (!derived.find((option) => option.key === "none")) {
    derived.unshift({ key: "none", label: "None" });
  }
  return derived.length ? derived : [{ key: "none", label: "None" }];
}

function renderNetworkProviderCards(data) {
  if (!networkProviderCards) {
    return;
  }
  const input = data?.input || {};
  const providers = [
    { key: "aws", label: "AWS", provider: data?.aws },
    { key: "azure", label: "Azure", provider: data?.azure },
    { key: "gcp", label: "GCP", provider: data?.gcp },
  ];
  const html = providers
    .map(({ key, label, provider }) => {
      const prefix = key;
      const vpcOptions = getFocusAddonOptions(key, "vpc");
      const gatewayOptions = getFocusAddonOptions(key, "gateway");
      const lbOptions = getFocusAddonOptions(key, "loadBalancer");
      const vpcDefault = vpcOptions[0]?.key || "none";
      const gatewayDefault = gatewayOptions[0]?.key || "none";
      const lbDefault = lbOptions[0]?.key || "none";
      const vpcValue = input[`${prefix}NetworkVpcFlavor`] || vpcDefault;
      const gatewayValue =
        input[`${prefix}NetworkGatewayFlavor`] || gatewayDefault;
      const lbValue =
        input[`${prefix}NetworkLoadBalancerFlavor`] || lbDefault;
      const vpcCount = Number.isFinite(input[`${prefix}NetworkVpcCount`])
        ? input[`${prefix}NetworkVpcCount`]
        : 1;
      const gatewayCount = Number.isFinite(
        input[`${prefix}NetworkGatewayCount`]
      )
        ? input[`${prefix}NetworkGatewayCount`]
        : 1;
      const lbCount = Number.isFinite(input[`${prefix}NetworkLoadBalancerCount`])
        ? input[`${prefix}NetworkLoadBalancerCount`]
        : 1;
      const vpcData = Number.isFinite(input[`${prefix}NetworkVpcDataTb`])
        ? input[`${prefix}NetworkVpcDataTb`]
        : 0;
      const gatewayData = Number.isFinite(input[`${prefix}NetworkGatewayDataTb`])
        ? input[`${prefix}NetworkGatewayDataTb`]
        : 0;
      const lbData = Number.isFinite(input[`${prefix}NetworkLoadBalancerDataTb`])
        ? input[`${prefix}NetworkLoadBalancerDataTb`]
        : 0;
      const items = Array.isArray(provider?.networkAddons?.items)
        ? provider.networkAddons.items
        : [];
      const addonMonthly = (addonKey) =>
        items
          .filter((item) => item.addonKey === addonKey)
          .reduce(
            (sum, item) => sum + (Number.isFinite(item.monthlyTotal) ? item.monthlyTotal : 0),
            0
          );
      const vpcMonthly = addonMonthly("vpc");
      const gatewayMonthly = addonMonthly("gateway");
      const lbMonthly = addonMonthly("loadBalancer");
      const providerTotal = provider?.totals?.total || 0;
      const sourceLabel = getNetworkCardSourceLabel(
        {
          networkVpcFlavor: vpcValue,
          networkVpcCount: vpcCount,
          networkGatewayFlavor: gatewayValue,
          networkGatewayCount: gatewayCount,
          networkLoadBalancerFlavor: lbValue,
          networkLoadBalancerCount: lbCount,
          egressTb: input.egressTb || 0,
          interVlanTb: input.interVlanTb || 0,
          intraVlanTb: input.intraVlanTb || 0,
          interRegionTb: input.interRegionTb || 0,
        },
        provider
      );
      const addonSource = summarizeItemSources(
        (items || []).map((item) => ({ source: item?.source }))
      );
      const trafficSource =
        (input.egressTb || 0) > 0 ||
        (input.interVlanTb || 0) > 0 ||
        (input.intraVlanTb || 0) > 0 ||
        (input.interRegionTb || 0) > 0
          ? "fallback"
          : "none";
      const sourceDetail = `Source detail: add-ons ${addonSource}; transfer ${trafficSource}.`;
      return `
        <article class="focus-provider-card">
          <div class="focus-provider-head">
            <h4>${label}</h4>
            <span class="status-pill ${
              sourceLabel === "HARDCODED" ? "hardcoded" : ""
            }">${sourceLabel}</span>
          </div>
          <p class="subtle">API pricing for VPC/VNet, VPC/VPN gateway, and load balancer.</p>
          <p class="subtle">${sourceDetail}</p>
          <div class="row3">
            <label>
              VPC / VNet flavor
              <select name="${prefix}NetworkVpcFlavor" form="pricing-form">${buildOptionHtml(
                vpcOptions,
                vpcValue
              )}</select>
            </label>
            <label>
              Count
              <input type="number" name="${prefix}NetworkVpcCount" form="pricing-form" min="0" step="1" value="${vpcCount}" />
            </label>
            <label>
              Data (TB)
              <input type="number" name="${prefix}NetworkVpcDataTb" form="pricing-form" min="0" step="0.1" value="${vpcData}" />
            </label>
          </div>
          <div class="row3">
            <label>
              VPC/VPN gateway
              <select name="${prefix}NetworkGatewayFlavor" form="pricing-form">${buildOptionHtml(
                gatewayOptions,
                gatewayValue
              )}</select>
            </label>
            <label>
              Count
              <input type="number" name="${prefix}NetworkGatewayCount" form="pricing-form" min="0" step="1" value="${gatewayCount}" />
            </label>
            <label>
              Data (TB)
              <input type="number" name="${prefix}NetworkGatewayDataTb" form="pricing-form" min="0" step="0.1" value="${gatewayData}" />
            </label>
          </div>
          <div class="row3">
            <label>
              Load balancer
              <select name="${prefix}NetworkLoadBalancerFlavor" form="pricing-form">${buildOptionHtml(
                lbOptions,
                lbValue
              )}</select>
            </label>
            <label>
              Count
              <input type="number" name="${prefix}NetworkLoadBalancerCount" form="pricing-form" min="0" step="1" value="${lbCount}" />
            </label>
            <label>
              Data (TB)
              <input type="number" name="${prefix}NetworkLoadBalancerDataTb" form="pricing-form" min="0" step="0.1" value="${lbData}" />
            </label>
          </div>
          <div class="focus-provider-summary">
            <div><span>VPC / VNet monthly</span><strong>${formatMoney(vpcMonthly)}</strong></div>
            <div><span>VPC/VPN gateway monthly</span><strong>${formatMoney(gatewayMonthly)}</strong></div>
            <div><span>LB monthly</span><strong>${formatMoney(lbMonthly)}</strong></div>
            <div><span>Total networking</span><strong>${formatMoney(providerTotal)}</strong></div>
          </div>
        </article>`;
    })
    .join("");
  networkProviderCards.innerHTML = html;
}

function renderStorageProviderCards(data) {
  if (!storageProviderCards) {
    return;
  }
  const input = data?.input || {};
  const providers = [
    { key: "aws", label: "AWS", provider: data?.aws },
    { key: "azure", label: "Azure", provider: data?.azure },
    { key: "gcp", label: "GCP", provider: data?.gcp },
  ];
  const html = providers
    .map(({ key, label, provider }) => {
      const prefix = key;
      const accounts = Number.isFinite(input[`${prefix}StorageAccountCount`])
        ? input[`${prefix}StorageAccountCount`]
        : 1;
      const drEnabled = Boolean(input[`${prefix}StorageDrEnabled`]);
      const drDelta = Number.isFinite(input[`${prefix}StorageDrDeltaTb`])
        ? input[`${prefix}StorageDrDeltaTb`]
        : 0;
      const objectTb = Number.isFinite(input[`${prefix}StorageObjectTb`])
        ? input[`${prefix}StorageObjectTb`]
        : 0;
      const fileTb = Number.isFinite(input[`${prefix}StorageFileTb`])
        ? input[`${prefix}StorageFileTb`]
        : 0;
      const tableTb = Number.isFinite(input[`${prefix}StorageTableTb`])
        ? input[`${prefix}StorageTableTb`]
        : 0;
      const queueTb = Number.isFinite(input[`${prefix}StorageQueueTb`])
        ? input[`${prefix}StorageQueueTb`]
        : 0;
      const breakdown = provider?.storageServices || {};
      const total = provider?.totals?.total || 0;
      const sourceLabel = getStorageCardSourceLabel(
        {
          objectTb,
          fileTb,
          tableTb,
          queueTb,
          drEnabled,
          drDeltaTb: drDelta,
        },
        breakdown
      );
      const sourceMap = breakdown?.sources || {};
      const activeStorageKeys = [
        objectTb > 0 ? "object" : null,
        fileTb > 0 ? "file" : null,
        tableTb > 0 ? "table" : null,
        queueTb > 0 ? "queue" : null,
        drEnabled && drDelta > 0 ? "replication" : null,
      ].filter(Boolean);
      const fallbackKeys = activeStorageKeys.filter((keyName) =>
        isFallbackSource(sourceMap[keyName])
      );
      const sourceDetail = fallbackKeys.length
        ? `Source detail: fallback for ${fallbackKeys.join(", ")}.`
        : "Source detail: API for active services.";
      return `
        <article class="focus-provider-card">
          <div class="focus-provider-head">
            <h4>${label}</h4>
            <span class="status-pill ${
              sourceLabel === "HARDCODED" ? "hardcoded" : ""
            }">${sourceLabel}</span>
          </div>
          <p class="subtle">API pricing for object, file, table, queue, and DR delta replication.</p>
          <p class="subtle">${sourceDetail}</p>
          <div class="row1">
            <label>
              Storage accounts
              <input type="number" name="${prefix}StorageAccountCount" form="pricing-form" min="1" step="1" value="${accounts}" />
            </label>
          </div>
          <div class="row3">
            <label>
              Object (TB)
              <input type="number" name="${prefix}StorageObjectTb" form="pricing-form" min="0" step="0.1" value="${objectTb}" />
            </label>
            <label>
              File (TB)
              <input type="number" name="${prefix}StorageFileTb" form="pricing-form" min="0" step="0.1" value="${fileTb}" />
            </label>
            <label>
              Table (TB)
              <input type="number" name="${prefix}StorageTableTb" form="pricing-form" min="0" step="0.1" value="${tableTb}" />
            </label>
          </div>
          <div class="row3">
            <label>
              Queue (TB)
              <input type="number" name="${prefix}StorageQueueTb" form="pricing-form" min="0" step="0.1" value="${queueTb}" />
            </label>
            <label>
              DR replication
              <input type="checkbox" name="${prefix}StorageDrEnabled" form="pricing-form" ${
                drEnabled ? "checked" : ""
              } />
            </label>
            <label>
              DR delta (TB)
              <input type="number" name="${prefix}StorageDrDeltaTb" form="pricing-form" min="0" step="0.1" value="${drDelta}" />
            </label>
          </div>
          <div class="focus-provider-summary">
            <div><span>Object monthly</span><strong>${formatMoney(
              breakdown.objectMonthly || 0
            )}</strong></div>
            <div><span>File monthly</span><strong>${formatMoney(
              breakdown.fileMonthly || 0
            )}</strong></div>
            <div><span>Table monthly</span><strong>${formatMoney(
              breakdown.tableMonthly || 0
            )}</strong></div>
            <div><span>Queue monthly</span><strong>${formatMoney(
              breakdown.queueMonthly || 0
            )}</strong></div>
            <div><span>Replication monthly</span><strong>${formatMoney(
              breakdown.replicationMonthly || 0
            )}</strong></div>
            <div><span>Total storage</span><strong>${formatMoney(total)}</strong></div>
          </div>
        </article>`;
    })
    .join("");
  storageProviderCards.innerHTML = html;
}

function renderNetworkFocusTable(data) {
  if (!networkFocusTable) {
    return;
  }
  renderNetworkProviderCards(data);
  const focus = normalizeNetworkAddonFocus(
    data?.input?.networkAddonFocus || currentNetworkResult
  );
  const addonLabel =
    focus === "gateway"
      ? "VPC/VPN gateway"
      : focus === "loadBalancer"
      ? "Load balancer"
      : "VPC / VNet";
  const providers = [
    { label: "AWS", provider: data.aws },
    { label: "Azure", provider: data.azure },
    { label: "GCP", provider: data.gcp },
  ];
  const rows = providers.map(({ label, provider }) => {
    const item = Array.isArray(provider?.networkAddons?.items)
      ? provider.networkAddons.items.find((entry) => entry.addonKey === focus)
      : null;
    const totals = provider?.totals || {};
    return `
      <tr>
        <td>${label}</td>
        <td>${item?.label || "None"}</td>
        <td>${item?.count || 0}</td>
        <td>${item?.dataTb || 0}</td>
        <td>${formatMoney(item?.monthlyTotal || 0)}</td>
        <td>${formatMoney(totals.interVlanMonthly || 0)}</td>
        <td>${formatMoney(totals.intraVlanMonthly || 0)}</td>
        <td>${formatMoney(totals.interRegionMonthly || 0)}</td>
        <td>${formatMoney(totals.egressMonthly || 0)}</td>
        <td><strong>${formatMoney(totals.total || 0)}</strong></td>
      </tr>`;
  });
  networkFocusTable.innerHTML = `
    <table class="focus-table">
      <thead>
        <tr>
          <th>Provider</th>
          <th>${addonLabel} option</th>
          <th>Count</th>
          <th>Data (TB)</th>
          <th>${addonLabel} monthly</th>
          <th>Inter-VLAN</th>
          <th>Intra-VLAN</th>
          <th>Inter-region</th>
          <th>Egress</th>
          <th>Total networking</th>
        </tr>
      </thead>
      <tbody>
        ${rows.join("")}
      </tbody>
    </table>`;
}

function renderStorageFocusTable(data) {
  if (!storageFocusTable) {
    return;
  }
  renderStorageProviderCards(data);
  const isPerformance = currentStorageResult === "performance";
  const providers = [
    { label: "AWS", provider: data.aws },
    { label: "Azure", provider: data.azure },
    { label: "GCP", provider: data.gcp },
  ];
  const rows = providers.map(({ label, provider }) => {
    const totals = provider?.totals || {};
    const breakdown = provider?.storageServices || {};
    if (isPerformance) {
      return `
        <tr>
          <td>${label}</td>
          <td>${breakdown.drEnabled ? "Enabled" : "Disabled"}</td>
          <td>${breakdown.drDeltaTb || 0}</td>
          <td>${formatMoney(breakdown.replicationMonthly || totals.egressMonthly || 0)}</td>
          <td><strong>${formatMoney(totals.total || 0)}</strong></td>
        </tr>`;
    }
    return `
      <tr>
        <td>${label}</td>
        <td>${formatMoney(breakdown.objectMonthly || 0)}</td>
        <td>${formatMoney(breakdown.fileMonthly || 0)}</td>
        <td>${formatMoney(breakdown.tableMonthly || 0)}</td>
        <td>${formatMoney(breakdown.queueMonthly || 0)}</td>
        <td><strong>${formatMoney(totals.total || 0)}</strong></td>
      </tr>`;
  });
  storageFocusTable.innerHTML = `
    <table class="focus-table">
      <thead>
        <tr>
          <th>Provider</th>
          ${
            isPerformance
              ? "<th>DR replication</th><th>DR delta (TB)</th><th>Replication monthly</th><th>Total storage</th>"
              : "<th>Object</th><th>File</th><th>Table</th><th>Queue</th><th>Total storage</th>"
          }
        </tr>
      </thead>
      <tbody>
        ${rows.join("")}
      </tbody>
    </table>`;
}

async function comparePricing(payload) {
  const response = await fetch("/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Pricing request failed.");
  }
  return response.json();
}

function buildRegionChecklist() {
  if (!vendorRegionPicker || !regionSelect) {
    return;
  }
  vendorRegionPicker.innerHTML = "";
  const options = Array.from(regionSelect.options);
  const defaults = new Set();
  if (regionSelect.value) {
    defaults.add(regionSelect.value);
  }
  options.forEach((option) => {
    if (defaults.size < 3) {
      defaults.add(option.value);
    }
  });
  options.forEach((option) => {
    const label = document.createElement("label");
    label.className = "region-option";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = option.value;
    checkbox.checked = defaults.has(option.value);
    const text = document.createElement("span");
    text.textContent = option.textContent;
    label.appendChild(checkbox);
    label.appendChild(text);
    vendorRegionPicker.appendChild(label);
  });
}

function getSelectedRegionKeys() {
  if (!vendorRegionPicker) {
    return [];
  }
  const inputs = vendorRegionPicker.querySelectorAll(
    "input[type='checkbox']"
  );
  return Array.from(inputs)
    .filter((input) => input.checked)
    .map((input) => input.value);
}

function getRegionLabel(regionKey) {
  if (!regionSelect) {
    return regionKey;
  }
  const option = Array.from(regionSelect.options).find(
    (item) => item.value === regionKey
  );
  return option ? option.textContent : regionKey;
}

function getPrimaryInstanceType(providerKey) {
  const stored = Array.isArray(vendorOptionState[providerKey])
    ? vendorOptionState[providerKey]
    : [];
  if (stored.length) {
    return stored[0];
  }
  const select = getProviderSelect(providerKey);
  return select?.value || "";
}

async function runRegionCompare() {
  if (!vendorRegionTable || !vendorRegionNote) {
    return;
  }
  const providerKey = currentView;
  if (
    providerKey !== "aws" &&
    providerKey !== "azure" &&
    providerKey !== "gcp"
  ) {
    return;
  }
  const selectedRegions = getSelectedRegionKeys();
  if (selectedRegions.length < 3 || selectedRegions.length > 5) {
    vendorRegionNote.textContent = "Select 3 to 5 regions to compare.";
    vendorRegionNote.classList.add("negative");
    return;
  }
  vendorRegionNote.classList.remove("negative");
  vendorRegionNote.textContent = "Running region compare...";
  const basePayload = serializeForm(form);
  const instanceType = getPrimaryInstanceType(providerKey);
  const results = await Promise.all(
    selectedRegions.map(async (regionKey) => {
      const payload = { ...basePayload, regionKey };
      if (providerKey === "aws") {
        payload.awsInstanceType = instanceType;
      }
      if (providerKey === "azure") {
        payload.azureInstanceType = instanceType;
      }
      if (providerKey === "gcp") {
        payload.gcpInstanceType = instanceType;
      }
      try {
        const data = await comparePricing(payload);
        return { regionKey, data };
      } catch (error) {
        return {
          regionKey,
          error: error?.message || "Pricing request failed.",
        };
      }
    })
  );
  renderRegionCompareTable(results, providerKey);
  vendorRegionNote.textContent = "Region compare updated.";
}

function renderRegionCompareTable(rows, providerKey) {
  if (!vendorRegionTable) {
    return;
  }
  vendorRegionTable.innerHTML = "";
  if (!rows.length) {
    vendorRegionTable.textContent = "No region results yet.";
    return;
  }
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  ["Region", "On-demand", "1-year", "3-year", "Compute rate"].forEach(
    (label) => {
      const cell = document.createElement("th");
      cell.textContent = label;
      headRow.appendChild(cell);
    }
  );
  head.appendChild(headRow);
  table.appendChild(head);
  const body = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const regionCell = document.createElement("td");
    const location =
      row.data?.region?.[providerKey]?.location ||
      getRegionLabel(row.regionKey);
    regionCell.textContent = location;
    tr.appendChild(regionCell);

    if (row.error) {
      const errorCell = document.createElement("td");
      errorCell.textContent = row.error;
      errorCell.colSpan = 4;
      tr.appendChild(errorCell);
      body.appendChild(tr);
      return;
    }

    const provider = row.data?.[providerKey];
    const onDemandTier = provider?.pricingTiers?.onDemand;
    const onDemandTotal = onDemandTier?.totals?.total;
    const year1Total = provider?.pricingTiers?.reserved1yr?.totals?.total;
    const year3Total = provider?.pricingTiers?.reserved3yr?.totals?.total;
    const hourlyRate = onDemandTier?.hourlyRate ?? provider?.hourlyRate;

    [onDemandTotal, year1Total, year3Total].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = formatMonthly(value);
      tr.appendChild(cell);
    });
    const rateCell = document.createElement("td");
    rateCell.textContent = formatRate(hourlyRate);
    tr.appendChild(rateCell);
    body.appendChild(tr);
  });
  table.appendChild(body);
  vendorRegionTable.appendChild(table);
}

async function refreshSavedCompare(options = {}) {
  if (!savedCompareTable || !savedCompareNote) {
    return;
  }
  if (!scenarioStore.length) {
    savedCompareRows = [];
    renderSavedCompareTable([]);
    savedCompareNote.textContent = "No saved scenarios yet.";
    savedCompareNote.classList.remove("negative");
    return;
  }
  const scenarioIds = Array.isArray(options.scenarioIds)
    ? options.scenarioIds
    : null;
  const selectedScenarios = scenarioIds
    ? scenarioStore.filter((scenario) => scenarioIds.includes(scenario.id))
    : scenarioStore;
  if (scenarioIds && !selectedScenarios.length) {
    savedCompareRows = [];
    renderSavedCompareTable([]);
    savedCompareNote.textContent = "Select scenarios to compare.";
    savedCompareNote.classList.add("negative");
    return;
  }
  savedCompareNote.textContent = `Running ${selectedScenarios.length} scenarios...`;
  savedCompareNote.classList.remove("negative");
  const rows = [];
  for (const scenario of selectedScenarios) {
    try {
      const data = await comparePricing(scenario.input);
      rows.push({ scenario, data });
    } catch (error) {
      rows.push({
        scenario,
        error: error?.message || "Pricing request failed.",
      });
    }
  }
  savedCompareRows = rows;
  renderSavedCompareTable(rows);
  const hasError = rows.some((row) => row.error);
  const successfulRows = rows.filter((row) => row.data && !row.error);
  savedCompareNote.textContent = hasError
    ? `Saved compare updated with errors (${successfulRows.length}/${rows.length} succeeded).`
    : `Saved compare updated (${successfulRows.length} scenarios).`;
  savedCompareNote.classList.toggle("negative", hasError);
}

function renderSavedCompareTable(rows) {
  if (!savedCompareTable) {
    return;
  }
  savedCompareTable.innerHTML = "";
  if (!rows.length) {
    savedCompareTable.textContent = "No saved scenarios to display.";
    return;
  }
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  [
    "Scenario",
    "Mode",
    "Region",
    "AWS",
    "Azure",
    "GCP",
    "Private",
    "Status",
    "Actions",
  ].forEach((label) => {
    const cell = document.createElement("th");
    cell.textContent = label;
    headRow.appendChild(cell);
  });
  head.appendChild(headRow);
  table.appendChild(head);
  const body = document.createElement("tbody");
  const totals = { aws: 0, azure: 0, gcp: 0, private: 0, count: 0 };
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const input = row.data?.input || row.scenario.input || {};
    const mode = getScenarioDisplayMode(input);
    const regionLabel = getRegionLabel(input.regionKey || "");
    const awsTotal = row.data ? getScenarioProviderTotal(row.data, "aws") : null;
    const azureTotal = row.data
      ? getScenarioProviderTotal(row.data, "azure")
      : null;
    const gcpTotal = row.data ? getScenarioProviderTotal(row.data, "gcp") : null;
    const privateTotal = row.data
      ? getScenarioProviderTotal(row.data, "private")
      : null;
    if (Number.isFinite(awsTotal)) {
      totals.aws += awsTotal;
    }
    if (Number.isFinite(azureTotal)) {
      totals.azure += azureTotal;
    }
    if (Number.isFinite(gcpTotal)) {
      totals.gcp += gcpTotal;
    }
    if (Number.isFinite(privateTotal)) {
      totals.private += privateTotal;
    }
    if (
      Number.isFinite(awsTotal) ||
      Number.isFinite(azureTotal) ||
      Number.isFinite(gcpTotal) ||
      Number.isFinite(privateTotal)
    ) {
      totals.count += 1;
    }

    [
      row.scenario.name,
      mode,
      regionLabel,
      formatMonthly(awsTotal),
      formatMonthly(azureTotal),
      formatMonthly(gcpTotal),
      formatMonthly(privateTotal),
      row.error ? row.error : "OK",
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value || "-";
      tr.appendChild(cell);
    });
    const actionCell = document.createElement("td");
    const exportJsonButton = document.createElement("button");
    exportJsonButton.type = "button";
    exportJsonButton.className = "table-action";
    exportJsonButton.textContent = "Export JSON";
    exportJsonButton.addEventListener("click", () => {
      handleExportScenario(row.scenario, savedCompareNote);
    });

    const exportCsvButton = document.createElement("button");
    exportCsvButton.type = "button";
    exportCsvButton.className = "table-action";
    exportCsvButton.textContent = "Export CSV";
    exportCsvButton.addEventListener("click", () => {
      handleExportScenarioCsv(row.scenario, savedCompareNote);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "table-action";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const confirmDelete = window.confirm(
        `Delete scenario "${row.scenario.name}"?`
      );
      if (!confirmDelete) {
        return;
      }
      const deletedName = deleteScenarioById(row.scenario.id);
      savedCompareRows = savedCompareRows.filter(
        (item) => item.scenario.id !== row.scenario.id
      );
      renderSavedCompareTable(savedCompareRows);
      if (savedCompareNote) {
        savedCompareNote.textContent = deletedName
          ? `Deleted "${deletedName}".`
          : "Scenario deleted.";
        savedCompareNote.classList.remove("negative");
      }
    });
    actionCell.appendChild(exportJsonButton);
    actionCell.appendChild(exportCsvButton);
    actionCell.appendChild(deleteButton);
    tr.appendChild(actionCell);
    body.appendChild(tr);
  });
  if (totals.count > 1) {
    const totalRow = document.createElement("tr");
    totalRow.className = "saved-compare-total";
    [
      "Portfolio total",
      "-",
      `${totals.count} scenarios`,
      formatMonthly(totals.aws),
      formatMonthly(totals.azure),
      formatMonthly(totals.gcp),
      formatMonthly(totals.private),
      "-",
      "-",
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value || "-";
      totalRow.appendChild(cell);
    });
    body.appendChild(totalRow);
  }
  table.appendChild(body);
  savedCompareTable.appendChild(table);
}

function getSavedCompareRow(id) {
  return savedCompareRows.find(
    (row) => row.scenario?.id === id && row.data && !row.error
  );
}

function getPrivateSharedNetworkMonthly(config) {
  if (!config || typeof config !== "object") {
    return 0;
  }
  const network = Number.parseFloat(config.networkMonthly);
  const firewall = Number.parseFloat(config.firewallMonthly);
  const loadBalancer = Number.parseFloat(config.loadBalancerMonthly);
  const total =
    (Number.isFinite(network) ? network : 0) +
    (Number.isFinite(firewall) ? firewall : 0) +
    (Number.isFinite(loadBalancer) ? loadBalancer : 0);
  return total > 0 ? total : 0;
}

function applySharedPrivateNetworkOnce(rows, privateProviders) {
  if (!Array.isArray(rows) || !rows.length || !Array.isArray(privateProviders)) {
    return;
  }
  privateProviders.forEach((provider) => {
    const sharedNetworkMonthly = getPrivateSharedNetworkMonthly(provider?.config);
    if (!Number.isFinite(sharedNetworkMonthly) || sharedNetworkMonthly <= 0) {
      return;
    }
    const applicableRows = rows
      .map((row) => {
        const breakdown = row?.privateBreakdowns?.[provider.id];
        if (!breakdown || row?.privateErrors?.[provider.id]) {
          return null;
        }
        const total = Number.isFinite(breakdown.total) ? breakdown.total : null;
        const networkMonthly = Number.isFinite(breakdown.networkMonthly)
          ? breakdown.networkMonthly
          : 0;
        if (!Number.isFinite(total) || networkMonthly <= 0) {
          return null;
        }
        const baseTotal = Math.max(0, total - networkMonthly);
        return {
          row,
          baseTotal,
        };
      })
      .filter(Boolean);
    if (applicableRows.length <= 1) {
      return;
    }
    const baseSum = applicableRows.reduce(
      (sum, entry) => sum + entry.baseTotal,
      0
    );
    let allocated = 0;
    applicableRows.forEach((entry, index) => {
      const isLast = index === applicableRows.length - 1;
      const share = isLast
        ? Math.max(0, sharedNetworkMonthly - allocated)
        : baseSum > 0
        ? (sharedNetworkMonthly * entry.baseTotal) / baseSum
        : sharedNetworkMonthly / applicableRows.length;
      allocated += share;
      const breakdown = entry.row.privateBreakdowns[provider.id];
      const nextTotal = entry.baseTotal + share;
      entry.row.privateBreakdowns[provider.id] = {
        ...breakdown,
        networkMonthly: share,
        total: nextTotal,
      };
      entry.row.privateTotals[provider.id] = nextTotal;
    });
  });
}

async function runSavedPrivateCompare() {
  if (!savedComparePrivateTable || !savedComparePrivateNote) {
    return;
  }
  const scenarioIds = resolveScenarioSelections();
  if (!scenarioIds.length) {
    savedComparePrivateRows = [];
    renderSavedPrivateCompareTable([], []);
    savedComparePrivateNote.textContent =
      "Select scenarios to compare against private providers.";
    savedComparePrivateNote.classList.add("negative");
    return;
  }
  const privateIds = resolvePrivateSelections();
  if (!privateIds.length) {
    savedComparePrivateRows = [];
    renderSavedPrivateCompareTable([], []);
    savedComparePrivateNote.textContent =
      "Select at least one private provider.";
    savedComparePrivateNote.classList.add("negative");
    return;
  }
  const scenarios = scenarioStore.filter((scenario) =>
    scenarioIds.includes(scenario.id)
  );
  const privateProviders = privateIds
    .map((id) => getPrivateProviderById(id))
    .filter(Boolean);
  if (!privateProviders.length) {
    savedComparePrivateRows = [];
    renderSavedPrivateCompareTable([], []);
    savedComparePrivateNote.textContent = "No private providers selected.";
    savedComparePrivateNote.classList.add("negative");
    return;
  }
  savedComparePrivateNote.textContent = `Running ${scenarios.length} scenarios across ${privateProviders.length} providers...`;
  savedComparePrivateNote.classList.remove("negative");
  const rows = [];
  for (const scenario of scenarios) {
    const input = scenario.input || {};
    let data = getSavedCompareRow(scenario.id)?.data || null;
    let errorMessage = "";
    if (!data) {
      try {
        data = await comparePricing(input);
      } catch (error) {
        errorMessage = error?.message || "Pricing request failed.";
      }
    }
    const row = {
      scenario,
      data,
      error: errorMessage,
      privateTotals: {},
      privateBreakdowns: {},
      privateErrors: {},
    };
    const privateResults = await Promise.all(
      privateProviders.map(async (provider) => {
        const payload = applyPrivateConfigToPayload(
          input,
          provider.config,
          { forceEnable: true }
        );
        try {
          const privateData = await comparePricing(payload);
          const totals = getScenarioProviderTotals(privateData, "private");
          return {
            id: provider.id,
            total: Number.isFinite(totals?.total) ? totals.total : null,
            totals,
          };
        } catch (error) {
          return {
            id: provider.id,
            error: error?.message || "Private pricing failed.",
          };
        }
      })
    );
    privateResults.forEach((result) => {
      if (result.error) {
        row.privateErrors[result.id] = result.error;
        row.privateTotals[result.id] = null;
        row.privateBreakdowns[result.id] = null;
      } else {
        row.privateTotals[result.id] = result.total;
        row.privateBreakdowns[result.id] = result.totals || null;
      }
    });
    rows.push(row);
  }
  applySharedPrivateNetworkOnce(rows, privateProviders);
  savedComparePrivateRows = rows;
  renderSavedPrivateCompareTable(rows, privateProviders);
  const hasError = rows.some(
    (row) =>
      row.error ||
      Object.values(row.privateErrors).some((value) => value)
  );
  const hasSharedPrivateNetwork =
    scenarios.length > 1 &&
    privateProviders.some(
      (provider) => getPrivateSharedNetworkMonthly(provider?.config) > 0
    );
  savedComparePrivateNote.textContent = hasError
    ? "Private vs public compare completed with errors."
    : hasSharedPrivateNetwork
    ? "Private vs public compare updated. Shared private networking is charged once per provider."
    : "Private vs public compare updated.";
  savedComparePrivateNote.classList.toggle("negative", hasError);
}

function renderSavedPrivateCompareTable(rows, privateProviders) {
  if (!savedComparePrivateTable) {
    return;
  }
  savedComparePrivateTable.innerHTML = "";
  if (!rows.length) {
    savedComparePrivateTable.textContent = "No private compare results yet.";
    return;
  }
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  const privateHeaders = privateProviders.map((provider) => provider.name);
  [
    "Scenario",
    "Mode / Component",
    "Region",
    "AWS",
    "Azure",
    "GCP",
    ...privateHeaders,
    "Status",
  ].forEach((label) => {
    const cell = document.createElement("th");
    cell.textContent = label;
    headRow.appendChild(cell);
  });
  head.appendChild(headRow);
  table.appendChild(head);
  const body = document.createElement("tbody");
  const totals = {
    aws: 0,
    azure: 0,
    gcp: 0,
    private: {},
  };
  privateProviders.forEach((provider) => {
    totals.private[provider.id] = 0;
  });
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.className = "saved-compare-summary";
    const input = row.data?.input || row.scenario.input || {};
    const mode = getScenarioDisplayMode(input);
    const regionLabel = getRegionLabel(input.regionKey || "");
    const awsTotal = row.data ? getScenarioProviderTotal(row.data, "aws") : null;
    const azureTotal = row.data
      ? getScenarioProviderTotal(row.data, "azure")
      : null;
    const gcpTotal = row.data ? getScenarioProviderTotal(row.data, "gcp") : null;
    [
      row.scenario.name,
      mode,
      regionLabel,
      formatMonthly(awsTotal),
      formatMonthly(azureTotal),
      formatMonthly(gcpTotal),
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value || "-";
      tr.appendChild(cell);
    });
    if (Number.isFinite(awsTotal)) {
      totals.aws += awsTotal;
    }
    if (Number.isFinite(azureTotal)) {
      totals.azure += azureTotal;
    }
    if (Number.isFinite(gcpTotal)) {
      totals.gcp += gcpTotal;
    }
    privateProviders.forEach((provider) => {
      const cell = document.createElement("td");
      const total = row.privateTotals[provider.id];
      if (row.privateErrors[provider.id]) {
        cell.textContent = "ERR";
      } else {
        cell.textContent = formatMonthly(total);
      }
      tr.appendChild(cell);
      if (Number.isFinite(total)) {
        totals.private[provider.id] += total;
      }
    });
    const statusCell = document.createElement("td");
    const hasPrivateError = Object.values(row.privateErrors).some(Boolean);
    statusCell.textContent = row.error
      ? row.error
      : hasPrivateError
      ? "Partial"
      : "OK";
    tr.appendChild(statusCell);
    body.appendChild(tr);

    const awsTotals = row.data
      ? getScenarioProviderTotals(row.data, "aws")
      : null;
    const azureTotals = row.data
      ? getScenarioProviderTotals(row.data, "azure")
      : null;
    const gcpTotals = row.data
      ? getScenarioProviderTotals(row.data, "gcp")
      : null;
    const privateTotals = row.privateBreakdowns || {};

    SCENARIO_BREAKDOWN_COMPONENTS.forEach((component) => {
      const componentValues = [
        getScenarioComponentValue(awsTotals, component.field),
        getScenarioComponentValue(azureTotals, component.field),
        getScenarioComponentValue(gcpTotals, component.field),
        ...privateProviders.map((provider) =>
          getScenarioComponentValue(
            privateTotals[provider.id],
            component.field
          )
        ),
      ];
      if (!componentValues.some((value) => Number.isFinite(value))) {
        return;
      }
      const detailRow = document.createElement("tr");
      detailRow.className = "saved-compare-breakdown";
      const scenarioCell = document.createElement("td");
      scenarioCell.textContent = "";
      detailRow.appendChild(scenarioCell);
      const componentCell = document.createElement("td");
      componentCell.textContent = component.label;
      componentCell.className = "saved-compare-component";
      detailRow.appendChild(componentCell);
      const regionCell = document.createElement("td");
      regionCell.textContent = "";
      detailRow.appendChild(regionCell);
      [
        getScenarioComponentValue(awsTotals, component.field),
        getScenarioComponentValue(azureTotals, component.field),
        getScenarioComponentValue(gcpTotals, component.field),
      ].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = formatMonthly(value);
        detailRow.appendChild(cell);
      });
      privateProviders.forEach((provider) => {
        const cell = document.createElement("td");
        const value = getScenarioComponentValue(
          privateTotals[provider.id],
          component.field
        );
        cell.textContent = formatMonthly(value);
        detailRow.appendChild(cell);
      });
      const statusDetailCell = document.createElement("td");
      statusDetailCell.textContent = "";
      detailRow.appendChild(statusDetailCell);
      body.appendChild(detailRow);
    });
  });
  const totalRow = document.createElement("tr");
  totalRow.className = "saved-compare-total";
  [
    "Total",
    "-",
    "-",
    formatMonthly(totals.aws),
    formatMonthly(totals.azure),
    formatMonthly(totals.gcp),
  ].forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value || "-";
    totalRow.appendChild(cell);
  });
  privateProviders.forEach((provider) => {
    const cell = document.createElement("td");
    cell.textContent = formatMonthly(totals.private[provider.id]);
    totalRow.appendChild(cell);
  });
  const statusCell = document.createElement("td");
  statusCell.textContent = "-";
  totalRow.appendChild(statusCell);
  body.appendChild(totalRow);
  table.appendChild(body);
  savedComparePrivateTable.appendChild(table);
}

function buildSavedCompareCsv(rows) {
  const headers = [
    "Scenario",
    "Mode",
    "Region",
    "AWS_On_Demand",
    "Azure_On_Demand",
    "GCP_On_Demand",
    "Private_On_Demand",
    "Status",
  ];
  const lines = [headers.join(",")];
  const totals = { aws: 0, azure: 0, gcp: 0, private: 0, count: 0 };
  rows.forEach((row) => {
    const input = row.data?.input || row.scenario.input || {};
    const regionLabel = getRegionLabel(input.regionKey || "");
    const awsTotal = row.data ? getScenarioProviderTotal(row.data, "aws") : "";
    const azureTotal = row.data ? getScenarioProviderTotal(row.data, "azure") : "";
    const gcpTotal = row.data ? getScenarioProviderTotal(row.data, "gcp") : "";
    const privateTotal = row.data
      ? getScenarioProviderTotal(row.data, "private")
      : "";
    const line = [
      row.scenario.name,
      input.mode || "vm",
      regionLabel,
      awsTotal,
      azureTotal,
      gcpTotal,
      privateTotal,
      row.error ? row.error : "OK",
    ];
    if (Number.isFinite(awsTotal)) {
      totals.aws += awsTotal;
    }
    if (Number.isFinite(azureTotal)) {
      totals.azure += azureTotal;
    }
    if (Number.isFinite(gcpTotal)) {
      totals.gcp += gcpTotal;
    }
    if (Number.isFinite(privateTotal)) {
      totals.private += privateTotal;
    }
    if (
      Number.isFinite(awsTotal) ||
      Number.isFinite(azureTotal) ||
      Number.isFinite(gcpTotal) ||
      Number.isFinite(privateTotal)
    ) {
      totals.count += 1;
    }
    lines.push(line.map((value) => escapeCsv(value)).join(","));
  });
  if (totals.count > 1) {
    lines.push(
      [
        "Portfolio total",
        "-",
        `${totals.count} scenarios`,
        totals.aws,
        totals.azure,
        totals.gcp,
        totals.private,
        "-",
      ]
        .map((value) => escapeCsv(value))
        .join(",")
    );
  }
  return lines.join("\n");
}

function deleteScenarioById(id) {
  const scenario = getScenarioById(id);
  if (!scenario) {
    return null;
  }
  scenarioStore = scenarioStore.filter((item) => item.id !== id);
  persistScenarioStore(scenarioStore);
  renderScenarioList();
  if (scenarioList && scenarioList.value === id) {
    scenarioList.value = "";
  }
  if (scenarioNameInput && scenarioNameInput.value === scenario.name) {
    scenarioNameInput.value = "";
  }
  return scenario.name;
}

function buildInsightBuckets(totals, focus = "all") {
  if (!totals || !Number.isFinite(totals.total)) {
    return null;
  }
  if (focus === "network") {
    const networkAddons = totals.networkMonthly || 0;
    const transfer =
      (totals.interVlanMonthly || 0) +
      (totals.intraVlanMonthly || 0) +
      (totals.interRegionMonthly || 0);
    const egress = totals.egressMonthly || 0;
    const total = networkAddons + transfer + egress;
    return {
      compute: networkAddons,
      storage: transfer,
      egress,
      licenses: 0,
      total,
      labels: {
        compute: "Network add-ons",
        storage: "VLAN + Inter-region",
        egress: "Egress",
        licenses: "Other",
      },
    };
  }
  if (focus === "storage") {
    const capacity = totals.storageMonthly || 0;
    const replication = totals.egressMonthly || 0;
    const total = capacity + replication;
    return {
      compute: capacity,
      storage: replication,
      egress: 0,
      licenses: 0,
      total,
      labels: {
        compute: "Storage services",
        storage: "DR replication",
        egress: "Other",
        licenses: "Other",
      },
    };
  }
  const compute =
    (totals.computeMonthly || 0) +
    (totals.controlPlaneMonthly || 0) +
    (totals.networkMonthly || 0) +
    (totals.drMonthly || 0);
  const storage = (totals.storageMonthly || 0) + (totals.backupMonthly || 0);
  const egress = totals.egressMonthly || 0;
  const licenses =
    (totals.sqlMonthly || 0) + (totals.windowsLicenseMonthly || 0);
  const total = compute + storage + egress + licenses;
  return {
    compute,
    storage,
    egress,
    licenses,
    total,
    labels: {
      compute: "Compute",
      storage: "Storage",
      egress: "Egress",
      licenses: "Licenses",
    },
  };
}

function renderInsightTo(targetChart, targetNote, data, focusOverride = null) {
  if (!targetChart || !targetNote) {
    return;
  }
  targetChart.innerHTML = "";
  if (!data) {
    targetNote.textContent = "Run a comparison to generate insights.";
    return;
  }
  const pricingFocus = focusOverride || data.input?.pricingFocus || "all";
  const mode = data.input?.mode || "vm";
  const providers = [
    { key: "aws", label: getProviderLabelForMode("aws", mode), data: data.aws },
    {
      key: "azure",
      label: getProviderLabelForMode("azure", mode),
      data: data.azure,
    },
    { key: "gcp", label: getProviderLabelForMode("gcp", mode), data: data.gcp },
  ];
  if (data.private?.enabled) {
    providers.push({
      key: "private",
      label: getProviderLabelForMode("private", mode),
      data: data.private,
    });
  }
  const cards = providers
    .map((provider) => {
      const totals =
        provider.data?.pricingTiers?.onDemand?.totals || provider.data?.totals;
      const buckets = buildInsightBuckets(totals, pricingFocus);
      if (!buckets) {
        return null;
      }
      return { provider, buckets };
    })
    .filter(Boolean);
  if (!cards.length) {
    targetNote.textContent = "No pricing data available for insights.";
    return;
  }
  cards.forEach(({ provider, buckets }) => {
    const card = document.createElement("div");
    card.className = "insight-card";
    const header = document.createElement("div");
    header.className = "insight-card-header";
    const title = document.createElement("h4");
    title.textContent = provider.label;
    const total = document.createElement("span");
    total.textContent = formatMonthly(buckets.total);
    header.appendChild(title);
    header.appendChild(total);
    const bar = document.createElement("div");
    bar.className = "insight-bar";
    const segments = [
      { key: "compute", value: buckets.compute },
      { key: "storage", value: buckets.storage },
      { key: "egress", value: buckets.egress },
      { key: "licenses", value: buckets.licenses },
    ];
    segments.forEach((segment) => {
      const span = document.createElement("span");
      span.className = `insight-segment ${segment.key}`;
      const width =
        buckets.total > 0 ? (segment.value / buckets.total) * 100 : 0;
      span.style.width = `${Math.max(0, width)}%`;
      bar.appendChild(span);
    });
    const metrics = document.createElement("div");
    metrics.className = "insight-metrics";
    const metricItems = [
      [buckets.labels?.compute || "Compute", buckets.compute],
      [buckets.labels?.storage || "Storage", buckets.storage],
      [buckets.labels?.egress || "Egress", buckets.egress],
      [buckets.labels?.licenses || "Licenses", buckets.licenses],
    ];
    metricItems.forEach(([label, value]) => {
      const item = document.createElement("div");
      const text = document.createElement("span");
      text.textContent = `${label}: `;
      const amount = document.createElement("strong");
      amount.textContent = formatMonthly(value);
      item.appendChild(text);
      item.appendChild(amount);
      metrics.appendChild(item);
    });
    card.appendChild(header);
    card.appendChild(bar);
    card.appendChild(metrics);
    targetChart.appendChild(card);
  });
  if (pricingFocus === "network") {
    targetNote.textContent =
      "Networking focus breakdown uses on-demand totals (network add-ons, inter/intra VLAN, inter-region transfer, egress).";
    return;
  }
  if (pricingFocus === "storage") {
    targetNote.textContent =
      "Storage focus breakdown uses on-demand totals (storage services + DR replication).";
    return;
  }
  targetNote.textContent =
    "Breakdown uses on-demand totals (compute, storage, egress, licenses).";
}

function renderInsight(data) {
  renderInsightTo(insightChart, insightNote, data);
}

function renderFocusInsight(data, focus) {
  if (focus === "network") {
    renderInsightTo(networkInsightChart, networkInsightNote, data, "network");
    return;
  }
  if (focus === "storage") {
    renderInsightTo(storageInsightChart, storageInsightNote, data, "storage");
  }
}

function formatDateTime(value) {
  if (!value) {
    return "n/a";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "n/a";
  }
  return date.toLocaleString();
}

function getProviderRowsForPanels(data) {
  if (!data) {
    return [];
  }
  const mode = data.input?.mode || "vm";
  const rows = [
    { key: "aws", label: getProviderLabelForMode("aws", mode), provider: data.aws },
    {
      key: "azure",
      label: getProviderLabelForMode("azure", mode),
      provider: data.azure,
    },
    { key: "gcp", label: getProviderLabelForMode("gcp", mode), provider: data.gcp },
  ];
  if (data.private?.enabled && data.input?.pricingFocus === "all") {
    const privateName = getPrimaryPrivateProvider()?.name;
    rows.push({
      key: "private",
      label: privateName ? `Private (${privateName})` : "Private",
      provider: data.private,
    });
  }
  return rows;
}

function getProviderOnDemandTotals(provider) {
  return provider?.pricingTiers?.onDemand?.totals || provider?.totals || null;
}

function getNormalizationInfo(data, providerKey) {
  const input = data?.input || {};
  const focus = input.pricingFocus || "all";
  if (focus === "network") {
    const providerPrefix =
      providerKey === "aws" ? "aws" : providerKey === "azure" ? "azure" : "gcp";
    const totalTb =
      (Number.isFinite(input[`${providerPrefix}NetworkVpcDataTb`])
        ? input[`${providerPrefix}NetworkVpcDataTb`]
        : 0) +
      (Number.isFinite(input[`${providerPrefix}NetworkGatewayDataTb`])
        ? input[`${providerPrefix}NetworkGatewayDataTb`]
        : 0) +
      (Number.isFinite(input[`${providerPrefix}NetworkLoadBalancerDataTb`])
        ? input[`${providerPrefix}NetworkLoadBalancerDataTb`]
        : 0) +
      (Number.isFinite(input.interVlanTb) ? input.interVlanTb : 0) +
      (Number.isFinite(input.intraVlanTb) ? input.intraVlanTb : 0) +
      (Number.isFinite(input.interRegionTb) ? input.interRegionTb : 0) +
      (Number.isFinite(input.egressTb) ? input.egressTb : 0);
    if (totalTb > 0) {
      return { divisor: totalTb, label: "TB transfer" };
    }
    return { divisor: null, label: "TB transfer" };
  }
  if (focus === "storage") {
    const providerPrefix =
      providerKey === "aws" ? "aws" : providerKey === "azure" ? "azure" : "gcp";
    const objectTb = Number.isFinite(input[`${providerPrefix}StorageObjectTb`])
      ? input[`${providerPrefix}StorageObjectTb`]
      : 0;
    const fileTb = Number.isFinite(input[`${providerPrefix}StorageFileTb`])
      ? input[`${providerPrefix}StorageFileTb`]
      : 0;
    const tableTb = Number.isFinite(input[`${providerPrefix}StorageTableTb`])
      ? input[`${providerPrefix}StorageTableTb`]
      : 0;
    const queueTb = Number.isFinite(input[`${providerPrefix}StorageQueueTb`])
      ? input[`${providerPrefix}StorageQueueTb`]
      : 0;
    const drDeltaTb =
      input[`${providerPrefix}StorageDrEnabled`] &&
      Number.isFinite(input[`${providerPrefix}StorageDrDeltaTb`])
        ? input[`${providerPrefix}StorageDrDeltaTb`]
        : 0;
    const totalTb = objectTb + fileTb + tableTb + queueTb + drDeltaTb;
    if (totalTb > 0) {
      return { divisor: totalTb, label: "TB storage" };
    }
    return { divisor: null, label: "TB storage" };
  }
  const count = Number.isFinite(input.vmCount) ? input.vmCount : 0;
  const unitLabel = input.mode === "k8s" ? "node" : "VM";
  if (count > 0) {
    return { divisor: count, label: unitLabel };
  }
  return { divisor: null, label: unitLabel };
}

function renderDataQualityPanel(data) {
  if (!qualityMeta || !qualityList) {
    return;
  }
  if (!data) {
    qualityMeta.textContent = "Waiting for pricing...";
    qualityList.innerHTML = "";
    return;
  }
  const cacheMeta = data.notes?.cacheMeta || {};
  const refreshStatus = cacheMeta.refreshStatus || "unknown";
  qualityMeta.textContent = `Generated ${formatDateTime(
    cacheMeta.generatedAt
  )} | refresh: ${refreshStatus}`;
  const lines = [];
  if (data.notes?.cacheWarning) {
    lines.push(data.notes.cacheWarning);
  }
  if (Array.isArray(cacheMeta.staleCaches) && cacheMeta.staleCaches.length) {
    lines.push(`Stale caches: ${cacheMeta.staleCaches.join(", ")}.`);
  }
  const providerRows = getProviderRowsForPanels(data);
  providerRows.forEach(({ label, provider }) => {
    const computeSource = formatSourceDetail(
      provider?.pricingTiers?.onDemand?.source || provider?.source
    );
    const networkSource = summarizeItemSources(provider?.networkAddons?.items || []);
    const storageSourceValues = Object.values(provider?.storageServices?.sources || {});
    const storageSource = storageSourceValues.length
      ? summarizeItemSources(
          storageSourceValues.map((source) => ({ source }))
        )
      : "none";
    lines.push(
      `${label}: compute ${computeSource}, network ${networkSource}, storage ${storageSource}.`
    );
  });
  qualityList.innerHTML = "";
  lines.slice(0, QUALITY_WARNING_LIMIT).forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    qualityList.appendChild(item);
  });
  if (!lines.length) {
    const item = document.createElement("li");
    item.textContent = "No quality warnings for this result set.";
    qualityList.appendChild(item);
  }
}

function renderUnitEconomics(data) {
  if (!unitEconTable || !unitEconNote) {
    return;
  }
  if (!data) {
    unitEconTable.innerHTML = "";
    unitEconNote.textContent = "Per-provider normalized costs.";
    return;
  }
  const rows = getProviderRowsForPanels(data).map(({ key, label, provider }) => {
    const totals = getProviderOnDemandTotals(provider);
    const info = getNormalizationInfo(data, key);
    const total = Number.isFinite(totals?.total) ? totals.total : null;
    const normalized =
      Number.isFinite(total) && Number.isFinite(info.divisor) && info.divisor > 0
        ? total / info.divisor
        : null;
    const computeBase = Number.isFinite(totals?.computeMonthly)
      ? totals.computeMonthly
      : 0;
    const controlPlane = Number.isFinite(totals?.controlPlaneMonthly)
      ? totals.controlPlaneMonthly
      : 0;
    const compute = computeBase + controlPlane;
    const storage = Number.isFinite(totals?.storageMonthly)
      ? totals.storageMonthly
      : 0;
    const backups = Number.isFinite(totals?.backupMonthly)
      ? totals.backupMonthly
      : 0;
    const dr = Number.isFinite(totals?.drMonthly) ? totals.drMonthly : 0;
    const network = Number.isFinite(totals?.networkMonthly)
      ? totals.networkMonthly
      : 0;
    const egress = Number.isFinite(totals?.egressMonthly)
      ? totals.egressMonthly
      : 0;
    const licenses =
      (Number.isFinite(totals?.sqlMonthly) ? totals.sqlMonthly : 0) +
      (Number.isFinite(totals?.windowsLicenseMonthly)
        ? totals.windowsLicenseMonthly
        : 0);
    const trackedTotal =
      compute + storage + backups + dr + network + egress + licenses;
    let other = Number.isFinite(total) ? total - trackedTotal : 0;
    if (Math.abs(other) < 0.01) {
      other = 0;
    }
    const denominator = Number.isFinite(total) && total > 0 ? total : null;
    const share = (value) =>
      denominator ? `${((value / denominator) * 100).toFixed(1)}%` : "n/a";
    return {
      label,
      total,
      normalized,
      unit: info.label,
      computeShare: share(compute),
      storageShare: share(storage),
      backupShare: share(backups),
      drShare: share(dr),
      networkShare: share(network),
      egressShare: share(egress),
      licenseShare: share(licenses),
      otherShare: share(other),
    };
  });
  unitEconTable.innerHTML = `
    <thead>
      <tr>
        <th>Provider</th>
        <th>Total / month</th>
        <th>Normalized</th>
        <th>Compute</th>
        <th>Storage</th>
        <th>Backups</th>
        <th>DR</th>
        <th>Network</th>
        <th>Egress</th>
        <th>Licenses</th>
        <th>Other</th>
      </tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (row) => `
        <tr>
          <td>${row.label}</td>
          <td>${formatMonthly(row.total)}</td>
          <td>${
            Number.isFinite(row.normalized)
              ? `${formatMoney(row.normalized)}/${row.unit}`
              : "n/a"
          }</td>
          <td>${row.computeShare}</td>
          <td>${row.storageShare}</td>
          <td>${row.backupShare}</td>
          <td>${row.drShare}</td>
          <td>${row.networkShare}</td>
          <td>${row.egressShare}</td>
          <td>${row.licenseShare}</td>
          <td>${row.otherShare}</td>
        </tr>`
        )
        .join("")}
    </tbody>
  `;
  const focus = data.input?.pricingFocus || "all";
  if (focus === "network") {
    unitEconNote.textContent =
      "Normalized by per-provider network TB transfer input.";
    return;
  }
  if (focus === "storage") {
    unitEconNote.textContent =
      "Normalized by per-provider storage + replication TB input.";
    return;
  }
  unitEconNote.textContent =
    data.input?.mode === "k8s"
      ? "Normalized per node count. Shares include backups/DR and reconcile with an Other residual."
      : "Normalized per VM count. Shares include backups/DR and reconcile with an Other residual.";
}

function buildRecommendations(data) {
  const focus = data?.input?.pricingFocus || "all";
  const providerFilter = recommendProviderFilter?.value || "all";
  const parsedLimit = Number.parseInt(recommendLimitInput?.value || "3", 10);
  const topN = Number.isFinite(parsedLimit)
    ? Math.min(10, Math.max(1, parsedLimit))
    : 3;
  const providerRows = getProviderRowsForPanels(data).filter(
    ({ key }) =>
      key !== "private" &&
      (providerFilter === "all" || providerFilter === key)
  );
  const items = [];
  providerRows.forEach(({ key, label, provider }) => {
    const onDemand = provider?.pricingTiers?.onDemand?.totals?.total;
    const reserved1 = provider?.pricingTiers?.reserved1yr?.totals?.total;
    const reserved3 = provider?.pricingTiers?.reserved3yr?.totals?.total;
    if (
      focus === "all" &&
      Number.isFinite(onDemand) &&
      Number.isFinite(reserved1) &&
      reserved1 < onDemand
    ) {
      items.push({
        key: `${key}-1y`,
        title: `${label}: use 1-year commitment`,
        impact: onDemand - reserved1,
        detail: `Estimated monthly savings ${formatMoney(onDemand - reserved1)}.`,
      });
    }
    if (
      focus === "all" &&
      Number.isFinite(onDemand) &&
      Number.isFinite(reserved3) &&
      reserved3 < onDemand
    ) {
      items.push({
        key: `${key}-3y`,
        title: `${label}: use 3-year commitment`,
        impact: onDemand - reserved3,
        detail: `Estimated monthly savings ${formatMoney(onDemand - reserved3)}.`,
      });
    }
    const totals = getProviderOnDemandTotals(provider);
    if (!totals || !Number.isFinite(totals.total) || totals.total <= 0) {
      return;
    }
    if (focus === "network") {
      const transfer =
        (totals.interVlanMonthly || 0) +
        (totals.intraVlanMonthly || 0) +
        (totals.interRegionMonthly || 0) +
        (totals.egressMonthly || 0);
      if (transfer > 0 && transfer / totals.total >= 0.3) {
        items.push({
          key: `${key}-network-transfer`,
          title: `${label}: optimize transfer-heavy traffic`,
          impact: transfer * 0.15,
          detail:
            "Inter/intra/inter-region + egress represent a large share of networking spend.",
        });
      }
      return;
    }
    if (focus === "storage") {
      const replication = totals.egressMonthly || 0;
      if (replication > 0 && replication / totals.total >= 0.25) {
        items.push({
          key: `${key}-storage-repl`,
          title: `${label}: tune DR delta replication`,
          impact: replication * 0.2,
          detail:
            "Replication delta is a material part of storage total; reducing delta volume can lower spend.",
        });
      }
      return;
    }
    const storageAndBackup =
      (totals.storageMonthly || 0) + (totals.backupMonthly || 0);
    if (storageAndBackup > 0 && storageAndBackup / totals.total >= 0.35) {
      items.push({
        key: `${key}-storage-tier`,
        title: `${label}: validate storage tier/perf settings`,
        impact: storageAndBackup * 0.12,
        detail:
          "Storage and backups are a major cost driver; validate required performance profile.",
      });
    }
    const egressAndInterRegion =
      (totals.egressMonthly || 0) + (totals.interRegionMonthly || 0);
    if (egressAndInterRegion > 0 && egressAndInterRegion / totals.total >= 0.2) {
      items.push({
        key: `${key}-egress`,
        title: `${label}: reduce inter-region/egress traffic`,
        impact: egressAndInterRegion * 0.15,
        detail:
          "Traffic costs are significant; localize traffic paths where possible.",
      });
    }
  });
  if (providerRows.length > 1) {
    const priced = providerRows
      .map(({ label, provider }) => ({
        label,
        total: provider?.pricingTiers?.onDemand?.totals?.total,
      }))
      .filter((entry) => Number.isFinite(entry.total));
    priced.sort((a, b) => a.total - b.total);
    if (priced.length > 1) {
      const cheapest = priced[0];
      priced.slice(1).forEach((entry) => {
        items.push({
          key: `provider-delta-${entry.label}`,
          title: `Compare ${entry.label} against ${cheapest.label}`,
          impact: entry.total - cheapest.total,
          detail: `${entry.label} is ${formatMoney(
            entry.total - cheapest.total
          )}/mo above the current lowest provider.`,
        });
      });
    }
  }
  items.sort((a, b) => b.impact - a.impact);
  return items.slice(0, topN);
}

function renderRecommendations(data) {
  if (!recommendList || !recommendNote) {
    return;
  }
  recommendList.innerHTML = "";
  if (!data) {
    recommendNote.textContent = "Run pricing first to generate recommendations.";
    return;
  }
  const recommendations = buildRecommendations(data);
  if (!recommendations.length) {
    recommendNote.textContent =
      "No high-confidence recommendations for the current filter.";
    return;
  }
  recommendNote.textContent = `Showing ${recommendations.length} recommendation(s).`;
  recommendations.forEach((item) => {
    const card = document.createElement("article");
    card.className = "recommend-item";
    const title = document.createElement("h5");
    title.textContent = item.title;
    const detail = document.createElement("p");
    detail.className = "meta";
    detail.textContent = item.detail;
    const impact = document.createElement("strong");
    impact.textContent = `Potential impact: ${formatMoney(item.impact)}/mo`;
    card.appendChild(title);
    card.appendChild(detail);
    card.appendChild(impact);
    recommendList.appendChild(card);
  });
}

function clampPercent(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.min(Math.max(value, 0), 100);
}

function getCommitDiscount(providerKey) {
  const input = commitDiscountInputs[providerKey];
  const raw = Number.parseFloat(input?.value);
  const percent = clampPercent(raw);
  if (input && Number.isFinite(percent)) {
    input.value = percent.toString();
  }
  return percent;
}

function setCommitField(field, value) {
  if (!field) {
    return;
  }
  field.textContent = value;
}

function renderCommit(data) {
  if (!commitPanel || !commitNote) {
    return;
  }
  if (!data) {
    commitNote.textContent =
      "Run a comparison to generate cloud commit totals.";
    return;
  }
  const mode = data.input?.mode || "vm";
  const providerKeys = ["aws", "azure", "gcp"];
  const summaries = providerKeys.map((providerKey) => {
    const provider = data[providerKey];
    const totals =
      provider?.pricingTiers?.onDemand?.totals || provider?.totals;
    const onDemandTotal = Number.isFinite(totals?.total) ? totals.total : null;
    const computeMonthly = Number.isFinite(totals?.computeMonthly)
      ? totals.computeMonthly
      : null;
    const discountPercent = getCommitDiscount(providerKey);
    const discountAmount =
      Number.isFinite(computeMonthly) && Number.isFinite(discountPercent)
        ? (computeMonthly * discountPercent) / 100
        : null;
    const committedTotal =
      Number.isFinite(onDemandTotal) && Number.isFinite(discountAmount)
        ? onDemandTotal - discountAmount
        : null;
    return {
      providerKey,
      provider,
      totals,
      onDemandTotal,
      computeMonthly,
      discountAmount,
      committedTotal,
    };
  });
  const maxTotal = summaries.reduce((max, item) => {
    if (Number.isFinite(item.onDemandTotal)) {
      return Math.max(max, item.onDemandTotal);
    }
    return max;
  }, 0);

  summaries.forEach((summary) => {
    const {
      providerKey,
      totals,
      onDemandTotal,
      discountAmount,
      committedTotal,
    } = summary;

    const fields = commitFields[providerKey];
    COMMIT_COMPONENTS.forEach((component) => {
      const rawValue = Number.isFinite(totals?.[component.field])
        ? totals[component.field]
        : null;
      const committedValue =
        component.key === "compute" &&
        Number.isFinite(rawValue) &&
        Number.isFinite(discountAmount)
          ? rawValue - discountAmount
          : rawValue;
      setCommitField(
        fields?.base?.[component.key],
        formatMonthly(rawValue)
      );
      setCommitField(
        fields?.commit?.[component.key],
        formatMonthly(committedValue)
      );
    });
    setCommitField(fields?.base?.total, formatMonthly(onDemandTotal));
    setCommitField(
      fields?.commit?.savings,
      formatMonthly(
        Number.isFinite(discountAmount) ? -discountAmount : null
      )
    );
    setCommitField(fields?.commit?.total, formatMonthly(committedTotal));
    if (fields?.note) {
      const region = data.region?.[providerKey]?.location || "";
      const label = getProviderLabelForMode(providerKey, mode);
      fields.note.textContent = region
        ? `${label} ${region}. Discount applies to compute only.`
        : "Discount applies to compute only.";
    }
    const insightFields = commitInsightFields[providerKey];
    if (insightFields) {
      const savings =
        Number.isFinite(onDemandTotal) && Number.isFinite(committedTotal)
          ? onDemandTotal - committedTotal
          : null;
      const baseWidth =
        Number.isFinite(onDemandTotal) && maxTotal > 0
          ? (onDemandTotal / maxTotal) * 100
          : 0;
      const commitWidth =
        Number.isFinite(committedTotal) && maxTotal > 0
          ? (committedTotal / maxTotal) * 100
          : 0;
      if (insightFields.baseBar) {
        insightFields.baseBar.style.width = `${Math.max(0, baseWidth)}%`;
      }
      if (insightFields.commitBar) {
        insightFields.commitBar.style.width = `${Math.max(0, commitWidth)}%`;
      }
      setCommitField(
        insightFields.base,
        `On-demand ${formatMonthly(onDemandTotal)}`
      );
      setCommitField(
        insightFields.commit,
        `Committed ${formatMonthly(committedTotal)}`
      );
      setCommitField(
        insightFields.save,
        `Savings ${formatMonthly(savings)}`
      );
    }
  });
  commitNote.textContent =
    "Discounts apply to compute only. Storage, egress, network, SQL, and DR remain unchanged. Savings are visualized below.";
}

function loadScenarioStore() {
  if (!scenarioList) {
    return [];
  }
  try {
    const raw = localStorage.getItem(SCENARIO_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function persistScenarioStore(list) {
  if (!scenarioList) {
    return;
  }
  try {
    localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(list));
  } catch (error) {
    // Ignore storage errors (private browsing, quota, etc.).
  }
}

function loadPrivateConfig() {
  try {
    const raw = localStorage.getItem(PRIVATE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function persistPrivateConfig(config) {
  try {
    localStorage.setItem(PRIVATE_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    // Ignore storage errors (private browsing, quota, etc.).
  }
}

function setPrivateNote(message, isError = false) {
  if (!privateSaveNote) {
    return;
  }
  privateSaveNote.textContent = message;
  privateSaveNote.classList.toggle("negative", isError);
}

function setInlineNote(target, message, isError = false) {
  if (!target) {
    return;
  }
  target.textContent = message;
  target.classList.toggle("negative", isError);
}

function loadPrivateProviders() {
  try {
    const raw = localStorage.getItem(PRIVATE_PROVIDERS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed.providers)) {
      return {
        activeId: parsed.activeId || null,
        providers: parsed.providers,
      };
    }
  } catch (error) {
    // Ignore storage errors.
  }
  const legacy = loadPrivateConfig();
  if (legacy) {
    const id = `prv-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    return {
      activeId: id,
      providers: [
        {
          id,
          name: "Private cloud",
          config: legacy,
          updatedAt: new Date().toISOString(),
        },
      ],
    };
  }
  return { activeId: null, providers: [] };
}

function persistPrivateProviders(store) {
  try {
    localStorage.setItem(PRIVATE_PROVIDERS_KEY, JSON.stringify(store));
  } catch (error) {
    // Ignore storage errors.
  }
}

function loadPrivateCompareSelections() {
  try {
    const raw = localStorage.getItem(PRIVATE_COMPARE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function persistPrivateCompareSelections(selections) {
  try {
    localStorage.setItem(
      PRIVATE_COMPARE_KEY,
      JSON.stringify(Array.isArray(selections) ? selections : [])
    );
  } catch (error) {
    // Ignore storage errors.
  }
}

function loadSavedCompareSelections(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
}

function persistSavedCompareSelections(key, selections) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(Array.isArray(selections) ? selections : [])
    );
  } catch (error) {
    // Ignore storage errors.
  }
}

function resolveScenarioSelections() {
  const ids = scenarioStore.map((scenario) => scenario.id);
  if (!ids.length) {
    return [];
  }
  let selections = Array.isArray(savedCompareScenarioSelections)
    ? savedCompareScenarioSelections.filter((id) => ids.includes(id))
    : null;
  if (selections === null) {
    selections = [...ids];
  }
  return selections;
}

function resolvePrivateSelections() {
  const ids = privateProviderStore.providers.map((provider) => provider.id);
  if (!ids.length) {
    return [];
  }
  let selections = Array.isArray(savedComparePrivateSelections)
    ? savedComparePrivateSelections.filter((id) => ids.includes(id))
    : null;
  if (selections === null) {
    selections = [...ids];
  }
  return selections;
}

function updateScenarioSelections(nextSelections) {
  savedCompareScenarioSelections = nextSelections;
  persistSavedCompareSelections(
    SAVED_COMPARE_SCENARIOS_KEY,
    savedCompareScenarioSelections
  );
}

function updatePrivateSelections(nextSelections) {
  savedComparePrivateSelections = nextSelections;
  persistSavedCompareSelections(
    SAVED_COMPARE_PRIVATE_KEY,
    savedComparePrivateSelections
  );
}

function syncPrivateCompareSelections() {
  const providerIds = privateProviderStore.providers.map(
    (provider) => provider.id
  );
  let selections = Array.isArray(privateCompareSelections)
    ? [...privateCompareSelections]
    : [];
  selections = selections.filter((id) => providerIds.includes(id));
  providerIds.forEach((id) => {
    if (selections.length >= PRIVATE_COMPARE_SLOTS) {
      return;
    }
    if (!selections.includes(id)) {
      selections.push(id);
    }
  });
  while (selections.length < PRIVATE_COMPARE_SLOTS) {
    selections.push("");
  }
  privateCompareSelections = selections.slice(0, PRIVATE_COMPARE_SLOTS);
  persistPrivateCompareSelections(privateCompareSelections);
  return privateCompareSelections;
}

function getPrivateProviderById(id) {
  return privateProviderStore.providers.find((provider) => provider.id === id);
}

function buildDefaultPrivateConfig() {
  return { ...DEFAULT_PRIVATE_CONFIG };
}

function normalizePrivateConfig(config = {}) {
  const toNumber = (value, fallback) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const normalized = {
    ...DEFAULT_PRIVATE_CONFIG,
    ...config,
  };
  normalized.enabled = Boolean(
    Object.prototype.hasOwnProperty.call(config, "enabled")
      ? config.enabled
      : normalized.enabled
  );
  normalized.vmwareMonthly = toNumber(
    config.vmwareMonthly,
    normalized.vmwareMonthly
  );
  normalized.windowsLicenseMonthly = toNumber(
    config.windowsLicenseMonthly,
    normalized.windowsLicenseMonthly
  );
  normalized.nodeCount = toNumber(config.nodeCount, normalized.nodeCount);
  normalized.nodeCpu = toNumber(config.nodeCpu, normalized.nodeCpu);
  normalized.nodeRam = toNumber(config.nodeRam, normalized.nodeRam);
  normalized.nodeStorageTb = toNumber(
    config.nodeStorageTb,
    normalized.nodeStorageTb
  );
  normalized.vmOsDiskGb = toNumber(config.vmOsDiskGb, normalized.vmOsDiskGb);
  normalized.sanUsableTb = toNumber(
    config.sanUsableTb,
    normalized.sanUsableTb
  );
  normalized.sanTotalMonthly = toNumber(
    config.sanTotalMonthly,
    normalized.sanTotalMonthly
  );
  normalized.networkMonthly = toNumber(
    config.networkMonthly,
    normalized.networkMonthly
  );
  normalized.firewallMonthly = toNumber(
    config.firewallMonthly,
    normalized.firewallMonthly
  );
  normalized.loadBalancerMonthly = toNumber(
    config.loadBalancerMonthly,
    normalized.loadBalancerMonthly
  );
  let storagePerTb = toNumber(config.storagePerTb, normalized.storagePerTb);
  if (
    normalized.sanUsableTb > 0 &&
    normalized.sanTotalMonthly > 0
  ) {
    storagePerTb = normalized.sanTotalMonthly / normalized.sanUsableTb;
  }
  normalized.storagePerTb = storagePerTb;
  return normalized;
}

function getPrimaryPrivateProvider() {
  const selection =
    Array.isArray(privateCompareSelections) && privateCompareSelections.length
      ? privateCompareSelections[0]
      : "";
  if (selection) {
    const provider = getPrivateProviderById(selection);
    if (provider) {
      return provider;
    }
  }
  if (privateProviderStore.activeId) {
    const provider = getPrivateProviderById(privateProviderStore.activeId);
    if (provider) {
      return provider;
    }
  }
  return privateProviderStore.providers[0] || null;
}

function getPrimaryPrivateConfig() {
  const provider = getPrimaryPrivateProvider();
  return normalizePrivateConfig(provider?.config || buildDefaultPrivateConfig());
}

function buildPrivateCardState(card) {
  const fields = {};
  card.querySelectorAll("[data-private-field]").forEach((element) => {
    const key = element.dataset.privateField;
    if (key) {
      fields[key] = element;
    }
  });
  const capacityCounts = {};
  card.querySelectorAll("[data-private-capacity]").forEach((element) => {
    const key = element.dataset.privateCapacity;
    if (key) {
      capacityCounts[key] = element;
    }
  });
  const capacityTotals = {};
  card.querySelectorAll("[data-private-capacity-total]").forEach((element) => {
    const key = element.dataset.privateCapacityTotal;
    if (key) {
      capacityTotals[key] = element;
    }
  });
  const osSizeLabels = card.querySelectorAll(".private-os-size");
  return {
    element: card,
    fields,
    capacityCounts,
    capacityTotals,
    osSizeLabels,
    actions: {
      save: card.querySelector("[data-private-action='save']"),
      delete: card.querySelector("[data-private-action='delete']"),
    },
    providerId: card.dataset.providerId || "",
    cardId: card.dataset.cardId || "",
  };
}

function updatePrivateCardTitle(cardState) {
  const nameValue = cardState.fields.name?.value?.trim() || "";
  if (cardState.fields.title) {
    cardState.fields.title.textContent = nameValue || "New provider";
  }
}

function applyPrivateConfigToCard(cardState, config, nameValue) {
  const normalized = normalizePrivateConfig(config);
  if (cardState.fields.name && typeof nameValue === "string") {
    cardState.fields.name.value = nameValue;
  }
  if (cardState.fields.enabled) {
    cardState.fields.enabled.checked = normalized.enabled;
  }
  if (cardState.fields.vmwareMonthly) {
    cardState.fields.vmwareMonthly.value = normalized.vmwareMonthly.toString();
  }
  if (cardState.fields.windowsLicenseMonthly) {
    cardState.fields.windowsLicenseMonthly.value =
      normalized.windowsLicenseMonthly.toString();
  }
  if (cardState.fields.nodeCount) {
    cardState.fields.nodeCount.value = normalized.nodeCount.toString();
  }
  if (cardState.fields.storagePerTb) {
    cardState.fields.storagePerTb.value = normalized.storagePerTb.toFixed(4);
  }
  if (cardState.fields.networkMonthly) {
    cardState.fields.networkMonthly.value =
      normalized.networkMonthly.toString();
  }
  if (cardState.fields.firewallMonthly) {
    cardState.fields.firewallMonthly.value =
      normalized.firewallMonthly.toString();
  }
  if (cardState.fields.loadBalancerMonthly) {
    cardState.fields.loadBalancerMonthly.value =
      normalized.loadBalancerMonthly.toString();
  }
  if (cardState.fields.nodeCpu) {
    cardState.fields.nodeCpu.value = normalized.nodeCpu.toString();
  }
  if (cardState.fields.nodeRam) {
    cardState.fields.nodeRam.value = normalized.nodeRam.toString();
  }
  if (cardState.fields.nodeStorageTb) {
    cardState.fields.nodeStorageTb.value =
      normalized.nodeStorageTb.toString();
  }
  if (cardState.fields.vmOsDiskGb) {
    cardState.fields.vmOsDiskGb.value = normalized.vmOsDiskGb.toString();
  }
  if (cardState.fields.sanUsableTb) {
    cardState.fields.sanUsableTb.value =
      normalized.sanUsableTb.toString();
  }
  if (cardState.fields.sanTotalMonthly) {
    cardState.fields.sanTotalMonthly.value =
      normalized.sanTotalMonthly.toString();
  }
  updatePrivateCardTitle(cardState);
}

function readPrivateConfigFromCard(cardState) {
  const toNumber = (value, fallback = 0) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  return normalizePrivateConfig({
    enabled: Boolean(cardState.fields.enabled?.checked),
    vmwareMonthly: toNumber(cardState.fields.vmwareMonthly?.value),
    windowsLicenseMonthly: toNumber(
      cardState.fields.windowsLicenseMonthly?.value
    ),
    nodeCount: toNumber(
      cardState.fields.nodeCount?.value,
      DEFAULT_PRIVATE_CONFIG.nodeCount
    ),
    storagePerTb: toNumber(cardState.fields.storagePerTb?.value),
    networkMonthly: toNumber(cardState.fields.networkMonthly?.value),
    firewallMonthly: toNumber(cardState.fields.firewallMonthly?.value),
    loadBalancerMonthly: toNumber(cardState.fields.loadBalancerMonthly?.value),
    nodeCpu: toNumber(
      cardState.fields.nodeCpu?.value,
      DEFAULT_PRIVATE_CONFIG.nodeCpu
    ),
    nodeRam: toNumber(
      cardState.fields.nodeRam?.value,
      DEFAULT_PRIVATE_CONFIG.nodeRam
    ),
    nodeStorageTb: toNumber(cardState.fields.nodeStorageTb?.value),
    vmOsDiskGb: toNumber(
      cardState.fields.vmOsDiskGb?.value,
      DEFAULT_PRIVATE_CONFIG.vmOsDiskGb
    ),
    sanUsableTb: toNumber(cardState.fields.sanUsableTb?.value),
    sanTotalMonthly: toNumber(cardState.fields.sanTotalMonthly?.value),
  });
}

function setPrivateCardProviderId(cardState, providerId) {
  if (!providerId) {
    return;
  }
  if (cardState.cardId && privateProviderCards.has(cardState.cardId)) {
    privateProviderCards.delete(cardState.cardId);
  }
  cardState.providerId = providerId;
  cardState.cardId = providerId;
  cardState.element.dataset.providerId = providerId;
  cardState.element.dataset.cardId = providerId;
  privateProviderCards.set(providerId, cardState);
}

function upsertPrivateProvider(id, name, config) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    setPrivateNote("Enter a private provider name.", true);
    return null;
  }
  const existingByName = privateProviderStore.providers.find(
    (item) =>
      item.name.toLowerCase() === trimmedName.toLowerCase() && item.id !== id
  );
  if (existingByName) {
    setPrivateNote("Provider name already exists.", true);
    return null;
  }
  const now = new Date().toISOString();
  let provider = id ? getPrivateProviderById(id) : null;
  if (provider) {
    provider.name = trimmedName;
    provider.config = config;
    provider.updatedAt = now;
  } else {
    const providerId = `prv-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    provider = {
      id: providerId,
      name: trimmedName,
      config,
      createdAt: now,
      updatedAt: now,
    };
    privateProviderStore.providers.push(provider);
  }
  privateProviderStore.activeId = provider.id;
  persistPrivateProviders(privateProviderStore);
  syncPrivateCompareSelections();
  renderSavedCompareSelectors();
  return provider;
}

function removePrivateProvider(id) {
  const provider = getPrivateProviderById(id);
  if (!provider) {
    return null;
  }
  privateProviderStore.providers = privateProviderStore.providers.filter(
    (item) => item.id !== id
  );
  if (privateProviderStore.activeId === id) {
    privateProviderStore.activeId =
      privateProviderStore.providers[0]?.id || null;
  }
  persistPrivateProviders(privateProviderStore);
  syncPrivateCompareSelections();
  renderSavedCompareSelectors();
  return provider.name;
}

function handleSavePrivateCard(cardState) {
  updatePrivateCapacityForCard(cardState);
  const config = readPrivateConfigFromCard(cardState);
  const name = cardState.fields.name?.value || "";
  const provider = upsertPrivateProvider(cardState.providerId, name, config);
  if (!provider) {
    return;
  }
  setPrivateCardProviderId(cardState, provider.id);
  applyPrivateConfigToCard(cardState, provider.config, provider.name);
  updatePrivateCapacityForCard(cardState);
  setPrivateNote(
    provider.config.enabled
      ? `Saved "${provider.name}".`
      : `Saved "${provider.name}". Enable private cloud to compare.`,
    false
  );
  if (activePanel !== "private") {
    handleCompare();
  }
}

function handleDeletePrivateCard(cardState) {
  if (cardState.providerId) {
    const confirmed = window.confirm("Delete this private provider?");
    if (!confirmed) {
      return;
    }
    const deletedName = removePrivateProvider(cardState.providerId);
    cardState.element.remove();
    privateProviderCards.delete(cardState.cardId);
    setPrivateNote(
      deletedName
        ? `Deleted "${deletedName}".`
        : "Private provider deleted.",
      false
    );
  } else {
    cardState.element.remove();
    privateProviderCards.delete(cardState.cardId);
    setPrivateNote("Removed unsaved provider.", false);
  }
  if (privateProvidersList && !privateProvidersList.children.length) {
    addPrivateProviderCard();
  }
  if (activePanel !== "private") {
    handleCompare();
  }
}

function createPrivateProviderCard(provider) {
  if (!privateProviderTemplate?.content?.firstElementChild) {
    return null;
  }
  const card = privateProviderTemplate.content.firstElementChild.cloneNode(true);
  const cardState = buildPrivateCardState(card);
  const cardId =
    provider?.id ||
    `draft-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 7)}`;
  cardState.cardId = cardId;
  card.dataset.cardId = cardId;
  if (provider?.id) {
    cardState.providerId = provider.id;
    card.dataset.providerId = provider.id;
  }
  privateProviderCards.set(cardId, cardState);
  if (provider) {
    applyPrivateConfigToCard(cardState, provider.config, provider.name);
  } else {
    applyPrivateConfigToCard(cardState, buildDefaultPrivateConfig(), "");
  }
  updatePrivateCapacityForCard(cardState);
  updatePrivateCardTitle(cardState);
  if (cardState.fields.name) {
    cardState.fields.name.addEventListener("input", () => {
      updatePrivateCardTitle(cardState);
    });
  }
  const capacityInputs = [
    "nodeCpu",
    "nodeRam",
    "nodeStorageTb",
    "vmOsDiskGb",
    "sanUsableTb",
    "sanTotalMonthly",
    "nodeCount",
  ];
  capacityInputs.forEach((key) => {
    const field = cardState.fields[key];
    if (field) {
      field.addEventListener("input", () => {
        updatePrivateCapacityForCard(cardState);
      });
    }
  });
  if (cardState.actions.save) {
    cardState.actions.save.addEventListener("click", () => {
      handleSavePrivateCard(cardState);
    });
  }
  if (cardState.actions.delete) {
    cardState.actions.delete.addEventListener("click", () => {
      handleDeletePrivateCard(cardState);
    });
  }
  return cardState;
}

function renderPrivateProviderCards() {
  if (!privateProvidersList) {
    return;
  }
  privateProvidersList.innerHTML = "";
  privateProviderCards = new Map();
  if (privateProviderStore.providers.length) {
    privateProviderStore.providers.forEach((provider) => {
      const cardState = createPrivateProviderCard(provider);
      if (cardState) {
        privateProvidersList.appendChild(cardState.element);
      }
    });
  } else {
    const cardState = createPrivateProviderCard();
    if (cardState) {
      privateProvidersList.appendChild(cardState.element);
    }
  }
  syncPrivateCompareSelections();
  renderSavedCompareSelectors();
}

function addPrivateProviderCard() {
  if (!privateProvidersList) {
    return;
  }
  const cardState = createPrivateProviderCard();
  if (!cardState) {
    return;
  }
  privateProvidersList.appendChild(cardState.element);
  updatePrivateCapacityForCard(cardState);
  cardState.element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getPrivateConfigFromForm() {
  return getPrimaryPrivateConfig();
}

function applyPrivateConfigToPayload(payload, config, options = {}) {
  if (!config) {
    return { ...payload, privateEnabled: false };
  }
  const forceEnable = options.forceEnable !== false;
  const pickNumber = (value, fallback) =>
    Number.isFinite(value) ? value : fallback;
  const vmwareMonthly = pickNumber(
    Number.parseFloat(config.vmwareMonthly),
    payload.privateVmwareMonthly
  );
  const windowsMonthly = pickNumber(
    Number.parseFloat(config.windowsLicenseMonthly),
    payload.privateWindowsLicenseMonthly
  );
  const nodeCount = pickNumber(
    Number.parseFloat(config.nodeCount),
    payload.privateNodeCount
  );
  const storagePerTb = pickNumber(
    Number.parseFloat(config.storagePerTb),
    payload.privateStoragePerTb
  );
  const networkMonthly = pickNumber(
    Number.parseFloat(config.networkMonthly),
    payload.privateNetworkMonthly
  );
  const firewallMonthly = pickNumber(
    Number.parseFloat(config.firewallMonthly),
    payload.privateFirewallMonthly
  );
  const loadBalancerMonthly = pickNumber(
    Number.parseFloat(config.loadBalancerMonthly),
    payload.privateLoadBalancerMonthly
  );
  const nodeCpu = pickNumber(
    Number.parseFloat(config.nodeCpu),
    payload.privateNodeCpu
  );
  const nodeRam = pickNumber(
    Number.parseFloat(config.nodeRam),
    payload.privateNodeRam
  );
  const nodeStorageTb = pickNumber(
    Number.parseFloat(config.nodeStorageTb),
    payload.privateNodeStorageTb
  );
  const vmOsDiskGb = pickNumber(
    Number.parseFloat(config.vmOsDiskGb),
    payload.privateVmOsDiskGb
  );
  const sanUsableTb = pickNumber(
    Number.parseFloat(config.sanUsableTb),
    payload.privateSanUsableTb
  );
  const sanTotalMonthly = pickNumber(
    Number.parseFloat(config.sanTotalMonthly),
    payload.privateSanTotalMonthly
  );
  return {
    ...payload,
    privateEnabled: forceEnable ? true : Boolean(config.enabled),
    privateVmwareMonthly: vmwareMonthly,
    privateWindowsLicenseMonthly: windowsMonthly,
    privateNodeCount: nodeCount,
    privateStoragePerTb: storagePerTb,
    privateNetworkMonthly: networkMonthly,
    privateFirewallMonthly: firewallMonthly,
    privateLoadBalancerMonthly: loadBalancerMonthly,
    privateNodeCpu: nodeCpu,
    privateNodeRam: nodeRam,
    privateNodeStorageTb: nodeStorageTb,
    privateVmOsDiskGb: vmOsDiskGb,
    privateSanUsableTb: sanUsableTb,
    privateSanTotalMonthly: sanTotalMonthly,
  };
}

function fillPrivateProviderSelect(select, selectedId) {
  if (!(select instanceof HTMLSelectElement)) {
    return;
  }
  select.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = privateProviderStore.providers.length
    ? "Select provider"
    : "No providers saved";
  select.appendChild(placeholder);
  privateProviderStore.providers.forEach((provider) => {
    const option = document.createElement("option");
    option.value = provider.id;
    option.textContent = provider.name;
    select.appendChild(option);
  });
  if (selectedId) {
    select.value = selectedId;
  }
}

function createPrivateCompareCard(slotIndex, providerId) {
  if (!privateCompareTemplate?.content?.firstElementChild) {
    return null;
  }
  const card = privateCompareTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.privateSlot = (slotIndex + 1).toString();
  const provider = providerId ? getPrivateProviderById(providerId) : null;
  const title = card.querySelector("[data-field='title']");
  if (title) {
    title.textContent = provider
      ? provider.name
      : `Private ${slotIndex + 1}`;
  }
  const providerSelect = card.querySelector("[data-field='providerSelect']");
  fillPrivateProviderSelect(providerSelect, providerId);
  if (providerSelect) {
    providerSelect.addEventListener("change", () => {
      privateCompareSelections[slotIndex] = providerSelect.value;
      persistPrivateCompareSelections(privateCompareSelections);
      if (currentView === "compare" && currentResultsTab === "pricing") {
        handleCompare();
      }
    });
  }
  return {
    element: card,
    fields: buildProviderFieldsFromCard(card),
    providerId,
    provider,
  };
}

function buildPrivateCompareCards() {
  if (!privateCompareContainer) {
    return [];
  }
  const selections = syncPrivateCompareSelections();
  privateCompareContainer.innerHTML = "";
  return selections
    .map((providerId, index) => {
      const cardState = createPrivateCompareCard(index, providerId);
      if (!cardState) {
        return null;
      }
      privateCompareContainer.appendChild(cardState.element);
      return cardState;
    })
    .filter(Boolean);
}

function setPrivateCompareEmpty(cardState, options) {
  const note =
    privateProviderStore.providers.length > 0
      ? "Select a private provider to compare."
      : "Save a private provider profile to compare.";
  updateProvider(
    cardState.fields,
    {
      status: "manual",
      message: note,
      family: "Private cloud",
      instance: {},
      pricingTiers: {},
    },
    { location: "Private DC" },
    options
  );
}

async function renderPrivateCompareCards(basePayload, baseData) {
  const cards = buildPrivateCompareCards();
  if (!cards.length) {
    return;
  }
  const vmCount = baseData?.input?.vmCount ?? basePayload.vmCount;
  const mode = baseData?.input?.mode ?? basePayload.mode ?? "vm";
  const primaryProviderId = cards[0]?.providerId;
  const primaryProvider =
    primaryProviderId && getPrivateProviderById(primaryProviderId);
  await Promise.all(
    cards.map(async (cardState, index) => {
      const provider = cardState.providerId
        ? getPrivateProviderById(cardState.providerId)
        : null;
      if (!provider) {
        setPrivateCompareEmpty(cardState, {
          showMonthlyRate: false,
          showReservationNote: false,
          vmCount,
          mode,
          providerKey: "private",
          pricingFocus: baseData?.input?.pricingFocus,
          pricingProvider: baseData?.input?.pricingProvider,
        });
        return;
      }
      if (
        index === 0 &&
        primaryProvider &&
        primaryProvider.id === provider.id &&
        baseData?.private
      ) {
        updateProvider(cardState.fields, baseData.private, baseData.region.private, {
          showMonthlyRate: false,
          showReservationNote: false,
          vmCount,
          mode,
          providerKey: "private",
          pricingFocus: baseData?.input?.pricingFocus,
          pricingProvider: baseData?.input?.pricingProvider,
        });
        return;
      }
      const payload = applyPrivateConfigToPayload(basePayload, provider.config, {
        forceEnable: true,
      });
      try {
        const data = await comparePricing(payload);
        updateProvider(cardState.fields, data.private, data.region.private, {
          showMonthlyRate: false,
          showReservationNote: false,
          vmCount,
          mode,
          providerKey: "private",
          pricingFocus: data.input?.pricingFocus,
          pricingProvider: data.input?.pricingProvider,
        });
      } catch (error) {
        updateProvider(
          cardState.fields,
          {
            status: "error",
            message: error?.message || "Private compare failed.",
            family: "Private cloud",
            instance: {},
            pricingTiers: {},
          },
          { location: "Private DC" },
          {
            showMonthlyRate: false,
            showReservationNote: false,
            vmCount,
            mode,
            providerKey: "private",
            pricingFocus: baseData?.input?.pricingFocus,
            pricingProvider: baseData?.input?.pricingProvider,
          }
        );
      }
    })
  );
}

function setScenarioNote(message, isError = false) {
  if (!scenarioNote) {
    return;
  }
  scenarioNote.textContent = message;
  scenarioNote.classList.toggle("negative", isError);
}

function renderScenarioList(selectedId = "") {
  if (!scenarioList) {
    return;
  }
  scenarioList.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = scenarioStore.length
    ? "Select scenario"
    : "No saved scenarios";
  scenarioList.appendChild(placeholder);
  scenarioStore.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.name;
    scenarioList.appendChild(option);
  });
  if (selectedId && scenarioStore.some((scenario) => scenario.id === selectedId)) {
    scenarioList.value = selectedId;
  }
  renderSavedCompareSelectors();
}

function renderSavedCompareSelectors() {
  renderSavedCompareScenarioList();
  renderSavedComparePrivateList();
}

function renderSavedCompareScenarioList() {
  if (!savedCompareScenarioList) {
    return;
  }
  savedCompareScenarioList.innerHTML = "";
  if (!scenarioStore.length) {
    savedCompareScenarioList.textContent = "No saved scenarios.";
    return;
  }
  const selections = resolveScenarioSelections();
  if (Array.isArray(savedCompareScenarioSelections)) {
    updateScenarioSelections(selections);
  }
  scenarioStore.forEach((scenario) => {
    const label = document.createElement("label");
    label.className = "checkbox-field saved-compare-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = scenario.id;
    checkbox.checked = selections.includes(scenario.id);
    checkbox.addEventListener("change", () => {
      const nextSelections = Array.isArray(savedCompareScenarioSelections)
        ? [...savedCompareScenarioSelections]
        : resolveScenarioSelections();
      if (checkbox.checked) {
        if (!nextSelections.includes(scenario.id)) {
          nextSelections.push(scenario.id);
        }
      } else {
        const index = nextSelections.indexOf(scenario.id);
        if (index >= 0) {
          nextSelections.splice(index, 1);
        }
      }
      updateScenarioSelections(nextSelections);
    });
    const name = document.createElement("span");
    name.textContent = scenario.name;
    label.appendChild(checkbox);
    label.appendChild(name);
    savedCompareScenarioList.appendChild(label);
  });
}

function renderSavedComparePrivateList() {
  if (!savedComparePrivateList) {
    return;
  }
  savedComparePrivateList.innerHTML = "";
  if (!privateProviderStore.providers.length) {
    savedComparePrivateList.textContent = "No private providers saved.";
    return;
  }
  const selections = resolvePrivateSelections();
  if (Array.isArray(savedComparePrivateSelections)) {
    updatePrivateSelections(selections);
  }
  privateProviderStore.providers.forEach((provider) => {
    const label = document.createElement("label");
    label.className = "checkbox-field saved-compare-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = provider.id;
    checkbox.checked = selections.includes(provider.id);
    checkbox.addEventListener("change", () => {
      const nextSelections = Array.isArray(savedComparePrivateSelections)
        ? [...savedComparePrivateSelections]
        : resolvePrivateSelections();
      if (checkbox.checked) {
        if (!nextSelections.includes(provider.id)) {
          nextSelections.push(provider.id);
        }
      } else {
        const index = nextSelections.indexOf(provider.id);
        if (index >= 0) {
          nextSelections.splice(index, 1);
        }
      }
      updatePrivateSelections(nextSelections);
    });
    const name = document.createElement("span");
    name.textContent = provider.name;
    label.appendChild(checkbox);
    label.appendChild(name);
    savedComparePrivateList.appendChild(label);
  });
}

function getScenarioById(id) {
  return scenarioStore.find((scenario) => scenario.id === id);
}

function getScenarioByName(name) {
  return scenarioStore.find(
    (scenario) => scenario.name.toLowerCase() === name.toLowerCase()
  );
}

function buildCloneName(baseName) {
  let name = `${baseName} copy`;
  let index = 2;
  while (getScenarioByName(name)) {
    name = `${baseName} copy ${index}`;
    index += 1;
  }
  return name;
}

function applyScenarioInput(input) {
  if (!input) {
    return;
  }
  const focusPanel =
    input.pricingFocus === "network"
      ? "network"
      : input.pricingFocus === "storage"
      ? "storage"
      : "vm";
  const nextMode = input.mode === "k8s" ? "k8s" : focusPanel;
  setPanel(nextMode);
  if (focusPanel === "network") {
    renderNetworkProviderCards({ input });
  }
  if (focusPanel === "storage") {
    renderStorageProviderCards({ input });
  }
  if (networkAddonFocusInput) {
    setNetworkAddonFocus(input.networkAddonFocus || "vpc", {
      silent: true,
    });
  }
  if (input.workload && workloadSelect) {
    workloadSelect.value = input.workload;
  }
  if (awsInstanceFilter) {
    awsInstanceFilter.value = "";
  }
  if (azureInstanceFilter) {
    azureInstanceFilter.value = "";
  }
  if (gcpInstanceFilter) {
    gcpInstanceFilter.value = "";
  }
  updateCpuOptions();
  if (Number.isFinite(input.cpu)) {
    cpuSelect.value = input.cpu.toString();
  }
  updateInstanceOptions();
  if (input.awsInstanceType) {
    awsInstanceSelect.value = input.awsInstanceType;
  }
  if (input.azureInstanceType) {
    azureInstanceSelect.value = input.azureInstanceType;
  }
  if (input.gcpInstanceType) {
    gcpInstanceSelect.value = input.gcpInstanceType;
  }
  if (input.regionKey && regionSelect) {
    regionSelect.value = input.regionKey;
  }
  if (input.pricingProvider && pricingProviderSelect) {
    pricingProviderSelect.value = input.pricingProvider;
  }
  if (
    (focusPanel === "network" || focusPanel === "storage") &&
    pricingProviderSelect
  ) {
    pricingProviderSelect.value = "api";
  }
  if (input.diskTier && diskTierSelect) {
    diskTierSelect.value = input.diskTier;
  }
  if (input.sqlEdition && sqlEditionSelect) {
    sqlEditionSelect.value = input.sqlEdition;
  }
  if (Number.isFinite(input.sqlLicenseRate)) {
    const rateValue = Number.parseFloat(input.sqlLicenseRate);
    sqlRateInput.value = rateValue.toString();
    const editionValue = sqlEditionSelect.value || "none";
    sqlRateTouched = !isDefaultSqlRate(rateValue, editionValue);
  } else {
    const editionValue = sqlEditionSelect.value || "none";
    const nextRate = SQL_DEFAULTS[editionValue] ?? 0;
    sqlRateInput.value = nextRate.toString();
    sqlRateTouched = false;
  }
  if (Number.isFinite(input.osDiskGb)) {
    osDiskInput.value = input.osDiskGb.toString();
  }
  if (Number.isFinite(input.dataDiskTb) && dataDiskInput) {
    dataDiskInput.value = input.dataDiskTb.toString();
  }
  if (Number.isFinite(input.egressTb) && egressInput) {
    egressInput.value = input.egressTb.toString();
  }
  if (Number.isFinite(input.interVlanTb) && interVlanInput) {
    interVlanInput.value = input.interVlanTb.toString();
  }
  if (Number.isFinite(input.intraVlanTb) && intraVlanInput) {
    intraVlanInput.value = input.intraVlanTb.toString();
  }
  if (Number.isFinite(input.interRegionTb) && interRegionInput) {
    interRegionInput.value = input.interRegionTb.toString();
  }
  if (Number.isFinite(input.storageIops) && storageIopsInput) {
    storageIopsInput.value = input.storageIops.toString();
  }
  if (
    Number.isFinite(input.storageThroughputMbps) &&
    storageThroughputInput
  ) {
    storageThroughputInput.value = input.storageThroughputMbps.toString();
  }
  if (Number.isFinite(input.hours) && hoursInput) {
    hoursInput.value = input.hours.toString();
  }
  if (Number.isFinite(input.vmCount) && vmCountInput) {
    vmCountInput.value = input.vmCount.toString();
  }
  if (Number.isFinite(input.drPercent) && drPercentInput) {
    drPercentInput.value = input.drPercent.toString();
  }
  if (backupEnabledInput) {
    backupEnabledInput.checked = Boolean(input.backupEnabled);
  }
  if (awsVpcSelect && input.awsVpcFlavor) {
    awsVpcSelect.value = input.awsVpcFlavor;
  }
  if (awsFirewallSelect && input.awsFirewallFlavor) {
    awsFirewallSelect.value = input.awsFirewallFlavor;
  }
  if (awsLbSelect && input.awsLoadBalancerFlavor) {
    awsLbSelect.value = input.awsLoadBalancerFlavor;
  }
  if (azureVpcSelect && input.azureVpcFlavor) {
    azureVpcSelect.value = input.azureVpcFlavor;
  }
  if (azureFirewallSelect && input.azureFirewallFlavor) {
    azureFirewallSelect.value = input.azureFirewallFlavor;
  }
  if (azureLbSelect && input.azureLoadBalancerFlavor) {
    azureLbSelect.value = input.azureLoadBalancerFlavor;
  }
  if (gcpVpcSelect && input.gcpVpcFlavor) {
    gcpVpcSelect.value = input.gcpVpcFlavor;
  }
  if (gcpFirewallSelect && input.gcpFirewallFlavor) {
    gcpFirewallSelect.value = input.gcpFirewallFlavor;
  }
  if (gcpLbSelect && input.gcpLoadBalancerFlavor) {
    gcpLbSelect.value = input.gcpLoadBalancerFlavor;
  }
  if (Number.isFinite(input.awsObjectStorageRate) && awsObjectStorageInput) {
    awsObjectStorageInput.value = input.awsObjectStorageRate.toString();
  }
  if (Number.isFinite(input.azureObjectStorageRate) && azureObjectStorageInput) {
    azureObjectStorageInput.value = input.azureObjectStorageRate.toString();
  }
  if (Number.isFinite(input.gcpObjectStorageRate) && gcpObjectStorageInput) {
    gcpObjectStorageInput.value = input.gcpObjectStorageRate.toString();
  }
  const numericFocusFields = [
    "awsNetworkVpcCount",
    "awsNetworkVpcDataTb",
    "awsNetworkGatewayCount",
    "awsNetworkGatewayDataTb",
    "awsNetworkLoadBalancerCount",
    "awsNetworkLoadBalancerDataTb",
    "azureNetworkVpcCount",
    "azureNetworkVpcDataTb",
    "azureNetworkGatewayCount",
    "azureNetworkGatewayDataTb",
    "azureNetworkLoadBalancerCount",
    "azureNetworkLoadBalancerDataTb",
    "gcpNetworkVpcCount",
    "gcpNetworkVpcDataTb",
    "gcpNetworkGatewayCount",
    "gcpNetworkGatewayDataTb",
    "gcpNetworkLoadBalancerCount",
    "gcpNetworkLoadBalancerDataTb",
    "awsStorageAccountCount",
    "awsStorageDrDeltaTb",
    "awsStorageObjectTb",
    "awsStorageFileTb",
    "awsStorageTableTb",
    "awsStorageQueueTb",
    "azureStorageAccountCount",
    "azureStorageDrDeltaTb",
    "azureStorageObjectTb",
    "azureStorageFileTb",
    "azureStorageTableTb",
    "azureStorageQueueTb",
    "gcpStorageAccountCount",
    "gcpStorageDrDeltaTb",
    "gcpStorageObjectTb",
    "gcpStorageFileTb",
    "gcpStorageTableTb",
    "gcpStorageQueueTb",
  ];
  numericFocusFields.forEach((name) => {
    const value = input[name];
    const field = document.querySelector(`[name='${name}']`);
    if (field && Number.isFinite(value)) {
      field.value = value.toString();
    }
  });
  const stringFocusFields = [
    "awsNetworkVpcFlavor",
    "awsNetworkGatewayFlavor",
    "awsNetworkLoadBalancerFlavor",
    "azureNetworkVpcFlavor",
    "azureNetworkGatewayFlavor",
    "azureNetworkLoadBalancerFlavor",
    "gcpNetworkVpcFlavor",
    "gcpNetworkGatewayFlavor",
    "gcpNetworkLoadBalancerFlavor",
  ];
  stringFocusFields.forEach((name) => {
    const value = input[name];
    const field = document.querySelector(`[name='${name}']`);
    if (field && value) {
      field.value = value;
    }
  });
  const booleanFocusFields = [
    "awsStorageDrEnabled",
    "azureStorageDrEnabled",
    "gcpStorageDrEnabled",
  ];
  booleanFocusFields.forEach((name) => {
    const value = input[name];
    const field = document.querySelector(`[name='${name}']`);
    if (field && typeof value === "boolean") {
      field.checked = value;
    }
  });
  applyScenarioPrivateConfig(input);
}

function applyScenarioPrivateConfig(input) {
  if (!input) {
    return;
  }
  const provider = getPrimaryPrivateProvider();
  if (!provider) {
    return;
  }
  const config = normalizePrivateConfig({
    enabled: Boolean(input.privateEnabled),
    vmwareMonthly: input.privateVmwareMonthly,
    windowsLicenseMonthly: input.privateWindowsLicenseMonthly,
    nodeCount: input.privateNodeCount,
    storagePerTb: input.privateStoragePerTb,
    networkMonthly: input.privateNetworkMonthly,
    firewallMonthly: input.privateFirewallMonthly,
    loadBalancerMonthly: input.privateLoadBalancerMonthly,
    nodeCpu: input.privateNodeCpu,
    nodeRam: input.privateNodeRam,
    nodeStorageTb: input.privateNodeStorageTb,
    vmOsDiskGb: input.privateVmOsDiskGb,
    sanUsableTb: input.privateSanUsableTb,
    sanTotalMonthly: input.privateSanTotalMonthly,
  });
  provider.config = config;
  provider.updatedAt = new Date().toISOString();
  privateProviderStore.activeId = provider.id;
  persistPrivateProviders(privateProviderStore);
  const cardState = privateProviderCards.get(provider.id);
  if (cardState) {
    applyPrivateConfigToCard(cardState, config, provider.name);
    updatePrivateCapacityForCard(cardState);
  }
  syncPrivateCompareSelections();
}

function getScenarioProviderTotal(data, providerKey) {
  if (!data) {
    return null;
  }
  if (providerKey === "private" && !data.private?.enabled) {
    return null;
  }
  const provider = data[providerKey];
  const total =
    provider?.pricingTiers?.onDemand?.totals?.total ??
    provider?.totals?.total;
  return Number.isFinite(total) ? total : null;
}

function getScenarioDisplayMode(input) {
  if (!input) {
    return "vm";
  }
  if (input.pricingFocus === "network") {
    return "network";
  }
  if (input.pricingFocus === "storage") {
    return "storage";
  }
  return input.mode || "vm";
}

function getScenarioProviderTotals(data, providerKey) {
  if (!data) {
    return null;
  }
  if (providerKey === "private" && !data.private?.enabled) {
    return null;
  }
  const provider = data[providerKey];
  return provider?.pricingTiers?.onDemand?.totals ?? provider?.totals ?? null;
}

function getScenarioComponentValue(totals, field) {
  if (!totals) {
    return null;
  }
  if (field === "licenseMonthly") {
    const sql = Number.isFinite(totals.sqlMonthly) ? totals.sqlMonthly : 0;
    const windows = Number.isFinite(totals.windowsLicenseMonthly)
      ? totals.windowsLicenseMonthly
      : 0;
    return sql + windows;
  }
  const value = totals[field];
  return Number.isFinite(value) ? value : null;
}

function buildScenarioComparison(currentData, scenarioData, scenarioName) {
  const modeNote =
    currentData?.input?.mode !== scenarioData?.input?.mode
      ? " (mode differs)"
      : "";
  const providerKeys = ["aws", "azure", "gcp", "private"];
  const diffs = [];
  let sumDiff = 0;
  providerKeys.forEach((providerKey) => {
    if (providerKey === "private") {
      if (!currentData?.private?.enabled && !scenarioData?.private?.enabled) {
        return;
      }
    }
    const currentTotal = getScenarioProviderTotal(currentData, providerKey);
    const scenarioTotal = getScenarioProviderTotal(scenarioData, providerKey);
    if (!Number.isFinite(currentTotal) || !Number.isFinite(scenarioTotal)) {
      diffs.push(`${getProviderLabel(providerKey)} N/A`);
      return;
    }
    const diff = scenarioTotal - currentTotal;
    sumDiff += diff;
    const sign = diff > 0 ? "+" : diff < 0 ? "-" : "";
    const label =
      diff === 0
        ? "same"
        : `${sign}${formatMoney(Math.abs(diff))}/mo`;
    diffs.push(`${getProviderLabel(providerKey)} ${label}`);
  });
  return {
    text: `Scenario "${scenarioName}" vs current${modeNote}: ${diffs.join(
      " | "
    )}.`,
    diffTotal: sumDiff,
  };
}

async function loadSizeOptions() {
  const response = await fetch("/api/options");
  if (!response.ok) {
    throw new Error("Options request failed.");
  }
  sizeOptions = await response.json();
  updateCpuOptions();
  updateInstanceOptions();
  updateNetworkAddonOptions();
  updateNetworkAddonFocusUi();
}

function setSelectOptions(select, options, currentValue) {
  select.innerHTML = "";
  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value.toString();
    option.textContent = value.toString();
    select.appendChild(option);
  });
  if (currentValue && options.includes(currentValue)) {
    select.value = currentValue.toString();
  } else if (options.length) {
    select.value = options[0].toString();
  }
}

function setSelectOptionsWithLabels(select, options, currentValue) {
  if (!(select instanceof HTMLSelectElement)) {
    return;
  }
  select.innerHTML = "";
  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue.key;
    option.textContent = optionValue.label;
    select.appendChild(option);
  });
  if (
    currentValue &&
    options.some((optionValue) => optionValue.key === currentValue)
  ) {
    select.value = currentValue;
  } else if (options.length) {
    select.value = options[0].key;
  }
}

function getFlavorConfig() {
  if (!sizeOptions) {
    return null;
  }
  if (currentMode === "k8s") {
    return sizeOptions.k8s;
  }
  const workload = workloadSelect.value;
  return sizeOptions.workloads?.[workload] || null;
}

function collectProviderSizes(providerKey, flavorKeys) {
  const provider = sizeOptions?.providers?.[providerKey];
  if (!provider) {
    return [];
  }
  const sizes = [];
  flavorKeys.forEach((flavorKey) => {
    const flavor = provider.flavors?.[flavorKey];
    if (!flavor?.sizes) {
      return;
    }
    flavor.sizes.forEach((size) => {
      sizes.push({ ...size, flavorKey });
    });
  });
  return sizes;
}

function getNetworkAddonLabel(providerKey, addonKey, flavorKey) {
  const options =
    sizeOptions?.networkAddons?.providers?.[providerKey]?.[addonKey];
  if (!Array.isArray(options)) {
    return null;
  }
  const match = options.find((option) => option.key === flavorKey);
  return match?.label || null;
}

function buildCpuOptions() {
  const config = getFlavorConfig();
  if (!config) {
    return [];
  }
  const flavorSets = config.flavors || {};
  const cpuSet = new Set();
  ["aws", "azure", "gcp"].forEach((providerKey) => {
    const sizes = collectProviderSizes(
      providerKey,
      flavorSets[providerKey] || []
    );
    sizes.forEach((size) => {
      if (Number.isFinite(size.vcpu) && size.vcpu >= sizeOptions.minCpu) {
        cpuSet.add(size.vcpu);
      }
    });
  });
  return Array.from(cpuSet).sort((a, b) => a - b);
}

function updateCpuOptions() {
  const cpuOptions = buildCpuOptions();
  const currentValue = Number.parseInt(cpuSelect.value, 10);
  const fallbackValue = Number.isFinite(currentValue)
    ? currentValue
    : sizeOptions?.minCpu;
  const options = cpuOptions.length
    ? cpuOptions
    : sizeOptions?.minCpu
    ? [sizeOptions.minCpu]
    : [];
  setSelectOptions(cpuSelect, options, fallbackValue);
}

function setInstanceOptions(select, sizes, currentValue) {
  select.innerHTML = "";
  if (!sizes.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No matching flavors";
    select.appendChild(option);
    select.disabled = true;
    return;
  }
  const sorted = [...sizes].sort((a, b) => {
    if (a.vcpu === b.vcpu) {
      return a.memory - b.memory;
    }
    return a.vcpu - b.vcpu;
  });
  sorted.forEach((size) => {
    const option = document.createElement("option");
    option.value = size.type;
    option.textContent = `${size.type} — ${size.vcpu} vCPU / ${size.memory} GB`;
    select.appendChild(option);
  });
  select.disabled = false;
  if (currentValue && sorted.some((size) => size.type === currentValue)) {
    select.value = currentValue;
  } else if (sorted.length) {
    select.value = sorted[0].type;
  }
}

function filterInstanceSizes(sizes, query) {
  if (!query) {
    return sizes;
  }
  const text = query.trim().toLowerCase();
  if (!text) {
    return sizes;
  }
  return sizes.filter((size) => {
    const haystack = `${size.type} ${size.vcpu} ${size.memory}`.toLowerCase();
    return haystack.includes(text);
  });
}

function refreshInstanceSelects() {
  const awsFiltered = filterInstanceSizes(
    instancePools.aws,
    awsInstanceFilter?.value
  );
  const azureFiltered = filterInstanceSizes(
    instancePools.azure,
    azureInstanceFilter?.value
  );
  const gcpFiltered = filterInstanceSizes(
    instancePools.gcp,
    gcpInstanceFilter?.value
  );
  setInstanceOptions(awsInstanceSelect, awsFiltered, awsInstanceSelect.value);
  setInstanceOptions(
    azureInstanceSelect,
    azureFiltered,
    azureInstanceSelect.value
  );
  setInstanceOptions(gcpInstanceSelect, gcpFiltered, gcpInstanceSelect.value);
}

function updateInstanceOptions() {
  const config = getFlavorConfig();
  if (!config) {
    return;
  }
  const flavorSets = config.flavors || {};
  const cpuValue = Number.parseInt(cpuSelect.value, 10);
  const awsSizes = collectProviderSizes(
    "aws",
    flavorSets.aws || []
  ).filter((size) => size.vcpu === cpuValue);
  const azureSizes = collectProviderSizes(
    "azure",
    flavorSets.azure || []
  ).filter((size) => size.vcpu === cpuValue);
  const gcpSizes = collectProviderSizes(
    "gcp",
    flavorSets.gcp || []
  ).filter((size) => size.vcpu === cpuValue);

  instancePools.aws = awsSizes;
  instancePools.azure = azureSizes;
  instancePools.gcp = gcpSizes;
  refreshInstanceSelects();
}

function updatePrivateCapacityForCard(cardState) {
  if (!cardState) {
    return;
  }
  const fields = cardState.fields || {};
  const nodeCpuSockets = Number.parseFloat(fields.nodeCpu?.value);
  const nodeVcpuCapacity =
    Number.isFinite(nodeCpuSockets) && nodeCpuSockets > 0
      ? nodeCpuSockets * VMWARE_VCPU_PER_SOCKET
      : 0;
  const nodeCount = Number.parseFloat(fields.nodeCount?.value);
  const usableNodes =
    Number.isFinite(nodeCount) && nodeCount > 1
      ? nodeCount - 1
      : 1;
  const nodeRam = Number.parseFloat(fields.nodeRam?.value);
  const nodeStorageTb = Number.parseFloat(fields.nodeStorageTb?.value);
  const nodeStorageGb =
    Number.isFinite(nodeStorageTb) && nodeStorageTb > 0
      ? nodeStorageTb * 1024
      : null;
  const vmOsGb = Number.parseFloat(fields.vmOsDiskGb?.value) || 256;
  if (cardState.osSizeLabels?.length) {
    cardState.osSizeLabels.forEach((label) => {
      label.textContent = `${vmOsGb} GB`;
    });
  }
  PRIVATE_FLAVORS.forEach((flavor) => {
    const maxByCpu =
      Number.isFinite(nodeVcpuCapacity) && nodeVcpuCapacity > 0
        ? Math.floor(nodeVcpuCapacity / flavor.vcpu)
        : 0;
    const maxByRam = Number.isFinite(nodeRam)
      ? Math.floor(nodeRam / flavor.ram)
      : 0;
    const maxByStorage =
      Number.isFinite(nodeStorageGb) && nodeStorageGb > 0 && vmOsGb > 0
        ? Math.floor(nodeStorageGb / vmOsGb)
        : Number.POSITIVE_INFINITY;
    const maxCount = Math.max(
      0,
      Math.min(maxByCpu, maxByRam, maxByStorage)
    );
    const target = cardState.capacityCounts?.[flavor.key];
    if (target) {
      target.textContent = Number.isFinite(maxCount)
        ? maxCount.toString()
        : "-";
    }
    const totalTarget = cardState.capacityTotals?.[flavor.key];
    if (totalTarget) {
      const totalCount = Number.isFinite(maxCount)
        ? Math.max(0, Math.floor(maxCount * usableNodes))
        : 0;
      totalTarget.textContent = Number.isFinite(totalCount)
        ? totalCount.toString()
        : "-";
    }
  });

  const sanUsableTb = Number.parseFloat(fields.sanUsableTb?.value);
  const sanTotalMonthly = Number.parseFloat(fields.sanTotalMonthly?.value);
  let perTb = 0;
  if (
    Number.isFinite(sanUsableTb) &&
    sanUsableTb > 0 &&
    Number.isFinite(sanTotalMonthly) &&
    sanTotalMonthly > 0
  ) {
    perTb = sanTotalMonthly / sanUsableTb;
  } else {
    const storedRate = Number.parseFloat(fields.storagePerTb?.value);
    if (Number.isFinite(storedRate) && storedRate > 0) {
      perTb = storedRate;
    }
  }
  if (fields.storagePerTb) {
    fields.storagePerTb.value = perTb.toFixed(4);
  }
  if (fields.sanRate) {
    fields.sanRate.textContent =
      perTb > 0 ? `${formatMoney(perTb)}/TB-mo` : "N/A";
  }
}

function updateNetworkAddonOptions() {
  const networkAddons = sizeOptions?.networkAddons;
  if (!networkAddons) {
    return;
  }
  const providers = networkAddons.providers || {};
  const defaults = networkAddons.defaults || {};
  setSelectOptionsWithLabels(
    awsVpcSelect,
    providers.aws?.vpc || [],
    awsVpcSelect?.value || defaults.aws?.vpc
  );
  setSelectOptionsWithLabels(
    awsFirewallSelect,
    providers.aws?.firewall || [],
    awsFirewallSelect?.value || defaults.aws?.firewall
  );
  setSelectOptionsWithLabels(
    awsLbSelect,
    providers.aws?.loadBalancer || [],
    awsLbSelect?.value || defaults.aws?.loadBalancer
  );
  setSelectOptionsWithLabels(
    azureVpcSelect,
    providers.azure?.vpc || [],
    azureVpcSelect?.value || defaults.azure?.vpc
  );
  setSelectOptionsWithLabels(
    azureFirewallSelect,
    providers.azure?.firewall || [],
    azureFirewallSelect?.value || defaults.azure?.firewall
  );
  setSelectOptionsWithLabels(
    azureLbSelect,
    providers.azure?.loadBalancer || [],
    azureLbSelect?.value || defaults.azure?.loadBalancer
  );
  setSelectOptionsWithLabels(
    gcpVpcSelect,
    providers.gcp?.vpc || [],
    gcpVpcSelect?.value || defaults.gcp?.vpc
  );
  setSelectOptionsWithLabels(
    gcpFirewallSelect,
    providers.gcp?.firewall || [],
    gcpFirewallSelect?.value || defaults.gcp?.firewall
  );
  setSelectOptionsWithLabels(
    gcpLbSelect,
    providers.gcp?.loadBalancer || [],
    gcpLbSelect?.value || defaults.gcp?.loadBalancer
  );
}

function serializeForm(formElement) {
  const data = Object.fromEntries(new FormData(formElement).entries());
  const pricingFocus =
    data.pricingFocus === "network"
      ? "network"
      : data.pricingFocus === "storage"
      ? "storage"
      : "all";
  const networkAddonFocus = normalizeNetworkAddonFocus(
    data.networkAddonFocus
  );
  const mode = data.mode === "k8s" ? "k8s" : "vm";
  const backupEnabled = pricingFocus === "all" && data.backupEnabled === "on";
  const egressTb =
    pricingFocus === "storage" ? 0 : Number.parseFloat(data.egressTb);
  const drPercent =
    pricingFocus === "all" ? Number.parseFloat(data.drPercent) : 0;
  const privateConfig = getPrivateConfigFromForm();
  const sanUsableTb = Number.parseFloat(privateConfig.sanUsableTb);
  const sanTotalMonthly = Number.parseFloat(privateConfig.sanTotalMonthly);
  let privateStoragePerTb = Number.parseFloat(privateConfig.storagePerTb);
  if (
    Number.isFinite(sanUsableTb) &&
    sanUsableTb > 0 &&
    Number.isFinite(sanTotalMonthly) &&
    sanTotalMonthly > 0
  ) {
    privateStoragePerTb = sanTotalMonthly / sanUsableTb;
  }
  const normalizedStoragePerTb = Number.isFinite(privateStoragePerTb)
    ? privateStoragePerTb
    : 0;
  return {
    cpu: Number.parseInt(data.cpu, 10),
    workload: data.workload,
    awsInstanceType: awsInstanceSelect.value,
    azureInstanceType: azureInstanceSelect.value,
    gcpInstanceType: gcpInstanceSelect.value,
    regionKey: data.regionKey,
    pricingProvider: data.pricingProvider,
    pricingFocus,
    networkAddonFocus,
    diskTier: data.diskTier,
    sqlEdition: data.sqlEdition,
    mode,
    osDiskGb: Number.parseFloat(data.osDiskGb),
    dataDiskTb: Number.parseFloat(data.dataDiskTb),
    egressTb,
    interVlanTb: Number.parseFloat(data.interVlanTb),
    intraVlanTb: Number.parseFloat(data.intraVlanTb),
    interRegionTb: Number.parseFloat(data.interRegionTb),
    storageIops: Number.parseFloat(data.storageIops),
    storageThroughputMbps: Number.parseFloat(data.storageThroughputMbps),
    hours: Number.parseFloat(data.hours),
    backupEnabled,
    awsVpcFlavor: data.awsVpcFlavor,
    awsFirewallFlavor: data.awsFirewallFlavor,
    awsLoadBalancerFlavor: data.awsLoadBalancerFlavor,
    awsNetworkVpcFlavor: data.awsNetworkVpcFlavor,
    awsNetworkVpcCount: Number.parseFloat(data.awsNetworkVpcCount),
    awsNetworkVpcDataTb: Number.parseFloat(data.awsNetworkVpcDataTb),
    awsNetworkGatewayFlavor: data.awsNetworkGatewayFlavor,
    awsNetworkGatewayCount: Number.parseFloat(data.awsNetworkGatewayCount),
    awsNetworkGatewayDataTb: Number.parseFloat(data.awsNetworkGatewayDataTb),
    awsNetworkLoadBalancerFlavor: data.awsNetworkLoadBalancerFlavor,
    awsNetworkLoadBalancerCount: Number.parseFloat(
      data.awsNetworkLoadBalancerCount
    ),
    awsNetworkLoadBalancerDataTb: Number.parseFloat(
      data.awsNetworkLoadBalancerDataTb
    ),
    azureVpcFlavor: data.azureVpcFlavor,
    azureFirewallFlavor: data.azureFirewallFlavor,
    azureLoadBalancerFlavor: data.azureLoadBalancerFlavor,
    azureNetworkVpcFlavor: data.azureNetworkVpcFlavor,
    azureNetworkVpcCount: Number.parseFloat(data.azureNetworkVpcCount),
    azureNetworkVpcDataTb: Number.parseFloat(data.azureNetworkVpcDataTb),
    azureNetworkGatewayFlavor: data.azureNetworkGatewayFlavor,
    azureNetworkGatewayCount: Number.parseFloat(data.azureNetworkGatewayCount),
    azureNetworkGatewayDataTb: Number.parseFloat(data.azureNetworkGatewayDataTb),
    azureNetworkLoadBalancerFlavor: data.azureNetworkLoadBalancerFlavor,
    azureNetworkLoadBalancerCount: Number.parseFloat(
      data.azureNetworkLoadBalancerCount
    ),
    azureNetworkLoadBalancerDataTb: Number.parseFloat(
      data.azureNetworkLoadBalancerDataTb
    ),
    gcpVpcFlavor: data.gcpVpcFlavor,
    gcpFirewallFlavor: data.gcpFirewallFlavor,
    gcpLoadBalancerFlavor: data.gcpLoadBalancerFlavor,
    gcpNetworkVpcFlavor: data.gcpNetworkVpcFlavor,
    gcpNetworkVpcCount: Number.parseFloat(data.gcpNetworkVpcCount),
    gcpNetworkVpcDataTb: Number.parseFloat(data.gcpNetworkVpcDataTb),
    gcpNetworkGatewayFlavor: data.gcpNetworkGatewayFlavor,
    gcpNetworkGatewayCount: Number.parseFloat(data.gcpNetworkGatewayCount),
    gcpNetworkGatewayDataTb: Number.parseFloat(data.gcpNetworkGatewayDataTb),
    gcpNetworkLoadBalancerFlavor: data.gcpNetworkLoadBalancerFlavor,
    gcpNetworkLoadBalancerCount: Number.parseFloat(
      data.gcpNetworkLoadBalancerCount
    ),
    gcpNetworkLoadBalancerDataTb: Number.parseFloat(
      data.gcpNetworkLoadBalancerDataTb
    ),
    awsObjectStorageRate: Number.parseFloat(data.awsObjectStorageRate),
    azureObjectStorageRate: Number.parseFloat(data.azureObjectStorageRate),
    gcpObjectStorageRate: Number.parseFloat(data.gcpObjectStorageRate),
    awsStorageAccountCount: Number.parseFloat(data.awsStorageAccountCount),
    awsStorageDrEnabled: data.awsStorageDrEnabled === "on",
    awsStorageDrDeltaTb: Number.parseFloat(data.awsStorageDrDeltaTb),
    awsStorageObjectTb: Number.parseFloat(data.awsStorageObjectTb),
    awsStorageFileTb: Number.parseFloat(data.awsStorageFileTb),
    awsStorageTableTb: Number.parseFloat(data.awsStorageTableTb),
    awsStorageQueueTb: Number.parseFloat(data.awsStorageQueueTb),
    azureStorageAccountCount: Number.parseFloat(data.azureStorageAccountCount),
    azureStorageDrEnabled: data.azureStorageDrEnabled === "on",
    azureStorageDrDeltaTb: Number.parseFloat(data.azureStorageDrDeltaTb),
    azureStorageObjectTb: Number.parseFloat(data.azureStorageObjectTb),
    azureStorageFileTb: Number.parseFloat(data.azureStorageFileTb),
    azureStorageTableTb: Number.parseFloat(data.azureStorageTableTb),
    azureStorageQueueTb: Number.parseFloat(data.azureStorageQueueTb),
    gcpStorageAccountCount: Number.parseFloat(data.gcpStorageAccountCount),
    gcpStorageDrEnabled: data.gcpStorageDrEnabled === "on",
    gcpStorageDrDeltaTb: Number.parseFloat(data.gcpStorageDrDeltaTb),
    gcpStorageObjectTb: Number.parseFloat(data.gcpStorageObjectTb),
    gcpStorageFileTb: Number.parseFloat(data.gcpStorageFileTb),
    gcpStorageTableTb: Number.parseFloat(data.gcpStorageTableTb),
    gcpStorageQueueTb: Number.parseFloat(data.gcpStorageQueueTb),
    vmCount: Number.parseInt(data.vmCount, 10),
    drPercent,
    sqlLicenseRate: Number.parseFloat(data.sqlLicenseRate),
    privateEnabled: Boolean(privateConfig.enabled),
    privateVmwareMonthly: Number.parseFloat(privateConfig.vmwareMonthly),
    privateWindowsLicenseMonthly: Number.parseFloat(
      privateConfig.windowsLicenseMonthly
    ),
    privateNodeCount: Number.parseFloat(privateConfig.nodeCount),
    privateStoragePerTb: normalizedStoragePerTb,
    privateNetworkMonthly: Number.parseFloat(privateConfig.networkMonthly),
    privateFirewallMonthly: Number.parseFloat(privateConfig.firewallMonthly),
    privateLoadBalancerMonthly: Number.parseFloat(
      privateConfig.loadBalancerMonthly
    ),
    privateNodeCpu: Number.parseFloat(privateConfig.nodeCpu),
    privateNodeRam: Number.parseFloat(privateConfig.nodeRam),
    privateNodeStorageTb: Number.parseFloat(privateConfig.nodeStorageTb),
    privateVmOsDiskGb: Number.parseFloat(privateConfig.vmOsDiskGb),
    privateSanUsableTb: sanUsableTb,
    privateSanTotalMonthly: sanTotalMonthly,
  };
}

async function fetchAndRender() {
  const basePayload = serializeForm(form);
  const isPublicOnlyFocus =
    basePayload.pricingFocus === "network" ||
    basePayload.pricingFocus === "storage";
  const selections = syncPrivateCompareSelections();
  const primaryProvider = selections[0]
    ? getPrivateProviderById(selections[0])
    : null;
  const payload = applyPrivateConfigToPayload(
    basePayload,
    isPublicOnlyFocus ? null : primaryProvider?.config,
    { forceEnable: !isPublicOnlyFocus && Boolean(primaryProvider) }
  );
  const data = await comparePricing(payload);
  lastPricing = data;
  const vmCount = data.input?.vmCount ?? payload.vmCount;
  const mode = data.input?.mode ?? payload.mode ?? "vm";
  updateProvider(fields.aws, data.aws, data.region.aws, {
    showMonthlyRate: false,
    showReservationNote: true,
    vmCount,
    mode,
    providerKey: "aws",
    sharedStorageSources: data.notes?.sharedStorageSources || null,
    pricingFocus: data.input?.pricingFocus,
    pricingProvider: data.input?.pricingProvider,
  });
  updateProvider(fields.azure, data.azure, data.region.azure, {
    showMonthlyRate: false,
    showReservationNote: false,
    vmCount,
    mode,
    providerKey: "azure",
    sharedStorageSources: data.notes?.sharedStorageSources || null,
    pricingFocus: data.input?.pricingFocus,
    pricingProvider: data.input?.pricingProvider,
  });
  updateProvider(fields.gcp, data.gcp, data.region.gcp, {
    showMonthlyRate: false,
    showReservationNote: false,
    vmCount,
    mode,
    providerKey: "gcp",
    sharedStorageSources: data.notes?.sharedStorageSources || null,
    pricingFocus: data.input?.pricingFocus,
    pricingProvider: data.input?.pricingProvider,
  });
  updateDelta(
    data.aws,
    data.azure,
    data.gcp,
    isPublicOnlyFocus ? null : data.private
  );
  if (
    activePanel !== "private" &&
    currentResultsTab === "pricing" &&
    currentView === "compare" &&
    !isPublicOnlyFocus
  ) {
    await renderPrivateCompareCards(basePayload, data);
  }
  if (currentMode === "network") {
    renderNetworkFocusTable(data);
    if (currentNetworkResult === "insight") {
      renderFocusInsight(data, "network");
    }
  } else if (currentMode === "storage") {
    renderStorageFocusTable(data);
    if (currentStorageResult === "insight") {
      renderFocusInsight(data, "storage");
    }
  }
  const noteParts = [];
  if (data.notes?.constraints) {
    noteParts.push(data.notes.constraints);
  }
  if (data.notes?.sizeCap) {
    noteParts.push(data.notes.sizeCap);
  }
  const diskTierLabel =
    data.input?.diskTierLabel ||
    DISK_TIER_LABELS[data.input?.diskTier] ||
    DISK_TIER_LABELS[diskTierSelect?.value];
  if (diskTierLabel && data.input?.pricingFocus === "all") {
    noteParts.push(`Disk tier: ${diskTierLabel}.`);
  }
  const networkSummaries = [];
  const input = data.input || {};
  const networkAddonFocus =
    input.pricingFocus === "network"
      ? normalizeNetworkAddonFocus(input.networkAddonFocus)
      : "all";
  const providerKeys = ["aws", "azure", "gcp"];
  providerKeys.forEach((providerKey) => {
    const entries =
      input.pricingFocus === "network"
        ? [
            ["vpc", input[`${providerKey}NetworkVpcFlavor`]],
            ["gateway", input[`${providerKey}NetworkGatewayFlavor`]],
            ["loadBalancer", input[`${providerKey}NetworkLoadBalancerFlavor`]],
          ]
        : [
            ["vpc", input[`${providerKey}VpcFlavor`]],
            ["firewall", input[`${providerKey}FirewallFlavor`]],
            ["loadBalancer", input[`${providerKey}LoadBalancerFlavor`]],
          ];
    const filtered = entries.filter(([addonKey]) =>
      networkAddonFocus === "all" ? true : addonKey === networkAddonFocus
    );
    const labels = filtered
      .map(([addonKey, flavorKey]) =>
        getNetworkAddonLabel(providerKey, addonKey, flavorKey)
      )
      .filter((label) => label && label.toLowerCase() !== "none");
    if (labels.length) {
      const providerLabel = getProviderLabelForMode(providerKey, mode);
      networkSummaries.push(`${providerLabel}: ${labels.join(", ")}`);
    }
  });
  if (networkSummaries.length && input.pricingFocus !== "storage") {
    noteParts.push(`Network add-ons: ${networkSummaries.join(" | ")}.`);
  }
  if (input.pricingFocus === "all" && vmCount && vmCount > 1) {
    const countLabel = mode === "k8s" ? "nodes" : "VMs";
    noteParts.push(`Totals include ${vmCount} ${countLabel}.`);
  }
  formNote.textContent = noteParts.join(" ");
  if (currentResultsTab === "insight") {
    renderInsight(data);
  }
  if (currentResultsTab === "commit") {
    renderCommit(data);
  }
  renderDataQualityPanel(data);
  renderUnitEconomics(data);
  renderRecommendations(data);
  updateDisclaimerText(data);
  setView(currentView);
  return data;
}

async function handleCompare(event) {
  if (event) {
    event.preventDefault();
  }
  if (scenarioDelta) {
    scenarioDelta.classList.add("is-hidden");
    scenarioDelta.textContent = "";
  }
  if (currentResultsTab === "saved") {
    await refreshSavedCompare();
    return;
  }
  const isRegionCompare =
    currentVendorView === "regions" &&
    (currentView === "aws" || currentView === "azure" || currentView === "gcp");
  formNote.textContent =
    currentView === "compare" ||
    currentResultsTab === "insight" ||
    currentResultsTab === "commit"
      ? "Fetching live prices..."
      : isRegionCompare
      ? "Fetching region compare..."
      : "Fetching vendor options...";
  try {
    if (currentResultsTab === "insight" || currentResultsTab === "commit") {
      await fetchAndRender();
    } else if (currentView === "compare") {
      await fetchAndRender();
    } else if (
      currentVendorView === "regions" &&
      (currentView === "aws" || currentView === "azure" || currentView === "gcp")
    ) {
      await runRegionCompare();
    } else {
      await fetchVendorOptions();
    }
  } catch (error) {
    formNote.textContent =
      error?.message || "Could not fetch pricing. Try again.";
  }
}

function escapeCsv(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function parseCsvRows(text) {
  if (typeof text === "string" && text.charCodeAt(0) === 0xfeff) {
    text = text.slice(1);
  }
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;
  const pushValue = () => {
    row.push(value);
    value = "";
  };
  const pushRow = () => {
    if (row.length || value) {
      pushValue();
      rows.push(row);
      row = [];
    }
  };
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          value += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        value += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === ",") {
      pushValue();
      continue;
    }
    if (char === "\n") {
      pushRow();
      continue;
    }
    if (char === "\r") {
      continue;
    }
    value += char;
  }
  pushRow();
  return rows;
}

function normalizeCsvHeader(value) {
  return String(value || "").trim().toLowerCase();
}

function parseCsvBoolean(value) {
  const text = String(value || "").trim().toLowerCase();
  if (["true", "yes", "1", "on"].includes(text)) {
    return true;
  }
  if (["false", "no", "0", "off"].includes(text)) {
    return false;
  }
  return undefined;
}

function normalizeBillingProvider(provider) {
  if (provider === "azure") {
    return "azure";
  }
  if (provider === "gcp") {
    return "gcp";
  }
  if (provider === "rackspace") {
    return "rackspace";
  }
  return "aws";
}

function getBillingImportFormatHint(provider) {
  const normalized = normalizeBillingProvider(provider);
  if (normalized === "aws") {
    return "AWS CSV format: Cost Explorer Service view (Cost and usage breakdown by Service).";
  }
  if (normalized === "azure") {
    return "Azure CSV format: Cost Analysis Meter view.";
  }
  if (normalized === "gcp") {
    return "GCP CSV format: Billing export with service/SKU/cost columns.";
  }
  return "Rackspace CSV format: invoice usage export with SERVICE_TYPE and AMOUNT columns.";
}

function loadBillingImportStore() {
  try {
    const raw = localStorage.getItem(BILLING_IMPORT_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      return {
        aws: parsed.aws || null,
        azure: parsed.azure || null,
        gcp: parsed.gcp || null,
        rackspace: parsed.rackspace || null,
      };
    }
  } catch (error) {
    // Ignore storage errors.
  }
  return { aws: null, azure: null, gcp: null, rackspace: null };
}

function persistBillingImportStore(store) {
  try {
    localStorage.setItem(BILLING_IMPORT_KEY, JSON.stringify(store));
  } catch (error) {
    // Ignore storage errors.
  }
}

function parseBillingCurrency(value) {
  let text = String(value ?? "").trim();
  if (!text) {
    return Number.NaN;
  }
  let negative = false;
  if (text.startsWith("(") && text.endsWith(")")) {
    negative = true;
    text = text.slice(1, -1);
  }
  text = text.replace(/[$,%\s]/g, "");
  text = text.replace(/,/g, "");
  text = text.replace(/[A-Za-z]/g, "");
  if (!text) {
    return Number.NaN;
  }
  const parsed = Number.parseFloat(text);
  if (!Number.isFinite(parsed)) {
    return Number.NaN;
  }
  return negative ? -parsed : parsed;
}

function findBillingHeaderIndex(headers, candidates = []) {
  for (const candidate of candidates) {
    const idx = headers.indexOf(candidate);
    if (idx >= 0) {
      return idx;
    }
  }
  for (let idx = 0; idx < headers.length; idx += 1) {
    const header = headers[idx];
    if (candidates.some((candidate) => header.includes(candidate))) {
      return idx;
    }
  }
  return -1;
}

function escapeMarkup(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseAwsServiceViewMatrix(rows, headers) {
  const firstHeader = headers[0] || "";
  const totalCostsColumnIndex = headers.findIndex((header) =>
    header.includes("total costs")
  );
  if (
    firstHeader !== "service" ||
    rows.length < 2 ||
    totalCostsColumnIndex < 0 ||
    headers.length < 3
  ) {
    return null;
  }

  const dataRows = rows.slice(1);
  const summaryRow =
    dataRows.find((row) => normalizeCsvHeader(row[0]) === "service total") ||
    dataRows[0];
  if (!summaryRow) {
    return null;
  }
  const usageRow = dataRows.find((row) =>
    /^\d{4}-\d{2}-\d{2}/.test(String(row[0] || "").trim())
  );
  const usageTimestamp = usageRow
    ? new Date(String(usageRow[0] || "").trim()).getTime()
    : Number.NaN;

  const services = [];
  let totalCost = parseBillingCurrency(summaryRow[totalCostsColumnIndex]);
  for (let col = 1; col < headers.length; col += 1) {
    const normalizedHeader = headers[col];
    if (!normalizedHeader || normalizedHeader.includes("total costs")) {
      continue;
    }
    const rawName = String(rows[0][col] || "").trim();
    const serviceName = rawName.replace(/\s*\((\$|usd)\)\s*$/i, "").trim();
    if (!serviceName) {
      continue;
    }
    let serviceCost = parseBillingCurrency(summaryRow[col]);
    if (!Number.isFinite(serviceCost) && usageRow) {
      serviceCost = parseBillingCurrency(usageRow[col]);
    }
    if (!Number.isFinite(serviceCost)) {
      continue;
    }
    services.push({
      name: serviceName,
      cost: serviceCost,
      rowCount: 1,
      share: 0,
      detailCount: 1,
      details: [
        {
          name: String(summaryRow[0] || "Service total"),
          cost: serviceCost,
          rowCount: 1,
          share: 100,
        },
      ],
      topChargeTypes: [],
      minDate: Number.isFinite(usageTimestamp) ? usageTimestamp : null,
      maxDate: Number.isFinite(usageTimestamp) ? usageTimestamp : null,
    });
  }

  if (!services.length) {
    return null;
  }
  if (!Number.isFinite(totalCost)) {
    totalCost = services.reduce((sum, service) => sum + service.cost, 0);
  }
  services.forEach((service) => {
    service.share = totalCost !== 0 ? (service.cost / totalCost) * 100 : 0;
  });
  services.sort((a, b) => b.cost - a.cost);

  return {
    provider: "aws",
    importedAt: new Date().toISOString(),
    rowCount: services.length,
    serviceCount: services.length,
    totalCost,
    serviceColumn: rows[0][0] || "Service",
    costColumn: rows[0][totalCostsColumnIndex] || "Total costs($)",
    detailColumn: String(summaryRow[0] || "Service total"),
    chargeTypeColumn: "",
    usageDateColumn: usageRow ? rows[0][0] || "Service" : "",
    services,
  };
}

function parseBillingImportCsv(text, provider) {
  const rows = parseCsvRows(text).filter((row) =>
    row.some((value) => String(value || "").trim() !== "")
  );
  if (rows.length < 2) {
    throw new Error("CSV needs a header and at least one data row.");
  }
  const normalizedProvider = normalizeBillingProvider(provider);
  const headers = rows[0].map((value) => normalizeCsvHeader(value));
  if (normalizedProvider === "aws") {
    const matrixParse = parseAwsServiceViewMatrix(rows, headers);
    if (matrixParse) {
      return matrixParse;
    }
  }
  const serviceCandidatesByProvider = {
    aws: [
      "product/productname",
      "product/servicename",
      "product/servicecode",
      "lineitem/productcode",
      "lineitem/lineitemdescription",
      "lineitem/usagetype",
    ],
    azure: [
      "servicename",
      "metercategory",
      "productname",
      "metername",
      "resourcegroup",
    ],
    gcp: [
      "service description",
      "service.description",
      "service",
      "sku description",
      "sku.description",
    ],
    rackspace: [
      "service_type",
      "impact_type",
      "event_type",
      "res_name",
      "attribute_1",
    ],
  };
  const costCandidatesByProvider = {
    aws: [
      "lineitem/unblendedcost",
      "lineitem/netunblendedcost",
      "lineitem/blendedcost",
      "lineitem/netamortizedcost",
      "amortizedcost",
      "cost",
      "charge",
      "amount",
    ],
    azure: [
      "costinbillingcurrency",
      "pretaxcost",
      "cost",
      "charge",
      "amount",
    ],
    gcp: ["cost", "net cost", "effective cost", "charge", "amount"],
    rackspace: ["amount", "cost", "charge", "rate"],
  };
  const detailCandidatesByProvider = {
    aws: [
      "lineitem/lineitemdescription",
      "lineitem/usagetype",
      "lineitem/resourceid",
      "product/instancetype",
      "product/location",
      "lineitem/operation",
    ],
    azure: [
      "meter",
      "metername",
      "metercategory",
      "meterid",
      "resourcegroup",
      "resourcetype",
      "partnumber",
    ],
    gcp: [
      "sku description",
      "sku.description",
      "sku id",
      "sku.id",
      "project id",
      "project.id",
      "resource name",
    ],
    rackspace: [
      "res_name",
      "impact_type",
      "event_type",
      "res_id",
      "region_id",
      "attribute_1",
      "attribute_2",
      "attribute_3",
      "attribute_4",
      "attribute_5",
      "attribute_6",
      "attribute_7",
      "attribute_8",
    ],
  };
  const chargeTypeCandidatesByProvider = {
    aws: ["lineitem/lineitemtype", "lineitem/chargetype", "chargetype"],
    azure: ["chargetype", "charge type", "pricingmodel"],
    gcp: ["cost type", "costtype", "charge type"],
    rackspace: ["event_type", "impact_type"],
  };
  const usageDateCandidatesByProvider = {
    aws: ["lineitem/usagestartdate", "usagedate", "date"],
    azure: ["date", "usagedate", "billingperiodstartdate"],
    gcp: ["usage_start_time", "date", "usage date"],
    rackspace: [
      "event_start_date",
      "event_end_date",
      "bill_start_date",
      "bill_end_date",
      "usage_date",
      "date",
    ],
  };

  let serviceIndex = findBillingHeaderIndex(
    headers,
    serviceCandidatesByProvider[normalizedProvider]
  );
  let costIndex = findBillingHeaderIndex(
    headers,
    costCandidatesByProvider[normalizedProvider]
  );
  if (serviceIndex < 0) {
    serviceIndex = findBillingHeaderIndex(headers, [
      "service",
      "product",
      "meter",
      "sku",
      "category",
      "name",
    ]);
  }
  if (costIndex < 0) {
    costIndex = findBillingHeaderIndex(headers, ["cost", "charge", "amount"]);
  }
  let detailIndex = findBillingHeaderIndex(
    headers,
    detailCandidatesByProvider[normalizedProvider]
  );
  if (detailIndex < 0) {
    detailIndex = findBillingHeaderIndex(headers, [
      "meter",
      "sku",
      "usage",
      "description",
      "resource",
      "partnumber",
      "item",
      "name",
    ]);
  }
  const chargeTypeIndex = findBillingHeaderIndex(
    headers,
    chargeTypeCandidatesByProvider[normalizedProvider]
  );
  const usageDateIndex = findBillingHeaderIndex(
    headers,
    usageDateCandidatesByProvider[normalizedProvider]
  );
  if (costIndex < 0) {
    throw new Error("Could not find a cost column in CSV.");
  }
  if (serviceIndex < 0) {
    serviceIndex = 0;
  }
  if (detailIndex < 0) {
    detailIndex = serviceIndex;
  }

  const totalsByService = new Map();
  let importedRows = 0;
  let totalCost = 0;
  for (const row of rows.slice(1)) {
    const cost = parseBillingCurrency(row[costIndex]);
    if (!Number.isFinite(cost)) {
      continue;
    }
    const rawService = String(row[serviceIndex] || "").trim();
    const service = rawService || "Uncategorized";
    const rawDetail = String(row[detailIndex] || "").trim();
    const detail = rawDetail || "Line item";
    const usageDateRaw =
      usageDateIndex >= 0 ? String(row[usageDateIndex] || "").trim() : "";
    const chargeTypeRaw =
      chargeTypeIndex >= 0 ? String(row[chargeTypeIndex] || "").trim() : "";
    let serviceBucket = totalsByService.get(service);
    if (!serviceBucket) {
      serviceBucket = {
        name: service,
        cost: 0,
        rowCount: 0,
        details: new Map(),
        chargeTypes: new Map(),
        minDate: null,
        maxDate: null,
      };
      totalsByService.set(service, serviceBucket);
    }
    serviceBucket.cost += cost;
    serviceBucket.rowCount += 1;
    let detailBucket = serviceBucket.details.get(detail);
    if (!detailBucket) {
      detailBucket = {
        name: detail,
        cost: 0,
        rowCount: 0,
      };
      serviceBucket.details.set(detail, detailBucket);
    }
    detailBucket.cost += cost;
    detailBucket.rowCount += 1;
    if (chargeTypeRaw) {
      serviceBucket.chargeTypes.set(
        chargeTypeRaw,
        (serviceBucket.chargeTypes.get(chargeTypeRaw) || 0) + 1
      );
    }
    if (usageDateRaw) {
      const parsedDate = new Date(usageDateRaw);
      if (!Number.isNaN(parsedDate.getTime())) {
        const currentTime = parsedDate.getTime();
        if (!serviceBucket.minDate || currentTime < serviceBucket.minDate) {
          serviceBucket.minDate = currentTime;
        }
        if (!serviceBucket.maxDate || currentTime > serviceBucket.maxDate) {
          serviceBucket.maxDate = currentTime;
        }
      }
    }
    importedRows += 1;
    totalCost += cost;
  }
  if (!importedRows) {
    throw new Error("No numeric cost rows found in CSV.");
  }

  const services = Array.from(totalsByService.values())
    .map((bucket) => {
      const details = Array.from(bucket.details.values())
        .map((detail) => ({
          name: detail.name,
          cost: detail.cost,
          rowCount: detail.rowCount,
          share: bucket.cost !== 0 ? (detail.cost / bucket.cost) * 100 : 0,
        }))
        .sort((a, b) => b.cost - a.cost);
      const topChargeTypes = Array.from(bucket.chargeTypes.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name]) => name);
      return {
        name: bucket.name,
        cost: bucket.cost,
        rowCount: bucket.rowCount,
        share: totalCost !== 0 ? (bucket.cost / totalCost) * 100 : 0,
        detailCount: details.length,
        details,
        topChargeTypes,
        minDate: bucket.minDate,
        maxDate: bucket.maxDate,
      };
    })
    .sort((a, b) => b.cost - a.cost);

  return {
    provider: normalizedProvider,
    importedAt: new Date().toISOString(),
    rowCount: importedRows,
    serviceCount: services.length,
    totalCost,
    serviceColumn: rows[0][serviceIndex] || "Service",
    costColumn: rows[0][costIndex] || "Cost",
    detailColumn: rows[0][detailIndex] || "Detail",
    chargeTypeColumn: chargeTypeIndex >= 0 ? rows[0][chargeTypeIndex] : "",
    usageDateColumn: usageDateIndex >= 0 ? rows[0][usageDateIndex] : "",
    services,
  };
}

function setBillingProvider(provider) {
  currentBillingProvider = normalizeBillingProvider(provider);
  billingProviderTabs.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.billingProvider === currentBillingProvider
    );
  });
  if (billingFormatHint) {
    billingFormatHint.textContent = getBillingImportFormatHint(
      currentBillingProvider
    );
  }
  renderBillingImportPanel();
}

function getBillingExpandedServiceSet(provider) {
  const key = normalizeBillingProvider(provider);
  if (!(billingExpandedServices[key] instanceof Set)) {
    billingExpandedServices[key] = new Set();
  }
  return billingExpandedServices[key];
}

function renderBillingImportPanel() {
  if (!billingSummary || !billingChart || !billingTable) {
    return;
  }
  const data = billingImportStore[currentBillingProvider];
  if (!data) {
    billingSummary.innerHTML = `
      <article class="billing-summary-card">
        <h4>${currentBillingProvider.toUpperCase()}</h4>
        <p>No CSV imported for this provider yet.</p>
      </article>`;
    billingChart.innerHTML = `<p class="billing-empty">Import a billing CSV to visualize service allocation.</p>`;
    billingTable.innerHTML = "";
    if (billingNote && !billingNote.textContent.trim()) {
      billingNote.textContent = "Import a billing CSV to start allocation analysis.";
    }
    return;
  }

  const topServices = data.services.slice(0, 10);
  const maxValue = topServices.length ? Math.max(...topServices.map((row) => row.cost)) : 0;
  billingSummary.innerHTML = `
    <article class="billing-summary-card">
      <h4>${currentBillingProvider.toUpperCase()}</h4>
      <p>Total imported</p>
      <strong>${formatMoney(data.totalCost)}</strong>
    </article>
    <article class="billing-summary-card">
      <h4>Rows</h4>
      <p>Processed rows</p>
      <strong>${data.rowCount}</strong>
    </article>
    <article class="billing-summary-card">
      <h4>Services</h4>
      <p>Distinct services</p>
      <strong>${data.serviceCount}</strong>
    </article>
    <article class="billing-summary-card">
      <h4>Columns</h4>
      <p>${escapeMarkup(data.serviceColumn)} / ${escapeMarkup(data.costColumn)}</p>
      <strong>${new Date(data.importedAt).toLocaleString()}</strong>
    </article>
    <article class="billing-summary-card">
      <h4>Line-item column</h4>
      <p>${escapeMarkup(data.detailColumn || "Detail")}</p>
      <strong>${data.usageDateColumn ? escapeMarkup(data.usageDateColumn) : "No usage date column"}</strong>
    </article>`;

  billingChart.innerHTML = topServices.length
    ? topServices
        .map((service) => {
          const width = maxValue > 0 ? (service.cost / maxValue) * 100 : 0;
          return `
            <div class="billing-bar-row">
              <div class="billing-bar-meta">
                <span class="billing-bar-label">${escapeMarkup(service.name)}</span>
                <span class="billing-bar-value">${formatMoney(service.cost)} (${service.share.toFixed(1)}%)</span>
              </div>
              <div class="billing-bar-track">
                <div class="billing-bar-fill" style="width: ${Math.max(0, Math.min(100, width))}%"></div>
              </div>
            </div>`;
        })
        .join("")
    : `<p class="billing-empty">No service rows were parsed.</p>`;

  const expandedServices = getBillingExpandedServiceSet(currentBillingProvider);
  const tableRows = data.services
    .slice(0, 100)
    .map((service) => {
      const isExpanded = expandedServices.has(service.name);
      const toggleLabel = isExpanded ? "-" : "+";
      const details = Array.isArray(service.details) ? service.details : [];
      const detailRows = isExpanded
        ? details
            .slice(0, 200)
            .map(
              (detail) => `
              <tr class="billing-detail-row">
                <td></td>
                <td class="billing-detail-name">${escapeMarkup(detail.name)}</td>
                <td>${formatMoney(detail.cost)}</td>
                <td>${detail.share.toFixed(2)}%</td>
                <td>${detail.rowCount}</td>
                <td>Line item</td>
              </tr>`
            )
            .join("") +
          (() => {
            if (details.length > 200) {
              return `
                <tr class="billing-detail-row">
                  <td></td>
                  <td class="billing-detail-name" colspan="5">
                    Showing top 200 line items by cost (${details.length} total).
                  </td>
                </tr>`;
            }
            return "";
          })() +
          (() => {
            const tags = [];
            if (Array.isArray(service.topChargeTypes) && service.topChargeTypes.length) {
              tags.push(`Charge types: ${service.topChargeTypes.join(", ")}`);
            }
            if (Number.isFinite(service.minDate) && Number.isFinite(service.maxDate)) {
              const start = new Date(service.minDate).toLocaleDateString();
              const end = new Date(service.maxDate).toLocaleDateString();
              tags.push(`Usage range: ${start} - ${end}`);
            }
            if (!tags.length) {
              return "";
            }
            return `
              <tr class="billing-detail-row billing-detail-meta">
                <td></td>
                <td colspan="5">${escapeMarkup(tags.join(" | "))}</td>
              </tr>`;
          })()
        : "";
      return `
        <tr class="billing-service-row">
          <td>
            <button
              type="button"
              class="billing-expand-btn"
              data-billing-toggle="${encodeURIComponent(service.name)}"
              title="${isExpanded ? "Collapse" : "Expand"} line items"
            >
              ${toggleLabel}
            </button>
          </td>
          <td>${escapeMarkup(service.name)}</td>
          <td>${formatMoney(service.cost)}</td>
          <td>${service.share.toFixed(2)}%</td>
          <td>${service.rowCount}</td>
          <td>${service.detailCount || details.length}</td>
        </tr>
        ${detailRows}`;
    })
    .join("");
  billingTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Service</th>
          <th>Cost</th>
          <th>Share</th>
          <th>Rows</th>
          <th>Line items</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>`;
}

async function handleBillingImportFile(event) {
  const file = event?.target?.files?.[0];
  if (!file) {
    return;
  }
  try {
    const text = await file.text();
    const parsed = parseBillingImportCsv(text, currentBillingProvider);
    billingImportStore[currentBillingProvider] = parsed;
    billingExpandedServices[currentBillingProvider] = new Set();
    persistBillingImportStore(billingImportStore);
    setInlineNote(
      billingNote,
      `${currentBillingProvider.toUpperCase()} billing CSV imported (${parsed.rowCount} rows).`
    );
    renderBillingImportPanel();
  } catch (error) {
    setInlineNote(
      billingNote,
      error?.message || "Could not import billing CSV.",
      true
    );
  } finally {
    if (billingImportInput) {
      billingImportInput.value = "";
    }
  }
}

function handleBillingClearProvider() {
  billingImportStore[currentBillingProvider] = null;
  billingExpandedServices[currentBillingProvider] = new Set();
  persistBillingImportStore(billingImportStore);
  setInlineNote(
    billingNote,
    `Cleared ${currentBillingProvider.toUpperCase()} billing import.`
  );
  renderBillingImportPanel();
}

function handleBillingClearAll() {
  billingImportStore = { aws: null, azure: null, gcp: null, rackspace: null };
  billingExpandedServices.aws = new Set();
  billingExpandedServices.azure = new Set();
  billingExpandedServices.gcp = new Set();
  billingExpandedServices.rackspace = new Set();
  persistBillingImportStore(billingImportStore);
  setInlineNote(billingNote, "Cleared billing imports for all providers.");
  renderBillingImportPanel();
}

function buildCsv(data) {
  const input = data.input || {};
  const mode = input.mode || "vm";
  const vmCount = input.vmCount || 1;
  const providers = [
    {
      key: "aws",
      label: getProviderLabelForMode("aws", mode),
      region: data.region?.aws,
      data: data.aws,
    },
    {
      key: "azure",
      label: getProviderLabelForMode("azure", mode),
      region: data.region?.azure,
      data: data.azure,
    },
    {
      key: "gcp",
      label: getProviderLabelForMode("gcp", mode),
      region: data.region?.gcp,
      data: data.gcp,
    },
  ];
  if (data.private?.enabled) {
    providers.push({
      key: "private",
      label: getProviderLabelForMode("private", mode),
      region: data.region?.private,
      data: data.private,
    });
  }
  const tiers = [
    { key: "onDemand", label: "On-demand" },
    { key: "reserved1yr", label: "Reserved 1-year" },
    { key: "reserved3yr", label: "Reserved 3-year" },
  ];

  const rows = [];
  for (const provider of providers) {
    for (const tier of tiers) {
      const tierData = provider.data?.pricingTiers?.[tier.key];
      const totals = tierData?.totals;
      rows.push({
        Mode: mode,
        Provider: provider.label,
        Tier: tier.label,
        Instance: provider.data?.instance?.type || "",
        Region: provider.region?.location || "",
        vCPU: provider.data?.instance?.vcpu ?? "",
        RAM_GB: provider.data?.instance?.memory ?? "",
        VM_Count: vmCount,
        Hourly_Rate: tierData?.hourlyRate ?? "",
        Compute_Monthly: totals?.computeMonthly ?? "",
        Control_Plane_Monthly: totals?.controlPlaneMonthly ?? "",
        Control_Plane_Per_Host:
          Number.isFinite(totals?.controlPlaneMonthly) && vmCount > 0
            ? totals.controlPlaneMonthly / vmCount
            : "",
        Storage_Monthly: totals?.storageMonthly ?? "",
        Backup_Monthly: totals?.backupMonthly ?? "",
        Network_Monthly: totals?.networkMonthly ?? "",
        DR_Monthly: totals?.drMonthly ?? "",
        Egress_Monthly: totals?.egressMonthly ?? "",
        SQL_Monthly: totals?.sqlMonthly ?? "",
        Total_Monthly: totals?.total ?? "",
        Workload: input.workload ?? "",
        Pricing_Focus: input.pricingFocus ?? "all",
        Network_Addon_Focus: input.networkAddonFocus ?? "",
        SQL_Edition: input.sqlEdition ?? "",
        Pricing_Focus: input.pricingFocus ?? "all",
        Network_Addon_Focus: input.networkAddonFocus ?? "",
        SQL_License_Rate: input.sqlLicenseRate ?? "",
        Disk_Tier: input.diskTier ?? "",
        OS_Disk_GB: input.osDiskGb ?? "",
        Data_Disk_TB: input.dataDiskTb ?? "",
        Backups_Enabled: input.backupEnabled ? "Yes" : "No",
        AWS_VPC: input.awsVpcFlavor ?? "",
        AWS_Firewall: input.awsFirewallFlavor ?? "",
        AWS_Load_Balancer: input.awsLoadBalancerFlavor ?? "",
        Azure_VNet: input.azureVpcFlavor ?? "",
        Azure_Firewall: input.azureFirewallFlavor ?? "",
        Azure_Load_Balancer: input.azureLoadBalancerFlavor ?? "",
        GCP_VPC: input.gcpVpcFlavor ?? "",
        GCP_Firewall: input.gcpFirewallFlavor ?? "",
        GCP_Load_Balancer: input.gcpLoadBalancerFlavor ?? "",
        Private_Enabled: input.privateEnabled ? "Yes" : "No",
        Private_VMware_Monthly: input.privateVmwareMonthly ?? "",
        Private_Windows_License_Monthly:
          input.privateWindowsLicenseMonthly ?? "",
        Private_Node_Count: input.privateNodeCount ?? "",
        Private_SAN_per_TB: input.privateStoragePerTb ?? "",
        Private_Network_Monthly: input.privateNetworkMonthly ?? "",
        Private_Firewall_Monthly: input.privateFirewallMonthly ?? "",
        Private_Load_Balancer_Monthly:
          input.privateLoadBalancerMonthly ?? "",
        Windows_License_Monthly: totals?.windowsLicenseMonthly ?? "",
        Backup_Snapshot_GB: provider.data?.backup?.snapshotGb ?? "",
        DR_Percent: input.drPercent ?? "",
        Egress_TB: input.egressTb ?? "",
        Inter_VLAN_TB: input.interVlanTb ?? "",
        Intra_VLAN_TB: input.intraVlanTb ?? "",
        Inter_Region_TB: input.interRegionTb ?? "",
        Storage_IOPS: input.storageIops ?? "",
        Storage_Throughput_MBps: input.storageThroughputMbps ?? "",
        Hours: input.hours ?? "",
        Pricing_Source: provider.data?.source ?? "",
      });
    }
  }

  const headers = Object.keys(rows[0] || {});
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((key) => escapeCsv(row[key])).join(","));
  }
  return lines.join("\n");
}

async function handleExportCsv() {
  try {
    formNote.textContent = "Preparing CSV...";
    const data = lastPricing || (await fetchAndRender());
    const csv = buildCsv(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.download = `cloud-price-${dateStamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    formNote.textContent = "CSV exported.";
  } catch (error) {
    formNote.textContent =
      error?.message || "Could not export CSV. Try again.";
  }
}

function handleSavedCompareExport() {
  if (!savedCompareNote) {
    return;
  }
  if (!savedCompareRows.length) {
    savedCompareNote.textContent = "Run saved compare before exporting.";
    savedCompareNote.classList.add("negative");
    return;
  }
  savedCompareNote.classList.remove("negative");
  savedCompareNote.textContent = "Preparing saved compare CSV...";
  try {
    const csv = buildSavedCompareCsv(savedCompareRows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.download = `cloud-price-saved-${dateStamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    savedCompareNote.textContent = "Saved compare CSV exported.";
  } catch (error) {
    savedCompareNote.textContent =
      error?.message || "Could not export saved compare CSV.";
    savedCompareNote.classList.add("negative");
  }
}

function sanitizeScenarioFilename(name) {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function resolveScenarioForExport(scenario) {
  if (scenario) {
    return scenario;
  }
  const selectedId = scenarioList?.value;
  return selectedId
    ? getScenarioById(selectedId)
    : getScenarioByName(scenarioNameInput?.value || "");
}

function buildCsvFieldIndex(headers, fields) {
  const index = {};
  headers.forEach((header, idx) => {
    const normalized = normalizeCsvHeader(header);
    fields.forEach((field) => {
      if (
        normalized === normalizeCsvHeader(field.label) ||
        normalized === normalizeCsvHeader(field.key)
      ) {
        index[field.key] = idx;
      }
    });
  });
  return index;
}

function buildScenarioCsv(scenario) {
  const headers = SCENARIO_CSV_FIELDS.map((field) => field.label);
  const row = SCENARIO_CSV_FIELDS.map((field) => {
    if (field.key === "name") {
      return escapeCsv(scenario.name || "");
    }
    const value = scenario.input?.[field.key];
    if (field.type === "boolean") {
      return escapeCsv(value ? "true" : "false");
    }
    return escapeCsv(value ?? "");
  });
  return `${headers.join(",")}\n${row.join(",")}`;
}

function parseScenarioCsv(text) {
  const rows = parseCsvRows(text);
  if (rows.length < 2) {
    return [];
  }
  const headers = rows[0];
  const index = buildCsvFieldIndex(headers, SCENARIO_CSV_FIELDS);
  return rows.slice(1).map((row) => {
    const input = {};
    let name = "";
    SCENARIO_CSV_FIELDS.forEach((field) => {
      const idx = index[field.key];
      if (idx === undefined) {
        return;
      }
      const raw = row[idx] ?? "";
      if (field.key === "name") {
        name = raw.trim();
        return;
      }
      if (raw === "") {
        return;
      }
      if (field.type === "number") {
        const parsed = Number.parseFloat(raw);
        if (Number.isFinite(parsed)) {
          input[field.key] = parsed;
        }
        return;
      }
      if (field.type === "boolean") {
        const parsed = parseCsvBoolean(raw);
        if (parsed !== undefined) {
          input[field.key] = parsed;
        }
        return;
      }
      input[field.key] = raw;
    });
    return { name, input };
  }).filter((item) => item.name && Object.keys(item.input).length);
}

function handleExportScenario(scenario, noteTarget) {
  const targetNote = noteTarget || savedCompareNote || scenarioNote;
  const selectedScenario = resolveScenarioForExport(scenario);
  if (!selectedScenario) {
    setInlineNote(targetNote, "Select a scenario to export.", true);
    return;
  }
  const payload = {
    version: 1,
    scenario: {
      name: selectedScenario.name,
      input: selectedScenario.input,
      createdAt: selectedScenario.createdAt,
      updatedAt: selectedScenario.updatedAt,
    },
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const safeName =
    sanitizeScenarioFilename(selectedScenario.name) || "scenario";
  link.download = `cloud-price-${safeName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setInlineNote(targetNote, `Exported "${selectedScenario.name}".`);
}

function handleExportScenarioCsv(scenario, noteTarget) {
  const targetNote = noteTarget || savedCompareNote || scenarioNote;
  const selectedScenario = resolveScenarioForExport(scenario);
  if (!selectedScenario) {
    setInlineNote(targetNote, "Select a scenario to export.", true);
    return;
  }
  const csv = buildScenarioCsv(selectedScenario);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const safeName =
    sanitizeScenarioFilename(selectedScenario.name) || "scenario";
  link.download = `cloud-price-${safeName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setInlineNote(
    targetNote,
    `Exported "${selectedScenario.name}" as CSV.`
  );
}

async function handleImportScenarioFile(event) {
  const targetNote = savedCompareNote || scenarioNote;
  const file = event?.target?.files?.[0];
  if (!file) {
    return;
  }
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const items = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.scenarios)
      ? parsed.scenarios
      : parsed?.scenario
      ? [parsed.scenario]
      : parsed?.name && parsed?.input
      ? [parsed]
      : [];
    if (!items.length) {
      setInlineNote(targetNote, "No valid scenarios found in file.", true);
      return;
    }
    let importedCount = 0;
    const now = new Date().toISOString();
    items.forEach((item) => {
      const rawName = item?.name || "";
      const input = item?.input;
      if (!rawName || !input) {
        return;
      }
      const trimmed = rawName.trim();
      if (!trimmed) {
        return;
      }
      const name = getScenarioByName(trimmed)
        ? buildCloneName(trimmed)
        : trimmed;
      const scenarioId = `scn-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;
      scenarioStore.push({
        id: scenarioId,
        name,
        input,
        createdAt: item?.createdAt || now,
        updatedAt: now,
      });
      importedCount += 1;
    });
    if (!importedCount) {
      setInlineNote(targetNote, "No valid scenarios found in file.", true);
      return;
    }
    persistScenarioStore(scenarioStore);
    renderScenarioList();
    setInlineNote(
      targetNote,
      `Imported ${importedCount} scenario(s).`
    );
  } catch (error) {
    setInlineNote(
      targetNote,
      error?.message || "Could not import scenario file.",
      true
    );
  } finally {
    if (importScenarioInput) {
      importScenarioInput.value = "";
    }
  }
}

async function handleImportScenarioCsvFile(event) {
  const targetNote = savedCompareNote || scenarioNote;
  const file = event?.target?.files?.[0];
  if (!file) {
    return;
  }
  try {
    const text = await file.text();
    const items = parseScenarioCsv(text);
    if (!items.length) {
      setInlineNote(targetNote, "No valid scenarios found in CSV.", true);
      return;
    }
    let importedCount = 0;
    const now = new Date().toISOString();
    items.forEach((item) => {
      const trimmed = item.name.trim();
      if (!trimmed) {
        return;
      }
      const name = getScenarioByName(trimmed)
        ? buildCloneName(trimmed)
        : trimmed;
      const scenarioId = `scn-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;
      scenarioStore.push({
        id: scenarioId,
        name,
        input: item.input,
        createdAt: now,
        updatedAt: now,
      });
      importedCount += 1;
    });
    if (!importedCount) {
      setInlineNote(targetNote, "No valid scenarios found in CSV.", true);
      return;
    }
    persistScenarioStore(scenarioStore);
    renderScenarioList();
    setInlineNote(
      targetNote,
      `Imported ${importedCount} scenario(s) from CSV.`
    );
  } catch (error) {
    setInlineNote(
      targetNote,
      error?.message || "Could not import scenario CSV.",
      true
    );
  } finally {
    if (importScenarioCsvInput) {
      importScenarioCsvInput.value = "";
    }
  }
}

function buildPrivateProvidersCsv(providers) {
  const headers = PRIVATE_PROVIDER_CSV_FIELDS.map((field) => field.label);
  const lines = [headers.join(",")];
  providers.forEach((provider) => {
    const row = PRIVATE_PROVIDER_CSV_FIELDS.map((field) => {
      if (field.key === "name") {
        return escapeCsv(provider.name || "");
      }
      const value = provider.config?.[field.key];
      if (field.type === "boolean") {
        return escapeCsv(value ? "true" : "false");
      }
      return escapeCsv(value ?? "");
    });
    lines.push(row.join(","));
  });
  return lines.join("\n");
}

function parsePrivateProvidersCsv(text) {
  const rows = parseCsvRows(text);
  if (rows.length < 2) {
    return [];
  }
  const headers = rows[0];
  const index = buildCsvFieldIndex(headers, PRIVATE_PROVIDER_CSV_FIELDS);
  return rows.slice(1).map((row) => {
    const config = {};
    let name = "";
    PRIVATE_PROVIDER_CSV_FIELDS.forEach((field) => {
      const idx = index[field.key];
      if (idx === undefined) {
        return;
      }
      const raw = row[idx] ?? "";
      if (field.key === "name") {
        name = raw.trim();
        return;
      }
      if (raw === "") {
        return;
      }
      if (field.type === "number") {
        const parsed = Number.parseFloat(raw);
        if (Number.isFinite(parsed)) {
          config[field.key] = parsed;
        }
        return;
      }
      if (field.type === "boolean") {
        const parsed = parseCsvBoolean(raw);
        if (parsed !== undefined) {
          config[field.key] = parsed;
        }
        return;
      }
      config[field.key] = raw;
    });
    return { name, config: normalizePrivateConfig(config) };
  }).filter((item) => item.name);
}

function handleExportPrivateProvidersCsv() {
  if (!privateSaveNote) {
    return;
  }
  if (!privateProviderStore.providers.length) {
    setPrivateNote("No private providers to export.", true);
    return;
  }
  const csv = buildPrivateProvidersCsv(privateProviderStore.providers);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const dateStamp = new Date().toISOString().slice(0, 10);
  link.download = `private-providers-${dateStamp}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setPrivateNote("Private providers CSV exported.");
}

async function handleImportPrivateProvidersCsvFile(event) {
  if (!privateSaveNote) {
    return;
  }
  const file = event?.target?.files?.[0];
  if (!file) {
    return;
  }
  try {
    const text = await file.text();
    const providers = parsePrivateProvidersCsv(text);
    if (!providers.length) {
      setPrivateNote("No valid private providers found in CSV.", true);
      return;
    }
    let importedCount = 0;
    const now = new Date().toISOString();
    providers.forEach((item) => {
      const trimmed = item.name.trim();
      if (!trimmed) {
        return;
      }
      const existing = privateProviderStore.providers.find(
        (provider) =>
          provider.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (existing) {
        existing.config = item.config;
        existing.updatedAt = now;
      } else {
        const id = `prv-${Date.now().toString(36)}-${Math.random()
          .toString(36)
          .slice(2, 7)}`;
        privateProviderStore.providers.push({
          id,
          name: trimmed,
          config: item.config,
          createdAt: now,
          updatedAt: now,
        });
      }
      importedCount += 1;
    });
    if (!importedCount) {
      setPrivateNote("No valid private providers found in CSV.", true);
      return;
    }
    persistPrivateProviders(privateProviderStore);
    renderPrivateProviderCards();
    setPrivateNote(`Imported ${importedCount} private provider(s).`);
  } catch (error) {
    setPrivateNote(
      error?.message || "Could not import private providers CSV.",
      true
    );
  } finally {
    if (importPrivateProvidersInput) {
      importPrivateProvidersInput.value = "";
    }
  }
}

function handleSaveScenario() {
  if (!scenarioNameInput) {
    return;
  }
  const name = scenarioNameInput.value.trim();
  if (!name) {
    setScenarioNote("Enter a scenario name to save.", true);
    return;
  }
  const payload = serializeForm(form);
  const existing = getScenarioByName(name);
  const timestamp = new Date().toISOString();
  let scenarioId = "";
  if (existing) {
    existing.input = payload;
    existing.updatedAt = timestamp;
    scenarioId = existing.id;
    setScenarioNote("Scenario updated.");
  } else {
    scenarioId = `scn-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    scenarioStore.push({
      id: scenarioId,
      name,
      input: payload,
      createdAt: timestamp,
    });
    setScenarioNote("Scenario saved.");
  }
  persistScenarioStore(scenarioStore);
  renderScenarioList(scenarioId);
  if (currentResultsTab === "saved") {
    refreshSavedCompare();
  }
}

function handleLoadScenario() {
  if (!scenarioList) {
    return;
  }
  const scenario = getScenarioById(scenarioList.value);
  if (!scenario) {
    setScenarioNote("Select a scenario to load.", true);
    return;
  }
  applyScenarioInput(scenario.input);
  if (scenarioNameInput) {
    scenarioNameInput.value = scenario.name;
  }
  setScenarioNote(`Loaded "${scenario.name}".`);
  handleCompare();
}

function handleCloneScenario() {
  if (!scenarioList) {
    return;
  }
  const scenario = getScenarioById(scenarioList.value);
  if (!scenario) {
    setScenarioNote("Select a scenario to clone.", true);
    return;
  }
  const cloneName = buildCloneName(scenario.name);
  const timestamp = new Date().toISOString();
  const cloneId = `scn-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
  scenarioStore.push({
    id: cloneId,
    name: cloneName,
    input: { ...scenario.input },
    createdAt: timestamp,
  });
  persistScenarioStore(scenarioStore);
  renderScenarioList(cloneId);
  if (scenarioNameInput) {
    scenarioNameInput.value = cloneName;
  }
  applyScenarioInput(scenario.input);
  setScenarioNote(`Cloned "${scenario.name}" to "${cloneName}".`);
  handleCompare();
}

function handleDeleteScenario() {
  if (!scenarioList) {
    return;
  }
  const scenario = getScenarioById(scenarioList.value);
  if (!scenario) {
    setScenarioNote("Select a scenario to delete.", true);
    return;
  }
  deleteScenarioById(scenario.id);
  if (currentResultsTab === "saved") {
    refreshSavedCompare();
  }
  if (scenarioNameInput) {
    scenarioNameInput.value = "";
  }
  setScenarioNote(`Deleted "${scenario.name}".`);
}

async function handleCompareScenario() {
  if (!scenarioList || !scenarioDelta) {
    return;
  }
  const scenario = getScenarioById(scenarioList.value);
  if (!scenario) {
    setScenarioNote("Select a scenario to compare.", true);
    return;
  }
  scenarioDelta.classList.remove("is-hidden");
  scenarioDelta.textContent = "Comparing scenario...";
  try {
    const currentData = lastPricing || (await fetchAndRender());
    const scenarioData = await comparePricing(scenario.input);
    const comparison = buildScenarioComparison(
      currentData,
      scenarioData,
      scenario.name
    );
    scenarioDelta.textContent = comparison.text;
    scenarioDelta.classList.toggle("negative", comparison.diffTotal > 0);
  } catch (error) {
    scenarioDelta.textContent =
      error?.message || "Scenario comparison failed.";
    scenarioDelta.classList.add("negative");
  }
}

form.addEventListener("submit", handleCompare);
exportButton.addEventListener("click", handleExportCsv);
resultsTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTab = button.dataset.results;
    if (currentMode === "network" || currentMode === "storage") {
      if (nextTab === "insight") {
        if (currentMode === "network") {
          setNetworkResultTab("insight");
        } else {
          setStorageResultTab("insight");
        }
        return;
      }
      if (nextTab === "pricing") {
        if (currentMode === "network") {
          setNetworkResultTab(
            currentNetworkResult === "insight" ? "vpc" : currentNetworkResult
          );
        } else {
          setStorageResultTab(
            currentStorageResult === "insight"
              ? "object"
              : currentStorageResult
          );
        }
      }
      return;
    }
    setResultsTab(nextTab);
  });
});
vendorSubtabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextView = button.dataset.vendorView;
    setVendorSubtab(nextView);
  });
});
networkResultTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setNetworkResultTab(button.dataset.networkResult);
  });
});
storageResultTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setStorageResultTab(button.dataset.storageResult);
  });
});
networkAddonTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setNetworkAddonFocus(button.dataset.networkFocus);
  });
});
if (runRegionCompareButton) {
  runRegionCompareButton.addEventListener("click", runRegionCompare);
}
if (savedCompareRefresh) {
  savedCompareRefresh.addEventListener("click", () => {
    const scenarioIds = resolveScenarioSelections();
    refreshSavedCompare({
      scenarioIds: scenarioIds.length ? scenarioIds : null,
    });
  });
}
if (savedComparePrivateRun) {
  savedComparePrivateRun.addEventListener("click", runSavedPrivateCompare);
}
Object.entries(commitDiscountInputs).forEach(([, input]) => {
  if (input) {
    input.addEventListener("input", () => renderCommit(lastPricing));
  }
});
if (runRecommendationsButton) {
  runRecommendationsButton.addEventListener("click", () => {
    renderRecommendations(lastPricing);
  });
}
if (recommendProviderFilter) {
  recommendProviderFilter.addEventListener("change", () => {
    renderRecommendations(lastPricing);
  });
}
if (recommendLimitInput) {
  recommendLimitInput.addEventListener("input", () => {
    renderRecommendations(lastPricing);
  });
}
if (saveScenarioButton) {
  saveScenarioButton.addEventListener("click", handleSaveScenario);
}
if (loadScenarioButton) {
  loadScenarioButton.addEventListener("click", handleLoadScenario);
}
if (cloneScenarioButton) {
  cloneScenarioButton.addEventListener("click", handleCloneScenario);
}
if (compareScenarioButton) {
  compareScenarioButton.addEventListener("click", handleCompareScenario);
}
if (deleteScenarioButton) {
  deleteScenarioButton.addEventListener("click", handleDeleteScenario);
}
if (importScenarioButton && importScenarioInput) {
  importScenarioButton.addEventListener("click", () => {
    importScenarioInput.click();
  });
  importScenarioInput.addEventListener("change", handleImportScenarioFile);
}
if (importScenarioCsvButton && importScenarioCsvInput) {
  importScenarioCsvButton.addEventListener("click", () => {
    importScenarioCsvInput.click();
  });
  importScenarioCsvInput.addEventListener("change", handleImportScenarioCsvFile);
}
if (exportPrivateProvidersButton) {
  exportPrivateProvidersButton.addEventListener(
    "click",
    handleExportPrivateProvidersCsv
  );
}
if (importPrivateProvidersButton && importPrivateProvidersInput) {
  importPrivateProvidersButton.addEventListener("click", () => {
    importPrivateProvidersInput.click();
  });
  importPrivateProvidersInput.addEventListener(
    "change",
    handleImportPrivateProvidersCsvFile
  );
}
if (addPrivateProviderButton) {
  addPrivateProviderButton.addEventListener("click", () => {
    addPrivateProviderCard();
  });
}
viewTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextView = button.dataset.view;
    setView(nextView);
    if (nextView && nextView !== "compare") {
      handleCompare();
    }
  });
});
if (scenarioList) {
  scenarioList.addEventListener("change", () => {
    const scenario = getScenarioById(scenarioList.value);
    if (scenarioNameInput) {
      scenarioNameInput.value = scenario?.name || "";
    }
  });
}
[awsInstanceFilter, azureInstanceFilter, gcpInstanceFilter].forEach((input) => {
  if (input) {
    input.addEventListener("input", refreshInstanceSelects);
  }
});
modeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const nextPanel = tab.dataset.mode;
    setPanel(nextPanel);
    if (
      nextPanel !== "private" &&
      nextPanel !== "scenarios" &&
      nextPanel !== "saved" &&
      nextPanel !== "billing"
    ) {
      handleCompare();
    }
  });
});
workloadSelect.addEventListener("change", () => {
  updateCpuOptions();
  updateInstanceOptions();
});
cpuSelect.addEventListener("change", () => {
  updateInstanceOptions();
});
if (networkProviderCards) {
  networkProviderCards.addEventListener("change", () => {
    if (currentMode === "network") {
      handleCompare();
    }
  });
}
if (storageProviderCards) {
  storageProviderCards.addEventListener("change", () => {
    if (currentMode === "storage") {
      handleCompare();
    }
  });
}
billingProviderTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setBillingProvider(button.dataset.billingProvider);
  });
});
if (billingImportButton && billingImportInput) {
  billingImportButton.addEventListener("click", () => {
    billingImportInput.click();
  });
  billingImportInput.addEventListener("change", handleBillingImportFile);
}
if (billingClearButton) {
  billingClearButton.addEventListener("click", handleBillingClearProvider);
}
if (billingClearAllButton) {
  billingClearAllButton.addEventListener("click", handleBillingClearAll);
}
if (billingTable) {
  billingTable.addEventListener("click", (event) => {
    const button = event.target.closest("[data-billing-toggle]");
    if (!button) {
      return;
    }
    const encodedName = button.dataset.billingToggle || "";
    const serviceName = decodeURIComponent(encodedName);
    if (!serviceName) {
      return;
    }
    const expanded = getBillingExpandedServiceSet(currentBillingProvider);
    if (expanded.has(serviceName)) {
      expanded.delete(serviceName);
    } else {
      expanded.add(serviceName);
    }
    renderBillingImportPanel();
  });
}
sqlRateInput.addEventListener("input", () => {
  const rateValue = Number.parseFloat(sqlRateInput.value);
  sqlRateTouched = !isDefaultSqlRate(rateValue, sqlEditionSelect.value);
});
sqlEditionSelect.addEventListener("change", () => {
  if (!sqlRateTouched) {
    const nextRate = SQL_DEFAULTS[sqlEditionSelect.value];
    sqlRateInput.value = nextRate.toString();
  }
  const nextValue = Number.parseFloat(sqlRateInput.value);
  sqlRateTouched = !isDefaultSqlRate(nextValue, sqlEditionSelect.value);
});
window.addEventListener("load", async () => {
  scenarioStore = loadScenarioStore();
  billingImportStore = loadBillingImportStore();
  savedCompareScenarioSelections = loadSavedCompareSelections(
    SAVED_COMPARE_SCENARIOS_KEY
  );
  savedComparePrivateSelections = loadSavedCompareSelections(
    SAVED_COMPARE_PRIVATE_KEY
  );
  renderScenarioList();
  privateProviderStore = loadPrivateProviders();
  privateCompareSelections = loadPrivateCompareSelections();
  renderPrivateProviderCards();
  setBillingProvider("aws");
  setPanel(modeInput.value);
  buildRegionChecklist();
  try {
    await loadSizeOptions();
  } catch (error) {
    formNote.textContent =
      error?.message ||
      "Could not load size options. Defaults will be used.";
    setSelectOptions(cpuSelect, [8], 8);
    setInstanceOptions(awsInstanceSelect, [], "");
    setInstanceOptions(azureInstanceSelect, [], "");
    setInstanceOptions(gcpInstanceSelect, [], "");
    const fallbackOptions = [{ key: "none", label: "None" }];
    setSelectOptionsWithLabels(awsVpcSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(awsFirewallSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(awsLbSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(azureVpcSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(azureFirewallSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(azureLbSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(gcpVpcSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(gcpFirewallSelect, fallbackOptions, "none");
    setSelectOptionsWithLabels(gcpLbSelect, fallbackOptions, "none");
  }
  handleCompare();
});
