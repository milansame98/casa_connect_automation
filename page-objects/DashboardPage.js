const { expect } = require('@playwright/test');

class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ✅ Better locator (more stable than text=)
    this.dashboardTitle = page.getByRole('heading', { 
      name: 'Dashboard Of CASA' 
    });
  }

  // ✅ Verify URL
  async verifyDashboardURL() {
    await expect(this.page).toHaveURL('https://casaconnect.casa.lk');
  }

  // ✅ Verify dashboard heading
  async verifyDashboardLoaded() {
    await expect(this.dashboardTitle).toBeVisible();
  }
}

module.exports = { DashboardPage };