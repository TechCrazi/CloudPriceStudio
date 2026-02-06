# Cloud Price Studio

This is the v1 baseline. We will iterate on v2 in a follow-up branch.

Compare AWS, Azure, and GCP VM pricing by CPU, RAM, region, OS disk (GB), data disk
(TB), egress (TB), and SQL Server edition. The app selects the closest VM size by
flavor and shows monthly totals.

Constraints:
- Windows-only pricing.
- No local or temp disks (managed disk only).
- Disk tier selectable (Premium SSD or Max performance) and 10+ Gbps network floor.
- Optional network add-ons with provider-specific flavors: VPC/VNet, managed
  firewall, and load balancer.
- Minimum 8 vCPU and 8 GB RAM.
- Pricing tiers show on-demand plus 1-year and 3-year reserved (no upfront).
- AWS reserved type is fixed to Convertible (no upfront).
- VM workload profiles: General purpose, SQL Server, and Web Server.
- VM flavors are provider-recommended families per workload (AWS/Azure/GCP).

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Docker

```bash
docker build --no-cache -t cloud-price .
```

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/techcrazi/cloudpricestudio:latest . --push
```


```bash
docker run --rm -p 3000:3000 \
  -e AWS_ACCESS_KEY_ID=... \
  -e AWS_SECRET_ACCESS_KEY=... \
  -e GCP_PRICING_API_KEY=... \
  -e GCP_API_KEY=... \
  cloud-price
```

```bash
docker run --rm -p 3000:3000 \
  -v ~/.aws:/root/.aws:ro \
  -e AWS_PROFILE=profile-name \
  -e AWS_SDK_LOAD_CONFIG=1 \
  cloud-price
```

Open `http://localhost:3000`.

## Pricing provider

Use the Pricing provider dropdown to choose between:

- Retail (Vantage): uses public pricing snapshots from `instances.vantage.sh`.
- API (cloud provider): uses AWS Pricing API, Azure Retail Prices API, and
  GCP Cloud Billing Catalog API.

API mode requires AWS/GCP credentials; when missing, the UI shows "API key missing".
Azure Retail Prices API is public.

### AWS API credentials

- `AWS_PROFILE`, or
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`

### GCP API credentials

- `GCP_PRICING_API_KEY`, `GCP_API_KEY`, or `GOOGLE_API_KEY`

Retail (Vantage) mode does not require credentials.

## Pricing cache warm-up

On startup, the app preloads pricing data for the supported instance sizes and
regions so most requests hit in-memory caches instead of live API calls.

- Set `PRICING_CACHE_WARMUP=false` to disable warm-up.
- Set `PRICING_CACHE_CONCURRENCY=4` (or higher/lower) to tune API fan-out.
- Warm-up uses AWS/GCP credentials when available; missing credentials skip
  those providers.

## Notes

- Storage defaults: Premium SSD per-GB estimates. Max performance applies an
  uplift to approximate Ultra/Extreme/io2 BE tiers; per-IOPS charges are not
  modeled.
- Disk tier defaults to Max performance in the UI and can be switched back to
  Premium SSD.
- Backups use 15-day retention with a 10% daily delta when enabled.
- Snapshot storage uses the same per-GB rate as primary storage.
- OS disk input is in GB; data disk input is in TB (1 TB = 1024 GB).
- Egress input is in TB (1 TB = 1024 GB) with a 1 TB minimum; VM mode scales
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

  - SSH into Ubunut WSL
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

  - Orignal Image: 281.51 MB
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
  - Orignal Image: 225.42 MB
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
```