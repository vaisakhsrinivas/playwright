class loginPage
{
    constructor(page)
    {
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async goto()
    {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username, password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        //await this.page.pause();
    }
}

module.exports = { loginPage };