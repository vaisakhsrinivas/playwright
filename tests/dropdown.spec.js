const { test,expect } = require("@playwright/test")

test.describe("Dropdown Suite",()=>{
    test("Dropdown test", async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/dropdown")
        page.locator("#dropdown").waitFor({state: 'visible'})
        const dropdown = page.locator("#dropdown")
        await dropdown.selectOption({value:"1"})
        let selectedOption = await dropdown.inputValue()
        console.log("Selected option value is: "+ selectedOption)
        expect (selectedOption).toContain("1")
        await dropdown.selectOption({value:"2"})
        selectedOption = await dropdown.inputValue()
        console.log("Selected option value is: "+ selectedOption)
        expect (selectedOption).toContain("2")
    })

    test("Multi Select Dropdown test", async ({page})=>{
        await page.goto("https://demoqa.com/select-menu")
        page.locator("#cars").waitFor({state: 'visible'})
        const multiSelect = page.locator("#cars")
        await multiSelect.selectOption(["volvo","saab"])
        let selectedOptions = await multiSelect.evaluateAll((options) => Array.from(options).filter(option => option.selected).map(option => option.value));
        console.log("Selected options values are: "+ selectedOptions.join(", "))
        expect (selectedOptions).toContain(["volvo","saab"])
        await multiSelect.selectOption(["audi","opel"])
        selectedOptions = await multiSelect.evaluateAll((options) => Array.from(options).filter(option => option.selected).map(option => option.value));
        console.log("Selected options values are: "+ selectedOptions.join(", "))
        expect (selectedOptions).toContain(["audi","opel"])
    })
})