const {test} = require('@playwright/test');
const JobCompassDashboardPage = require('../../pages/jobcompass/JobCompassDashboardPage');
const LoginPage = require('../../pages/jobcompass/JobCompassLoginPage');
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

test.describe('Dashboard Page', () => {
    test('Verify Dashboard Title', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(testData[0].url);
        await loginPage.login(testData[0].email, testData[0].password);
        const dashboardPage = new JobCompassDashboardPage(page);
        await dashboardPage.verifyDashboardTitle();
    });
});