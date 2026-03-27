import { test, expect } from '@playwright/test';

/**
 * E2E tests for the WaitlistForm component.
 *
 * Simple variant: rendered in HeroSection on the main landing page.
 * Full variant:   rendered in WaitlistSection (ScrollTriggered layout).
 *                 Requires isNewLandingPageActive() === false, i.e. the
 *                 LANDING_PAGE_SWITCH_DATE has not yet passed, OR the
 *                 ScrollTriggered layout is otherwise active.
 *
 * Run with: bun run test:e2e -- __tests__/waitlist/waitlist-form.e2e.test.ts
 */

const BASE = 'http://localhost:3000';
const LOCALE = 'en-US';

test.describe('Waitlist form — simple variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/${LOCALE}`);
    // Scroll to the waitlist section
    await page.evaluate(() => {
      const el = document.getElementById('waitlist');
      el?.scrollIntoView();
    });
    await page.waitForTimeout(500);
  });

  test('type email → submit → success message visible', async ({ page }) => {
    const emailInput = page.locator('#waitlist input[type="email"]').first();
    await emailInput.fill('e2e-simple@example.com');
    await emailInput.press('Enter');
    await expect(page.getByText("You're on the list!").first()).toBeVisible({
      timeout: 10000,
    });
  });
});

test.describe('Waitlist form — full variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/${LOCALE}`);
    await page.evaluate(() => {
      const el = document.getElementById('waitlist');
      el?.scrollIntoView();
    });
    await page.waitForTimeout(500);
  });

  test('complete all 3 steps → success visible', async ({ page }) => {
    // Step 1
    await page.getByPlaceholder('Your name').fill('E2E User');
    await page
      .getByPlaceholder('professional@email.com')
      .fill('e2e-full@example.com');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Step 2
    await page.getByRole('combobox').selectOption('Brand');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Step 3
    await page.getByRole('button', { name: /secure beta access/i }).click();

    await expect(page.getByText("You're on the list!").first()).toBeVisible({
      timeout: 10000,
    });
  });

  test('validation: submit step 1 empty → error messages visible', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /continue/i }).click();

    await expect(page.getByText('Name is required').first()).toBeVisible();
    await expect(page.getByText('Email is required').first()).toBeVisible();
  });

  test('back navigation: reach step 2 → click Back → step 1 data preserved', async ({
    page,
  }) => {
    await page.getByPlaceholder('Your name').fill('Back Nav User');
    await page
      .getByPlaceholder('professional@email.com')
      .fill('backnav@example.com');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('Profile').first()).toBeVisible();
    await page.getByRole('button', { name: /back/i }).click();
    await page.waitForTimeout(500);

    await expect(page.getByDisplayValue('Back Nav User').first()).toBeVisible();
    await expect(
      page.getByDisplayValue('backnav@example.com').first()
    ).toBeVisible();
  });
});
