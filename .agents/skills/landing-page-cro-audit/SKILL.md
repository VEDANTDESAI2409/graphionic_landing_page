---
name: landing-page-cro-audit
description: Audits landing page conversion rate optimization, above-the-fold clarity, social proof, objection handling, CTA hierarchy, and form friction.
version: 1.0.0
category: cro
triggers:
  - run CRO audit
  - audit conversion
  - check CRO
---

# Purpose
Perform an evidence-based Conversion Rate Optimization (CRO) audit of the agency landing page to maximize qualified B2B project inquiries and eliminate conversion friction.

# CRO Audit Framework

### 1. Above-the-Fold Effectiveness (0–5 Second Test)
- Is the core value proposition instantly clear?
- Does the visitor immediately understand: Who Graphionic is, What Graphionic builds, and Who it is for?
- Is there a clear primary conversion CTA ("Get Started" / "Start Your Project")?

### 2. Trust Signals & Social Proof
- Verified Google Business ratings (4.9/5 stars, 100+ clients).
- Tangible project portfolio screenshots with live links.
- Proven engineering experience ("7+ Years Experience since 2018").

### 3. CTA Prominence & Repetition
- Primary CTAs (`.btn-lime`) visually distinct from ghost/navy secondary buttons.
- Strategic CTA repetition: Navbar header, Hero, Projects, Why Graphionic, Final CTA, and Footer.

### 4. Friction Reduction in Lead Form
- Form fields restricted to high-value inquiries.
- Clear inline error states (`.has-error`) and fast submission feedback (< 1 sec).

# Procedure
1. Inspect Above-the-Fold elements in `Hero.jsx` and `Navbar.jsx`.
2. Evaluate visual contrast between primary Electric Lime CTAs (`#D2FF28`) and background surfaces.
3. Review trust proof sections (`Stats.jsx`, `Experience.jsx`, `Projects.jsx`, `Reviews.jsx`).
4. Test `<InquiryForm />` modal user flow for conversion roadblocks or confusing inputs.

# Validation
- Clear primary CTA visible in every major scroll region.
- Social proof elements present in the upper 50% of the viewport.
- Inquiry form completion requiring <= 4 mandatory inputs.

# Output Format
CRO evaluation report detailing Conversion Pillar, Assessment (PASS/WARN/FAIL), Identified Friction Points, and High-Impact Improvements.

# Failure Conditions
- Vague, generic hero headline lacking target audience specification.
- Hiding conversion buttons behind obscure sub-menus.
- Manipulative dark patterns or fake social proof metrics.

# Safety Rules
- Conversion optimization MUST rely on clarity, proof, and trust — NOT misleading timers or aggressive popups.
- Never invent fake client reviews, awards, or false numbers.

# Project-Specific Rules
- Primary conversion actions MUST trigger the `<InquiryForm />` modal or scroll to `#projects` / `#contact`.
- All company statistics MUST match verified values in `src/data/site.js`.

# Provenance
- **Origin:** Adapted & Project-Specific
- **Source:** CXL Conversion Optimization Institute & `sickn33/agentic-awesome-skills` (v17.4.0).
---
