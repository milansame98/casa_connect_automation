const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { UserPage } = require('../page-objects/UserPage');

test('Add User - Positive Scenario', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto('https://casaconnect.casa.lk'); // Navigate to login page first
    await loginPage.login('milantesting98@gmail.com','123456'); // <-- Replace with your credentials
    
    // Wait for login to complete and redirect
    await page.waitForLoadState('networkidle', { timeout: 10000 });

    // Step 2: Navigate to Users page
    await page.goto('https://casaconnect.casa.lk/users');

    // Step 3: Add a new user
    const userPage = new UserPage(page);

    const name = 'Milan Sameera';
    const email = 'milansameera@gmail.com';
    const password = '123456';

    await userPage.addUser(name, email, password);

    // Step 4: Validate the new user appears in the table
    const row = page.locator('tbody tr', { hasText: email });

    await expect(row).toBeVisible();
    await expect(row).toContainText(name);
    await expect(row).toContainText('Admin');
});