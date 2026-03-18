class logoutPage {
    constructor(page) {
        this.page = page;
        this.logoutButton = this.page.locator('button:has-text("Sign Out")');
    }
    async logout()
    {
        await this.logoutButton.click();
    }
}

module.exports = { logoutPage };