# Changelog

## 2026-03-04

### Container startup and Kubernetes runtime fixes

- Fixed container startup failure when auth persistence is enabled with a mounted
  volume by pre-creating `/tmp/cloud-price-data/user-state` and setting
  ownership to `1000:1000` in the image build.
- Added runtime copy ownership for `/tmp/cloud-price-data` in the final image
  so non-root runtime (`USER 1000`) can initialize auth storage.
- Excluded `.env` and local variants from Docker build context to prevent
  host-local paths from being baked into runtime containers.
- Hardened container runtime detection in `server.js` to skip local `.env`
  auto-loading in Kubernetes and containerized deployments.

### Proxy, rate-limit, and CORS reliability

- Added configurable trust-proxy handling with `TRUST_PROXY` and automatic
  Kubernetes default (`1`) to support `X-Forwarded-For` correctly behind
  Traefik/Ingress.
- Expanded CORS configuration:
  - Supports comma/newline-delimited origin lists via `CORS_ORIGINS` and
    `CORS_ORIGIN`.
  - Supports wildcard origin patterns.
  - Allows same-host origins automatically using `Host`/
    `X-Forwarded-Host` matching, reducing ingress host mismatch issues.

### Documentation updates

- Updated root `README.md` with:
  - volume ownership remediation command for older auth data volumes,
  - `.env` image-exclusion behavior,
  - Kubernetes deployment notes for `AUTH_*`, `TRUST_PROXY`, and CORS origin
    configuration,
  - same-host origin behavior under ingress.
- Updated `.env.example` with `TRUST_PROXY` and `CORS_ORIGINS` guidance.
