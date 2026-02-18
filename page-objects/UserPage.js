const { expect } = require('@playwright/test');

class UserPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;


        // Locators for input fields
        this.nameInput = page.getByPlaceholder('User Name');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('input[name="password"]');
        this.confirmPasswordInput = page.locator('input[name="password_confirmation"]');

        // Locators for roles
        this.superAdminRole = page.getByLabel('SuperAdmin');
        this.editorRole = page.getByLabel('Editor');
        this.adminRole = page.getByLabel('Admin');
        this.viewerRole = page.getByLabel('Viewer');

        // Add button inside the modal/form
        this.addButton = page.getByRole('button', { name: 'Add' });
    }

    /**
     * Add a new user
     * @param {string} name
     * @param {string} email
     * @param {string} password
     */
    async addUser(name, email, password) {
        
        // Button that opens the Add User form
        this.openAddUserFormButton = this.page.locator('a:has-text("+ Add User")');
        
        // Step 1: Open Add User form
        await this.openAddUserFormButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.openAddUserFormButton.click();

        // Step 2: Wait for the form inputs to be visible
        await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });

        // Step 3: Fill inputs
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        // Step 4: Select Admin role
        await this.adminRole.waitFor({ state: 'visible', timeout: 3000 });
        await this.adminRole.check();

        // Step 5: Click Add button
        await this.addButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.addButton.click();

        // Step 6 (optional): wait for new user to appear in the table
        const newUserRow = this.page.locator('tbody tr', { hasText: email });
        await expect(newUserRow).toBeVisible({ timeout: 5000 });
    }
}

module.exports = { UserPage };