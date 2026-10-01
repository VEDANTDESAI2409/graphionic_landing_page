import { test, expect } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\vedan\\.gemini\\antigravity-ide\\brain\\ebf3de02-7a7d-45d4-9042-860bef483f39';

test.describe('Graphionic Infotech — Engagement Models Expandable Cards', () => {
  test('desktop expandable cards interaction, visual states, and controls', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
    });

    const section = page.locator('#engagement');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // 1. Verify Section Header
    await expect(section.locator('.engage-eyebrow')).toContainText('WAYS TO WORK TOGETHER');
    await expect(section.locator('h2')).toContainText('Choose Your');
    await expect(section.locator('h2 .b')).toContainText('Engagement Model');
    await expect(section.locator('h2 .acc')).toContainText('.');
    await expect(section.locator('p').first()).toContainText('Transparent scoping');

    // 2. Verify all 3 cards exist
    const cards = section.locator('.eng-model-card');
    await expect(cards).toHaveCount(3);

    // 3. Default state: Card 1 (Dedicated Team) should be active
    const card0 = cards.nth(0);
    const card1 = cards.nth(1);
    const card2 = cards.nth(2);

    await expect(card1).toHaveClass(/is-active/);
    await expect(card0).toHaveClass(/is-inactive/);
    await expect(card2).toHaveClass(/is-inactive/);

    // Verify Dedicated Team content & badges
    await expect(card1.locator('.eng-card-title')).toHaveText('Dedicated Team');
    await expect(card1.locator('.eng-card-badge')).toHaveText('MOST POPULAR');
    await expect(card1.locator('.btn-active-lime')).toBeVisible();
    await expect(card1.locator('.eng-badge-scale')).toContainText('Scalable Team');
    await expect(card1.locator('.eng-badge-sprint')).toContainText('Regular Sprints');
    await expect(card1.locator('.eng-badge-transparency')).toContainText('Full Transparency');

    // Screenshot of Default State (State 2: Dedicated Team active)
    await section.screenshot({
      path: path.join(ARTIFACT_DIR, 'engagement_state_2_dedicated_team.png'),
      animations: 'disabled',
    });

    // 4. Hover Card 0 (Fixed-Scope Project)
    await card0.hover();
    await page.waitForTimeout(550);

    await expect(card0).toHaveClass(/is-active/);
    await expect(card1).toHaveClass(/is-inactive/);
    await expect(card2).toHaveClass(/is-inactive/);

    await expect(card0.locator('.eng-card-title')).toHaveText('Fixed-Scope Project');
    await expect(card0.locator('.btn-active-lime')).toBeVisible();
    await expect(card0.locator('.eng-badge-top-right')).toContainText('Guaranteed Scope');
    await expect(card0.locator('.eng-badge-bot-left')).toContainText('Fixed Quote');

    // Screenshot of State 1 (Fixed-Scope Project active)
    await section.screenshot({
      path: path.join(ARTIFACT_DIR, 'engagement_state_1_fixed_scope.png'),
      animations: 'disabled',
    });

    // 5. Hover Card 2 (Hourly / Support)
    await card2.hover();
    await page.waitForTimeout(550);

    await expect(card2).toHaveClass(/is-active/);
    await expect(card0).toHaveClass(/is-inactive/);
    await expect(card1).toHaveClass(/is-inactive/);

    await expect(card2.locator('.eng-card-title')).toHaveText('Hourly / Support');
    await expect(card2.locator('.btn-active-lime')).toBeVisible();
    await expect(card2.locator('.eng-badge-sla')).toContainText('Priority SLA');
    await expect(card2.locator('.eng-badge-tools')).toContainText('Zero Lock-in');

    // Screenshot of State 3 (Hourly / Support active)
    await section.screenshot({
      path: path.join(ARTIFACT_DIR, 'engagement_state_3_support.png'),
      animations: 'disabled',
    });

    // 6. Test Arrow Buttons
    const prevBtn = section.locator('.engage-arrow-btn.prev');
    const nextBtn = section.locator('.engage-arrow-btn.next');

    // Currently at 2 (Support). Clicking Next should cycle to 0 (Fixed-Scope).
    await nextBtn.click();
    await page.waitForTimeout(450);
    await expect(card0).toHaveClass(/is-active/);

    // Clicking Prev should cycle back to 2 (Support).
    await prevBtn.click();
    await page.waitForTimeout(450);
    await expect(card2).toHaveClass(/is-active/);

    // 7. Test Pagination Dots
    const dots = section.locator('.engage-dot');
    await expect(dots).toHaveCount(3);
    await dots.nth(1).click(); // Click Dedicated Team dot
    await page.waitForTimeout(450);
    await expect(card1).toHaveClass(/is-active/);

    // 8. Test CTA Button Click opens inquiry modal
    const cta = card1.locator('.eng-cta-btn');
    await cta.click();
    await page.waitForTimeout(400);

    // Check inquiry modal is visible
    const modal = page.locator('.inq-modal, .inquiry-form, [role="dialog"]');
    await expect(modal.first()).toBeVisible();

    // Close modal by pressing Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  });

  test('mobile responsive behavior and stack layout', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
    });

    const section = page.locator('#engagement');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Verify no horizontal overflow on mobile
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    // Verify 3 cards exist
    const cards = section.locator('.eng-model-card');
    await expect(cards).toHaveCount(3);

    // Tap Card 0 to expand it on mobile
    await cards.nth(0).click();
    await page.waitForTimeout(500);
    await expect(cards.nth(0)).toHaveClass(/is-active/);

    // Screenshot of Mobile Engagement Section
    await section.screenshot({
      path: path.join(ARTIFACT_DIR, 'engagement_mobile.png'),
      animations: 'disabled',
    });
  });
});
