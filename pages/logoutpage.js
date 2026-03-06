class logoutPage {
    constructor(page) {
        this.page = page;
        //this.logoutButton = page.locator("text=Logout");
        this.logoutButton = this.page.locator("//*[contains(@class,'signout')]");
    }
    async logout()
    {
        //const logoutButton = this.page.locator('a.button.secondary.radius');
        //xPath
        //const logoutButton = this.page.locator("//*[contains(@class,'signout')]");
        await this.logoutButton.click();
        //await this.page.pause();
    }
}

module.exports = { logoutPage };