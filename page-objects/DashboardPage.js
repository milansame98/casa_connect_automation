const {expect} = require('@playwright/test');

class DashboardPage {
/**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.dashboardTitle = page.locator('text=Dashboard Of CASA');
    }
}

module.exports={DashboardPage};
