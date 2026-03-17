const {test, expect} = require("@playwright/test")
const LoginPage = require("../pages/adhocpages/loginpage")
const LogoutPage = require("../pages/adhocpages/logoutpage")

test.describe("Login and Logout",()=>{
    /*test.beforeEach(async ({page})=>{
        await loginPage.goto()
    })*/

    test("Valid Login Test", async ({page})=>{
        const loginPage = new LoginPage.loginPage(page)
        await loginPage.goto()
        await loginPage.login("tomsmith","SuperSecretPassword!")
        const successMessage = await page.locator("div#flash").textContent()
        console.log("Success Message: "+ successMessage)
        expect (successMessage).toContain("You logged into a secure area!")
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