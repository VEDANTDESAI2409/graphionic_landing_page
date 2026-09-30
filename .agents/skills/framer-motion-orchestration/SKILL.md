---
name: framer-motion-orchestration
description: Guides Framer Motion scroll-linked choreography, spring physics, GPU layer management, hardware acceleration, and reduced-motion support.
version: 1.0.0
category: motion
triggers:
  - run motion audit
  - audit animations
  - check Framer Motion
---

# Purpose
Orchestrate high-end, premium, interactive motion design using **Framer Motion**, ensuring animations guide user focus and delight visitors while remaining GPU-accelerated and accessible.

# Motion Philosophy
1. **Communicate:** Motion must explain state transitions or focal changes.
2. **Guide Attention:** Direct visitor eye movement towards primary value statements and CTAs.
3. **High-End & Purposeful:** Smooth, natural spring physics (`ease: [0.22, 1, 0.36, 1]`) — never chaotic or gratuitous.
4. **Performance First:** Motion must NEVER cause layout thrashing or drop below 60fps on mobile.

# When To Use
- When designing or tweaking interactive scroll reveals, hero entrances, or sticky card pinning.
- When auditing mobile animation performance or `prefers-reduced-motion` compliance.

# Procedure
1. **Scroll Entrance Inspection:** Ensure `whileInView` elements specify `viewport: { once: true, margin: '-80px' }` to prevent scroll-up re-triggering.
2. **GPU Acceleration Audit:** Verify animated properties are limited to `opacity`, `transform` (`scale`, `translate3d`, `rotate`), avoiding costly layout property animations (`width`, `height`, `margin`).
3. **Mobile Sticky Pin Verification:** Inspect `WhyPinned.jsx` track height (`300vh`), `useScroll` mappings, and `useTransform` thresholds.
4. **Reduced Motion Check:** Verify components test `useReducedMotion()` and fallback to static displays when reduced motion is preferred by the user OS.

# Validation
- All animated elements use GPU-friendly properties (`opacity`, `transform`).
- Zero scroll-jank or dropped frames during page scrolling.
- Reduced-motion preferences bypass complex spring animations.

# Output Format
Motion design audit listing Component, Animation Type, Animated Properties, GPU Status (PASS/WARN), Easing Curve, and Performance Impact.

# Failure Conditions
- Animating layout-triggering properties (`width`, `top`, `left`) inside scroll loops.
- Scroll hijacking or un-throttled scroll event listeners.
- Infinite un-pausable animations that drain mobile battery life.

# Safety Rules
- Do NOT introduce GSAP unless Framer Motion cannot handle a specific 3D interaction.
- Do NOT add random floating elements that distract from primary messaging.

# Project-Specific Rules
- Approved brand easing curve MUST be `const ease = [0.22, 1, 0.36, 1];`.
- Service fan center card (Automation) MUST maintain focal prominence (`z-index: 6`).

# Provenance
- **Origin:** Project-Specific & Adapted
- **Source:** Framer Motion Official Guide & Graphionic Design System (`docs/design-system.md`).
---
