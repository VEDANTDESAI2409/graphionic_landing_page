# Graphionic Development Skills & Tooling Research

## 1. Current Development Stack
- **Framework:** React 19 (`react` `^19.2.8`, `react-dom` `^19.2.8`)
- **Build System:** Vite 8 (`vite` `^8.2.2`, `@vitejs/plugin-react` `^6.1.0`)
- **Language / Syntax:** JavaScript (ES Modules, JSX)
- **Animation System:** Framer Motion (`framer-motion` `^13.2.0`)
- **Iconography:** Lucide React (`lucide-react` `^1.43.0`)
- **Linter:** Oxlint (`oxlint` `^1.79.0`)
- **Styling:** Vanilla CSS (`site/src/index.css`, 1736 lines) with CSS custom properties
- **Runtime Environment:** Node v26.4.0 / npm 11.17.0

---

## 2. Why Additional Skills & Tooling Are Needed
As we prepare the codebase for a future **HIGH-CONVERSION, premium, highly animated agency landing page**, we require specialized capabilities to systematically audit, verify, optimize, and test the website across multiple dimensions:

1. **Conversion & UX Quality:** Ensuring headlines, social proof, objection handling, and CTA hierarchy drive maximum lead generation.
2. **Performance & Core Web Vitals:** Maintaining sub-second interactive load times, zero layout shift (CLS), and fast paint times despite rich motion graphics.
3. **Cross-Browser & Visual Integrity:** Verifying that animations and responsive layouts render flawlessly across Chromium, Safari (WebKit), and mobile viewports without console errors or visual regressions.
4. **Security & Accessibility Compliance:** Safeguard against PII leakage, XSS, and unhandled accessibility barriers (WCAG 2.1 AA).

---

## 3. Investigation of Key Skill Repositories

### Candidate Focus: `sickn33/agentic-awesome-skills`
- **GitHub URL:** `https://github.com/sickn33/agentic-awesome-skills.git`
- **Stars:** **46,490+ Stars**
- **Latest Release:** `v17.4.0` (Actively maintained, updated September 2026)
- **License:** MIT License
- **Format & Antigravity Compatibility:** Contains over 2,124 curated `SKILL.md` playbooks formatted with standard YAML frontmatter, natively compatible with Antigravity skills discovery (`.agents/skills/<skill_name>/SKILL.md` or `~/.gemini/config/skills/<skill_name>/SKILL.md`).
- **Evaluation & Recommendation:** 
  - ❌ **Do NOT install the entire repository:** Installing 2,124 skills wholesale introduces severe tool bloat, context noise, and maintenance overhead.
  - ✅ **SELECTIVE EXTRACTION:** We recommend selectively extracting and installing ONLY 7 specialized, highly targeted skill playbooks that directly align with our React 19 / Vite / Framer Motion / Landing Page stack.

---

## 4. Evaluated Tooling & Skill Candidates Summary Table

| Category | Candidate Repository / Tool | Stars / Reputation | Maintenance | License | Primary Capability | Risk | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Security Auditing** | `npm audit` + OWASP Skill | Native / High | Active | MIT | Dependency vulnerability scanning & OWASP top 10 security review | 🟢 None | **CORE (Must Have)** |
| **SEO Auditing** | Google Lighthouse CLI (`lighthouse`) | 28,000+ Stars | Active | Apache 2.0 | Automated SEO score, OpenGraph, metadata, canonical & sitemap audit | 🟢 None | **CORE (Must Have)** |
| **UI / UX Review** | `ui-ux-design-review` Skill | Curated | Active | MIT | NN/g 10 Usability Heuristics, visual hierarchy & mobile UX review | 🟢 None | **CORE (Must Have)** |
| **Accessibility** | `@axe-core/playwright` + Lighthouse | 6,500+ Stars | Active | MPL 2.0 | Automated WCAG 2.1 AA/AAA, ARIA & focus management audit | 🟢 None | **CORE (Must Have)** |
| **Performance** | Google Lighthouse + `rollup-plugin-visualizer` | 28,000+ Stars | Active | Apache 2.0 / MIT | Core Web Vitals (LCP, CLS, INP), TBT & bundle chunk size analysis | 🟢 None | **CORE (Must Have)** |
| **React / Vite** | `oxlint` + `react-19-vite-best-practices` | 6,000+ Stars | Active | MIT | Lightning-fast static analysis, React 19 effect & render optimization | 🟢 None | **CORE (Must Have)** |
| **Animation / Motion** | `framer-motion-orchestration` Skill | Curated | Active | MIT | Scroll choreography, Framer Motion spring physics & reduced-motion | 🟢 None | **CORE (Must Have)** |
| **CRO / Conversion** | `landing-page-cro-audit` Skill | Curated | Active | MIT | Conversion rate optimization, friction reduction & value prop audit | 🟢 None | **CORE (Must Have)** |
| **Copy Review** | `copywriting-clarity-audit` Skill | Curated | Active | MIT | Benefit-oriented messaging, headline clarity & jargon detection | 🟢 None | **OPTIONAL** |
| **Browser Testing** | Playwright CLI (`@playwright/test`) | 68,000+ Stars | Active | Apache 2.0 | Headless Chromium/WebKit/Firefox, console error & network capture | 🟢 None | **CORE (Must Have)** |
| **Visual Regression** | Playwright Visual Matchers | Built-in | Active | Apache 2.0 | Pixel-perfect screenshot baseline comparisons across viewports | 🟢 None | **CORE (Must Have)** |
| **Code Quality** | `knip` / `oxlint` | 8,000+ Stars | Active | MIT | Unused file, export, and dependency detection | 🟢 None | **OPTIONAL** |

---

## 5. Category-by-Category Tooling & Skill Analysis

### 1. Security Auditing
- **Tooling:** Native `npm audit` (lockfile analysis) + `gitleaks` / secret scanning rules.
- **Skill Playbook:** `web-security-audit` (`.agents/skills/web-security-audit/SKILL.md`)
- **Capabilities:** Scans for frontend XSS vulnerabilities, improper `dangerouslySetInnerHTML`, missing `rel="noopener noreferrer"`, PII console logging, exposed secrets, and CSP header gaps.

### 2. SEO Auditing
- **Tooling:** Google Lighthouse CLI (`npx -y lighthouse --only-categories=seo`).
- **Skill Playbook:** `technical-seo-audit` (`.agents/skills/technical-seo-audit/SKILL.md`)
- **Capabilities:** Audits `<title>`, `<meta name="description">`, Open Graph tags, Twitter cards, canonical tags, `robots.txt`, `sitemap.xml`, heading hierarchy (`<h1>`-`<h6>`), and image alt attributes.

### 3. UI / UX Review
- **Skill Playbook:** `ui-ux-design-review` (`.agents/skills/ui-ux-design-review/SKILL.md`)
- **Capabilities:** Evaluates visual hierarchy, Nielsen Norman Group 10 Usability Heuristics, mobile touch target sizes (min 44x44px), spacing consistency, and navigation clarity.

### 4. Accessibility (a11y)
- **Tooling:** Google Lighthouse A11y (`npx -y lighthouse --only-categories=accessibility`) + `@axe-core/playwright`.
- **Skill Playbook:** `accessibility-wcag-audit` (`.agents/skills/accessibility-wcag-audit/SKILL.md`)
- **Capabilities:** Verifies WCAG 2.1 AA compliance, ARIA landmark roles, form input labels, keyboard tab navigation, modal focus traps, color contrast (4.5:1 ratio), and `prefers-reduced-motion` support.

### 5. Performance & Core Web Vitals
- **Tooling:** Google Lighthouse Performance (`npx -y lighthouse --only-categories=performance`) + `rollup-plugin-visualizer`.
- **Skill Playbook:** `web-performance-optimization` (`.agents/skills/web-performance-optimization/SKILL.md`)
- **Capabilities:** Measures LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), INP (Interaction to Next Paint), Total Blocking Time (TBT), image format efficiency, font loading latency, and JavaScript bundle sizes.

### 6. React 19 & Vite Engineering
- **Tooling:** `oxlint` (already installed in `site/devDependencies`).
- **Skill Playbook:** `react-19-vite-best-practices` (`.agents/skills/react-19-vite-best-practices/SKILL.md`)
- **Capabilities:** Enforces React 19 functional component patterns, hook dependency array correctness (`useEffect`/`useCallback`), context performance optimization, and Vite build chunk splitting.

### 7. Animation & Motion Engineering
- **Skill Playbook:** `framer-motion-orchestration` (`.agents/skills/framer-motion-orchestration/SKILL.md`)
- **Capabilities:** Guides Framer Motion scroll-linked choreography, spring animation tuning (`ease: [0.22, 1, 0.36, 1]`), hardware acceleration (`transform: translate3d`), GPU layer management, and mobile frame-rate optimization.

### 8. Landing-Page Conversion / CRO
- **Skill Playbook:** `landing-page-cro-audit` (`.agents/skills/landing-page-cro-audit/SKILL.md`)
- **Capabilities:** Evaluates above-the-fold value proposition clarity, social proof placement (Google ratings, client count), objection handling, primary CTA prominence, form field friction, and conversion funnel flow.

### 9. Copy & Content Review
- **Skill Playbook:** `copywriting-clarity-audit` (`.agents/skills/copywriting-clarity-audit/SKILL.md`)
- **Capabilities:** Checks headline clarity, benefit-driven value statements, customer-centric tone, messaging consistency, and elimination of marketing jargon.

### 10. Automated Browser Testing
- **Tooling:** Playwright CLI (`npx -y playwright test`).
- **Skill Playbook:** `playwright-browser-testing` (`.agents/skills/playwright-browser-testing/SKILL.md`)
- **Capabilities:** Executes headless browser verification across Chromium, Firefox, and WebKit (Safari), catching console errors, uncaught exceptions, 404 network failures, and responsive layout breakages.

### 11. Visual Regression
- **Tooling:** Playwright Visual Matchers (`expect(page).toHaveScreenshot()`).
- **Skill Playbook:** `visual-regression-testing` (`.agents/skills/visual-regression-testing/SKILL.md`)
- **Capabilities:** Captures pixel-perfect full-page baseline screenshots across Desktop (1440px), Tablet (768px), and Mobile (375px) viewports to detect accidental visual shifts.

### 12. Code Quality & Dependency Hygiene
- **Tooling:** `oxlint` + `knip`.
- **Capabilities:** Identifies unused exports, dead code files, duplicate imports, and unused dependencies.

---

## 6. Recommended Final Skill Stack

### CORE — MUST HAVE (Installed in Phase 3)
1. **`web-security-audit`**: Frontend security, PII protection, secret scanning, and CSP review.
2. **`technical-seo-audit`**: Meta tags, heading structure, OpenGraph, sitemap, and SEO Lighthouse checks.
3. **`ui-ux-design-review`**: Usability heuristics, visual hierarchy, mobile UX, and CTA clarity.
4. **`accessibility-wcag-audit`**: WCAG 2.1 AA compliance, ARIA attributes, keyboard navigation, and contrast.
5. **`web-performance-optimization`**: Lighthouse Core Web Vitals, TBT, image/font performance, and bundle size.
6. **`react-19-vite-best-practices`**: React 19 hooks, effect correctness, context state optimization, and Oxlint rules.
7. **`framer-motion-orchestration`**: Framer Motion scroll choreography, spring physics, and GPU layer management.
8. **`landing-page-cro-audit`**: Evidence-based CRO, value proposition clarity, friction reduction, and form optimization.
9. **`playwright-browser-testing`**: Headless Chromium/WebKit/Firefox cross-browser testing & console error detection.
10. **`visual-regression-testing`**: Multi-viewport snapshot baseline comparison.

### OPTIONAL (Installable Later as Needed)
1. `copywriting-clarity-audit`: Headline readability & jargon reduction.
2. `knip-code-quality`: Unused export and dependency cleanup tool.

### SKIP (Investigated but Not Recommended)
1. ❌ **Bulk `agentic-awesome-skills` repository clone:** Do NOT install all 2,124 skills (causes tool bloat and context clutter).
2. ❌ **Generic prompt-collection repos:** Skip marketing prompt dumps lacking structured validation methodologies.
3. ❌ **Heavy AI-only code reviewers:** Prefer established, deterministic tools (`oxlint`, `playwright`, `lighthouse`, `axe-core`) interpreted via specialized skill playbooks.
