# Graphionic Infotech — Security Architecture

## 1. Security Overview
This document defines the comprehensive security architecture and audit baseline for the **Graphionic Infotech** web application codebase.

Because the application is a client-rendered Single Page Application (SPA), frontend security focuses on **Client-Side Data Protection**, **Input Hygiene**, **External Link Isolation**, **PII Privacy**, and **Content Security Policy (CSP) Readiness**.

---

## 2. Current Attack Surface
The attack surface of this frontend application consists of:
1. **Interactive Form Input (`InquiryForm.jsx`):** Lead inquiry form collecting user contact information (Name, Email, Phone, Company, Budget, Details).
2. **External Outbound Links:** Anchor tags pointing to external domains (Google Maps, Google Business Reviews, live client project web sites).
3. **Third-Party CDN Resources:** Google Fonts fetched via CSS `@import`.
4. **DOM Manipulation & Rendering:** React JSX dynamic string rendering.

---

## 3. Frontend Trust Boundary
```
[ Untrusted User Input / Client Browser ]
                     │
                     ▼
[ Client-Side Validation (UX Only - InquiryForm.jsx) ]
                     │
     ════════════════╪════════════════ (Trust Boundary)
                     ▼
[ Future Server-Side Backend / API Endpoint ]
  ├── 1. Schema Validation & Type Checking
  ├── 2. Sanitization & Escaping
  ├── 3. Rate Limiting & Abuse Prevention
  ├── 4. Bot & Spam Filtering (CAPTCHA / Honeypot)
  └── 5. Secure Credential Storage & Mailer API
```

---

## 4. User Input Surface
- **Fields Collected:** Name, Company, Email, Phone, Project Type, Estimated Budget, Project Details.
- **Client-Side Regex Checks:**
  - Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Phone: `/^[\d\s+()-]{7,}$/` (when provided)
- **Validation Purpose:** Client validation is strictly for user experience (UX) feedback. It provides immediate visual indicators (`.has-error` borders & inline messages) when fields are incomplete.

---

## 5. Inquiry Form Security & PII Protection

### PII Exfiltration Prevention
- **Defect Identified:** Previously, `InquiryForm.jsx` executed `console.info('[Graphionic] Project inquiry submitted:', form)`, which outputted full user contact details and PII into browser developer console logs.
- **Fix Applied:** Removed `console.info` logging statement. Form submission payload is processed strictly in component memory without writing PII to browser logs.

### Future Backend Requirements (Mandatory for Backend Implementation)
1. **Server-Side Validation:** The backend MUST re-validate all incoming payload fields independently. Client validation MUST NOT be trusted.
2. **Rate Limiting:** Implement IP-based rate limiting (e.g. maximum 3 submissions per IP per 15-minute window) to prevent form spam.
3. **Honeypot / Spam Protection:** Include a hidden honeypot field or CAPTCHA integration to block automated bot submissions.
4. **Input Length Limits:** Enforce strict payload character caps (e.g. `details`: max 2000 chars, `name`: max 100 chars).
5. **No Credentials in Frontend:** API credentials (e.g., SendGrid, AWS SES, or SMTP keys) MUST reside strictly in server-side environment variables (`.env`) on the backend server.

---

## 6. XSS Protection & Dynamic Execution Audit
- **JSX Auto-Escaping:** All dynamic content strings (project descriptions, company names, FAQs) are rendered via standard React JSX syntax (`{text}`). React automatically escapes string values before insertion into the DOM, preventing Cross-Site Scripting (XSS).
- **Audit Findings:**
  - `dangerouslySetInnerHTML`: **0 occurrences found.**
  - `innerHTML` / `outerHTML` direct DOM mutations: **0 occurrences found.**
  - `eval()` / `Function()` dynamic code execution: **0 occurrences found.**
  - `document.write()`: **0 occurrences found.**

---

## 7. External Link Security

### Reverse Tabnabbing Audit
External links using `target="_blank"` without `rel="noopener noreferrer"` present a Reverse Tabnabbing risk (where the opened window can manipulate the parent window via `window.opener`).

- **Audit Results:**
  - `Projects.jsx` line 92: `<a className="prj-link" href={p.url} target="_blank" rel="noopener noreferrer">` -> **SECURE**
  - `Reviews.jsx` line 52: `<a className="rev-go" href={GOOGLE.url} target="_blank" rel="noopener noreferrer">` -> **SECURE**
  - `Reviews.jsx` line 74: `<motion.a className="outline-btn" href={GOOGLE.url} target="_blank" rel="noopener noreferrer">` -> **SECURE**

All `target="_blank"` outbound links properly specify `rel="noopener noreferrer"`.

---

## 8. Third-Party Resources & Dependencies

### Third-Party Resource Imports
- **Google Fonts:** Loaded via `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:...&family=Inter:...')` in `index.css`.
- **Font Files:** Served directly from `fonts.gstatic.com`.

### Dependency Vulnerability Audit (`npm audit`)
Running `npm --prefix site audit` yielded:
```
found 0 vulnerabilities
```
- **Critical:** 0
- **High:** 0
- **Medium:** 0
- **Low:** 0

---

## 9. Secrets & Environment Variables
- **Repository Search:** Inspected repository for `.env`, `.env.local`, AWS keys, API tokens, database connection strings, or private keys.
- **Audit Result:** **0 committed secrets or private keys found.**
- **Rule:** Never commit credentials or API keys to Git. Environment variables for production endpoints must be managed via deployment environment configs.

---

## 10. Client-Side Data Handling & Storage
- `localStorage` usage: **None.**
- `sessionStorage` usage: **None.**
- `document.cookie` usage: **None.**
- No sensitive user tokens, session IDs, or private data are persisted in local browser storage.

---

## 11. Security Headers Strategy & Production Recommendations
When deploying the static production build (`site/dist/`), configure the hosting platform (e.g. Vercel, Netlify, Cloudflare Pages, NGINX, or Apache) to emit the following security headers:

### Recommended Security Headers Configuration

```http
# 1. Content Security Policy (Accounts for Google Fonts & inline SVGs)
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';

# 2. Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# 3. Clickjacking Protection
X-Frame-Options: DENY

# 4. Strict Referrer Policy
Referrer-Policy: strict-origin-when-cross-origin

# 5. Disable unused browser capabilities
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()

# 6. HTTP Strict Transport Security (HSTS - for HTTPS deployments)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

---

## 12. Security Findings Summary & Classification

| Finding ID | Vulnerability / Issue | Category | Severity | Status | Remediation Applied |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | `InquiryForm.jsx` logged full user PII form payload to `console.info` | PII Exposure | 🟢 LOW | **FIXED** | Removed `console.info` statement from submit handler |
| **SEC-02** | External links use `target="_blank"` | Reverse Tabnabbing | 🟢 INFORMATIONAL | **SECURE** | Confirmed all outbound links include `rel="noopener noreferrer"` |
| **SEC-03** | Lack of Server-Side Form Validation | Trust Assumption | 🟢 INFORMATIONAL | **DEFERRED** | Documented requirement for future backend API implementation |
| **SEC-04** | Missing Production Security Headers | HTTP Headers | 🟢 INFORMATIONAL | **DOCUMENTED** | Documented CSP, HSTS, X-Frame-Options recommendations for deployment |

---

## 13. Source Code Modifications Applied

### 1. `site/src/components/InquiryForm.jsx`
- **Problem:** `console.info('[Graphionic] Project inquiry submitted:', form)` exposed user PII (name, email, phone, company, details, budget) in browser developer console logs.
- **Change:** Removed `console.info` line.
- **Why:** Complies with privacy and PII protection best practices.
- **Risk:** Zero risk (pure logging removal, form UX and simulated submission behavior are unchanged).
- **Test Result:** Verified form submission workflow completes cleanly with 0 console output.
