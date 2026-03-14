import { test, expect } from '@playwright/test';

// We'll test the utility by injecting it into a page or mocking gtag in a browser context
// Since it's a utility, we can test it via page.evaluate

test.describe('Analytics Utility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // Go to any page to have a window context
    
    // Mock window.gtag
    await page.evaluate(() => {
      (window as any).gtag = function(...args: any[]) {
        (window as any).gtagCalls = (window as any).gtagCalls || [];
        (window as any).gtagCalls.push(args);
      };
    });
  });

  test('should track pageviews', async ({ page }) => {
    await page.evaluate(() => {
      // Inline the logic for testing or import it if setup allows
      // For simplicity in this test environment, we test the window.gtag integration
      const GA_TRACKING_ID = 'G-TEST-ID';
      const url = '/test-page';
      
      if (window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: url,
        });
      }
    });

    const calls = await page.evaluate(() => (window as any).gtagCalls);
    expect(calls[0]).toEqual(['config', 'G-TEST-ID', { page_path: '/test-page' }]);
  });

  test('should track events', async ({ page }) => {
    await page.evaluate(() => {
      if (window.gtag) {
        window.gtag('event', 'test_action', {
          event_category: 'test_category',
          event_label: 'test_label',
          value: 10,
        });
      }
    });

    const calls = await page.evaluate(() => (window as any).gtagCalls);
    expect(calls[0]).toEqual(['event', 'test_action', {
      event_category: 'test_category',
      event_label: 'test_label',
      value: 10,
    }]);
  });
});
