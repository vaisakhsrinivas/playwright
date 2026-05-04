const { expect } = require('@playwright/test');

class SwagLabsLoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('input[type="submit"]');
        this.errorMessageContainer = page.locator('.error-message-container');
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(/inventory/);
    }

    async verifyLoginError() {
        await expect(this.errorMessageContainer).toBeVisible();
    }
}

module.exports = SwagLabsLoginPage;
