class JobCompassLoginPage
{
    constructor(page)
    {
        this.page = page;
        this.email = page.locator('input[type="email"]');
        this.password = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async goto(url)
    {
        await this.page.goto(url);
    }

    async login(email, password)
    {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

module.exports = JobCompassLoginPage;