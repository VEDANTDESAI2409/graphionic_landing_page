import { test, expect } from '@playwright/test';

test.describe('Technology Marquee Section', () => {
  test('renders directly above About section with continuous infinite loop and no console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Verify marquee section exists
    const marqueeSection = page.locator('.tech-marquee-section');
    await expect(marqueeSection).toBeVisible();

    // 2. Verify position: directly below Hero and directly above About
    const isDirectlyAboveAbout = await page.evaluate(() => {
      const hero = document.querySelector('.hero');
      const marquee = document.querySelector('.tech-marquee-section');
      const about = document.querySelector('.about');

      if (!hero || !marquee || !about) return false;

      // Verify DOM sibling order inside <main>
      const children = Array.from(marquee.parentElement.children);
      const heroIndex = children.indexOf(hero);
      const marqueeIndex = children.indexOf(marquee);
      const aboutIndex = children.indexOf(about);

      return heroIndex < marqueeIndex && marqueeIndex === aboutIndex - 1;
    });
    expect(isDirectlyAboveAbout).toBe(true);

    // 3. Verify technology items content and structure
    const techNames = await page.locator('.tech-marquee-list:not([aria-hidden="true"]) .tech-name').allInnerTexts();
    expect(techNames).toContain('React');
    expect(techNames).toContain('Next.js');
    expect(techNames).toContain('Node.js');
    expect(techNames).toContain('Laravel');
    expect(techNames).toContain('Python');
    expect(techNames).toContain('Flutter');

    // 4. Verify CSS animation properties (linear timing, infinite loop, hardware acceleration)
    const animProps = await page.evaluate(() => {
      const track = document.querySelector('.tech-marquee-track');
      const style = window.getComputedStyle(track);
      return {
        animationName: style.animationName,
        animationTimingFunction: style.animationTimingFunction,
        animationIterationCount: style.animationIterationCount,
        animationDuration: style.animationDuration,
        display: style.display,
      };
    });
    expect(animProps.animationName).toContain('techMarqueeScroll');
    expect(animProps.animationTimingFunction).toBe('linear');
    expect(animProps.animationIterationCount).toBe('infinite');

    // 5. Verify hover behavior pauses animation
    const track = page.locator('.tech-marquee-track');
    await page.locator('.tech-marquee').hover();
    const playStateOnHover = await track.evaluate((el) => window.getComputedStyle(el).animationPlayState);
    expect(playStateOnHover).toBe('paused');

    // 6. Verify no horizontal body scrollbar / overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // 7. Verify no console errors
    expect(consoleErrors).toEqual([]);

    // 8. Capture screenshot of the marquee section in context
    await marqueeSection.scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'test-results/marquee-desktop.png' });
  });

  test('handles mobile viewport correctly without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');

    const marqueeSection = page.locator('.tech-marquee-section');
    await expect(marqueeSection).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    await marqueeSection.scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'test-results/marquee-mobile.png' });
  });
});
