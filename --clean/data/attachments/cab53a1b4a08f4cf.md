# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: retest-validation.spec.js >> fail first, pass second
- Location: tests\retest-validation.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('fail first, pass second', async ({ page }, testInfo) => {
  4  |   if (testInfo.retry === 0) {
  5  |     // First run → force failure
> 6  |     expect(true).toBe(false);
     |                  ^ Error: expect(received).toBe(expected) // Object.is equality
  7  |   } else {
  8  |     // Retry run → pass
  9  |     await page.goto('https://playwright.dev/');
  10 |     await expect(page).toHaveTitle(/Playwright/);
  11 |   }
  12 | });
  13 | 
```