const {test, expect} = require ("@playwright/test")

test.describe("Error Verification Suite",()=>{
    test("Verify 404 error", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/status_codes/404")
        const errorText = await page.locator("div.example p").textContent()
        console.log("Error Text is: "+ errorText)
        expect (errorText).toContain("This page returned a 404 status code")
    })

    test("Verify 500 error", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/status_codes/500")
        const errorText = await page.locator("div.example p").textContent()
        console.log("Error Text is: "+ errorText)
        expect (errorText).toContain("This page returned a 500 status code")
    })

    test("Verify 301 error", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/status_codes/301")
        const errorText = await page.locator("div.example p").textContent()
        console.log("Error Text is: "+ errorText)
        expect (errorText).toContain("This page returned a 301 status code")
    })

    test("Verify 200 status", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/status_codes/200")
        const errorText = await page.locator("div.example p").textContent()
        console.log("Error Text is: "+ errorText)
        expect (errorText).toContain("This page returned a 200 status code")
    })

    test("Verify 403 error", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/status_codes/403")
        const errorText = await page.locator("div.example p").textContent()
        console.log("Error Text is: "+ errorText)
        expect (errorText).toContain("403 Forbidden")
    })

    test("Verify actual login", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/login")
        await page.locator("#username").fill("tomsmith")
        await page.locator("#password").fill("SuperSecretPassword!")
        await page.locator("button[type='submit']").click()
        const successMessage = await page.locator("div#flash").textContent()
        console.log("Success Message: "+ successMessage)
        expect (successMessage).toContain("You logged into a secure area!")
    })

    test("Verify invalid login", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/login")
        await page.locator("#username").fill("invalidUser")
        await page.locator("#password").fill("invalidPassword")
        await page.locator("button[type='submit']").click()
        const errorMessage = await page.locator("div#flash").textContent()
        console.log("Error Message: "+ errorMessage)
        expect (errorMessage).toContain("Your username is invalid!")
    })
})