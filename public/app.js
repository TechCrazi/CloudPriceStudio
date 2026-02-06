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

const SQL_DEFAULTS = {
  none: 0,
  standard: 0.35,
  enterprise: 0.5,
};
const DISK_TIER_LABELS = {
  premium: "Premium SSD",
  max: "Max performance",
};
let sqlRateTouched = false;
let sizeOptions = null;
let lastPricing = null;
let currentMode = "vm";
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
  modeTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === currentMode);
  });
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
}

function getProviderLabelForMode(providerKey, mode) {
  const copy = MODE_COPY[mode] || MODE_COPY.vm;
  if (providerKey === "aws") {
    return copy.awsTitle;
  }
  if (providerKey === "azure") {
    return copy.azureTitle;
  }
  return copy.gcpTitle;
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

function updateProvider(target, provider, region, options = {}) {
  target.family.textContent = provider.family || "-";
  syncInstanceSelect(target.instance, provider.instance);
  target.shape.textContent = provider.instance
    ? `${provider.instance.vcpu} vCPU / ${provider.instance.memory} GB`
    : "-";
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

function updateDelta(aws, azure, gcp) {
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
  const sorted = sizes.sort((a, b) => {
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

  setInstanceOptions(awsInstanceSelect, awsSizes, awsInstanceSelect.value);
  setInstanceOptions(
    azureInstanceSelect,
    azureSizes,
    azureInstanceSelect.value
  );
  setInstanceOptions(gcpInstanceSelect, gcpSizes, gcpInstanceSelect.value);
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
  updateDelta(data.aws, data.azure, data.gcp);
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
  return data;
}

async function handleCompare(event) {
  if (event) {
    event.preventDefault();
  }
  formNote.textContent = "Fetching live prices...";
  try {
    await fetchAndRender();
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

form.addEventListener("submit", handleCompare);
exportButton.addEventListener("click", handleExportCsv);
modeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setMode(tab.dataset.mode);
    handleCompare();
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
window.addEventListener("load", async () => {
  setMode(modeInput.value);
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
