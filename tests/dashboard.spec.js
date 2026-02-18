const { test } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { DashboardPage } = require('../page-objects/DashboardPage');

const BASE_URL = process.env.CASA_BASE_URL || 'https://casaconnect.casa.lk';
const USERNAME = process.env.CASA_USER || 'milantesting98@gmail.com';
const PASSWORD = process.env.CASA_PASS || '123456';

test.describe('Dashboard Tests', () => {

  test('User should land on dashboard after successful login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Step 1: Open login page
    await loginPage.goto(BASE_URL);

    // Step 2: Login
    await loginPage.login(USERNAME, PASSWORD);

    // Step 3: Verify dashboard URL
    await dashboardPage.verifyDashboardURL();

    // Step 4: Verify dashboard UI
    await dashboardPage.verifyDashboardLoaded();

  });

});
