import { test, expect } from '@playwright/test';

test.describe('About Us Animos Scroll Reveal Heading', () => {
  test.setTimeout(60000);

  test('progressively reveals heading words from blur to sharp as user scrolls through sticky track', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();

    // 1. Verify words structure and preserved colors
    const words = page.locator('.about-word');
    expect(await words.count()).toBe(12);

    // "smarter" must have class 'b' (Graphionic blue)
    const smarterWord = page.locator('.about-word.b');
    await expect(smarterWord).toHaveText('smarter');
    const smarterColor = await smarterWord.evaluate((el) => window.getComputedStyle(el).color);
    expect(smarterColor).toBe('rgb(0, 122, 255)');

    // 2. Scroll to the beginning of About Us track
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (window.__lenis) {
        window.__lenis.scrollTo(el.offsetTop, { immediate: true });
      } else {
        window.scrollTo(0, el.offsetTop);
      }
    });
    await page.waitForTimeout(400);

    // Verify initial word states:
    // ALL words (including Word 0 "A" and Word 11 "solutions.") MUST be blurred initially
    const word0Blur = await words.nth(0).evaluate((el) => window.getComputedStyle(el).filter);
    expect(word0Blur).toContain('blur');

    const word11InitialBlur = await words.nth(11).evaluate((el) => window.getComputedStyle(el).filter);
    expect(word11InitialBlur).toContain('blur');

    // Capture initial state screenshot (ALL words blurred)
    await aboutSection.locator('.about-sticky-stage').screenshot({ path: 'test-results/about-reveal-start.png' });

    // 2b. Scroll slightly (18% through track): Word 0 ("A") and Word 1 ("global") become sharp
    await page.evaluate(() => {
      const el = document.getElementById('about');
      const earlyScroll = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.18;
      if (window.__lenis) {
        window.__lenis.scrollTo(earlyScroll, { immediate: true });
      } else {
        window.scrollTo(0, earlyScroll);
      }
    });
    await page.waitForTimeout(400);

    const word0EarlyBlur = await words.nth(0).evaluate((el) => window.getComputedStyle(el).filter);
    expect(word0EarlyBlur).toMatch(/none|blur\(0px\)/);

    // Later words should still be blurred at 18% scroll
    const word7EarlyBlur = await words.nth(7).evaluate((el) => window.getComputedStyle(el).filter);
    expect(word7EarlyBlur).toContain('blur');

    // Capture early-scroll screenshot (first words sharpening)
    await aboutSection.locator('.about-sticky-stage').screenshot({ path: 'test-results/about-reveal-early.png' });

    // 3. Scroll halfway through About Us track
    await page.evaluate(() => {
      const el = document.getElementById('about');
      const halfScroll = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.55;
      if (window.__lenis) {
        window.__lenis.scrollTo(halfScroll, { immediate: true });
      } else {
        window.scrollTo(0, halfScroll);
      }
    });
    await page.waitForTimeout(400);

    // At halfway, "smarter" should be sharp or nearly sharp
    const smarterMidOpacity = await smarterWord.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(smarterMidOpacity).toBeGreaterThan(0.7);

    // Capture mid-scroll screenshot
    await aboutSection.locator('.about-sticky-stage').screenshot({ path: 'test-results/about-reveal-mid.png' });

    // 4. Scroll to near the end of the track (e.g. 90% progress)
    await page.evaluate(() => {
      const el = document.getElementById('about');
      const endScroll = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.90;
      if (window.__lenis) {
        window.__lenis.scrollTo(endScroll, { immediate: true });
      } else {
        window.scrollTo(0, endScroll);
      }
    });
    await page.waitForTimeout(400);

    // At near end, all words must be completely sharp with opacity 1
    const word11EndOpacity = await words.nth(11).evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(word11EndOpacity).toBeGreaterThanOrEqual(0.95);

    const word11EndBlur = await words.nth(11).evaluate((el) => window.getComputedStyle(el).filter);
    expect(word11EndBlur).toMatch(/none|blur\(0px\)/);

    // Capture fully revealed screenshot
    await aboutSection.locator('.about-sticky-stage').screenshot({ path: 'test-results/about-reveal-end.png' });

    // 5. Scroll backward and verify reverse scrubbing
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (window.__lenis) {
        window.__lenis.scrollTo(el.offsetTop, { immediate: true });
      } else {
        window.scrollTo(0, el.offsetTop);
      }
    });
    await page.waitForTimeout(400);

    const word11ReversedBlur = await words.nth(11).evaluate((el) => window.getComputedStyle(el).filter);
    expect(word11ReversedBlur).toContain('blur');

    // 6. Verify zero console errors
    expect(consoleErrors).toEqual([]);
  });

  test('adapts gracefully on mobile viewport without horizontal overflow', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Scroll to about on mobile
    await page.evaluate(() => {
      const el = document.getElementById('about');
      const target = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.6;
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { immediate: true });
      } else {
        window.scrollTo(0, target);
      }
    });
    await page.waitForTimeout(400);

    await aboutSection.locator('.about-sticky-stage').screenshot({ path: 'test-results/about-reveal-mobile.png' });
  });

  test('respects prefers-reduced-motion: reduce', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded');

    const words = page.locator('.about-word');
    // All words should be immediately sharp with opacity 1
    const word11Blur = await words.nth(11).evaluate((el) => window.getComputedStyle(el).filter);
    expect(word11Blur).toMatch(/none|blur\(0px\)/);

    const word11Opacity = await words.nth(11).evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(word11Opacity).toBe(1);
  });
});
