import { test, expect } from '@playwright/test';

test.describe('Graphionic Infotech — Visual Regression Baseline', () => {
  test('desktop viewport full page baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/', { waitUntil: 'networkidle' });
    // Freeze animations before taking screenshot
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });
    await expect(page).toHaveScreenshot('desktop-baseline.png', { fullPage: true, maxDiffPixelRatio: 0.05 });
  });

  test('mobile viewport full page baseline', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });
    await expect(page).toHaveScreenshot('mobile-baseline.png', { fullPage: true, maxDiffPixelRatio: 0.05 });
  });
});
