---
name: visual-regression-testing
description: Captures pixel-perfect baseline screenshots across Desktop, Tablet, and Mobile viewports to detect unintended visual layout regressions.
version: 1.0.0
category: testing
triggers:
  - run visual regression
  - test visual
  - check layout regression
---

# Purpose
Execute automated visual screenshot regression tests using Playwright's `toHaveScreenshot()` matcher to detect accidental visual shifts, font rendering anomalies, or broken responsive layouts across key viewports.

# When To Use
- After modifying global CSS (`site/src/index.css`), layout padding, or section structures.
- Before submitting pull requests or production builds.

# Viewport Matrix
- **Desktop:** `1440 × 1000`
- **Laptop:** `1280 × 800`
- **Tablet:** `768 × 1024`
- **Mobile Handset:** `390 × 844`
- **Small Mobile:** `375 × 667`

# Procedure
1. **Freeze Animations:** Before snapshot capture, inject CSS styles `* { animation: none !important; transition: none !important; }` to eliminate false diffs caused by active spring animations.
2. **Execute Snapshot Runner:** Run `npx --prefix site playwright test tests/visual/snapshots.spec.js`.
3. **Compare Diff Outputs:** If pixel differences exceed `maxDiffPixelRatio: 0.05`, inspect generated `-diff.png` files in `tests/visual/__snapshots__/`.
4. **Update Baselines Intentionally:** Update reference images ONLY when UI changes are deliberate via `npx --prefix site playwright test tests/visual/snapshots.spec.js --update-snapshots`.

# Validation
- 0 visual pixel diff regressions against established baseline screenshots.
- Page rendering verified free of horizontal layout overflow across all viewports.

# Output Format
Visual regression summary listing Viewport Target, Reference Image, Comparison Outcome (PASS/DIFF), Pixel Diff Count, and Diff Snapshot Link.

# Failure Conditions
- Accidental pixel layout shifts exceeding 5% pixel ratio.
- Broken responsive component stacking or text wrapping.

# Safety Rules
- Do NOT blindly run `--update-snapshots` to suppress real visual bug regressions.
- Always freeze CSS and Framer Motion transitions before snapshot capture.

# Project-Specific Rules
- Reference visual baselines MUST be stored in `site/tests/visual/snapshots.spec.js-snapshots/`.

# Provenance
- **Origin:** Tool Orchestration & Project-Specific
- **Source:** Playwright Visual Comparisons & Frontend Quality Assurance Architecture.
---
