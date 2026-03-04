# Changelog

## 2026-03-04

### Identity-safe defaults

- Removed legacy user-specific fallback admin value in auth bootstrap.
- `APP_ADMIN_USERS` now defaults to `admin` when not explicitly set.

### Security Scan Remediation (CodeQL + Semgrep)

- Security scan tools executed:
  - CodeQL (`javascript-security-and-quality`)
  - Semgrep (`--config auto`)
- Fixed CodeQL security findings:
  - `js/remote-property-injection`:
    hardened cookie parsing with prototype-pollution-safe storage
    (`Object.create(null)`), cookie-name validation, and blocked unsafe keys
    (`__proto__`, `prototype`, `constructor`).
  - `js/log-injection`:
    removed user-derived value from auth migration log message and normalized
    log formatting in key warning/error paths.
  - `js/insecure-temporary-file`:
    hardened auth storage permissions by enforcing `0700` on auth directories
    and `0600` on persisted SQLite auth DB writes.
  - `js/duplicate-property` in `public/app.js`:
    removed duplicate object keys in export row construction.
- Fixed Semgrep findings:
  - `javascript.browser.security.insecure-document-method.insecure-document-method`:
    replaced high-risk dynamic `innerHTML` render paths with a sanitized DOM
    fragment renderer (`setSanitizedMarkup`) for billing, admin, focus cards,
    and unit-economics panels.
  - `javascript.lang.security.audit.detect-non-literal-regexp.detect-non-literal-regexp`:
    removed dynamic `RegExp` construction from CORS wildcard matching and GCP
    SKU description matching by switching to string-token matching.
  - `javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal`:
    removed user-influenced `path.join` for legacy auth state resolution and
    enforced hash-based safe filename construction.
- Current post-fix CodeQL security findings: `0`.
- Current post-fix Semgrep findings: `1` (`express-check-csurf-middleware-usage`).

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
