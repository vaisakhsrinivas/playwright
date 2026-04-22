const {test, expect} = require("@playwright/test")
const LogoutPage = require("../../pages/jobcompass/JobCompassLogoutPage")
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

test.describe("Login and Logout",()=>{
    // Already logged in via shared session

    test("Valid Login State Verification", async ({page})=>{
        // Verify we're in logged-in state
        await page.goto(testData[0].dashboardUrl);
        await expect(page).toHaveURL(/job-seeker-buddy-40\.lovable\.app/);
    });

    test("Logout Test", async ({page})=>{
        const logoutPage = new LogoutPage(page);
        await page.goto(testData[0].dashboardUrl);

        // Perform logout action
        await logoutPage.logout();

        // Verify redirected to login
        await expect(page).toHaveURL(testData[0].url);
    });
});
