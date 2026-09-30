# Graphionic Infotech — Design System

## 1. Design Philosophy
The **Graphionic Infotech** design system is engineered to convey **modernity, high technical competence, precision, and business-first trust**.

The visual language balances a high-energy blue-and-sky digital palette with a vibrant lime accent (`#D2FF28`), crisp dark navy surfaces (`#0A0F1D`), high-contrast typography, and glassmorphic translucent layers (`backdrop-filter`).

> **CRITICAL RULE:** This document reverse-engineers and documents the **APPROVED, CURRENT VISUAL DESIGN**. It is NOT a proposal for a redesign. Any future landing page or component development MUST strictly conform to these tokens, component patterns, typography scales, and motion guidelines.

---

## 2. Brand Personality & Color Tokens

### Core Brand Colors
Defined as CSS Custom Properties in `site/src/index.css` (`:root`):

```css
:root {
  --blue: #007AFF;       /* Primary Brand Blue - vibrant, trustworthy */
  --sky: #00A3FF;        /* Secondary Sky Blue - high energy, digital */
  --lime: #D2FF28;       /* Electric Lime Accent - conversion, energy, focus */
  --navy: #0A0F1D;       /* Dark Navy Surface - contrast, premium weight */
  --white: #FFFFFF;      /* Pure White Surface */

  --ink: #0B1220;        /* Primary Body & Heading Text */
  --gray-900: #111827;   /* High-contrast neutral */
  --gray-700: #374151;   /* Sub-heading & secondary text */
  --gray-600: #4B5563;   /* Secondary body text */
  --gray-500: #6B7280;   /* Muted labels & icons */
  --gray-400: #9CA3AF;   /* Subtle rules & placeholders */
  --gray-200: #E5E7EB;   /* Card borders & light dividers */
  --gray-100: #F3F4F6;   /* Sub-surface backgrounds */
  --gray-50: #F7F8FA;    /* Light card background */
}
```

### Color Usage Rules
- **Primary Actions / CTAs:** Electric Lime (`var(--lime)` `#D2FF28`) with Dark Navy text (`#0A0F1D`).
- **Secondary Actions:** Dark Navy (`var(--navy)`) or Glassmorphic Translucent Blue (`rgba(0, 104, 224, 0.94)`).
- **Background Gradients:**
  - Hero Background: `linear-gradient(180deg, #0072F5 0%, #0A8BFF 26%, #34A9FF 52%, #7CC8FF 74%, #BFE3FF 100%)`
  - Sticky Navbar Scrolled: `rgba(0, 104, 224, 0.94)` with `backdrop-filter: blur(22px) saturate(170%)`
  - Mobile Drawer: `linear-gradient(180deg, rgba(0,104,224,0.97) 0%, rgba(0,72,170,0.97) 100%)`

---

## 3. Typography System

### Font Stack
- **Primary Font:** `Plus Jakarta Sans` (Weights: `400`, `500`, `600`, `700`, `800`)
- **Secondary Font:** `Inter` (Weights: `400`, `500`, `600`, `700`)
- **Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`

```css
--font: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

### Typography Scale & Hierarchy

| Role | Font Size | Weight | Letter Spacing | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `56px` (Mobile: `34px`) | `800` | `-0.03em` | `1.08` | Primary Hero Headline |
| **Section H2** | `42px` (Mobile: `28px`) | `800` / `700` | `-0.025em` | `1.14` | Main Section Titles |
| **Card H3** | `20px` - `24px` | `700` / `800` | `-0.015em` | `1.25` | Component & Card Titles |
| **Body Large**| `18px` (Mobile: `15.5px`)| `400` / `500` | `normal` | `1.6` | Hero & Section Descriptions |
| **Body Normal**| `15px` - `16px` | `400` / `500` | `normal` | `1.55` | Card Descriptions & FAQs |
| **Pill / Label**| `12px` - `13px` | `700` | `0.04em` - `0.18em` | `1.0` | Eyebrow badges & pills (UPPERCASE) |
| **Nav Links** | `14.5px` | `500` | `normal` | `1.0` | Desktop Header Navigation |

---

## 4. Spacing, Layout & Radius Tokens

### Layout Containers
- **Page Width (`--page`):** `1240px`
- **Shell (`.shell`):** `max-width: 1240px; margin: 0 auto; padding: 0 40px;` (Mobile: `padding: 0 20px;`)
- **Outer Frame (`.page`):** `padding: 14px; background: #fff;`

### Border Radii Tokens
```css
--r-xl: 40px;  /* Section frames & major containers (Hero, CTA banner) */
--r-lg: 28px;  /* Large cards, modals & drawers */
--r-md: 20px;  /* Standard feature cards & project tiles */
--r-sm: 14px;  /* Small badges, inputs & mini-buttons */
```

### Elevation & Shadows
```css
--shadow-card: 0 18px 44px -14px rgba(6, 40, 80, 0.34), 0 4px 12px -4px rgba(6, 40, 80, 0.18);
--shadow-soft: 0 24px 60px -28px rgba(10, 25, 60, 0.28);
```

---

## 5. Component Visual Language

### 1. Buttons
- **Primary Lime Button (`.btn-lime`):**
  `background: var(--lime); color: var(--navy); font-weight: 700; border-radius: 999px; padding: 13px 22px;`
  Hover: `transform: translateY(-2px); box-shadow: 0 16px 32px -12px rgba(120, 170, 0, 0.85);`
- **Dark Button (`.btn-dark` / `.btn-navy`):**
  `background: var(--navy); color: #fff; font-weight: 700; border-radius: 999px;`
- **Ghost Button (`.ghost-btn`):**
  `background: transparent; color: var(--blue); border: 1.5px solid var(--blue); border-radius: 999px;`

### 2. Eyebrow Pills (`.pill` / `.eyebrow`)
- Translucent capsule badge with glowing dot:
  `background: rgba(0, 122, 255, 0.08); color: var(--blue); font-size: 12.5px; font-weight: 700; border-radius: 999px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 8px;`

### 3. Sticky Glassmorphic Navbar (`.nav.is-stuck`)
- Floating capsule container:
  `top: 10px; left: 12px; right: 12px; border-radius: 35px; background: rgba(0, 104, 224, 0.94); backdrop-filter: blur(22px) saturate(170%); border: 1px solid rgba(255,255,255,0.14);`

### 4. Cards & Tiles
- **Project Tiles (`.prj`):** Clean 16:10 image ratio container, rounded `20px` corners, smooth 0.35s scale & lift on hover (`transform: translateY(-6px)`).
- **Stat Cards (`.stat`):** High-contrast color themes (`stat--blue`, `stat--light`, `stat--lime`), distinct numeric badges (`01`, `02`, `03`), and decorative vector bar graphs.

---

## 6. Motion & Animation System
Driven exclusively by **Framer Motion** (`framer-motion`):

### Easing & Timing Standard
```js
const ease = [0.22, 1, 0.36, 1]; // Custom cubic-bezier (cubic-out)
```
- **Standard Entrance Duration:** `0.8s` - `0.9s`
- **Scroll Viewport Margin:** `margin: '-80px'` (triggers reveal when 80px inside viewport)
- **Viewport Rule:** `viewport: { once: true }` (prevents distracting re-triggering upon scroll-up)

### Key Micro-Interactions & Scroll Effects
1. **Hero Entry:** Staggered vertical slide-up (`initial: { opacity: 0, y: 26 }` -> `animate: { opacity: 1, y: 0 }`).
2. **Service Arc Fan (`ServiceFan.jsx`):** 7 cards arranged on a calculated geometric arc (`GEO`). Center card is focal point (`z-index: 6`, `rotate: 0`).
3. **Mobile Sticky Pin (`WhyPinned.jsx`):** Emulates GSAP ScrollTrigger using Framer Motion's `useScroll` over a `300vh` track. Maps scroll progress to card `opacity`, `y`, and `scale`.
4. **Rotating 3D Dot-Globe (`Experience.jsx`):** Continuous 90-second rotation (`animate={{ rotate: 360 }}`).

---

## 7. Responsive Architecture & Breakpoints

| Breakpoint | Target Device | Layout Adjustments |
| :--- | :--- | :--- |
| **`> 980px`** | Desktop / Large Tablet | Full 3-column project grid, 4-column why cards, 7-card ServiceFan arc, inline navbar links. |
| **`<= 980px`** | Tablet / Mobile | Navbar collapses links into hamburger menu drawer, header switches to mobile drawer. |
| **`<= 720px`** | Mobile Handset | `useIsMobile(720)` returns `true`. `Stats` becomes 2x2 grid, `WhyGraphionic` activates `WhyPinned` scroller, `Reviews` converts stats into horizontal snap-carousel. |
| **`<= 480px`** | Small Mobile Handset | Full-width stacked buttons, single-column footers, tightened section paddings. |

---

## 8. Accessibility Audit & Guidelines

### Implemented Accessibility Strengths
- **Semantic HTML5:** Proper usage of `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<nav>`.
- **Keyboard & Modal Traps:** `<InquiryForm />` traps Escape key press (`e.key === 'Escape'`) and locks body scroll (`overflow: hidden`).
- **Interactive Controls:** All clickable elements are native `<button>` or `<a>` tags with explicit `aria-label` or descriptive text.
- **Decorative Media Isolation:** Background SVGs (`Sky.jsx`, `Globe`, `DotField`) specify `aria-hidden="true"`.
- **Motion Accessibility:** `WhyPinned.jsx` and `ServiceFan.jsx` utilize `useReducedMotion()` to bypass transforms when `prefers-reduced-motion` is active.

### Recommended Accessibility Enhancements
- Ensure all color pairings maintain a minimum WCAG 2.1 AA contrast ratio of 4.5:1.
- Add explicit `:focus-visible` outline rings for keyboard tab navigation on custom buttons.

---

## 9. Design System Do's and Don'ts

### ✅ DO:
- Use `:root` CSS custom properties for all colors, radii, and shadows.
- Maintain consistent section padding (`shell` with 40px desktop / 20px mobile padding).
- Preserve high contrast headings with negative letter-spacing (`-0.025em`).
- Keep Framer Motion entrance reveals `once: true` with `ease: [0.22, 1, 0.36, 1]`.

### ❌ DON'T:
- Do NOT introduce Tailwind utility classes or custom inline color hex codes.
- Do NOT remove the 14px outer white page frame (`.page`).
- Do NOT break the sticky scroll container by placing `overflow: hidden` on parent sections.
- Do NOT replace Lucide icons with incompatible icon sets.
