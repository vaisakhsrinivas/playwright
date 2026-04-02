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
/* To be fixed: This test is failing because the error message is not visible on the page after an invalid login attempt. 
 The test is trying to locate the error message using the text content, but it seems that the error message is not being rendered or is not visible in the DOM. This could be due to a variety of reasons such as incorrect selectors, timing issues, or changes in the application's UI. To fix this, we need to ensure that we are using the correct selectors to locate the error message and also consider adding some wait time to allow the error message to appear before asserting its visibility and text content.
test.only("Invalid Login Test", async ({page})=>{
    const loginPage = new LoginPage.loginPage(page)
    await loginPage.goto()
    await loginPage.login(testData[2].invalidEmail,testData[2].invalidPassword)
    await expect(page.getByText(testData[2].invalidLoginMessage)).toBeVisible()
    await expect(page.getByText(testData[2].invalidLoginMessage)).toHaveText(testData[2].invalidLoginMessage)
})*/

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