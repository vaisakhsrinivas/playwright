const {test, expect} = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../../data/swaglabs_testdata.json')));
const SwagLabsLoginPage = require('../../pages/swaglabs/SwagLabsLoginPage');

test.describe('Swag Labs Login Tests', () => {
    test('Valid Login Test', async ({ page }) => {
        const loginPage = new SwagLabsLoginPage(page);
        await loginPage.goto(testData[0].url);
        await loginPage.login(testData[0].username, testData[0].password);
        await expect(page).toHaveURL(/inventory/);
    })

    test('Invalid Login Test', async ({ page }) => {
        const loginPage = new SwagLabsLoginPage(page);
        await loginPage.goto(testData[0].url);
        await loginPage.login(testData[0].username, testData[0].wrong_password);
        await expect(page.locator('.error-message-container')).toBeVisible();
    })


});
