const {test, expect} = require("@playwright/test")

test.describe("File upload",()=>{
    test("File upload test", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/upload")
        const filePath = "./tests/resources/samplefile.txt"
        await page.setInputFiles("input#file-upload",filePath)
        await page.click("input#file-submit")
        const uploadedFileName = await page.locator("div#uploaded-files").textContent()
        console.log("Uploaded File Name: "+ uploadedFileName)
        expect (uploadedFileName).toContain("samplefile.txt")
        expect (await page.locator("h3").textContent()).toBe("File Uploaded!")
    })})