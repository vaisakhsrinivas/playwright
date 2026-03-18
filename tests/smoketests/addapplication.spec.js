const {test, expect} = require('@playwright/test');
const LoginPage = require('../../pages/jobcompass/jobcompassloginpage');
const ApplicationPage = require('../../pages/jobcompass/jobcompassapplicationpage');
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

test.describe('Add Application', () => {
    test('Add Application Test', async ({ page }) => {
        const loginPage = new LoginPage.loginPage(page);
        await loginPage.goto();
        await loginPage.login(testData[0].email, testData[0].password);
        const applicationPage = new ApplicationPage.applicationPage(page);
        await applicationPage.add_application();
        await expect(page).toHaveURL(testData[0].applicationUrl);
        await expect(page.getByText(testData[0].newapplicationlabel)).toBeVisible();
        await expect(page.getByText(testData[0].newapplicationlabel)).toHaveText(testData[0].newapplicationlabel);
    });
    test('Add Application with Details Test', async ({ page }) => {
        const loginPage = new LoginPage.loginPage(page);
        await loginPage.goto();
        await loginPage.login(testData[0].email, testData[0].password);
        const applicationPage = new ApplicationPage.applicationPage(page);
        await applicationPage.add_application_with_details(testData[1].jobTitle, testData[1].companyName, testData[1].jobLocation, testData[1].salaryRange, testData[1].jobUrl, testData[1].notes);
        await expect(page.getByText(testData[1].jobTitle).first()).toBeVisible();
        await expect(page.getByText(testData[1].companyName).first()).toBeVisible();
    });
});