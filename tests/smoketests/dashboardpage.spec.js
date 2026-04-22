const {test} = require('@playwright/test');
const JobCompassDashboardPage = require('../../pages/jobcompass/JobCompassDashboardPage');

test.describe('Dashboard Page', () => {
    test('Verify Dashboard Title', async ({page}) => {
        // No login needed - already authenticated via storageState
        const dashboardPage = new JobCompassDashboardPage(page);

        // Navigate directly to dashboard
        await page.goto('https://job-seeker-buddy-40.lovable.app');
        await dashboardPage.verifyDashboardTitle();
    });
});