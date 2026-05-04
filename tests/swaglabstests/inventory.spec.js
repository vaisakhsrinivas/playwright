const {test} = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../../data/swaglabs_testdata.json')));
const InventoryPage = require('../../pages/swaglabs/SwagLabsProductsPage');
const LoginPage = require('../../pages/swaglabs/SwagLabsLoginPage');

test.describe('Swag Labs Inventory Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(testData[0].url);
        await loginPage.login(testData[0].username, testData[0].password);
    });

    test('Verify Products Page', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.verifyProductsPage();
        await inventoryPage.verifyProductItems();
    })});
    