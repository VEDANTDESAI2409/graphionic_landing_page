# Graphionic Infotech — Installed Skills Registry

This document serves as the authoritative inventory of all 11 agentic engineering skills installed for Graphionic Infotech.

---

## Installed Skill Inventory

| Skill | Version | Purpose | Triggers | Dependencies | Origin / Provenance | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **web-security-audit** | 1.0.0 | Audits dependency vulnerabilities, secret leaks, XSS vectors, CSP, unsafe DOM operations. | `@security`, `security-audit`, security review | `npm audit`, `oxlint` | Project-Specific (based on OWASP Top 10 & Node Security Guidelines) | **ACTIVE** |
| **technical-seo-audit** | 1.0.0 | Verifies HTML semantics, meta tags, OpenGraph/Twitter cards, schema.org, crawlability. | `@seo`, `seo-audit`, SEO review | Lighthouse CLI, DOM parser | Project-Specific (based on Google Search Essentials & Schema.org) | **ACTIVE** |
| **ui-ux-design-review** | 1.0.0 | Evaluates visual hierarchy, typography, design system compliance, CTA clarity, interaction feedback. | `@design`, `ui-review`, UX review | `docs/design-system.md` | Project-Specific (based on Nielsen Norman Group Heuristics) | **ACTIVE** |
| **accessibility-wcag-audit** | 1.0.0 | Assesses WCAG 2.1 AA compliance across automated axe-core rules, keyboard focus, and contrast. | `@a11y`, `a11y-audit`, WCAG audit | `@axe-core/playwright`, Playwright | Project-Specific (based on W3C WCAG 2.1 AA & axe-core rules) | **ACTIVE** |
| **web-performance-optimization** | 1.0.0 | Audits Core Web Vitals (LCP, CLS, INP), bundle weights, font/image loading, and animation performance. | `@perf`, `performance-audit`, perf review | Lighthouse CLI, Vite bundler analyzer | Project-Specific (based on Web.dev Core Web Vitals) | **ACTIVE** |
| **react-19-vite-best-practices** | 1.0.0 | Enforces React 19 state ownership, effect cleanup, render optimization, and Vite build rules. | `@react`, `react-audit`, code review | `oxlint`, React 19, Vite 6/8 | Project-Specific (based on official React 19 & Vite documentation) | **ACTIVE** |
| **framer-motion-orchestration** | 1.0.0 | Guides Framer Motion orchestration, spring physics, scroll triggers, layout performance, and reduced-motion. | `@motion`, `framer-motion`, animation review | `framer-motion` | Project-Specific (based on Framer Motion official docs & Web Motion Guidelines) | **ACTIVE** |
| **landing-page-cro-audit** | 1.0.0 | Evaluates value proposition clarity, trust signals, CTA hierarchy, objection handling, and conversion friction. | `@cro`, `cro-audit`, conversion review | DOM structure, copywriting | Project-Specific (based on CXL & Conversion Rate Optimization principles) | **ACTIVE** |
| **playwright-browser-testing** | 1.0.0 | Orchestrates multi-browser end-to-end smoke tests across Chromium, Firefox, and WebKit approximations. | `@playwright`, `browser-test`, E2E test | `@playwright/test`, Playwright browsers | Project-Specific (based on Playwright official docs) | **ACTIVE** |
| **visual-regression-testing** | 1.0.0 | Captures and compares screenshot baselines across 5 viewport breakpoints with frozen animation states. | `@visual`, `visual-test`, screenshot diff | `@playwright/test` | Project-Specific (based on Playwright Snapshot Testing) | **ACTIVE** |
| **copywriting-clarity-audit** | 1.0.0 | Audits landing page messaging for clarity, human tone, jargon elimination, hype reduction, and factual accuracy. | `@copy`, `copy-audit`, content review | Content analysis | Project-Specific (based on On-Page Copy & Clarity Principles) | **ACTIVE** |

---

## Optional / Deferred Skills

| Skill | Category | Reason for Exclusion | Status |
| :--- | :--- | :--- | :--- |
| **knip-code-quality** | Code Quality | Held as optional per user directive. Not installed in Phase 3. | **DEFERRED** |
