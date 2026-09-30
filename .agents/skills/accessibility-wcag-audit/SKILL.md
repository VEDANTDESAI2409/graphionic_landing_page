---
name: accessibility-wcag-audit
description: Audits WCAG 2.1 AA compliance, ARIA attributes, keyboard navigation, focus trap in modals, contrast ratios, and reduced-motion support.
version: 1.0.0
category: accessibility
triggers:
  - run accessibility audit
  - audit accessibility
  - check a11y
---

# Purpose
Execute an automated and manual accessibility audit to ensure the landing page conforms to WCAG 2.1 Level AA standards, supporting keyboard-only navigation, screen readers, and reduced-motion preferences.

# When To Use
- Prior to release or pull request merges.
- When creating interactive modals, accordions, form controls, or custom animations.

# Inputs
- Local web application running at `http://localhost:5173/`.
- Automated testing tools: `@axe-core/playwright`, Google Lighthouse A11y.
- Component source files (`site/src/components/*`).

# Procedure
1. **Automated axe-core Scan:** Execute `npx --prefix site playwright test tests/accessibility/a11y.spec.js` using `@axe-core/playwright` with tags `['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']`.
2. **Lighthouse A11y Audit:** Execute `npx -y lighthouse http://localhost:5173/ --only-categories=accessibility --output=json`.
3. **Keyboard Navigation Audit:** Verify tab focus order across all interactive elements (`a`, `button`, `input`, `select`, `textarea`).
4. **Modal Focus Trap & Escape Handling:** Test that `<InquiryForm />` traps focus when open, releases focus when closed, and responds to `Escape` key press.
5. **Color Contrast Verification:** Check body text against background colors to ensure minimum 4.5:1 WCAG contrast ratio (3:1 for large text).
6. **Reduced-Motion Inspection:** Verify components with heavy animations (`ServiceFan`, `WhyPinned`) respect `prefers-reduced-motion` media queries or Framer Motion `useReducedMotion()`.

# Validation
- 0 `axe-core` accessibility violations.
- Lighthouse Accessibility score >= 95/100.
- All interactive controls accessible via keyboard `Tab` / `Shift+Tab` / `Enter` / `Space`.
- All background decorative SVGs specify `aria-hidden="true"`.

# Output Format
Markdown accessibility audit report listing Violation Severity, WCAG Success Criteria, Affected Element, and Code Fix Guidance.

# Failure Conditions
- Any automated `axe-core` violation.
- Modal dialog failing to close on `Escape` key press.
- Text content failing minimum WCAG 4.5:1 contrast requirements.

# Safety Rules
- Automated tools alone are NOT sufficient; manual keyboard testing MUST be conducted.
- Do NOT alter visual branding to fix contrast without consulting design system tokens.

# Project-Specific Rules
- `InquiryForm.jsx` MUST trap focus and support `Escape` key dismissal.
- SVG icons without text labels MUST specify explicit `aria-label` or `aria-hidden="true"`.

# Provenance
- **Origin:** Tool Orchestration & Adapted
- **Source:** Deque `axe-core` API, W3C WCAG 2.1 Guidelines & `sickn33/agentic-awesome-skills` (v17.4.0).
---
