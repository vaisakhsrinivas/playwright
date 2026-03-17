const {test, expect} = require("@playwright/test")
const LoginPage = require("../pages/jobcompassloginpage")
const LogoutPage = require("../pages/jobcompasslogoutpage")
const testData = JSON.parse(JSON.stringify(require('../data/jobcompass_testdata.json')));

test.describe("Login and Logout",()=>{
    /*test.beforeEach(async ({page})=>{
        await loginPage.goto()
    })*/

    test.only("Valid Login Test", async ({page})=>{
        const loginPage = new LoginPage.loginPage(page)
        await loginPage.goto()
        await loginPage.login(testData[0].email,testData[0].password)
        await expect(page).toHaveURL(testData[0].dashboardUrl)
    }
)

    test("Logout Test", async ({page})=>{
        const loginPage = new LoginPage.loginPage(page)
        await loginPage.goto()
        await loginPage.login("tomsmith","SuperSecretPassword!")
        const logoutPage = new LogoutPage.logoutPage(page)
        await logoutPage.logout()
        const logoutMessage =  await page.locator("div#flash").textContent()
        console.log("Logout Message: "+ logoutMessage)
        expect (logoutMessage).toContain("You logged out of the secure area!")
    })
})