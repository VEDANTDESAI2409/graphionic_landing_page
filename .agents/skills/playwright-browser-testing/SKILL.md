---
name: playwright-browser-testing
description: Executes automated headless testing across Chromium, WebKit (Safari), and Firefox to catch console errors, exceptions, and network failures.
version: 1.0.0
category: testing
triggers:
  - run browser tests
  - test browser
  - run Playwright
---

# Purpose
Orchestrate automated cross-browser functional testing using **Playwright** (`@playwright/test`) across Chromium, Firefox, and WebKit (Safari approximation) to catch runtime console errors, uncaught exceptions, and interactive component regressions.

# When To Use
- Prior to committing changes or merging pull requests.
- When modifying interactive modal logic, accordion toggles, or navigation smooth scrolling.

# Inputs
- Playwright Configuration (`site/playwright.config.js`).
- Test Suites (`site/tests/browser/smoke.spec.js`).
- Running web application (`http://localhost:5173/`).

# Procedure
1. **Launch Test Runner:** Execute `npx --prefix site playwright test tests/browser/smoke.spec.js`.
2. **Console Error Capture:** Attach `page.on('console')` listeners to fail tests if `msg.type() === 'error'` or uncaught JS exceptions occur.
3. **Cross-Browser Verification:** Run tests sequentially or in parallel across `chromium`, `firefox`, and `webkit` browser engines.
4. **Interactive Flow Verification:** Test navbar CTA modal opening, form field validation triggers, modal closing via close button / backdrop click, and FAQ accordion toggles.

# Validation
- 100% test pass rate across Chromium, Firefox, and WebKit projects.
- 0 uncaught JavaScript runtime exceptions or browser console errors.
- Web Server automatically detected or started cleanly on `http://localhost:5173/`.

# Output Format
Playwright test summary output showing Suite Name, Project Engine, Test Status (PASS/FAIL), Duration, and Captured Trace/Logs for any failure.

# Failure Conditions
- Uncaught JavaScript console error during page navigation or component interaction.
- Broken interactive flows (e.g. CTA button failing to launch modal).
- Network 404 responses for required static assets.

# Safety Rules
- WebKit in Playwright is a Linux/macOS Safari approximation; real iOS Safari manual testing MUST complement automated WebKit tests when verifying mobile layout quirks.
- Do NOT commit binary test trace zip files to Git.

# Project-Specific Rules
- Test suites MUST reside inside `site/tests/browser/`.
- `playwright.config.js` MUST specify `baseURL: 'http://localhost:5173'`.

# Provenance
- **Origin:** Tool Orchestration & Project-Specific
- **Source:** Microsoft Playwright Documentation & Web Test Automation Architecture.
---
