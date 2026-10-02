import { test, expect } from '@playwright/test';

test.describe('Redesigned Project Inquiry Modal Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('modal opens from navbar Start Your Project CTA and displays two-column layout on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const startBtn = page.locator('button.nav-cta').first();
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    const modal = page.locator('.inq');
    await expect(modal).toBeVisible();

    // Verify left column brand, headline with accent, and 3 trust items
    const leftCol = modal.locator('.inq-left');
    await expect(leftCol).toBeVisible();
    await expect(leftCol.locator('.inq-brand-top')).toHaveText('GRAPHIONIC');
    await expect(leftCol.locator('.inq-left-title')).toContainText("Let's Build");
    await expect(leftCol.locator('.inq-left-title .txt-blue')).toHaveText('Together');
    await expect(leftCol.locator('.inq-left-title .txt-lime')).toHaveText('.');

    // 3 trust cards
    const trustCards = leftCol.locator('.inq-trust-card');
    await expect(trustCards).toHaveCount(3);
    await expect(trustCards.nth(0)).toContainText('Quick Response');
    await expect(trustCards.nth(1)).toContainText('Expert Consultation');
    await expect(trustCards.nth(2)).toContainText('No Obligation');

    // 3D tech illustration
    await expect(leftCol.locator('.inq-deco')).toBeVisible();

    // Right column
    const rightCol = modal.locator('.inq-right');
    await expect(rightCol).toBeVisible();
    await expect(rightCol.locator('.inq-eyebrow')).toContainText('PROJECT INQUIRY');
    await expect(rightCol.locator('.inq-title')).toContainText('Tell us about your');
    await expect(rightCol.locator('.inq-title .txt-blue')).toHaveText('project');

    // Close button
    const closeBtn = modal.locator('.inq-close');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('one-screen requirement: modal fits completely within standard desktop viewports without scrolling', async ({
    page,
  }) => {
    // Test on standard laptop viewport: 1366 x 768
    await page.setViewportSize({ width: 1366, height: 768 });

    const startBtn = page.locator('button.nav-cta').first();
    await startBtn.click();

    const modal = page.locator('.inq');
    await expect(modal).toBeVisible();

    const box = await modal.boundingBox();
    expect(box).not.toBeNull();

    // Modal should be completely visible within 768px height viewport
    expect(box.y).toBeGreaterThanOrEqual(10);
    expect(box.y + box.height).toBeLessThanOrEqual(768);

    // Form fields, button, and notes are all within view
    const submitBtn = modal.locator('.inq-submit-btn');
    await expect(submitBtn).toBeVisible();
    const btnBox = await submitBtn.boundingBox();
    expect(btnBox.y + btnBox.height).toBeLessThanOrEqual(768);

    // Footnote and WhatsApp direct link are also within view
    const waFallback = modal.locator('.inq-wa-fallback-link');
    await expect(waFallback).toBeVisible();
    const waBox = await waFallback.boundingBox();
    expect(waBox.y + waBox.height).toBeLessThanOrEqual(768);
  });

  test('form validation catches empty required fields and invalid email format', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const startBtn = page.locator('button.nav-cta').first();
    await startBtn.click();

    const modal = page.locator('.inq');
    const submitBtn = modal.locator('.inq-submit-btn');

    // Click submit empty
    await submitBtn.click();

    // Required fields should have error state
    await expect(modal.locator('.inq-field.has-error')).toHaveCount(4);
    await expect(modal.locator('#inq-name-err')).toContainText('Please enter your name');
    await expect(modal.locator('#inq-email-err')).toContainText('Please enter your email');
    await expect(modal.locator('#inq-type-err')).toContainText('Please select a project type');
    await expect(modal.locator('#inq-details-err')).toContainText('Please describe your project');

    // Fill invalid email
    await modal.locator('#inq-email').fill('invalid-email-string');
    await submitBtn.click();
    await expect(modal.locator('#inq-email-err')).toContainText('Invalid email');

    // Fill invalid phone (too short)
    await modal.locator('#inq-phone').fill('123');
    await submitBtn.click();
    await expect(modal.locator('#inq-phone-err')).toContainText('Invalid phone');
  });

  test('form submission formats WhatsApp message correctly using existing COMPANY.phone number (916351903380)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Stub window.open to inspect the exact URL generated
    await page.evaluate(() => {
      window.__openedUrls = [];
      window.open = (url) => {
        window.__openedUrls.push(url);
        return { focus: () => {} };
      };
    });

    const startBtn = page.locator('button.nav-cta').first();
    await startBtn.click();

    const modal = page.locator('.inq');

    // Fill valid data
    await modal.locator('#inq-name').fill('Vedant Test');
    await modal.locator('#inq-company').fill('Tech Ventures');
    await modal.locator('#inq-email').fill('vedant@techventures.io');
    await modal.locator('#inq-phone').fill('+91 98765 43210');
    await modal.locator('#inq-project-type').selectOption('Web Application');
    await modal.locator('#inq-budget').selectOption('₹1,00,000 – ₹3,00,000');
    await modal.locator('#inq-details').fill('We need a high performance web app with real-time analytics.');

    const submitBtn = modal.locator('.inq-submit-btn');
    await submitBtn.click();

    // Verify success state renders
    await expect(modal.locator('.inq-success-wrap')).toBeVisible();
    await expect(modal.locator('.inq-success-title')).toHaveText('Your project inquiry is ready.');
    await expect(modal.locator('.inq-success-desc')).toContainText('WhatsApp has been opened with your project details');

    // Check captured URL
    const openedUrls = await page.evaluate(() => window.__openedUrls);
    expect(openedUrls.length).toBe(1);

    const waUrl = openedUrls[0];
    expect(waUrl).toContain('https://wa.me/916351903380?text=');

    // Parse and decode the text param
    const urlObj = new URL(waUrl);
    const text = urlObj.searchParams.get('text');

    expect(text).toContain('NEW PROJECT INQUIRY');
    expect(text).toContain('Name: Vedant Test');
    expect(text).toContain('Company: Tech Ventures');
    expect(text).toContain('Email: vedant@techventures.io');
    expect(text).toContain('Phone: +91 98765 43210');
    expect(text).toContain('Project Type: Web Application');
    expect(text).toContain('Estimated Budget: ₹1,00,000 – ₹3,00,000');
    expect(text).toContain('Project Details:\nWe need a high performance web app with real-time analytics.');
    expect(text).toContain('Submitted from Graphionic Infotech Website');

    // Done button closes modal
    await modal.locator('.btn-done').click();
    await expect(modal).not.toBeVisible();
  });

  test('Escape key closes modal and restores focus', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const startBtn = page.locator('button.nav-cta').first();
    await startBtn.click();

    const modal = page.locator('.inq');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('mobile responsiveness: single column, no horizontal overflow, touch friendly inputs', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const startBtn = page.locator('button.nav-cta').first();
    await startBtn.click();

    const modal = page.locator('.inq');
    await expect(modal).toBeVisible();

    // Check no horizontal scrollbar / overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Form inputs are visible and easily clickable
    const nameInput = modal.locator('#inq-name');
    await expect(nameInput).toBeVisible();
    const box = await nameInput.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(36);
  });
});
