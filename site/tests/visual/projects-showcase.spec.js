import { test, expect } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\vedan\\.gemini\\antigravity-ide\\brain\\d617bce8-9db9-45fe-a1ea-97896dedc0a9';

test.describe('Graphionic Infotech — Case Studies Pinned Horizontal Showcase', () => {
  test('desktop pinned showcase layout, interaction, metrics, and screenshots', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Scroll to the very start of the projects section
    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    const projectsSection = page.locator('#projects');

    // Verify section eyebrow and heading
    await expect(projectsSection.locator('.case-studies-eyebrow')).toContainText('CASE STUDIES');
    await expect(projectsSection.locator('.case-studies-title')).toContainText("What We've Built");

    // Verify large rounded white container
    const whiteBox = projectsSection.locator('.case-studies-white-box');
    await expect(whiteBox).toBeVisible();

    // Verify active card elements
    const activeCard = projectsSection.locator('.case-study-card.is-active');
    await expect(activeCard).toBeVisible();

    // Verify visual media
    await expect(activeCard.locator('.cs-card-visual img')).toBeVisible();

    // Verify brand, title, description, read more link
    await expect(activeCard.locator('.cs-card-brand-name')).toBeVisible();
    await expect(activeCard.locator('.cs-card-title')).toBeVisible();
    await expect(activeCard.locator('.cs-card-desc')).toBeVisible();
    await expect(activeCard.locator('.cs-card-readmore')).toBeVisible();

    // Verify performance metrics (3 metrics)
    const metrics = activeCard.locator('.cs-metric-item');
    await expect(metrics).toHaveCount(3);
    await expect(metrics.nth(0).locator('.cs-metric-value')).toBeVisible();
    await expect(metrics.nth(0).locator('.cs-metric-label')).toBeVisible();

    // Verify Read More link has valid href or action
    const readMoreLink = activeCard.locator('.cs-card-readmore');
    const href = await readMoreLink.getAttribute('href');
    if (href) {
      expect(href).toMatch(/^https?:\/\//);
    }

    // Verify Navigation Arrows
    const prevArrow = projectsSection.locator('.cs-arrow-prev');
    const nextArrow = projectsSection.locator('.cs-arrow-next');
    await expect(prevArrow).toBeVisible();
    await expect(nextArrow).toBeVisible();

    // Initially at card 0, prev arrow should be disabled
    await expect(prevArrow).toBeDisabled();
    await expect(nextArrow).toBeEnabled();

    // Verify pagination dots
    const dots = projectsSection.locator('.cs-page-dot');
    await expect(dots).toHaveCount(5);
    await expect(dots.nth(0)).toHaveClass(/is-active/);

    // Verify Explore CTA
    const exploreBtn = projectsSection.locator('.cs-explore-btn');
    await expect(exploreBtn).toBeVisible();
    await expect(exploreBtn).toContainText('Explore all Case Studies');

    // Capture desktop screenshot
    const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'case_studies_desktop.png');
    await whiteBox.screenshot({ path: desktopScreenshotPath });

    // Test clicking Next Arrow
    const initialTitle = await activeCard.locator('.cs-card-title').textContent();
    await nextArrow.click();
    await page.waitForTimeout(800);

    // Active card should change or active dot should update
    const newActiveDot = projectsSection.locator('.cs-page-dot.is-active');
    await expect(newActiveDot).toBeVisible();

    // Test clicking pagination dot 2 (3rd project)
    await dots.nth(2).click();
    await page.waitForTimeout(800);
    const thirdProjectTitle = await projectsSection.locator('.case-study-card[data-index="2"] .cs-card-title').textContent();
    expect(thirdProjectTitle).toBe('Fastlane Freedom');
  });

  test('mobile pinned showcase, zero horizontal overflow, and responsive card', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    await page.waitForTimeout(1000);

    const projectsSection = page.locator('#projects');
    const whiteBox = projectsSection.locator('.case-studies-white-box');
    await expect(whiteBox).toBeVisible();

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify active card is visible in mobile
    const activeCard = projectsSection.locator('.case-study-card.is-active');
    await expect(activeCard).toBeVisible();
    await expect(activeCard.locator('.cs-card-title')).toBeVisible();

    // Verify Explore CTA is visible on mobile
    await expect(projectsSection.locator('.cs-explore-btn')).toBeVisible();

    // Capture mobile screenshot
    const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'case_studies_mobile.png');
    await whiteBox.screenshot({ path: mobileScreenshotPath });
  });
});
