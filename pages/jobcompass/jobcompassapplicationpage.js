class applicationPage {
    constructor(page) {
        this.page = page;
        this.addApplication = this.page.locator('button:has-text("Add Application")');
    }

    async add_application() {
        await this.addApplication.click();
    }
}

module.exports = { applicationPage };