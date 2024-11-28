class LoginPage{
    constructor(page) {
        this.page = page;
        this.loginInButton = page.locator("a button span");
        this.userPhoneNumber = page.locator("#mobile");
        this.getOtpButton = page.getByText('Get OTP');
    }

    async openLoginPage() {
        await this.loginInButton.click();
    }

    async loginWithValidCredentials(userPhoneNumber) {
        await this.userPhoneNumber.fill(userPhoneNumber);
        await this.getOtpButton.click();
    }
}
module.exports = { LoginPage };