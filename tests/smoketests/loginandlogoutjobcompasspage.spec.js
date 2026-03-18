const {test, expect} = require("@playwright/test")
const LoginPage = require("../../pages/jobcompass/jobcompassloginpage")
const LogoutPage = require("../../pages/jobcompass/jobcompasslogoutpage")
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

test.describe("Login and Logout",()=>{
    /*test.beforeEach(async ({page})=>{
        await loginPage.goto()
    })*/

    test("Valid Login Test", async ({page})=>{
        const loginPage = new LoginPage.loginPage(page)
        await loginPage.goto()
        await loginPage.login(testData[0].email,testData[0].password)
        await expect(page).toHaveURL(testData[0].dashboardUrl)
    }
)

    test("Logout Test", async ({page})=>{
        const loginPage = new LoginPage.loginPage(page)
        await loginPage.goto()
        await loginPage.login(testData[0].email,testData[0].password)
        const logoutPage = new LogoutPage.logoutPage(page)
        await logoutPage.logout()
        const logoutMessage = await page.getByText("Welcome back").textContent()
        await expect(page.getByText("Welcome back")).toBeVisible()
        expect (logoutMessage).toContain("Welcome back")
        await expect(page).toHaveURL(testData[0].url)
    })
})