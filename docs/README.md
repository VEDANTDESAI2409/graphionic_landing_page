# Graphionic Infotech — Documentation Suite

Welcome to the engineering documentation suite for the **Graphionic Infotech** web application repository.

This directory contains the authoritative technical baseline, system architecture, security audit, and design system specifications for the application.

---

## 📖 Recommended Reading Order for Developers & AI Agents

To gain a complete technical understanding of the codebase efficiently, read the documentation in this order:

### 1. 🚀 Quickstart & Overview (5–10 Minutes)
👉 **[`project-handover-summary.md`](project-handover-summary.md)**
- Concise executive summary.
- Core tech stack, npm scripts, key entry points, and homepage section order.
- Safe modification areas vs high-risk components.

### 2. 🏗️ Technical Architecture (15 Minutes)
👉 **[`system-architecture.md`](system-architecture.md)**
- Layered architectural classification (Presentation, Application, Data, Style, Build).
- Complete component responsibility matrix for all 18 components.
- System overview, data flow, and lead inquiry Mermaid diagrams.
- Target directory layout & safe extension patterns.

### 3. 🎨 Design System & Motion (15 Minutes)
👉 **[`design-system.md`](design-system.md)**
- Approved visual language, brand personality, and CSS custom property tokens (`:root`).
- Typography scale, spacing rhythm, layout container specs, border radii, and shadows.
- Component visual patterns (Buttons, Cards, Sticky Scrolled Navbar, Modals).
- Framer Motion animation system, sticky mobile scroll-pinning, and responsive media query table.

### 4. 🔒 Security & Privacy (10 Minutes)
👉 **[`security-architecture.md`](security-architecture.md)**
- Security audit baseline & attack surface analysis.
- PII privacy protection guidelines & inquiry form handling.
- External link isolation (`rel="noopener noreferrer"`) and XSS protection verification.
- Recommended HTTP security headers (CSP, HSTS, X-Frame-Options) for production deployment.

### 5. 📚 Comprehensive Technical Baseline (Deep Dive)
👉 **[`knowledge-transfer.md`](knowledge-transfer.md)**
- 35-section deep-dive technical reference document.
- Detailed file inventory, dependency analysis, known technical debt, and browser compatibility notes.

---

## 🛠️ Essential Development Commands

```bash
# Install dependencies in the site workspace
npm --prefix site install

# Start local development server (Vite on http://localhost:5173/)
npm run dev

# Run static linter (Oxlint)
npm run lint

# Build production bundle (Output to site/dist/)
npm run build

# Preview production build locally
npm run preview
```
