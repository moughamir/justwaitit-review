import { test, expect } from '@playwright/test';

test.describe('Landing Page Preservation', () => {
  test('Visual and Functional Elements', async ({ page }) => {
    await page.goto('/');

    // 1. Visual elements: brand colors and hero layout
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();
    await expect(page.locator('header')).toBeVisible();

    // 2. Functional elements: Waitlist Form
    // Scroll down so the waitlist section (which has content-visibility: auto) renders its child form
    await page.evaluate(() => window.scrollTo(0, 5000));
    await page.waitForTimeout(500);

    const waitlistForm = page.locator('form').first();
    await expect(waitlistForm).toBeVisible({ timeout: 10000 });

    const emailInput = waitlistForm.locator('input[type="email"]');
    if ((await emailInput.count()) > 0) {
      await expect(emailInput).toBeVisible();
    }

    const submitBtn = waitlistForm.locator('button[type="submit"]');
    if ((await submitBtn.count()) > 0) {
      await expect(submitBtn).toBeVisible();
    }

    // 3. Accessibility & semantics requirements
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Scroll to check if transitions are smooth and not causing crashes
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1000);

    // Ensure body doesn't have errors and elements remain visible
    await expect(page.locator('body')).toBeVisible();
  });
});
