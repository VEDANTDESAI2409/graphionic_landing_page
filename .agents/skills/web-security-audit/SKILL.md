---
name: web-security-audit
description: Audits frontend security, XSS vectors, PII exposure, target=_blank tabnabbing, secrets, dependency vulnerabilities, and production security headers.
version: 1.0.0
category: security
triggers:
  - run security audit
  - audit security
  - check security
---

# Purpose
Execute a comprehensive security evaluation of the web frontend codebase, identifying vulnerabilities, input hygiene defects, data privacy leaks, and missing production HTTP security controls.

# When To Use
- Prior to release or pull request merges.
- When introducing new form inputs, external link targets, or third-party dependencies.
- When auditing privacy and PII protection rules.

# Inputs
- Frontend source files (`site/src/**/*`, `site/index.html`).
- Package manifest & lockfiles (`package.json`, `package-lock.json`).
- Deployment HTTP header specifications.

# Procedure
1. **Dependency Audit:** Execute `npm --prefix site audit` to detect known CVE vulnerabilities in direct and transitive packages.
2. **Secrets & Credentials Inspection:** Search codebase for exposed API keys, SSH keys, bearer tokens, or `.env` credential leaks.
3. **XSS & Unsafe DOM Audit:** Grep source files for `dangerouslySetInnerHTML`, `innerHTML`, `eval()`, or unescaped string injections.
4. **Reverse Tabnabbing Audit:** Inspect all outbound `<a target="_blank">` links to verify presence of `rel="noopener noreferrer"`.
5. **PII & Console Hygiene:** Search for `console.log` / `console.info` statements outputting user form inputs or personal contact information.
6. **Production Header Review:** Check Content Security Policy (CSP), HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy readiness.

# Validation
- `npm audit` returns 0 vulnerabilities.
- Zero committed secrets or API tokens.
- Zero unsafe `innerHTML` or `dangerouslySetInnerHTML` occurrences.
- All `target="_blank"` anchors specify `rel="noopener noreferrer"`.
- Zero user PII logged to browser console.

# Output Format
Markdown vulnerability table containing Finding ID, Severity (CRITICAL/HIGH/MEDIUM/LOW/INFO), Description, Affected File/Line, and Actionable Remediation.

# Failure Conditions
- Presence of committed API secrets or private keys.
- Unsanitized dynamic HTML rendering (`dangerouslySetInnerHTML`).
- Console logging of user password or PII form data.

# Safety Rules
- NEVER execute `npm audit fix --force` automatically.
- NEVER perform destructive code rewrites automatically without explicit review.
- NEVER commit secrets or environment files to Git.

# Project-Specific Rules
- Graphionic lead inquiries MUST process form data strictly in memory without dev console output.
- All outbound portfolio client links MUST maintain `rel="noopener noreferrer"`.

# Provenance
- **Origin:** Project-Specific & Tool Orchestration
- **Basis:** OWASP Web Security Testing Guide (WSTG), npm audit CLI, React Security Best Practices.
