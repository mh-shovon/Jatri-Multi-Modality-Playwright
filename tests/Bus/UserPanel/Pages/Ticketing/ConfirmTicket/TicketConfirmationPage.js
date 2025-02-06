class TicketConfirmationPage {
    constructor(page) {
        this.page = page;
        this.selectMobileBankingFromSandbox = page.getByText(' Mobile Banking ');
        this.selectBkashFromSandbox = page.locator('#menu2 li');
        this.succesButtonFromOtpPage = page.locator('input[value=\'Success\']');
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async ticketConfirmation() {
        await this.selectMobileBankingFromSandbox.click();
        await this.delay(2000);
        await this.selectBkashFromSandbox.nth(0).click();
        await this.delay(2000);
        await this.succesButtonFromOtpPage.click();
        await this.delay(2000);
    }
}

module.exports = { TicketConfirmationPage };