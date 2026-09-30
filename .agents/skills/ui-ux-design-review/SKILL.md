---
name: ui-ux-design-review
description: Evaluates visual hierarchy, usability heuristics, spacing rhythm, mobile touch targets, CTA clarity, and responsive UX.
version: 1.0.0
category: design
triggers:
  - run UX audit
  - audit UX
  - check design
---

# Purpose
Conduct a heuristic usability and visual design evaluation of the landing page against the approved design system specification (`docs/design-system.md`) and Nielsen Norman Group 10 Usability Heuristics.

# When To Use
- When building new UI components or sections.
- When evaluating mobile responsiveness, touch target comfort, or visual spacing consistency.

# Inputs
- Design System Document (`docs/design-system.md`).
- Stylesheet (`site/src/index.css`) & JSX components (`site/src/components/*`).
- Browser viewport renders (Desktop 1440px, Mobile 390px).

# Procedure
1. **Visual Hierarchy Review:** Verify typography contrast, heading scales (`h1` 56px, `h2` 42px), and focal points.
2. **Design Token Conformance:** Inspect CSS for adherence to `:root` color tokens (`--blue`, `--lime`, `--navy`), radii (`--r-xl`, `--r-lg`), and shadows.
3. **Mobile Touch Target Audit:** Confirm all interactive buttons, links, and form fields maintain a minimum 44x44px touch region on mobile viewports.
4. **Spacing Rhythm Check:** Verify padding consistency across sections (`.shell` 40px desktop / 20px mobile).
5. **CTA & Navigation Clarity:** Ensure primary call-to-action buttons (`.btn-lime`) stand out visually from secondary actions.
6. **Form UX Evaluation:** Verify inline field labels, error state styling (`.has-error`), and helper text clarity.

# Validation
- 100% compliance with defined design tokens in `docs/design-system.md`.
- All mobile interactive targets >= 44x44px.
- Zero horizontal layout overflow / body scrollbars on mobile viewports.

# Output Format
Heuristic evaluation table listing Heuristic Area, Compliance Status (PASS/WARN/FAIL), Findings, and Suggested Adjustments.

# Failure Conditions
- Hardcoded arbitrary hex colors outside defined design tokens.
- Undersized touch targets on mobile controls (< 40px).
- Broken or inconsistent spacing rhythms across adjacent sections.

# Safety Rules
- Do NOT alter visual styles or layout dimensions during audit.
- Do NOT introduce temporary utility classes or change approved branding.

# Project-Specific Rules
- Primary conversion actions MUST use Electric Lime (`--lime` `#D2FF28`) with Dark Navy text (`#0A0F1D`).
- Outer white page border frame (`.page` 14px padding) MUST be preserved on desktop.

# Provenance
- **Origin:** Adapted & Project-Specific
- **Basis:** Nielsen Norman Group Usability Heuristics & Graphionic Design System (`docs/design-system.md`).
