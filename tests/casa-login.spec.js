const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.CASA_BASE_URL || 'https://casaconnect.casa.lk';
const USERNAME = process.env.CASA_USER || 'milantesting98@gmail.com';
const PASSWORD = process.env.CASA_PASS || '123456';

test.describe('Casa Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.fill('input[name="email"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('button[type="submit"]');

    // adjust this URL/assertion to your app's post-login page
    await page.waitForURL('https://casaconnect.casa.lk/', { timeout: 10000 });
    await expect(page.locator('text=Dashboard Of CASA')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'bad@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    // adjust selector for your app's error message
    const error = page.locator('text=These credentials do not match our records');
    await expect(error).toBeVisible();
  });
});