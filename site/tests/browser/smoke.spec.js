import { test, expect } from '@playwright/test';

test.describe('Graphionic Infotech — Smoke & Functional Tests', () => {
  test('homepage renders heading and main title', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    await expect(page).toHaveTitle(/Graphionic Infotech/);
    await expect(page.locator('h1')).toContainText('Building the Future of');

    expect(errors, 'Console should have zero runtime errors').toEqual([]);
  });

  test('inquiry modal opens, validates empty submit, and closes', async ({ page }) => {
    await page.goto('/');
    const startBtn = page.locator('button.nav-cta').first();
    await startBtn.click();

    const modal = page.locator('.inq');
    await expect(modal).toBeVisible();

    const submitBtn = modal.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify client validation highlights errors
    await expect(modal.locator('.has-error')).not.toHaveCount(0);

    const closeBtn = modal.locator('.inq-close');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('FAQ accordion toggles question answers', async ({ page }) => {
    await page.goto('/');
    const secondFaq = page.locator('.faq-item').nth(1);
    const faqBtn = secondFaq.locator('.faq-q');

    await faqBtn.click();
    await expect(secondFaq.locator('.faq-a')).toBeVisible();
  });
});
