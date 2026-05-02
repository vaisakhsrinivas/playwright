const {test, expect} = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

test.describe('Data Driven Login Tests', function () {
    for (const dataSet of testData) {
        test.describe("Login Test with email and password", function () {
            test(`Login Test with email: ${dataSet.email} and password: ${dataSet.password}`, async ({ page }) => {
                await page.goto(dataSet.url);
                await page.fill('input[type="email"]', dataSet.email);
                await page.locator('#password').fill(dataSet.password);
                await page.click('button[type="submit"]');

                if (await page.locator('button:has-text("Dashboard")').isVisible()) {
                    await expect(page).toHaveURL(dataSet.dashboardUrl);
                } else {
                    const errorMessage = await page.locator('.errorMessage').textContent();
                    console.log("Error Message: " + errorMessage);
                }
            });
        });
    }
});