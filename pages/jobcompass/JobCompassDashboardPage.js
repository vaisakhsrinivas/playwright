const { expect } = require('@playwright/test');

class JobCompassDashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardTitle = this.page.locator('h1:has-text("Dashboard")');
    }
    async verifyDashboardTitle() {
        await expect(this.dashboardTitle).toBeVisible();
        await expect(this.dashboardTitle).toHaveText("Dashboard");
    }
}

module.exports = JobCompassDashboardPage;
