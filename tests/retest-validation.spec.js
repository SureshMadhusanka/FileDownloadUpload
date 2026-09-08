import { test, expect } from '@playwright/test';

test('fail first, pass second', async ({ page }, testInfo) => {
  if (testInfo.retry === 0) {
    // First run → force failure
    expect(true).toBe(true);
  } else {
    // Retry run → pass
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  }
});
