const {test, expect} = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../../data/testdata.json')));

test.describe('Data Driven Login Tests', function () {
    for (const dataSet of testData) {
        test.describe("Login Test with email and password", function () {
            test(`Login Test with email: ${dataSet.email} and password: ${dataSet.password}`, async ({ page }) => {
                await page.goto('https://freelance-learn-automation.vercel.app/login');
                await page.fill('input[name="email1"]', dataSet.email);
                await page.fill('input[name="password1"]', dataSet.password);
                await page.click('button[type="submit"]');

                if (dataSet.expectedResult === 'success') {
                    await expect(page).toHaveURL('https://freelance-learn-automation.vercel.app/dashboard');
                } else {
                    const errorMessage = await page.locator('.errorMessage').textContent();
                    console.log("Error Message: " + errorMessage);
                    if (dataSet.email === "test1@example.com"){
                        expect(errorMessage).toContain("USER Email Doesn't Exist");
                    }
                    else {
                    expect(errorMessage).toContain("Email and Password Doesn't match");
                    }
                }
            });
        });
    }
});