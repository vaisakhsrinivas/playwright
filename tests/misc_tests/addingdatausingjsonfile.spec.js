const {test, expect} = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../../data/testdata.json')));

test.skip('Add Data Using JSON File', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.fill('input[name="email1"]', testData.email);
    await page.fill('input[name="password1"]', testData.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('https://freelance-learn-automation.vercel.app/dashboard');
});

test.only('Negative Login Test Using JSON File', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.fill('input[name="email1"]', testData.wrongemail);
    await page.fill('input[name="password1"]', testData.wrongpassword);
    await page.click('button[type="submit"]');
    const errorMessage = await page.locator('.errorMessage').textContent();
    console.log("Error Message: " + errorMessage);
    expect(errorMessage).toContain('USER Email Doesn\'t Exist');
});

    
