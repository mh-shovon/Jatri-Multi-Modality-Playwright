class LoginPage{
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#email");
        this.userPassword = page.locator("#password");
        this.loginButton = page.locator(".btn");
    }

    async enterValidEmail(userEmail) {
        await this.userEmail.pressSequentially(userEmail);
    }

    async enterValidPassword(userPassword) {
        await this.userPassword.pressSequentially(userPassword);
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };