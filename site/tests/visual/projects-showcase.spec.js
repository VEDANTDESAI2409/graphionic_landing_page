import { test, expect } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\vedan\\.gemini\\antigravity-ide\\brain\\ebf3de02-7a7d-45d4-9042-860bef483f39';

test.describe('Graphionic Infotech — Projects Orbit Showcase Verification', () => {
  test('desktop showcase layout, interaction, and screenshots', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Verify section header
    await expect(projectsSection.locator('h2')).toContainText('Built');

    // Verify 3 cards are positioned on desktop
    const centerCard = projectsSection.locator('.position-center');
    const leftCard = projectsSection.locator('.position-left');
    const rightCard = projectsSection.locator('.position-right');

    await expect(centerCard).toBeVisible();
    await expect(leftCard).toBeVisible();
    await expect(rightCard).toBeVisible();

    // Verify orbit navigation and showcase card elements
    await expect(projectsSection.locator('.prj-orbit-nav')).toBeVisible();
    await expect(centerCard.locator('.prj-laptop-deck')).toBeVisible();
    await expect(centerCard.locator('.prj-card-title')).toBeVisible();
    await expect(centerCard.locator('.prj-card-badge')).toBeVisible();
    await expect(centerCard.locator('.prj-card-desc')).toBeVisible();
    await expect(centerCard.locator('.prj-card-tags')).toBeVisible();
    await expect(centerCard.locator('.prj-metrics-grid')).toBeVisible();
    await expect(centerCard.locator('.prj-card-cta')).toBeVisible();

    // Verify CTA link has target="_blank"
    const ctaLink = centerCard.locator('.prj-card-cta');
    const href = await ctaLink.getAttribute('href');
    expect(href).toMatch(/^https?:\/\//);

    // Take screenshot of desktop showcase
    const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'projects_showcase_desktop.png');
    await projectsSection.locator('.prj-sticky-viewport').screenshot({ path: desktopScreenshotPath });

    // Test clicking Next Arrow button
    const nextBtn = projectsSection.locator('.prj-arrow-btn[aria-label="Next project"]');
    const initialTitle = await centerCard.locator('.prj-card-title').textContent();

    await nextBtn.click();
    await page.waitForTimeout(600);

    const newTitle = await projectsSection.locator('.position-center .prj-card-title').textContent();
    expect(newTitle).not.toEqual(initialTitle);

    // Test clicking orbit project number 03
    const orbitBtn3 = projectsSection.locator('.prj-orbit-btn').nth(2);
    await orbitBtn3.click();
    await page.waitForTimeout(600);
    const title3 = await projectsSection.locator('.position-center .prj-card-title').textContent();
    expect(title3).toBe('Fastlane Freedom');
    expect(await orbitBtn3.getAttribute('aria-selected')).toBe('true');

    // Test clicking pagination dot
    const dots = projectsSection.locator('.prj-page-dot');
    await expect(dots).toHaveCount(5);
    await dots.nth(0).click();
    await page.waitForTimeout(600);
    const dotTitle = await projectsSection.locator('.position-center .prj-card-title').textContent();
    expect(dotTitle).toBe('VR System & Solution');
  });

  test('mobile viewport showcase, zero overflow, and touch swipe', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Verify exactly 1 active card is visible in mobile viewport
    const activeCard = projectsSection.locator('.position-center');
    await expect(activeCard).toBeVisible();

    // Verify swipe affordance is visible on mobile
    const swipeAffordance = projectsSection.locator('.prj-swipe');
    await expect(swipeAffordance).toBeVisible();

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Take screenshot of mobile showcase
    const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'projects_showcase_mobile.png');
    await projectsSection.locator('.prj-sticky-viewport').screenshot({ path: mobileScreenshotPath });
  });
});
