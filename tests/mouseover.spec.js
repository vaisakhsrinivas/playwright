const {test, expect} = require("@playwright/test")

test.describe("Mouse hover tests",()=>{
    test("Mouse hover test on demoqa", async ({page})=>{
        await page.goto("https://demoqa.com/menu/")
        const mainItem = page.locator("text=Main Item 2")
        await mainItem.hover()
        const subItem = page.locator("text=SUB SUB LIST »")
        await subItem.hover()
        const subSubItem = page.locator("text=Sub Sub Item 2")
        await subSubItem.click()
        // No assertion as clicking the item does not lead to any change on the page
    })
})