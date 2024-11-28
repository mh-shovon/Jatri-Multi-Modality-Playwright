class LoginPage{
    constructor(page) {
        this.page = page;
        this.loginInButton = page.locator("a button span");
        this.userPhoneNumber = page.locator("#mobile");
        this.getOtpButton = page.getByText('Get OTP');
        this.otpField = page.locator("#otp");
    }

    async openLoginPage() {
        await this.loginInButton.click();
    }

    async enterValidPhoneNumber(userPhoneNumber) {
        await this.userPhoneNumber.fill(userPhoneNumber);
    }

    async clickOnGetOtpButton() {
        await this.getOtpButton.click();
    }

    async enterValidOtp(userOtp) {
        await this.otpField.fill(userOtp)
    }
}
module.exports = { LoginPage };