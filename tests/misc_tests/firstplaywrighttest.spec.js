const {test,expect} = require ("@playwright/test")

test("First Playwright test", async ({page})=>{
    await page.goto("https://google.com")   
    await expect(page).toHaveTitle(/Google/)
})

test("Search test", async ({page})=>{
    await page.goto("https://google.com")   
    await page.getByTitle("Search").fill("Playwright Testing")
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(/Playwright/)
})

test("check title", async ({page})=>{
    await page.goto("https://google.com")   
    const title = page.title()
    console.log("Title is: "+ title)
    await expect(page).toHaveTitle("Google")
})

test("Expected Test 1", async ({page})=>{
     expect (5).toBeGreaterThan(2)
})

test("Expected Test 2", async ({page})=>{
    expect (5).toBeLessThan(2)
})

test("Login test", async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.getByRole("button",{name:"Login"}).click()
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
})
/**
 * @see https://playwright.dev/docs/test-configuration
 */
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 *
 */