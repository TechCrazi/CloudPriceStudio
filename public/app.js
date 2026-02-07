const form = document.getElementById("pricing-form");
const formNote = document.getElementById("form-note");
const delta = document.getElementById("delta");
const exportButton = document.getElementById("export-csv");
const modeInput = document.getElementById("mode-input");
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
const privateTitle = document.getElementById("private-title");
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
const dataDiskInput = form.querySelector("[name='dataDiskTb']");
const backupEnabledInput = form.querySelector("[name='backupEnabled']");
const drPercentInput = form.querySelector("[name='drPercent']");
const privateEnabledInput = document.getElementById("private-enabled");
const privateVmwareInput = form.querySelector("[name='privateVmwareMonthly']");
const privateWindowsLicenseInput = form.querySelector(
  "[name='privateWindowsLicenseMonthly']"
);
const privateNodeCountInput = form.querySelector("[name='privateNodeCount']");
const privateNetworkInput = form.querySelector("[name='privateNetworkMonthly']");
const privateFirewallInput = form.querySelector("[name='privateFirewallMonthly']");
const privateLoadBalancerInput = form.querySelector("[name='privateLoadBalancerMonthly']");
const privateNodeCpuInput = form.querySelector("[name='privateNodeCpu']");
const privateNodeRamInput = form.querySelector("[name='privateNodeRam']");
const privateNodeStorageInput = form.querySelector("[name='privateNodeStorageTb']");
const privateVmOsDiskInput = form.querySelector("[name='privateVmOsDiskGb']");
const privateSanUsableInput = form.querySelector("[name='privateSanUsableTb']");
const privateSanTotalInput = form.querySelector("[name='privateSanTotalMonthly']");
const privateSanRate = document.getElementById("private-san-rate");
const privateStoragePerTbInput = document.getElementById(
  "private-storage-per-tb"
);
const privateCapacityCounts = {
  "8-16": document.getElementById("private-capacity-8-16"),
  "12-24": document.getElementById("private-capacity-12-24"),
  "16-32": document.getElementById("private-capacity-16-32"),
  "24-48": document.getElementById("private-capacity-24-48"),
  "48-64": document.getElementById("private-capacity-48-64"),
  "64-128": document.getElementById("private-capacity-64-128"),
  "128-512": document.getElementById("private-capacity-128-512"),
};
const privateCapacityTotals = {
  "8-16": document.getElementById("private-capacity-8-16-total"),
  "12-24": document.getElementById("private-capacity-12-24-total"),
  "16-32": document.getElementById("private-capacity-16-32-total"),
  "24-48": document.getElementById("private-capacity-24-48-total"),
  "48-64": document.getElementById("private-capacity-48-64-total"),
  "64-128": document.getElementById("private-capacity-64-128-total"),
  "128-512": document.getElementById("private-capacity-128-512-total"),
};
const privateOsSizeLabels = document.querySelectorAll(".private-os-size");
const scenarioNameInput = document.getElementById("scenario-name");
const scenarioList = document.getElementById("scenario-list");
const scenarioNote = document.getElementById("scenario-note");
const scenarioDelta = document.getElementById("scenario-delta");
const saveScenarioButton = document.getElementById("save-scenario");
const loadScenarioButton = document.getElementById("load-scenario");
const cloneScenarioButton = document.getElementById("clone-scenario");
const compareScenarioButton = document.getElementById("compare-scenario");
const deleteScenarioButton = document.getElementById("delete-scenario");
const awsInstanceFilter = document.getElementById("aws-instance-filter");
const azureInstanceFilter = document.getElementById("azure-instance-filter");
const gcpInstanceFilter = document.getElementById("gcp-instance-filter");
const privateCard = document.getElementById("private-card");
const awsCard = document.getElementById("aws-card");
const azureCard = document.getElementById("azure-card");
const gcpCard = document.getElementById("gcp-card");
const compareGrid = document.getElementById("compare-grid");
const vendorGrid = document.getElementById("vendor-grid");
const vendorCardTemplate = document.getElementById("vendor-card-template");
const privateOptionTemplate = document.getElementById("private-option-template");
const viewTabs = document.getElementById("vm-view-tabs");
const viewTabButtons = document.querySelectorAll(".view-tab");
const cloudPanel = document.getElementById("cloud-panel");
const privatePanel = document.getElementById("private-panel");
const privateSaveButton = document.getElementById("save-private");
const privateSaveNote = document.getElementById("private-save-note");

const SQL_DEFAULTS = {
  none: 0,
  standard: 0.35,
  enterprise: 0.5,
};
const DISK_TIER_LABELS = {
  premium: "Premium SSD",
  max: "Max performance",
};
const SCENARIO_STORAGE_KEY = "cloud-price-scenarios";
const PRIVATE_STORAGE_KEY = "cloud-price-private";
const VMWARE_VCPU_PER_SOCKET = 3;
const MAX_VENDOR_OPTIONS = 4;
let sqlRateTouched = false;
let sizeOptions = null;
let lastPricing = null;
let currentMode = "vm";
let activePanel = "vm";
let currentView = "compare";
const vendorOptionState = {
  aws: [],
  azure: [],
  gcp: [],
  private: [],
};
let scenarioStore = [];
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
  private: {
    status: document.getElementById("private-status"),
    family: document.getElementById("private-family"),
    instance: document.getElementById("private-instance"),
    shape: document.getElementById("private-shape"),
    region: document.getElementById("private-region"),
    hourly: document.getElementById("private-hourly"),
    network: document.getElementById("private-network"),
    tiers: {
      onDemand: {
        total: document.getElementById("private-od-total"),
        rate: document.getElementById("private-od-rate"),
      },
      year1: {
        total: document.getElementById("private-1y-total"),
        rate: document.getElementById("private-1y-rate"),
      },
      year3: {
        total: document.getElementById("private-3y-total"),
        rate: document.getElementById("private-3y-rate"),
      },
    },
    savings: document.getElementById("private-savings"),
    breakdown: document.getElementById("private-breakdown"),
    note: document.getElementById("private-note"),
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

function setMode(mode) {
  const nextMode = mode === "k8s" ? "k8s" : "vm";
  const wasK8s = currentMode === "k8s";
  if (nextMode === "k8s" && !wasK8s) {
    sqlState = {
      edition: sqlEditionSelect.value,
      rate: sqlRateInput.value,
    };
  }
  currentMode = nextMode;
  modeInput.value = currentMode;
  const copy = MODE_COPY[currentMode];
  formTitle.textContent = copy.formTitle;
  formSubtitle.textContent = copy.formSubtitle;
  resultsTitle.textContent = copy.resultsTitle;
  resultsSubtitle.textContent = copy.resultsSubtitle;
  cpuLabel.textContent = copy.cpuLabel;
  vmCountLabel.textContent = copy.countLabel;
  egressLabel.textContent = copy.egressLabel;
  awsTitle.textContent = copy.awsTitle;
  azureTitle.textContent = copy.azureTitle;
  gcpTitle.textContent = copy.gcpTitle;
  if (privateTitle) {
    privateTitle.textContent = copy.privateTitle;
  }

  const isK8s = currentMode === "k8s";
  workloadField.classList.toggle("is-hidden", isK8s);
  sqlEditionField.classList.toggle("is-hidden", isK8s);
  sqlRateField.classList.toggle("is-hidden", isK8s);
  sqlEditionSelect.disabled = isK8s;
  sqlRateInput.disabled = isK8s;
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
    sqlEditionSelect.value = sqlState.edition || "none";
    sqlRateInput.value = sqlState.rate || "0";
    osDiskLabel.textContent = "OS disk (GB)";
    osDiskInput.min = "0";
    vmCountInput.min = "1";
    const currentCount = Number.parseInt(vmCountInput.value, 10);
    if (!Number.isFinite(currentCount) || currentCount < 1) {
      vmCountInput.value = "1";
    }
    dataDiskLabel.textContent = "Data disk (TB)";
  }

  if (sizeOptions) {
    updateCpuOptions();
    updateInstanceOptions();
  }
  updateViewTabsVisibility();
}

function setPanel(panel) {
  const nextPanel =
    panel === "private" ? "private" : panel === "k8s" ? "k8s" : "vm";
  activePanel = nextPanel;
  modeTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === nextPanel);
  });
  if (nextPanel === "private") {
    if (cloudPanel) {
      cloudPanel.classList.add("is-hidden");
    }
    if (privatePanel) {
      privatePanel.classList.remove("is-hidden");
    }
    formTitle.textContent = "Private pricing inputs";
    formSubtitle.textContent =
      "Set manual VMware, SAN, and network costs to compare against cloud totals.";
    updateViewTabsVisibility();
    return;
  }
  if (cloudPanel) {
    cloudPanel.classList.remove("is-hidden");
  }
  if (privatePanel) {
    privatePanel.classList.add("is-hidden");
  }
  setMode(nextPanel);
  updateViewTabsVisibility();
  setView(currentView);
}

function updateViewTabsVisibility() {
  if (!viewTabs) {
    return;
  }
  const showTabs = activePanel === "vm" && currentMode === "vm";
  viewTabs.classList.toggle("is-hidden", !showTabs);
  if (!showTabs && currentView !== "compare") {
    currentView = "compare";
    setView("compare");
  }
}

function setView(view) {
  const nextView =
    view === "aws" || view === "azure" || view === "gcp" || view === "private"
      ? view
      : "compare";
  currentView = nextView;
  viewTabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === nextView);
  });
  const showAll = nextView === "compare";
  const shouldShowPrivate = nextView === "private" || showAll;
  if (awsCard) {
    awsCard.classList.toggle("is-hidden", !(showAll || nextView === "aws"));
  }
  if (azureCard) {
    azureCard.classList.toggle("is-hidden", !(showAll || nextView === "azure"));
  }
  if (gcpCard) {
    gcpCard.classList.toggle("is-hidden", !(showAll || nextView === "gcp"));
  }
  if (privateCard) {
    privateCard.classList.toggle("is-hidden", !shouldShowPrivate);
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

function updateProvider(target, provider, region, options = {}) {
  target.family.textContent = provider.family || "-";
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
  if (Number.isFinite(networkGbps)) {
    target.network.textContent = `>= ${networkGbps} Gbps`;
  } else if (provider.instance?.networkLabel) {
    target.network.textContent = provider.instance.networkLabel;
  } else {
    target.network.textContent = "-";
  }

  setStatus(target.status, provider.status, provider.message);

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
    target.breakdown.textContent = "Compute rate unavailable.";
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
    const showSql = options.mode !== "k8s";
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
      options.vmCount && options.vmCount > 1
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
    const breakdownLines = [
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
  if (provider.message) {
    noteParts.push(provider.message);
  }
  if (provider.networkAddons?.note) {
    noteParts.push(provider.networkAddons.note);
  }
  if (options.mode !== "k8s" && provider.sqlNote) {
    noteParts.push(provider.sqlNote);
  }
  if (options.showReservationNote && provider.reservationNote) {
    noteParts.push(provider.reservationNote);
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
  const osDefault = Number.parseFloat(privateVmOsDiskInput?.value);
  const osDisk = Number.isFinite(osDefault) && osDefault > 0
    ? osDefault
    : Number.parseFloat(osDiskInput?.value) || 256;
  const dataTb = Number.parseFloat(dataDiskInput?.value);
  const dataGb = Number.isFinite(dataTb) ? dataTb * 1024 : 1024;
  return PRIVATE_FLAVORS.slice(0, MAX_VENDOR_OPTIONS).map((flavor) => ({
    vcpu: flavor.vcpu,
    ram: flavor.ram,
    osDiskGb: osDisk,
    dataDiskGb: dataGb,
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
    providerKey: "private",
    optionIndex,
  };
}

function buildVendorPayload(basePayload, cardState) {
  const payload = { ...basePayload };
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
  const data = await comparePricing(payload);
  const providerKey = cardState.providerKey;
  const providerData = data[providerKey];
  const vmCount = data.input?.vmCount ?? payload.vmCount;
  const mode = data.input?.mode ?? payload.mode ?? "vm";
  updateProvider(cardState.fields, providerData, data.region[providerKey], {
    showMonthlyRate: false,
    showReservationNote: providerKey === "aws",
    vmCount,
    mode,
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
        vendorOptionState.private[index] = {
          vcpu: Number.parseFloat(cardState.specInputs.vcpuInput?.value),
          ram: Number.parseFloat(cardState.specInputs.ramInput?.value),
          osDiskGb: Number.parseFloat(cardState.specInputs.osInput?.value),
          dataDiskGb: Number.parseFloat(cardState.specInputs.dataInput?.value),
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
  if (privateProvider?.enabled) {
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

function getPrivateConfigFromForm() {
  return {
    enabled: Boolean(privateEnabledInput?.checked),
    vmwareMonthly: Number.parseFloat(privateVmwareInput?.value) || 0,
    windowsLicenseMonthly:
      Number.parseFloat(privateWindowsLicenseInput?.value) || 0,
    nodeCount: Number.parseFloat(privateNodeCountInput?.value) || 0,
    storagePerTb: Number.parseFloat(privateStoragePerTbInput?.value) || 0,
    networkMonthly: Number.parseFloat(privateNetworkInput?.value) || 0,
    firewallMonthly: Number.parseFloat(privateFirewallInput?.value) || 0,
    loadBalancerMonthly:
      Number.parseFloat(privateLoadBalancerInput?.value) || 0,
    nodeCpu: Number.parseFloat(privateNodeCpuInput?.value) || 0,
    nodeRam: Number.parseFloat(privateNodeRamInput?.value) || 0,
    nodeStorageTb: Number.parseFloat(privateNodeStorageInput?.value) || 0,
    vmOsDiskGb: Number.parseFloat(privateVmOsDiskInput?.value) || 0,
    sanUsableTb: Number.parseFloat(privateSanUsableInput?.value) || 0,
    sanTotalMonthly: Number.parseFloat(privateSanTotalInput?.value) || 0,
  };
}

function applyPrivateConfig(config) {
  if (!config) {
    return;
  }
  if (privateEnabledInput && typeof config.enabled === "boolean") {
    privateEnabledInput.checked = config.enabled;
  }
  if (privateVmwareInput && Number.isFinite(config.vmwareMonthly)) {
    privateVmwareInput.value = config.vmwareMonthly.toString();
  }
  if (
    privateWindowsLicenseInput &&
    Number.isFinite(config.windowsLicenseMonthly)
  ) {
    privateWindowsLicenseInput.value =
      config.windowsLicenseMonthly.toString();
  }
  if (privateNodeCountInput && Number.isFinite(config.nodeCount)) {
    privateNodeCountInput.value = config.nodeCount.toString();
  }
  if (privateStoragePerTbInput && Number.isFinite(config.storagePerTb)) {
    privateStoragePerTbInput.value = config.storagePerTb.toString();
  }
  if (privateNetworkInput && Number.isFinite(config.networkMonthly)) {
    privateNetworkInput.value = config.networkMonthly.toString();
  }
  if (privateFirewallInput && Number.isFinite(config.firewallMonthly)) {
    privateFirewallInput.value = config.firewallMonthly.toString();
  }
  if (
    privateLoadBalancerInput &&
    Number.isFinite(config.loadBalancerMonthly)
  ) {
    privateLoadBalancerInput.value = config.loadBalancerMonthly.toString();
  }
  if (privateNodeCpuInput && Number.isFinite(config.nodeCpu)) {
    privateNodeCpuInput.value = config.nodeCpu.toString();
  }
  if (privateNodeRamInput && Number.isFinite(config.nodeRam)) {
    privateNodeRamInput.value = config.nodeRam.toString();
  }
  if (privateNodeStorageInput && Number.isFinite(config.nodeStorageTb)) {
    privateNodeStorageInput.value = config.nodeStorageTb.toString();
  }
  if (privateVmOsDiskInput && Number.isFinite(config.vmOsDiskGb)) {
    privateVmOsDiskInput.value = config.vmOsDiskGb.toString();
  }
  if (privateSanUsableInput && Number.isFinite(config.sanUsableTb)) {
    privateSanUsableInput.value = config.sanUsableTb.toString();
  }
  if (privateSanTotalInput && Number.isFinite(config.sanTotalMonthly)) {
    privateSanTotalInput.value = config.sanTotalMonthly.toString();
  }
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
  const nextMode = input.mode === "k8s" ? "k8s" : "vm";
  setPanel(nextMode);
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
  if (input.diskTier && diskTierSelect) {
    diskTierSelect.value = input.diskTier;
  }
  if (input.sqlEdition && sqlEditionSelect) {
    sqlEditionSelect.value = input.sqlEdition;
  }
  if (Number.isFinite(input.sqlLicenseRate)) {
    sqlRateInput.value = input.sqlLicenseRate.toString();
    sqlRateTouched = true;
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
  if (privateEnabledInput) {
    privateEnabledInput.checked = Boolean(input.privateEnabled);
  }
  if (Number.isFinite(input.privateVmwareMonthly) && privateVmwareInput) {
    privateVmwareInput.value = input.privateVmwareMonthly.toString();
  }
  if (
    Number.isFinite(input.privateWindowsLicenseMonthly) &&
    privateWindowsLicenseInput
  ) {
    privateWindowsLicenseInput.value =
      input.privateWindowsLicenseMonthly.toString();
  }
  if (Number.isFinite(input.privateNodeCount) && privateNodeCountInput) {
    privateNodeCountInput.value = input.privateNodeCount.toString();
  }
  if (
    Number.isFinite(input.privateStoragePerTb) &&
    privateStoragePerTbInput
  ) {
    privateStoragePerTbInput.value = input.privateStoragePerTb.toString();
  }
  if (Number.isFinite(input.privateNetworkMonthly) && privateNetworkInput) {
    privateNetworkInput.value = input.privateNetworkMonthly.toString();
  }
  if (Number.isFinite(input.privateFirewallMonthly) && privateFirewallInput) {
    privateFirewallInput.value = input.privateFirewallMonthly.toString();
  }
  if (
    Number.isFinite(input.privateLoadBalancerMonthly) &&
    privateLoadBalancerInput
  ) {
    privateLoadBalancerInput.value =
      input.privateLoadBalancerMonthly.toString();
  }
  if (Number.isFinite(input.privateNodeCpu) && privateNodeCpuInput) {
    privateNodeCpuInput.value = input.privateNodeCpu.toString();
  }
  if (Number.isFinite(input.privateNodeRam) && privateNodeRamInput) {
    privateNodeRamInput.value = input.privateNodeRam.toString();
  }
  if (Number.isFinite(input.privateNodeStorageTb) && privateNodeStorageInput) {
    privateNodeStorageInput.value = input.privateNodeStorageTb.toString();
  }
  if (Number.isFinite(input.privateVmOsDiskGb) && privateVmOsDiskInput) {
    privateVmOsDiskInput.value = input.privateVmOsDiskGb.toString();
  }
  if (Number.isFinite(input.privateSanUsableTb) && privateSanUsableInput) {
    privateSanUsableInput.value = input.privateSanUsableTb.toString();
  }
  if (
    Number.isFinite(input.privateSanTotalMonthly) &&
    privateSanTotalInput
  ) {
    privateSanTotalInput.value = input.privateSanTotalMonthly.toString();
  }
  updatePrivateCapacity();
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

function updatePrivateCapacity() {
  const nodeCpuSockets = Number.parseFloat(privateNodeCpuInput?.value);
  const nodeVcpuCapacity =
    Number.isFinite(nodeCpuSockets) && nodeCpuSockets > 0
      ? nodeCpuSockets * VMWARE_VCPU_PER_SOCKET
      : 0;
  const nodeCount = Number.parseFloat(privateNodeCountInput?.value);
  const usableNodes =
    Number.isFinite(nodeCount) && nodeCount > 1
      ? nodeCount - 1
      : 1;
  const nodeRam = Number.parseFloat(privateNodeRamInput?.value);
  const nodeStorageTb = Number.parseFloat(privateNodeStorageInput?.value);
  const nodeStorageGb =
    Number.isFinite(nodeStorageTb) && nodeStorageTb > 0
      ? nodeStorageTb * 1024
      : null;
  const vmOsGb = Number.parseFloat(privateVmOsDiskInput?.value) || 256;
  if (privateOsSizeLabels.length) {
    privateOsSizeLabels.forEach((label) => {
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
    const target = privateCapacityCounts[flavor.key];
    if (target) {
      target.textContent = Number.isFinite(maxCount) ? maxCount.toString() : "-";
    }
    const totalTarget = privateCapacityTotals[flavor.key];
    if (totalTarget) {
      const totalCount = Number.isFinite(maxCount)
        ? Math.max(0, Math.floor(maxCount * usableNodes))
        : 0;
      totalTarget.textContent = Number.isFinite(totalCount)
        ? totalCount.toString()
        : "-";
    }
  });

  const sanUsableTb = Number.parseFloat(privateSanUsableInput?.value);
  const sanTotalMonthly = Number.parseFloat(privateSanTotalInput?.value);
  let perTb = 0;
  if (
    Number.isFinite(sanUsableTb) &&
    sanUsableTb > 0 &&
    Number.isFinite(sanTotalMonthly) &&
    sanTotalMonthly > 0
  ) {
    perTb = sanTotalMonthly / sanUsableTb;
  } else if (privateStoragePerTbInput) {
    const storedRate = Number.parseFloat(privateStoragePerTbInput.value);
    if (Number.isFinite(storedRate) && storedRate > 0) {
      perTb = storedRate;
    }
  }
  if (privateStoragePerTbInput) {
    privateStoragePerTbInput.value = perTb.toFixed(4);
  }
  if (privateSanRate) {
    privateSanRate.textContent = perTb > 0 ? `${formatMoney(perTb)}/TB-mo` : "N/A";
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
  const sanUsableTb = Number.parseFloat(data.privateSanUsableTb);
  const sanTotalMonthly = Number.parseFloat(data.privateSanTotalMonthly);
  let privateStoragePerTb = Number.parseFloat(data.privateStoragePerTb);
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
    diskTier: data.diskTier,
    sqlEdition: data.sqlEdition,
    mode: data.mode,
    osDiskGb: Number.parseFloat(data.osDiskGb),
    dataDiskTb: Number.parseFloat(data.dataDiskTb),
    egressTb: Number.parseFloat(data.egressTb),
    hours: Number.parseFloat(data.hours),
    backupEnabled: data.backupEnabled === "on",
    awsVpcFlavor: data.awsVpcFlavor,
    awsFirewallFlavor: data.awsFirewallFlavor,
    awsLoadBalancerFlavor: data.awsLoadBalancerFlavor,
    azureVpcFlavor: data.azureVpcFlavor,
    azureFirewallFlavor: data.azureFirewallFlavor,
    azureLoadBalancerFlavor: data.azureLoadBalancerFlavor,
    gcpVpcFlavor: data.gcpVpcFlavor,
    gcpFirewallFlavor: data.gcpFirewallFlavor,
    gcpLoadBalancerFlavor: data.gcpLoadBalancerFlavor,
    vmCount: Number.parseInt(data.vmCount, 10),
    drPercent: Number.parseFloat(data.drPercent),
    sqlLicenseRate: Number.parseFloat(data.sqlLicenseRate),
    privateEnabled: data.privateEnabled === "on",
    privateVmwareMonthly: Number.parseFloat(data.privateVmwareMonthly),
    privateWindowsLicenseMonthly: Number.parseFloat(
      data.privateWindowsLicenseMonthly
    ),
    privateNodeCount: Number.parseFloat(data.privateNodeCount),
    privateStoragePerTb: normalizedStoragePerTb,
    privateNetworkMonthly: Number.parseFloat(data.privateNetworkMonthly),
    privateFirewallMonthly: Number.parseFloat(data.privateFirewallMonthly),
    privateLoadBalancerMonthly: Number.parseFloat(
      data.privateLoadBalancerMonthly
    ),
    privateNodeCpu: Number.parseFloat(data.privateNodeCpu),
    privateNodeRam: Number.parseFloat(data.privateNodeRam),
    privateNodeStorageTb: Number.parseFloat(data.privateNodeStorageTb),
    privateVmOsDiskGb: Number.parseFloat(data.privateVmOsDiskGb),
    privateSanUsableTb: sanUsableTb,
    privateSanTotalMonthly: sanTotalMonthly,
  };
}

async function fetchAndRender() {
  const payload = serializeForm(form);
  const data = await comparePricing(payload);
  lastPricing = data;
  const vmCount = data.input?.vmCount ?? payload.vmCount;
  const mode = data.input?.mode ?? payload.mode ?? "vm";
  updateProvider(fields.aws, data.aws, data.region.aws, {
    showMonthlyRate: false,
    showReservationNote: true,
    vmCount,
    mode,
  });
  updateProvider(fields.azure, data.azure, data.region.azure, {
    showMonthlyRate: false,
    showReservationNote: false,
    vmCount,
    mode,
  });
  updateProvider(fields.gcp, data.gcp, data.region.gcp, {
    showMonthlyRate: false,
    showReservationNote: false,
    vmCount,
    mode,
  });
  if (data.private) {
    updateProvider(fields.private, data.private, data.region.private, {
      showMonthlyRate: false,
      showReservationNote: false,
      vmCount,
      mode,
    });
  }
  updateDelta(data.aws, data.azure, data.gcp, data.private);
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
  if (diskTierLabel) {
    noteParts.push(`Disk tier: ${diskTierLabel}.`);
  }
  const networkSummaries = [];
  const input = data.input || {};
  const providerKeys = ["aws", "azure", "gcp"];
  providerKeys.forEach((providerKey) => {
    const entries = [
      ["vpc", input[`${providerKey}VpcFlavor`]],
      ["firewall", input[`${providerKey}FirewallFlavor`]],
      ["loadBalancer", input[`${providerKey}LoadBalancerFlavor`]],
    ];
    const labels = entries
      .map(([addonKey, flavorKey]) =>
        getNetworkAddonLabel(providerKey, addonKey, flavorKey)
      )
      .filter((label) => label && label.toLowerCase() !== "none");
    if (labels.length) {
      const providerLabel = getProviderLabelForMode(providerKey, mode);
      networkSummaries.push(`${providerLabel}: ${labels.join(", ")}`);
    }
  });
  if (networkSummaries.length) {
    noteParts.push(`Network add-ons: ${networkSummaries.join(" | ")}.`);
  }
  if (vmCount && vmCount > 1) {
    const countLabel = mode === "k8s" ? "nodes" : "VMs";
    noteParts.push(`Totals include ${vmCount} ${countLabel}.`);
  }
  formNote.textContent = noteParts.join(" ");
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
  formNote.textContent =
    currentView === "compare"
      ? "Fetching live prices..."
      : "Fetching vendor options...";
  try {
    if (currentView === "compare") {
      await fetchAndRender();
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
        SQL_Edition: input.sqlEdition ?? "",
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
  scenarioStore = scenarioStore.filter((item) => item.id !== scenario.id);
  persistScenarioStore(scenarioStore);
  renderScenarioList();
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

function handleSavePrivate() {
  if (!privateSaveNote) {
    return;
  }
  updatePrivateCapacity();
  const config = getPrivateConfigFromForm();
  persistPrivateConfig(config);
  if (!config.enabled) {
    setPrivateNote("Private pricing saved. Enable private cloud to compare.");
  } else {
    setPrivateNote("Private pricing saved.");
  }
  handleCompare();
}

form.addEventListener("submit", handleCompare);
exportButton.addEventListener("click", handleExportCsv);
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
if (privateSaveButton) {
  privateSaveButton.addEventListener("click", handleSavePrivate);
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
    if (nextPanel !== "private") {
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
sqlRateInput.addEventListener("input", () => {
  sqlRateTouched = true;
});
sqlEditionSelect.addEventListener("change", () => {
  if (!sqlRateTouched) {
    const nextRate = SQL_DEFAULTS[sqlEditionSelect.value];
    sqlRateInput.value = nextRate.toString();
  }
});
[privateNodeCpuInput, privateNodeRamInput, privateNodeStorageInput, privateVmOsDiskInput, privateSanUsableInput, privateSanTotalInput, privateNodeCountInput].forEach(
  (input) => {
    if (input) {
      input.addEventListener("input", updatePrivateCapacity);
    }
  }
);
window.addEventListener("load", async () => {
  scenarioStore = loadScenarioStore();
  renderScenarioList();
  const privateConfig = loadPrivateConfig();
  applyPrivateConfig(privateConfig);
  updatePrivateCapacity();
  setPanel(modeInput.value);
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
