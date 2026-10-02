import { test, expect } from '@playwright/test';
import path from 'path';

const VIEWPORTS = [
  { name: '320px_se', width: 320, height: 568 },
  { name: '360px_android', width: 360, height: 640 },
  { name: '375px_iphone', width: 375, height: 667 },
  { name: '390px_iphone14', width: 390, height: 844 },
  { name: '412px_pixel', width: 412, height: 915 },
  { name: '430px_promax', width: 430, height: 932 },
];

test.describe('Mobile Optimization & Zero-Overflow Audits', () => {
  test.setTimeout(60000);

  for (const vp of VIEWPORTS) {
    test(`Zero horizontal overflow on ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:5173/');
      await page.waitForTimeout(400);

      // Check overflow on initial load
      const isOverflown = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(isOverflown).toBe(false);

      // Scroll down entire page and verify no horizontal scroll appears at any point
      await page.evaluate(async () => {
        const step = 600;
        const total = document.documentElement.scrollHeight;
        for (let y = 0; y <= total; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 15));
          if (document.documentElement.scrollWidth > window.innerWidth) {
            throw new Error(`Horizontal overflow at scrollY ${y}: scrollWidth ${document.documentElement.scrollWidth} > innerWidth ${window.innerWidth}`);
          }
        }
      });
    });
  }

  test('Verify mobile components and interactions at 390x844', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(600);

    // 1. Mobile Navbar & Header
    const burger = page.locator('.nav-burger');
    await expect(burger).toBeVisible();

    // 2. Hero Headline
    const heroH1 = page.locator('.hero-h1');
    await expect(heroH1).toBeVisible();
    await expect(heroH1).toContainText('Building the Future of');

    // 3. CTA Buttons strictly SIDE BY SIDE
    const btnGetStarted = page.locator('.hero-ctas .btn-lime');
    const btnViewWork = page.locator('.hero-ctas .btn-glass');
    await expect(btnGetStarted).toBeVisible();
    await expect(btnViewWork).toBeVisible();
    const box1 = await btnGetStarted.boundingBox();
    const box2 = await btnViewWork.boundingBox();
    expect(box1).not.toBeNull();
    expect(box2).not.toBeNull();
    // Same vertical row: Y positions must match closely (within 4px)
    expect(Math.abs(box1.y - box2.y)).toBeLessThan(4);

    // 4. Hero Proof (Google rating badge) REMOVED on mobile
    const heroProof = page.locator('.hero-proof');
    await expect(heroProof).not.toBeVisible();

    // 5. Mobile Stats (2 cards: 100+ Projects & 100% Speed, no 520k+, no 7+ Years)
    const statsGrid = page.locator('.stats-mobile-grid');
    await expect(statsGrid).toBeVisible();
    const statCards = page.locator('.stat-m-card');
    await expect(statCards).toHaveCount(2);
    await expect(statsGrid).toContainText('100+');
    await expect(statsGrid).toContainText('Projects Delivered');
    await expect(statsGrid).toContainText('100%');
    await expect(statsGrid).toContainText('Speed & Performance');
    await expect(statsGrid).not.toContainText('520k+');

    // 6. Mobile Engagement Models Pinned Stack
    const engageTrack = page.locator('.engage-mobile-pinned-track');
    await expect(engageTrack).toBeVisible();
    const stackedCards = page.locator('.eng-mobile-card-stacked');
    await expect(stackedCards).toHaveCount(3);
    const popularBadge = page.locator('.eng-mobile-card-stacked .eng-card-badge');
    await expect(popularBadge).toContainText('MOST POPULAR');

    // 7. Why Graphionic (Single card visible + 01-04 tabs)
    const whyTabs = page.locator('.why-nav-tab');
    await expect(whyTabs).toHaveCount(4);
    const whyActiveCard = page.locator('.why-mobile-stage .why-card');
    await expect(whyActiveCard).toHaveCount(1);
    await expect(whyActiveCard).toContainText('Business-first thinking');

    // Click tab 02 to test user-controlled navigation
    await whyTabs.nth(1).click();
    await page.waitForTimeout(350);
    await expect(whyActiveCard).toContainText('Modern engineering');

    // 8. Google Reviews (Summary badge ONLY on mobile, no individual cards)
    const revBadge = page.locator('.rev-badge');
    await expect(revBadge).toBeVisible();
    const revTestimonials = page.locator('.rev-card');
    await expect(revTestimonials).toHaveCount(0);
    const pageText = await page.textContent('body');
    expect(pageText).not.toContain('V. Patel');

    // 9. FAQ (Only ONE FAQ visible at a time with Next interaction)
    const faqSingleCard = page.locator('.faq-mobile-single-view .faq-mobile-card');
    await expect(faqSingleCard).toHaveCount(1);
    const faqProg = page.locator('.faq-prog-txt');
    await expect(faqProg).toContainText('01 / 07');

    // Click Next button
    const nextFaqBtn = page.locator('.faq-mobile-next-btn');
    await nextFaqBtn.click();
    await page.waitForTimeout(350);
    await expect(faqProg).toContainText('02 / 07');

    // 10. Footer (Navigation & Services columns removed on mobile)
    const footNav = page.locator('.foot-col-nav');
    const footServices = page.locator('.foot-col-services');
    await expect(footNav).not.toBeVisible();
    await expect(footServices).not.toBeVisible();
    const footBrand = page.locator('.foot-brand');
    await expect(footBrand).toBeVisible();

    // Scroll through page to activate all animations and capture screenshot
    await page.evaluate(async () => {
      const distance = 400;
      const delay = 50;
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += distance) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, delay));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    const artifactPath = path.resolve('C:/Users/vedan/.gemini/antigravity-ide/brain/5b9fbb1b-7286-4086-821e-ac918b8d8cbc/mobile_redesign_full.png');
    await page.screenshot({ path: artifactPath, fullPage: true });
  });

  test('Verify Desktop design is 100% preserved at 1280x800', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(600);

    // Desktop navbar links and CTA visible
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();
    const navCta = page.locator('.nav-inner .nav-cta');
    await expect(navCta).toBeVisible();

    // Desktop projects orbit nav visible
    const orbitNav = page.locator('.prj-orbit-nav');
    await expect(orbitNav).toBeVisible();

    // Desktop engagement models carousel wrapper visible
    const engageCarousel = page.locator('.engage-carousel-wrapper');
    await expect(engageCarousel).toBeVisible();

    // Desktop reviews interactive grid visible
    const revGrid = page.locator('.reviews-interactive-grid');
    await expect(revGrid).toBeVisible();

    // Desktop why grid visible with 4 cards
    const whyDesktopCards = page.locator('.why-grid .why-card');
    await expect(whyDesktopCards).toHaveCount(4);

    // Desktop footer navigation columns visible
    const footNav = page.locator('.foot-col-nav');
    const footServices = page.locator('.foot-col-services');
    await expect(footNav).toBeVisible();
    await expect(footServices).toBeVisible();
  });
});
