const testdata = JSON.parse(JSON.stringify(require('../../data/swaglabs_testdata.json')));
const url = testdata[0].url;    

class loginpage {

    constructor(page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('input[type="submit"]');
    }

    async goto() {
        await this.page.goto(url);
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}
module.exports = loginpage;