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

    // Take screenshot of desktop showcase sticky stage
    const stickyStage = page.locator('.prj-sticky-stage');
    const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'projects_showcase_desktop.png');
    await stickyStage.screenshot({ path: desktopScreenshotPath });

    // Test clicking an Orbit Number Button directly (e.g. Project 03)
    const orbitBtns = projectsSection.locator('.prj-orbit-btn');
    await expect(orbitBtns).toHaveCount(5);
    await orbitBtns.nth(2).click(); // Click Project 03 (Fastlane Freedom)
    await page.waitForTimeout(600);
    const orbit3Title = await projectsSection.locator('.position-center .prj-card-title').textContent();
    expect(orbit3Title).toBe('Fastlane Freedom');

    // Test clicking Next Arrow button
    const nextBtn = projectsSection.locator('.prj-arrow-btn[aria-label="Next project"]');
    await nextBtn.click(); // Should go to Project 04 (BiO-G)
    await page.waitForTimeout(600);
    const newTitle = await projectsSection.locator('.position-center .prj-card-title').textContent();
    expect(newTitle).toBe('BiO-G');

    // Test clicking pagination dot 1 (VR System & Solution)
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

    // Test mobile orbit button navigation
    const mobileOrbitBtns = projectsSection.locator('.prj-mobile-orbit-btn');
    await expect(mobileOrbitBtns).toHaveCount(5);
    await mobileOrbitBtns.nth(2).click(); // Click Project 03 (Fastlane Freedom)
    await page.waitForTimeout(600);
    const mobileTitle = await projectsSection.locator('.position-center .prj-card-title').textContent();
    expect(mobileTitle).toBe('Fastlane Freedom');

    // Take screenshot of mobile showcase sticky stage
    const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'projects_showcase_mobile.png');
    await page.locator('.prj-sticky-stage').screenshot({ path: mobileScreenshotPath });
  });

  test('scroll-driven pinned timeline progresses projects forward and backward', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const track = page.locator('.prj-pinned-track');
    await expect(track).toBeVisible();

    const trackBox = await track.boundingBox();
    expect(trackBox).not.toBeNull();
    const trackTop = trackBox.y + (await page.evaluate(() => window.scrollY));
    const trackHeight = trackBox.height;
    const scrollableDistance = trackHeight - 900;

    // Scroll to Project 01 (progress ~0%)
    await page.evaluate((top) => window.scrollTo(0, top), trackTop);
    await page.waitForTimeout(400);
    let title = await page.locator('.position-center .prj-card-title').textContent();
    expect(title).toBe('VR System & Solution');

    // Scroll to Project 03 (progress ~50%)
    await page.evaluate(
      ({ top, dist }) => window.scrollTo(0, top + dist * 0.5),
      { top: trackTop, dist: scrollableDistance }
    );
    await page.waitForTimeout(500);
    title = await page.locator('.position-center .prj-card-title').textContent();
    expect(title).toBe('Fastlane Freedom');

    // Scroll to Project 05 (progress ~100%)
    await page.evaluate(
      ({ top, dist }) => window.scrollTo(0, top + dist),
      { top: trackTop, dist: scrollableDistance }
    );
    await page.waitForTimeout(500);
    title = await page.locator('.position-center .prj-card-title').textContent();
    expect(title).toBe('Sunflower Inn and Suites');

    // Scroll backward to Project 02 (progress ~25%)
    await page.evaluate(
      ({ top, dist }) => window.scrollTo(0, top + dist * 0.25),
      { top: trackTop, dist: scrollableDistance }
    );
    await page.waitForTimeout(500);
    title = await page.locator('.position-center .prj-card-title').textContent();
    expect(title).toBe('Rapid Electric');
  });

  test('keyboard arrow navigation and accessibility attributes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const stage = page.locator('.prj-stage-area');
    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Focus the stage area and press ArrowRight
    await stage.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    let title = await page.locator('.position-center .prj-card-title').textContent();
    expect(title).toBe('Rapid Electric');

    // Press ArrowRight again
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    title = await page.locator('.position-center .prj-card-title').textContent();
    expect(title).toBe('Fastlane Freedom');

    // Press ArrowLeft
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    title = await page.locator('.position-center .prj-card-title').textContent();
    expect(title).toBe('Rapid Electric');
  });
});
