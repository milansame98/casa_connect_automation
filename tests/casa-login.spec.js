// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');

const BASE_URL = process.env.CASA_BASE_URL || 'https://casaconnect.casa.lk';
const USERNAME = process.env.CASA_USER || 'milantesting98@gmail.com';
const PASSWORD = process.env.CASA_PASS || '123456';

test.describe('Casa Login - POM', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(BASE_URL);
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await loginPage.login(USERNAME, PASSWORD);

    // Adjust this according to your app's post-login page
    await page.waitForURL(`https://casaconnect.casa.lk`, { timeout: 20000 });
    await expect(page.locator('text=Dashboard Of CASA')).toBeVisible({ timeout: 20000 });
  });

  test('shows error for invalid credentials', async () => {
    await loginPage.login('bad@example.com', 'wrongpass');
    await loginPage.expectError();
  });
});
