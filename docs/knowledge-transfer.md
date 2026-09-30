# Graphionic Infotech — Knowledge Transfer Report

## 1. Executive Summary
This document provides a comprehensive technical knowledge-transfer report for the **Graphionic Infotech** web application codebase. The repository contains a single-page marketing and lead-generation web application designed to showcase Graphionic Infotech's software engineering services, portfolio, client testimonials, and company statistics.

The objective of this analysis is to establish an exhaustive technical baseline without altering, refactoring, or redesigning any existing application logic or design.

---

## 2. Current Technology Stack
- **Framework / Runtime:** React 19 (`react` `^19.2.8`, `react-dom` `^19.2.8`)
- **Build Tool / Bundler:** Vite 8 (`vite` `^8.2.2`, `@vitejs/plugin-react` `^6.1.0`)
- **Language / Syntax:** JavaScript (ES Modules, JSX syntax)
- **Animation System:** Framer Motion (`framer-motion` `^13.2.0`)
- **Icons:** Lucide React (`lucide-react` `^1.43.0`)
- **Linter:** Oxlint (`oxlint` `^1.79.0`)
- **Styling:** Vanilla CSS (`site/src/index.css`, 1736 lines) with CSS custom properties & Google Fonts (`Plus Jakarta Sans`, `Inter`).
- **Node Environment:** Node v26.4.0 / npm 11.17.0.

---

## 3. Repository Structure
```
graphionic_landing/
├── package.json              # Monorepo wrapper scripts ("dev", "build", "preview", "lint")
├── package-lock.json         # Lockfile for root workspace
├── README.md                 # Root repository README
├── uploads/                  # High-resolution design mockups & showcase graphics
└── site/                     # The core frontend Vite + React application
    ├── package.json          # Application package declaration & dependencies
    ├── package-lock.json     # Site-specific npm lockfile
    ├── vite.config.js        # Vite build configuration (host: 0.0.0.0, port: 5173)
    ├── index.html            # Application entry HTML template & metadata
    ├── README.md             # Site documentation
    ├── public/               # Static assets served at root
    │   ├── favicon.svg       # Brand SVG favicon
    │   ├── icons.svg         # SVG icon sprite
    │   └── projects/         # Live 16:10 project screenshots (vr-system.jpg, fastlane.jpg, etc.)
    └── src/                  # Application source code
        ├── main.jsx          # React DOM root mounting script
        ├── App.jsx           # Main layout composition component
        ├── index.css         # Complete global design system & component styles
        ├── context/          # React Context providers
        │   └── Inquiry.jsx   # Global modal state & smooth-scroll utilities
        ├── hooks/            # Custom React hooks
        │   └── useIsMobile.js# Viewport breakpoint detector hook (default: <=720px)
        ├── data/             # Static data collections & single sources of truth
        │   ├── site.js       # Company information, FAQs, statistics, Google ratings
        │   └── projects.js   # Portfolio items array & color accents map
        ├── assets/           # Bundled internal graphics (hero.png, vite.svg, react.svg)
        └── components/       # UI components & page sections
            ├── Navbar.jsx           # Floating header, navigation, mobile drawer
            ├── Hero.jsx             # Hero banner, procedural Sky background, ServiceFan
            ├── Sky.jsx              # Vector procedural animated cloud background
            ├── ServiceFan.jsx       # 7-card desktop arc fan & mobile auto-carousel
            ├── ServicePreviews.jsx  # Mini SVG UI previews for each service card
            ├── Services.jsx         # Alternative horizontal grid/carousel service section (unmounted in App.jsx)
            ├── TechMarquee.jsx      # Continuous tech stack ticker (React, Next, Node, Laravel, etc.)
            ├── About.jsx            # Company positioning headline & Global Presence badge
            ├── Stats.jsx            # 4-card key metrics grid (100+ Projects, 100% Speed, 520k+ Users, 7+ Years)
            ├── Experience.jsx       # 7+ Years engineering banner with animated 3D dot-globe
            ├── Projects.jsx         # Case studies showcase grid driven by data/projects.js
            ├── WhyGraphionic.jsx    # Core differentiators grid & mobile pinned scrubbed scroller
            ├── WhyPinned.jsx        # Framer Motion sticky scrubbed pin controller for mobile
            ├── Reviews.jsx          # Verified Google Business reviews & rating statistics
            ├── Faq.jsx              # Interactive accordion FAQ section & contact sidebar
            ├── FinalCta.jsx         # Bottom conversion CTA section with dot-globe & steps card
            ├── Footer.jsx           # Site footer with brand, navigation, services, & contact info
            └── InquiryForm.jsx      # Lead generation inquiry modal dialog
```

---

## 4. Application Architecture
The application is architected as a **Single Page Application (SPA)** rendered entirely client-side via React 19 and Vite.

1. **Root Mounting (`main.jsx`):** Renders `<App />` wrapped in `<StrictMode>` into `<div id="root">`.
2. **Context Wrapping (`App.jsx`):** Wraps the entire layout in `<InquiryProvider>`, which controls the visibility of the global `<InquiryForm />` modal.
3. **Sequential Section Flow:** Composes sections inside `<main>` without routing libraries (e.g. React Router is not used). Navigation relies on element IDs and smooth window scrolling.

---

## 5. Routing Architecture
- **Single Page Scroll:** There is no client-side router (`react-router-dom` is not installed).
- **Section Anchors:** The page utilizes standard element IDs (`#top`, `#services`, `#about`, `#stats`, `#experience`, `#projects`, `#why`, `#reviews`, `#faq`, `#contact`).
- **Smooth Scroll Utility (`scrollToId` in `Inquiry.jsx`):**
  Calculates `element.getBoundingClientRect().top + window.scrollY - 76` (76px sticky navbar offset) and calls `window.scrollTo({ top, behavior: 'smooth' })`.

---

## 6. Layout Architecture
- **Page Container (`.page`):** 14px surrounding white outer border frame (`index.css` L67-70).
- **Constrained Shell (`.shell`):** Standard container with `max-width: 1240px` (`var(--page)`), centered with `margin: 0 auto`, and `padding: 0 40px`.
- **Sticky Navbar (`.nav`):** `position: fixed` header that transforms into a floating glassmorphic pill (`background: rgba(0, 104, 224, 0.94)`, `backdrop-filter: blur(22px)`) when `window.scrollY > 30`.

---

## 7. Homepage Architecture
The homepage rendering hierarchy in `App.jsx` is:

```
Homepage (InquiryProvider)
 ├── Navbar (fixed header + mobile drawer)
 ├── main
 │   ├── 1. Hero (Sky background + ServiceFan)
 │   ├── 2. TechMarquee (continuous tech stack ticker)
 │   ├── 3. About (headline + Global Presence badge)
 │   ├── 4. Stats (4 metric cards)
 │   ├── 5. Experience (7+ Years banner + rotating SVG globe)
 │   ├── 7. Projects (case study grid from data/projects.js)
 │   ├── 8. WhyGraphionic (why cards + mobile WhyPinned scroller)
 │   ├── 9. Reviews (Google rating & verified review count)
 │   ├── 10. Faq (accordion FAQs + contact sidebar)
 │   └── 11. FinalCta (bottom CTA banner + lead generation callout)
 ├── Footer (footer links, contact details, copyright)
 └── InquiryForm (fixed modal dialog overlay)
```

> **Note on Section 6 (`Services.jsx`):** The `Services.jsx` component exists in `src/components/`, but is unmounted in `App.jsx`. Service offerings are rendered inside the `Hero` via the `<ServiceFan />` component instead.

---

## 8. Component System
Components are modular, functional React components using Hooks (`useState`, `useEffect`, `useRef`, `useCallback`, `useTransform`, `useScroll`).

- **Atomic UI Components:** Icon badges (`GMark`, `Logo`), SVG graphics (`Sky`, `Globe`, `DotField`, `ServicePreviews`).
- **Interactive Section Components:** `Faq` (accordion toggle), `Navbar` (mobile menu toggle & scroll tracker), `InquiryForm` (multi-field form validation & state handling).
- **Pure Functional Views:** `TechMarquee`, `About`, `Experience`, `Footer`.

---

## 9. Styling & Design System
The design system is defined in `site/src/index.css`:

### Color Palette (CSS Variables)
- Primary Blue: `--blue` (`#007AFF`)
- Sky Accent: `--sky` (`#00A3FF`)
- Lime Accent: `--lime` (`#D2FF28`)
- Dark Navy: `--navy` (`#0A0F1D`)
- Base Ink / Text: `--ink` (`#0B1220`)
- Grayscale: `--gray-900` (`#111827`) to `--gray-50` (`#F7F8FA`)

### Border Radii & Shadows
- `--r-xl`: `40px`, `--r-lg`: `28px`, `--r-md`: `20px`, `--r-sm`: `14px`
- `--shadow-card`: `0 18px 44px -14px rgba(6, 40, 80, 0.34)`
- `--shadow-soft`: `0 24px 60px -28px rgba(10, 25, 60, 0.28)`

---

## 10. Typography & Fonts
- **Primary Fonts:** `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap')`
- **Fallback Font Stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **Headings:** High-contrast, bold weight (`800`/`700`) with precise negative letter-spacing (`-0.03em`).

---

## 11. Responsive Architecture
- **Desktop Grid (>980px):** Multi-column CSS grid layouts (`3-column` projects, `4-column` why cards, `2-column` FAQ layout).
- **Tablet / Mobile (<=980px & <=720px):**
  - Custom `useIsMobile(720)` hook dynamically toggles component layouts.
  - Hamburger menu activates mobile drawer with numbered links (`MOBILE_LINKS`).
  - `Stats.jsx` switches to a 2x2 grid layout and adds a 4th metric tile ("7+ Years").
  - `WhyGraphionic.jsx` activates `WhyPinned.jsx` (sticky 300vh scrubbed card reveal).
  - `Reviews.jsx` converts stats into a horizontal scrollable snap-carousel.

---

## 12. Animation System
Animations are driven by **Framer Motion** (`framer-motion`):
- `whileInView` with `viewport: { once: true, margin: '-80px' }` for smooth scroll-triggered entrances.
- Custom easing curve: `const ease = [0.22, 1, 0.36, 1];` (cubic-bezier cubic-out).
- Staggered delays: `delay: i * 0.08` for grid tiles and list items.

---

## 13. GSAP / Motion Implementation
- **GSAP:** GSAP is **NOT** installed in `package.json`.
- **GSAP ScrollTrigger Replacement:** The pinned scroll effect in `WhyPinned.jsx` mimics GSAP ScrollTrigger using Framer Motion's `useScroll` and `useTransform` mapped over a `300vh` track.

---

## 14. Assets & Media
- **Project Screenshots (`site/public/projects/`):** 16:10 ratio images (`vr-system.jpg`, `rapid-electric.jpg`, `fastlane.jpg`, `biog.jpg`, `sunflower.jpg`).
- **Inline SVG Graphics:** Hero sky clouds (`Sky.jsx`), rotating globe (`Experience.jsx`), service mini UI previews (`ServicePreviews.jsx`), company logo, and Google review badge (`Reviews.jsx`).

---

## 15. State Management
- **React Context (`InquiryContext`):** Manages `open` state for the modal dialog. Prevents body scrolling (`document.body.style.overflow = 'hidden'`) and attaches Escape key listeners when open.
- **Local Component State (`useState`):**
  - `Navbar.jsx`: `open` (mobile menu), `stuck` (scroll > 30px), `active` (current section ID).
  - `Faq.jsx`: `open` (index of active accordion card).
  - `InquiryForm.jsx`: `form` data object, `errors` validation map, `state` ('idle' | 'sending' | 'done').

---

## 16. API & Data Architecture
- **Current Backend Integration:** None. All data is static, single-source-of-truth arrays in `src/data/site.js` and `src/data/projects.js`.
- **Inquiry Form Submission (`InquiryForm.jsx`):** Performs client-side validation, logs `[Graphionic] Project inquiry submitted: payload` to `console.info`, simulates an 850ms latency, and displays a success message.

---

## 17. Forms & Lead Generation
The `<InquiryForm />` modal provides complete lead-generation functionality:
- Fields: `Name` (*), `Company`, `Email` (*), `Phone`, `ProjectType` (*), `Budget`, `Details` (*).
- Validation: Regex checks for email syntax and phone formatting. Highlights fields with `.has-error` and error messages.
- Submissions trigger a success view with direct email contact info (`hello@graphionic.com`).

---

## 18. External Integrations
- **Google Maps / Business Link:** `https://www.google.com/maps/search/?api=1&query=Graphionic+Infotech+Vesu+Surat`
- **External Client Projects:** Live URLs linked in `src/data/projects.js` (`target="_blank" rel="noopener noreferrer"`).

---

## 19. Environment Variables
- No `.env` or `.env.local` files exist in the repository.
- No runtime environment variables (`VITE_*`) are required to build or run the application baseline.

---

## 20. SEO & Metadata
Defined in `site/index.html`:
- Title: `<title>Graphionic Infotech — Building the Future of Web, Apps & Digital Growth</title>`
- Meta Description: `<meta name="description" content="Graphionic Infotech — custom full-stack web applications, mobile apps and intelligent business automation." />`
- Favicon: Inline Data-URI SVG blue circle + `favicon.svg`.

---

## 21. Performance Architecture
- Zero heavy dependencies (lightweight bundle: React 19 + Framer Motion + Lucide Icons).
- All secondary graphical elements (clouds, globes, UI previews, tech icons) are drawn with pure inline SVGs (0 extra HTTP requests).
- Images use `loading="lazy"`.

---

## 22. Browser Compatibility
- Tested and compatible with modern evergreen browsers (Chrome, Edge, Firefox, Safari).
- Uses standard CSS flexbox/grid and modern backdrop filters (`backdrop-filter` and `-webkit-backdrop-filter`).

---

## 23. Build & Deployment
- Development: `npm run dev` (executes `npm --prefix site run dev` -> `vite`). Host: `0.0.0.0`, Port: `5173`.
- Production Build: `npm run build` (executes `vite build`), outputs static bundle to `site/dist/`.
- Preview: `npm run preview` (executes `vite preview`).

---

## 24. Dependencies
```json
"dependencies": {
  "framer-motion": "^13.2.0",
  "lucide-react": "^1.43.0",
  "react": "^19.2.8",
  "react-dom": "^19.2.8"
},
"devDependencies": {
  "@types/react": "^19.2.18",
  "@types/react-dom": "^19.2.4",
  "@vitejs/plugin-react": "^6.1.0",
  "oxlint": "^1.79.0",
  "vite": "^8.2.2"
}
```

---

## 25. Technical Debt
1. **Unmounted Component (`Services.jsx`):** `Services.jsx` is present in `src/components/` with an automated touch carousel, but is unmounted in `App.jsx`.
2. **Hardcoded Form Handler:** `InquiryForm.jsx` lacks a real API POST endpoint.
3. **Hardcoded Year in Footer:** `Footer.jsx` uses `new Date().getFullYear()`, but `Experience.jsx` hardcodes `since 2018`.
4. **Duplicate SVG Definitions:** SVG icons (like Google logo and Hexagon logo) are duplicated across components instead of unified into a central icon component.

---

## 26. Known Bugs / Runtime Issues
- **None.** The baseline application builds and runs cleanly without console runtime errors or hydration mismatches.

---

## 27. Mobile Risks
- **Sticky Pinning Height:** `WhyPinned.jsx` relies on `300vh` track height. On smaller mobile screens, scrolling speed might feel slightly stretched.
- **Horizontal Overflow in ServiceFan Carousel:** `fan-scroll` relies on continuous CSS animation; low-end mobile devices could experience minor frame drops if hardware acceleration is limited.

---

## 28. Safari / Browser Risks
- `-webkit-backdrop-filter` is required for sticky navbar blur on iOS Safari.
- CSS `clip` vs `overflow: hidden` on `.why` section must be preserved, as `overflow: hidden` breaks `position: sticky` on iOS WebKit.

---

## 29. Performance Risks
- If numerous high-res images are added to `public/projects/` without optimization or webp conversion, initial page payload could increase.

---

## 30. Sensitive / High-Risk Components
- **`site/src/index.css`:** Single unified 1736-line stylesheet. Any global selector edit risks unexpected layout cascades.
- **`site/src/components/WhyPinned.jsx`:** Delicate sticky scroll calculation; modifying offset or track height can break mobile section pinning.

---

## 31. Areas Safe to Modify
- `site/src/data/projects.js`: Adding/editing portfolio items.
- `site/src/data/site.js`: Updating FAQs, company facts, or Google rating stats.
- `site/src/components/Hero.jsx`: Copy text and headline adjustments.

---

## 32. Areas Requiring Extra Caution
- `site/src/index.css`: Global CSS definitions and responsive breakpoints.
- `site/src/components/Navbar.jsx`: Scroll detection logic & sticky threshold calculations.
- `site/src/context/Inquiry.jsx`: Modal scroll lock and keyboard event listeners.

---

## 33. Homepage Dependency Map
```
App.jsx
 ├── InquiryProvider (context/Inquiry.jsx)
 │    ├── Navbar (components/Navbar.jsx)
 │    │    └── Lucide icons, scrollToId utility
 │    ├── Hero (components/Hero.jsx)
 │    │    ├── Sky (components/Sky.jsx)
 │    │    └── ServiceFan (components/ServiceFan.jsx)
 │    │         └── ServicePreviews (components/ServicePreviews.jsx)
 │    ├── TechMarquee (components/TechMarquee.jsx)
 │    ├── About (components/About.jsx)
 │    ├── Stats (components/Stats.jsx)
 │    │    └── useIsMobile hook
 │    ├── Experience (components/Experience.jsx)
 │    ├── Projects (components/Projects.jsx)
 │    │    └── PROJECTS & ACCENTS (data/projects.js)
 │    ├── WhyGraphionic (components/WhyGraphionic.jsx)
 │    │    ├── WHY data (data/site.js)
 │    │    └── WhyPinned (components/WhyPinned.jsx)
 │    ├── Reviews (components/Reviews.jsx)
 │    │    └── GOOGLE & COMPANY data (data/site.js)
 │    ├── Faq (components/Faq.jsx)
 │    │    └── FAQS data (data/site.js)
 │    ├── FinalCta (components/FinalCta.jsx)
 │    ├── Footer (components/Footer.jsx)
 │    │    └── COMPANY data (data/site.js)
 │    └── InquiryForm (components/InquiryForm.jsx)
 │         └── COMPANY data (data/site.js)
```

---

## 34. Recommended Development Approach
1. Keep `site/src/data/` as the single source of truth for all content updates.
2. If modularizing CSS, do so incrementally without removing existing design tokens from `:root`.
3. Connect `InquiryForm.jsx` to a real backend service (e.g. Next.js API route, Webhook, or Formspree) when backend integration is requested.

---

## 35. Recommended Next Steps
1. Maintain repository stability and baseline verification.
2. Review handover document (`docs/project-handover-summary.md`).
3. Await user instructions before making any design or code changes.
