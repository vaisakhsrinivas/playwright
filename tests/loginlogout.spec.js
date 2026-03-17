const {test,expect} = require ("@playwright/test")

test.describe("Login Logout Suite",()=>{
    test("Login test", async ({page})=>{
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        //await page.getByPlaceholder("Username").fill("Admin")
        await page.locator("input[placeholder='Username']").fill("Admin")
        await page.getByPlaceholder("Password").fill("admin123")
        await page.getByRole("button",{name:"Login"}).click()
        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    })
    
    test("Logout test", async ({page})=>{
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await page.getByPlaceholder("Username").fill("Admin")
        await page.getByPlaceholder("Password").fill("admin123")
        await page.getByRole("button",{name:"Login"}).click()
        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        await page.getByRole("button",{name:"Paul Collings"}).click()
        await page.getByRole("link",{name:"Logout"}).click()
        await expect (page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    })
})