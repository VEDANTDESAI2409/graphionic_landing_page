---
name: technical-seo-audit
description: Audits HTML document metadata, title tags, descriptions, OpenGraph, canonical links, sitemaps, robots.txt, and heading hierarchy.
version: 1.0.0
category: seo
triggers:
  - run SEO audit
  - audit SEO
  - check SEO
---

# Purpose
Perform an automated and source-level technical SEO evaluation of the landing page to maximize search engine indexing, social card preview rendering, and document structure standards.

# When To Use
- Before launching production releases or staging deployments.
- When modifying page titles, metadata, heading hierarchies, or social sharing images.

# Inputs
- HTML entry template (`site/index.html`).
- Application component tree (`site/src/App.jsx`, `site/src/components/*`).
- Running local web server (`http://localhost:5173/`).

# Procedure
1. **Lighthouse SEO Scan:** Execute `npx -y lighthouse http://localhost:5173/ --only-categories=seo --output=json` to obtain automated SEO scores.
2. **Metadata Inspection:** Verify `<title>` length (50-60 chars), `<meta name="description">` length (120-160 chars), `<meta name="viewport">`, and `lang="en"`.
3. **Social Card Tags:** Check OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter card metadata.
4. **Heading Hierarchy Audit:** Inspect HTML structure to guarantee exactly ONE `<h1>` per page, followed by logical `<h2>` and `<h3>` nesting without skipped levels.
5. **Image & Asset SEO:** Verify all `<img>` tags include descriptive `alt` attributes.
6. **Robots & Sitemap Verification:** Check `public/robots.txt` and `public/sitemap.xml` presence and crawlability rules.

# Validation
- Lighthouse SEO Score >= 95/100.
- Unique `<h1>` tag present on homepage.
- Meta description and title tags present and non-empty.
- All static images specify non-generic `alt` text.

# Output Format
Structured markdown report containing Lighthouse SEO score, Metadata Checklist, Heading Tree Visualization, and Recommendations.

# Failure Conditions
- Missing `<title>` or `<meta name="description">`.
- Multiple `<h1>` elements or broken heading hierarchy (e.g. `<h1>` followed directly by `<h4>`).
- Blocked crawling directives (`Disallow: /`) in production `robots.txt`.

# Safety Rules
- Source-level verification MUST complement automated Lighthouse scans.
- Do NOT inject keyword-stuffed copy into components for SEO score padding.

# Project-Specific Rules
- Primary page title MUST remain: `Graphionic Infotech — Building the Future of Web, Apps & Digital Growth`.
- Target metadata MUST emphasize full-stack web applications, mobile apps, and business automation.

# Provenance
- **Origin:** Adapted & Tool Orchestration
- **Source:** Google Lighthouse SEO Audit Specification & `sickn33/agentic-awesome-skills` (v17.4.0).
