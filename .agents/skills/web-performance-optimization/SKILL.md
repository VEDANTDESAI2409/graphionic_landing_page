---
name: web-performance-optimization
description: Audits Core Web Vitals (LCP, CLS, INP), Total Blocking Time (TBT), image format optimization, font loading, and bundle chunk sizes.
version: 1.0.0
category: performance
triggers:
  - run performance audit
  - audit performance
  - check Core Web Vitals
---

# Purpose
Measure and optimize real-world loading and runtime performance, ensuring the landing page achieves top-tier Core Web Vitals (LCP, CLS, INP) and fast initial render speeds.

# When To Use
- Prior to major release builds.
- When adding high-resolution images, rich Framer Motion animations, or external script bundles.

# Inputs
- Local dev server (`http://localhost:5173/`).
- Google Lighthouse CLI (`lighthouse`).
- Vite bundle manifest (`dist/assets/*`).

# Procedure
1. **Lighthouse Performance Scan:** Execute `npx -y lighthouse http://localhost:5173/ --only-categories=performance --output=json`.
2. **Core Web Vitals Audit:**
   - LCP (Largest Contentful Paint): Target <= 1.8s.
   - CLS (Cumulative Layout Shift): Target <= 0.05.
   - INP (Interaction to Next Paint): Target <= 150ms.
   - TBT (Total Blocking Time): Target <= 100ms.
3. **Asset & Image Optimization:** Verify images in `public/projects/` use webp/jpeg formats with explicit `loading="lazy"` and dimension attributes.
4. **Font Loading Strategy:** Verify Google Fonts use `font-display: swap` to prevent FOIT (Flash of Invisible Text).
5. **Bundle Size Analysis:** Inspect Vite production build output (`dist/assets/index-*.js`) to ensure JavaScript bundle remains lightweight.

# Validation
- Lighthouse Performance score >= 90/100 on desktop and mobile presets.
- CLS < 0.05 (zero noticeable layout jumping).
- JavaScript bundle chunk size < 500kB.

# Output Format
Performance metrics dashboard table showing Metric Name, Target Threshold, Measured Baseline, Status (PASS/WARN/FAIL), and Optimization Opportunities.

# Failure Conditions
- LCP > 2.5 seconds.
- CLS > 0.1 (failing Google Core Web Vitals threshold).
- Excessive main-thread blocking time from heavy un-throttled animations.

# Safety Rules
- Do NOT disable or strip required feature animations solely to pass synthetic benchmarks.
- Use `will-change: transform` sparingly to prevent GPU memory bloat.

# Project-Specific Rules
- Hero background clouds (`Sky.jsx`) MUST use procedural SVGs rather than raster bitmaps.
- Project screenshots MUST specify `loading="lazy"`.

# Provenance
- **Origin:** Tool Orchestration & Project-Specific
- **Source:** Google Web Vitals Initiative & Vite Performance Guide.
---
