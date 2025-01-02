class LoginPage{
    constructor(page) {
        this.page = page;
        this.loginInButton = page.locator("a button span");
        this.userPhoneNumber = page.locator("#mobile");
        this.getOtpButton = page.getByText('Get OTP');
        this.otpField = page.locator("#otp");
        this.confirmButton = page.getByText('Confirm');
    }

    async openLoginPage() {
        await this.loginInButton.click();
    }

    async enterValidPhoneNumber(userPhoneNumber) {
        await this.userPhoneNumber.pressSequentially(userPhoneNumber);
    }

    async clickOnGetOtpButton() {
        await this.getOtpButton.click();
    }

    async enterValidOtp(userOtp) {
        await this.otpField.fill(userOtp);
        await this.confirmButton.click();
    }
}

module.exports = { LoginPage };