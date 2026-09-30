# Graphionic Infotech — Skills Installation Plan & Workflow Pipeline

This document defines the exact installation approach, configuration, invocation instructions, and audit pipeline for the recommended development skills and engineering tools.

> **STATUS:** APPROVED & INSTALLED (Phase 3 Complete). All 11 engineering skills installed under `.agents/skills/`. Pinned audit dependencies installed in `site/package.json`. Playwright browser test suite configured under `site/tests/`.

---

## 1. Selected Core Skills Specification & Inventory

### 1. `web-security-audit`
- **Source / Origin:** Extracted & adapted from `sickn33/agentic-awesome-skills` (v17.4.0) / OWASP Web Security Project.
- **Target Location:** `.agents/skills/web-security-audit/SKILL.md`
- **Purpose:** Audits frontend XSS vector risks, PII logging, target="_blank" reverse tabnabbing, CSP header readiness, and secrets hygiene.
- **Dependencies:** `npm audit`
- **Antigravity Invocation:** Triggered automatically before release or manually when requested ("run security audit").
- **Security & Safety:** Read-only audit playbook. Requires no external API keys or credentials.

---

### 2. `technical-seo-audit`
- **Source / Origin:** Extracted from `sickn33/agentic-awesome-skills` / Google Lighthouse SEO Specifications.
- **Target Location:** `.agents/skills/technical-seo-audit/SKILL.md`
- **Purpose:** Audits HTML document metadata, title tags, descriptions, OpenGraph, canonical links, sitemap, robots.txt, and heading hierarchy (`<h1>`-`<h6>`).
- **Dependencies:** `npx -y lighthouse`
- **Antigravity Invocation:** "run SEO audit" or prior to production build verification.
- **Security & Safety:** Runs locally against `http://localhost:5173/`. 0 external network data transmission.

---

### 3. `ui-ux-design-review`
- **Source / Origin:** Adapted from Nielsen Norman Group 10 Usability Heuristics & Landing Page CRO guidelines.
- **Target Location:** `.agents/skills/ui-ux-design-review/SKILL.md`
- **Purpose:** Evaluates visual hierarchy, color contrast ratios, spacing consistency, mobile touch targets (44x44px min), navigation clarity, and responsive layout scaling.
- **Dependencies:** None (Heuristic review playbook).
- **Antigravity Invocation:** "run UX audit" or during UI component development.
- **Security & Safety:** Pure analysis playbook.

---

### 4. `accessibility-wcag-audit`
- **Source / Origin:** Extracted from Deque `axe-core` & WCAG 2.1 AA Guidelines.
- **Target Location:** `.agents/skills/accessibility-wcag-audit/SKILL.md`
- **Purpose:** Verifies WCAG 2.1 AA/AAA compliance, ARIA attributes, keyboard tab accessibility, focus trap in modal dialogs, contrast ratios, and `prefers-reduced-motion`.
- **Dependencies:** `npx -y lighthouse`, `@axe-core/playwright`
- **Antigravity Invocation:** "run accessibility audit".
- **Security & Safety:** Deterministic, local DOM evaluation.

---

### 5. `web-performance-optimization`
- **Source / Origin:** Google Web Vitals Initiative & Vite Performance Guide.
- **Target Location:** `.agents/skills/web-performance-optimization/SKILL.md`
- **Purpose:** Audits Core Web Vitals (LCP, CLS, INP), Total Blocking Time (TBT), image format compression, font loading strategy, and JavaScript bundle sizes.
- **Dependencies:** `npx -y lighthouse`
- **Antigravity Invocation:** "run performance audit".
- **Security & Safety:** Local benchmark evaluation.

---

### 6. `react-19-vite-best-practices`
- **Source / Origin:** React 19 Core Documentation & Vite Engineering Standards.
- **Target Location:** `.agents/skills/react-19-vite-best-practices/SKILL.md`
- **Purpose:** Enforces clean React 19 functional component patterns, hook dependency correctness (`useEffect`, `useCallback`), context state isolation, and Oxlint rule compliance.
- **Dependencies:** `npm run lint` (`oxlint`)
- **Antigravity Invocation:** Automatically invoked during React component creation or refactoring.
- **Security & Safety:** Static code linting and style verification.

---

### 7. `framer-motion-orchestration`
- **Source / Origin:** Framer Motion Official Guide & High-Performance Animation Choreography.
- **Target Location:** `.agents/skills/framer-motion-orchestration/SKILL.md`
- **Purpose:** Guides smooth scroll-linked choreography, spring physics (`ease: [0.22, 1, 0.36, 1]`), GPU layer management (`transform: translate3d`), and frame-rate optimization.
- **Dependencies:** `framer-motion` (already in `site/package.json`)
- **Antigravity Invocation:** Triggered when creating or modifying interactive animations.
- **Security & Safety:** Read-only animation design guidance.

---

### 8. `landing-page-cro-audit`
- **Source / Origin:** Evidence-Based Conversion Rate Optimization (CRO) & Lead Generation Frameworks.
- **Target Location:** `.agents/skills/landing-page-cro-audit/SKILL.md`
- **Purpose:** Audits above-the-fold value proposition, social proof prominence, objection handling, primary CTA visibility, form field friction, and conversion funnel flow.
- **Dependencies:** None.
- **Antigravity Invocation:** "run CRO audit".
- **Security & Safety:** Pure analytical playbook.

---

### 9. `playwright-browser-testing`
- **Source / Origin:** Microsoft Playwright Official Automation Suite.
- **Target Location:** `.agents/skills/playwright-browser-testing/SKILL.md`
- **Purpose:** Executes automated headless testing across Chromium, WebKit (Safari), and Firefox to catch console errors, JavaScript exceptions, and network failures.
- **Dependencies:** `npx -y playwright`
- **Antigravity Invocation:** "run browser tests".
- **Security & Safety:** Runs in local headless browser instances.

---

### 10. `visual-regression-testing`
- **Source / Origin:** Playwright Visual Comparison Framework.
- **Target Location:** `.agents/skills/visual-regression-testing/SKILL.md`
- **Purpose:** Captures baseline screenshot comparisons across Desktop (1440px), Tablet (768px), and Mobile (375px) viewports to detect unintended visual layout shifts.
- **Dependencies:** `npx -y playwright`
- **Antigravity Invocation:** "run visual regression check".
- **Security & Safety:** Stores reference snapshots in local test artifacts.

---

## 2. Integrated Engineering & Audit Workflow Pipeline

```
Phase A: BEFORE DEVELOPMENT
 ├── 1. Read System Architecture (docs/system-architecture.md)
 ├── 2. Read Design System Tokens (docs/design-system.md)
 └── 3. Execute Baseline Security & SEO Audit (web-security-audit, technical-seo-audit)

Phase B: DURING DEVELOPMENT
 ├── 1. Apply React 19 & Oxlint Rules (react-19-vite-best-practices, oxlint)
 ├── 2. Apply Framer Motion Choreography (framer-motion-orchestration)
 ├── 3. Perform UI/UX & CRO Verification (ui-ux-design-review, landing-page-cro-audit)
 └── 4. Verify Accessibility & Reduced-Motion (accessibility-wcag-audit)

Phase C: BEFORE RELEASE & COMMIT
 ├── 1. Run Automated Cross-Browser Testing (playwright-browser-testing)
 ├── 2. Run Visual Regression Checks (visual-regression-testing)
 ├── 3. Run Lighthouse Performance & Web Vitals Audit (web-performance-optimization)
 ├── 4. Execute Dependency Security Audit (npm audit)
 └── 5. Run Production Build Verification (npm run build)
```

---

## 3. Installation Execution Plan (Post-Approval)

Upon receiving user approval:
1. Create local workspace skill directories under `.agents/skills/`:
   - `.agents/skills/web-security-audit/SKILL.md`
   - `.agents/skills/technical-seo-audit/SKILL.md`
   - `.agents/skills/ui-ux-design-review/SKILL.md`
   - `.agents/skills/accessibility-wcag-audit/SKILL.md`
   - `.agents/skills/web-performance-optimization/SKILL.md`
   - `.agents/skills/react-19-vite-best-practices/SKILL.md`
   - `.agents/skills/framer-motion-orchestration/SKILL.md`
   - `.agents/skills/landing-page-cro-audit/SKILL.md`
   - `.agents/skills/playwright-browser-testing/SKILL.md`
   - `.agents/skills/visual-regression-testing/SKILL.md`
2. Validate each `SKILL.md` file format with YAML frontmatter.
3. Verify Antigravity skills registration using `view_file`.
4. Report completion to user without modifying any application source code.
