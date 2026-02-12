# Cloud Price Studio

Compare AWS, Azure, and GCP pricing for VM, Kubernetes, Networking-only, and
Storage-only views. Inputs include CPU, RAM, region, OS disk (GB), data disk
(TB), egress (TB), SQL Server edition, network add-ons, and storage service
breakdowns. The app selects the closest supported size by flavor and shows
monthly totals.

Constraints:
- VM mode uses Windows pricing. Kubernetes mode uses Linux node pricing.
- No local or temp disks (managed disk only).
- Disk tier selectable (Premium SSD or Max performance) and 10+ Gbps network floor.
- Optional network add-ons with provider-specific flavors: VPC/VNet, managed
  firewall, and load balancer.
- Optional private cloud provider with manual VMware/SAN and network/LB inputs.
- Public-cloud-only tabs for Networking and Storage analysis.
- Dedicated top-level tabs for Saved Compare, Private/Public Cloud, and Billing Import.
- Minimum 8 vCPU and 8 GB RAM.
- Pricing tiers show on-demand plus 1-year and 3-year reserved (no upfront).
- AWS reserved type is fixed to Convertible (no upfront).
- VM workload profiles: General purpose, SQL Server, and Web Server.
- VM flavors are provider-recommended families per workload (AWS/Azure/GCP).
- VM view tabs: Compare plus per-provider tabs with up to four options per
  vendor (auto-picked instances with manual overrides).
- Private Cloud panel stores manual pricing plus node capacity inputs and
  calculates SAN cost per TB and VMs per node (including N+1 capacity).
- Results include Pricing, Insight, and Cloud Commit tabs, plus recommendation
  and unit-economics panels.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Docker

### Build Image
```bash
docker build --no-cache -t ghcr.io/techcrazi/cloudpricestudio:latest .
```
### Push to GHCR
```bash
docker login ghcr.io
docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/techcrazi/cloudpricestudio:latest . --push
```

### Docker Run Container with API Keys
```bash
docker run --rm -p 3000:3000 \
  -e AWS_ACCESS_KEY_ID=... \
  -e AWS_SECRET_ACCESS_KEY=... \
  -e GCP_PRICING_API_KEY=... \
  -e GCP_API_KEY=... \
  ghcr.io/techcrazi/cloudpricestudio:latest
```

### Docker Run with Login + Persistent User Profiles
```bash
docker run --rm -p 3000:3000 \
  -e APP_AUTH_USERS='analyst1:ChangeMe123,analyst2:ChangeMe456' \
  -e AUTH_DATA_DIR=/tmp/cloud-price-data \
  -v cloudprice-data:/tmp/cloud-price-data \
  ghcr.io/techcrazi/cloudpricestudio:latest
```

The named volume keeps user profiles across container restarts/redeploys.

### Docker Run Container with API Keys & AWS Config Map
```bash
docker run --rm -p 3000:3000 \
  -v ~/.aws:/root/.aws:ro \
  -e AWS_PROFILE=profile-name \
  -e AWS_SDK_LOAD_CONFIG=1 \
  -e GCP_PRICING_API_KEY=... \
  -e GCP_API_KEY=... \
  ghcr.io/techcrazi/cloudpricestudio:latest
```

#### Local App UI
Open `http://localhost:3000`.


## Pricing provider

Use the Pricing provider dropdown to choose between:

- Retail (Vantage): uses public pricing snapshots from `instances.vantage.sh`.
- API (cloud provider): uses AWS Pricing API, Azure Retail Prices API, and
  GCP Cloud Billing Catalog API.

API mode requires AWS/GCP credentials; when missing, the UI shows "API key missing".
Azure Retail Prices API is public.
Network add-ons (VPC/VNet, firewall, load balancer) always use provider pricing
APIs/price lists; GCP add-ons require a GCP API key even in Retail mode and will
show $0 with a provider note when missing.
Networking and Storage focus modes always use API/price-list lookups for public
cloud pricing and force the provider selector to API.

### AWS API credentials

- `AWS_PROFILE`, or
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`

### GCP API credentials

- `GCP_PRICING_API_KEY`, `GCP_API_KEY`, or `GOOGLE_API_KEY`

Retail (Vantage) mode does not require credentials.

## Login + profile persistence

By default (`Guest mode`), app state is stored in browser cache/localStorage
only and is not synced to the cloud database.

If login is configured and a valid user signs in:

- The header status shows that profile data is synced to the cloud database.
- A `Save to DB` action is available in the auth bar to force an immediate
  profile sync (without waiting for debounce/autosave).
- The app syncs scenario/private/billing state to server-side local storage
  inside the container SQLite database
  (`/tmp/cloud-price-data/cloudprice.db` by default).
- State is isolated per signed-in user.
- `Log Out` returns to guest behavior (browser-local only).
- If you did work in guest mode and then sign in, the app preserves guest state.
  If your DB profile already has different saved data, use `Import Guest Data`
  after login to push guest work (scenarios/private cloud/tags/billing) into
  your DB profile.

Auth configuration options:

- `APP_AUTH_USERS`: comma-separated `username:password` list.
  Example: `APP_AUTH_USERS='ops1:Secret1,ops2:Secret2'`
- Or `APP_LOGIN_USER` + `APP_LOGIN_PASSWORD` for a single user.
- `APP_ADMIN_USERS` (optional): comma-separated admin usernames used as
  default/seed admins for new or migrated auth records. Default is `admin`.
- `AUTH_DATA_DIR` (optional): base path for auth files
  (default `/tmp/cloud-price-data`).
- `AUTH_DB_FILE` (optional): SQLite file path
  (default `${AUTH_DATA_DIR}/cloudprice.db`).
- `AUTH_USERS_FILE` (optional): legacy JSON user file to import if the SQLite
  `users` table is empty.
- `AUTH_STATE_DIR` (optional): legacy hashed JSON state directory used for
  fallback migration into SQLite.
- `AUTH_SESSION_TTL_MS` (optional): session cookie TTL.
- `AUTH_STATE_MAX_BYTES` (optional): max accepted profile payload size.

Login is enabled only when either `AUTH_DATA_DIR` or `AUTH_DB_FILE` is passed
at startup. If both are missing, the UI runs in guest-only mode and hides the
login action.

`User Data` tab:
- Export full workspace data (scenarios, private profiles, saved compare picks,
  billing imports, tags) to a JSON file.
- Import the same JSON on any machine/browser.
- If signed in, imported data is immediately synced to the user DB profile.
- If guest, imported data is applied to browser-local storage only.
- Automatic rollback history: every saved change creates a version.
- Version retention: last 50 versions per user (or guest) in the browser.
- Roll back from the `User Data` tab by selecting a version and restoring it.

When signed in as an admin user, an `Admin` tab appears to:
- Add users
- Set each user as `Admin` or `Regular`
- Remove non-admin users
- Update any user password

## Scenarios

Save, clone, and compare input profiles. Scenarios are stored in browser
localStorage and can be loaded later from the dropdown.

## Billing Import

Use the `Billing Import` tab to import provider billing CSV files and visualize
allocation by service, period, and tags.

- Provider-specific import views for AWS, Azure, GCP, and Rackspace.
- Unified billing view merges imported datasets across providers.
- Billing period dropdown is available on every provider tab and Unified tab
  (`All months`, `Yearly YYYY`, or a specific month bucket).
- Multi-month CSV imports are grouped into per-month buckets so historical
  month-over-month imports accumulate instead of replacing prior months.
- Aggregated totals, service share, and top service bar visualization.
- Expandable line-item drilldown in the service table:
  click `+` beside a service to open detailed items (for example Azure `Meter`
  rows grouped under `ServiceName`).
- CSV parsing auto-detects service, cost, and detail columns by provider and
  falls back to common column names when exact headers differ.
- If a bill is imported on the wrong provider tab, the app auto-detects the
  provider and imports into the correct provider tab.
- Duplicate monthly imports are de-duplicated by file content signature (and
  legacy fallback checks) so repeated uploads do not double-count totals.
- AWS import expects Cost Explorer `Service view` CSV format.
- Azure import expects Cost Analysis `Meter view` CSV format.
- Add custom tags per service (including `Product app`) with multi-tag input
  (comma-separated tags).
- Optional detail-level tags for expanded line items plus bulk apply/clear
  across selected visible rows.
- Tagging controls (service + bulk tagging) are combined into a single compact
  panel to reduce screen space usage.
- Filter Billing Import views by `Product app` (including an `Untagged` filter).
- Existing service/detail tags are retained and automatically reused for future
  monthly imports when service names match.
- Export provider billing CSV from the active filter; exported rows include
  `ProductApp` and `Tags` columns.
- Rackspace CSV mapping supports columns like `SERVICE_TYPE` (service),
  `AMOUNT` (cost), and `RES_NAME`/`IMPACT_TYPE`/`EVENT_TYPE` (line-item
  detail), with usage date range from `EVENT_START_DATE`/`EVENT_END_DATE`
  when present.
- In guest mode, imported billing datasets/tags stay in browser localStorage.
  When logged in, this billing data is synced to the user profile in the local
  DB so historical month data persists across sessions.
- Unit economics shares now include backups and DR, plus an `Other` residual
  bucket so provider percentages reconcile to the monthly total.

## Pricing cache warm-up

On startup, the app preloads pricing data for the supported instance sizes and
regions so most requests hit in-memory caches instead of live API calls.

- Set `PRICING_CACHE_WARMUP=false` to disable warm-up.
- Set `PRICING_CACHE_CONCURRENCY=4` (or higher/lower) to tune API fan-out.
- Set `PRICING_CACHE_REFRESH_INTERVAL_MS=1800000` to control background refresh
  cadence (minimum 60s).
- Warm-up uses AWS/GCP credentials when available; missing credentials skip
  those providers.
- Cache status and manual refresh endpoints:
  - `GET /api/cache/status`
  - `POST /api/cache/refresh`

## Notes

- Storage defaults: Premium SSD per-GB estimates. Max performance applies an
  uplift to approximate Ultra/Extreme/io2 BE tiers.
- Disk tier defaults to Max performance in the UI and can be switched back to
  Premium SSD.
- Private cloud pricing uses manual inputs; Node CPU capacity is treated as
  physical sockets and converted using the VMware standard (3 vCPU per
  socket). VMware per node is converted from monthly to hourly for compute and
  multiplied by the VMware node count. Capacity uses N+1 (one node reserved
  as hot spare). Storage uses the SAN $/TB-month rate. Optional Windows
  license per VM is added monthly. Egress is set to $0 for private cloud.
- Backups use 15-day retention with a 10% daily delta when enabled.
- Snapshot storage uses the same per-GB rate as primary storage.
- OS disk input is in GB; data disk input is in TB (1 TB = 1024 GB) and accepts
  decimals (e.g., 0.01 TB).
- Egress input is in TB (1 TB = 1024 GB) and can be set to 0; VM mode scales
  egress by VM count.
- Network add-ons use provider pricing APIs/price lists for base hourly rates.
  Data processing, per-rule, and LCU-style usage charges are not included.
  If a flavor has no hourly SKU, the app treats it as $0 and flags the provider
  note.
- AWS load balancer flavors use the base ELB hourly SKU from the public price
  list (ALB/NLB/GWLB usage-based charges are excluded).
- DR uplift applies to compute + storage + backups + SQL (egress excluded).
- VM count scales all monthly totals.
- Kubernetes mode uses Linux nodes and adds premium control plane fees for
  EKS ($0.50/hr), AKS ($0.60/hr), and GKE ($0.50/hr). VM count is treated as
  node count (minimum 3).
- Kubernetes mode has no workload profile and limits flavors to K8s-optimized
  families (general or compute).
- Kubernetes mode disables SQL pricing and pulls shared file storage rates
  (EFS/Azure Files/Filestore) from public provider pricing (AWS EFS price list,
  Azure Retail Premium Files, GCP Filestore pricing page). Results are cached
  and fall back to defaults if lookups fail. It enforces a 32 GB minimum OS
  disk size.
- Egress defaults: base internet out pricing for the first tier.
- Billing Import is CSV-driven and does not call provider billing APIs directly.
- Reserved tiers use AWS convertible no-upfront rates from the public snapshot.
  Azure reservation terms are converted from term totals into monthly-equivalent
  hourly rates for both Retail API and Vantage snapshot sources.
- Compute rates are displayed hourly for all providers.
- Reserved tiers adjust compute only; storage, egress, and SQL add-on remain
  on-demand.
- SQL Server add-on for AWS/Azure/GCP uses a default per vCPU-hour rate. Adjust
  the input to match your licensing program. AWS compute is Windows BYOL.
- AWS API mode falls back to the AWS price list when terms are missing or when
  the API rate is below the official price list for the same Windows SKU.
- Network floor is enforced for AWS and Azure via curated instance metadata.
  GCP network performance is reported as Variable in the snapshot.
- If a request exceeds the curated size list, the app uses the largest
  available size and flags it in the UI.
- Instance dropdowns include quick filters above each provider list.
- Region groups include US East, US Central, US West, US West (N. California),
  Canada Central, EU West, EU Central, UK South, EU North, Asia Pacific
  (Singapore), Japan East, India Central, Australia East, South America
  (Sao Paulo), and Africa South.




## Container Scan via Trivy

#### Install Trivy
```bash
brew install trivy
```

#### Scan Image
```bash
trivy image ghcr.io/techcrazi/cloudpricestudio:latest
```


## Container Scan via Slim

#### Install Slim MAC
```bash
brew install docker-slim
```

#### Install Slim Windows
 - Enable WSL on Windows Desktop
 - Install Docker Desktop
 - Install Ubuntu WSL image

```powershell
wsl --install -d Ubuntu
```
 - Update Docker Desktop Settings
    
  - Open Docker Desktop → Settings
  - Go to:
  - Resources → WSL Integration

  - Turn ON:
	  -  Enable integration with my default WSL distro
	  -  Ubuntu

  - Click Apply & Restart

  - SSH into Ubuntu WSL
  - Install Slim
  ```bash
  curl -sL https://raw.githubusercontent.com/slimtoolkit/slim/master/scripts/install-slim.sh | sudo -E bash -
  ```


##### Scan & Build Image AMD64 (On Intel or AMD Processor)
```bash
slim build \
  --target ghcr.io/techcrazi/cloudpricestudio:latest \
  --tag ghcr.io/techcrazi/cloudpricestudio:slim-amd64 \
  --image-build-arch amd64 \
  --publish-port 3000:3000 \
  --include-path '/app' \
  --env AWS_ACCESS_KEY_ID="AWS-API-Key" \
  --env AWS_SECRET_ACCESS_KEY="AWS-API-Secret" \
  --env GCP_PRICING_API_KEY="GCP-Pricing-API-Key" \
  --env GCP_API_KEY="GCP-API-Key" 
```

  - Original Image: 281.51 MB
  - Slim Image: 189.86 MB


##### Scan & Build Image ARM64 (On Apple or ARM Processor)
```bash
slim build \
  --target ghcr.io/techcrazi/cloudpricestudio:latest \
  --tag ghcr.io/techcrazi/cloudpricestudio:slim-arm64 \
  --image-build-arch arm64 \
  --publish-port 3000:3000 \
  --include-path '/app' \
  --env AWS_ACCESS_KEY_ID="AWS-API-Key" \
  --env AWS_SECRET_ACCESS_KEY="AWS-API-Secret" \
  --env GCP_PRICING_API_KEY="GCP-Pricing-API-Key" \
  --env GCP_API_KEY="GCP-API-Key" 
```
  - Original Image: 225.42 MB
  - Slim Image: 189.86 MB



##### Image Testing
```bash
slim build \
  --target ghcr.io/techcrazi/cloudpricestudio:latest \
  --tag ghcr.io/techcrazi/cloudpricestudio:slim-arm64 \
  --image-build-arch arm64 \
  --publish-port 3000:3000 \
  --continue-after=enter \
  --include-path '/app' \
  --env AWS_ACCESS_KEY_ID="AWS-API-Key" \
  --env AWS_SECRET_ACCESS_KEY="AWS-API-Secret" \
  --env GCP_PRICING_API_KEY="GCP-Pricing-API-Key" \
  --env GCP_API_KEY="GCP-API-Key" 
```


##### Push Slim Image to GHCR
```bash
docker login
docker push ghcr.io/techcrazi/cloudpricestudio:slim-amd64
docker push ghcr.io/techcrazi/cloudpricestudio:slim-arm64

docker manifest create ghcr.io/techcrazi/cloudpricestudio:slim \
  --amend ghcr.io/techcrazi/cloudpricestudio:slim-amd64 \
  --amend ghcr.io/techcrazi/cloudpricestudio:slim-arm64

docker manifest push ghcr.io/techcrazi/cloudpricestudio:slim
```
