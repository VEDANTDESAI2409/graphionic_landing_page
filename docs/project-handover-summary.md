# Graphionic Infotech — Project Handover Summary

Quick technical overview for developers taking over or working on this codebase (5–10 minute read).

---

## 1. Project Purpose
Single-page marketing and lead-generation landing web application for **Graphionic Infotech** — a software development agency specializing in custom web applications, mobile apps, and business automation.

---

## 2. Core Stack & Environments
- **Framework:** React 19 (`react` ^19.2.8, `react-dom` ^19.2.8)
- **Bundler:** Vite 8 (`vite` ^8.2.2)
- **Node Requirement:** Node 18+ (Running Node v26.4.0 / npm 11.17.0)
- **Package Manager:** `npm` (lockfiles present in root and `/site`)

---

## 3. Quick Run Commands
- **Install Dependencies:** `npm --prefix site install`
- **Development Server:** `npm run dev` (or `npm --prefix site run dev`) -> runs Vite on `http://localhost:5173/`
- **Build Production Bundle:** `npm run build` -> outputs static assets to `site/dist/`
- **Preview Production Build:** `npm run preview`
- **Lint Codebase:** `npm run lint` (runs `oxlint`)

---

## 4. Key Folders & Entry Points
- `site/index.html`: Entry HTML template & metadata.
- `site/src/main.jsx`: React DOM mount entry point.
- `site/src/App.jsx`: Main single page layout component.
- `site/src/index.css`: Single global stylesheet containing design tokens, utility classes, component styling, and media queries.
- `site/src/data/site.js`: Company facts, FAQs, statistics, Google ratings.
- `site/src/data/projects.js`: Portfolio items array & tile accent colors.

---

## 5. Main Homepage Sections (In Order)
1. **Header / Navbar (`components/Navbar.jsx`):** Fixed floating navbar with section scroll tracking & responsive drawer.
2. **Hero Section (`components/Hero.jsx`):** Value proposition, CTA buttons, `Sky` animated background, and `ServiceFan`.
3. **Tech Marquee (`components/TechMarquee.jsx`):** Continuous infinite ticker showcasing React, Next.js, Node.js, Laravel, Python, Flutter.
4. **About Us (`components/About.jsx`):** Strategic positioning headline & Global Presence badge (USA, UK, AU, UAE).
5. **Impact & Numbers (`components/Stats.jsx`):** Key metrics (100+ Projects, 100% Speed, 520k+ Monthly Users).
6. **Experience (`components/Experience.jsx`):** 7+ Years engineering banner with 3D rotating SVG dot-globe.
7. **Our Work (`components/Projects.jsx`):** Project showcase cards driven by `data/projects.js`.
8. **Why Graphionic (`components/WhyGraphionic.jsx`):** Core differentiators grid (mobile uses Framer Motion sticky pin `WhyPinned.jsx`).
9. **Reviews (`components/Reviews.jsx`):** Verified 4.9/5 Google Business profile rating & stats.
10. **FAQ (`components/Faq.jsx`):** Accordion question-and-answer list with contact sidebar.
11. **Final CTA (`components/FinalCta.jsx`):** Project inquiry conversion banner.
12. **Footer (`components/Footer.jsx`):** Navigation links, service list, contact details, copyright.
13. **Inquiry Modal (`components/InquiryForm.jsx`):** Dialog overlay triggered by "Start Your Project" CTAs.

---

## 6. Styling & Animation System
- **Styling:** Vanilla CSS (`site/src/index.css`) with CSS custom properties (`--blue`, `--sky`, `--lime`, `--navy`, `--white`).
- **Typography:** Google Fonts (`Plus Jakarta Sans`, `Inter`).
- **Animations:** `framer-motion` for scroll reveals, spring transitions, and sticky pinning (in `WhyPinned.jsx`).

---

## 7. APIs & Environment Variables
- **API Endpoints:** None currently configured. `InquiryForm.jsx` handles validation and simulates submission locally.
- **Environment Variables:** None required (`.env` is not needed).

---

## 8. High-Risk Files & Safe Modification Areas
- ⚠️ **High-Risk Files:** `site/src/index.css` (1736-line global CSS file), `site/src/components/WhyPinned.jsx` (delicate sticky scroll math).
- ✅ **Safe Modification Areas:** `site/src/data/projects.js` (adding/updating case studies), `site/src/data/site.js` (modifying FAQs or company facts), `site/src/components/Hero.jsx` (updating hero copy text).
