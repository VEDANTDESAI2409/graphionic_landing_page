---
name: react-19-vite-best-practices
description: Enforces React 19 functional component architecture, hook dependency correctness, context performance optimization, and Oxlint rules.
version: 1.0.0
category: engineering
triggers:
  - run React lint
  - check React patterns
  - audit React code
---

# Purpose
Maintain rigorous React 19 and Vite 8 engineering hygiene across all components, context providers, and custom hooks, preventing memory leaks, stale closures, and unnecessary re-renders.

# When To Use
- During component creation, modification, or refactoring.
- When troubleshooting state updates, context re-renders, or event listener leaks.

# Inputs
- React source components (`site/src/components/*`, `site/src/App.jsx`).
- Custom hooks (`site/src/hooks/*`) & Contexts (`site/src/context/*`).
- Oxlint linter (`npm run lint`).

# Procedure
1. **Static Analysis Scan:** Run `npm run lint` (`oxlint`) to inspect code against 104 React linting and fast-refresh rules.
2. **Hook Dependency Audit:** Verify `useEffect` and `useCallback` dependency arrays contain all referenced reactive values.
3. **Event Listener Cleanup Check:** Confirm all `window.addEventListener` or `setInterval` calls return corresponding cleanup handlers (`removeEventListener` / `clearInterval`) in `useEffect`.
4. **Context State Isolation:** Verify context providers (`InquiryProvider`) expose memoized callback handlers to prevent unnecessary child re-renders.
5. **Component Boundary Architecture:** Ensure components adhere to the dependency hierarchy defined in `docs/system-architecture.md`.

# Validation
- `npm run lint` finishes with 0 errors.
- All global window event listeners cleanly removed on component unmount.
- Zero raw DOM manipulation outside React refs or dedicated scroll helpers.

# Output Format
Code quality summary listing Lint Findings, React Pattern Compliance, Component Health Scores, and Refactoring Suggestions.

# Failure Conditions
- Uncleaned event listeners causing memory leaks.
- Infinite rendering loops caused by unstable `useEffect` dependencies.
- Mixing direct DOM mutations with React state rendering.

# Safety Rules
- Do NOT refactor working component logic solely for personal stylistic preference.
- Respect established single-source-of-truth data arrays in `src/data/`.

# Project-Specific Rules
- `InquiryProvider` MUST remain the top-level layout wrapper in `App.jsx`.
- Use `useIsMobile(720)` hook for JS-driven responsive viewport switches.

# Provenance
- **Origin:** Tool Orchestration & Adapted
- **Source:** React 19 Official Specification, Oxlint Rules Engine & `sickn33/agentic-awesome-skills` (v17.4.0).
---
