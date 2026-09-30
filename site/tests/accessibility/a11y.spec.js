import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Graphionic Infotech — Accessibility (a11y) Tests', () => {
  test('should pass automated axe-core WCAG 2.1 AA audit', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Log violations to console for diagnosis if any exist
    if (accessibilityScanResults.violations.length > 0) {
      console.log('WCAG Violations Found:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
