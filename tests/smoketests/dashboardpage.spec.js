const {test} = require('@playwright/test');
const JobCompassDashboardPage = require('../../pages/jobcompass/JobCompassDashboardPage');
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

test.describe('Dashboard Page', () => {
    test('Verify Dashboard Title', async ({page}) => {
        // No login needed - already authenticated via storageState
        const dashboardPage = new JobCompassDashboardPage(page);

        // Navigate directly to dashboard
        await page.goto(testData[0].dashboardUrl);
        await dashboardPage.verifyDashboardTitle();
    });
});