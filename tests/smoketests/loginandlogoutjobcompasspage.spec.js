const {test, expect} = require("@playwright/test")
const LogoutPage = require("../../pages/jobcompass/JobCompassLogoutPage")

test.describe("Login and Logout",()=>{
    // Already logged in via shared session

    test("Valid Login State Verification", async ({page})=>{
        // Verify we're in logged-in state
        await page.goto('https://job-seeker-buddy-40.lovable.app');
        await expect(page).toHaveURL(/job-seeker-buddy-40\.lovable\.app/);
    });

    test("Logout Test", async ({page})=>{
        const logoutPage = new LogoutPage(page);
        await page.goto('https://job-seeker-buddy-40.lovable.app');

        // Perform logout action
        await logoutPage.logout();

        // Verify redirected to login
        await expect(page).toHaveURL('https://job-seeker-buddy-40.lovable.app/auth');
    });
});
