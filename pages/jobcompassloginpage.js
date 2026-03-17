
const testData = JSON.parse(JSON.stringify(require('../data/jobcompass_testdata.json')));

class loginPage
{
    constructor(page)
    {
        this.page = page;
        this.email = page.locator('input[type="email"]');
        this.password = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async goto()
    {
        await this.page.goto(testData[0].url);
    }

    async login(email, password)
    {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { loginPage };