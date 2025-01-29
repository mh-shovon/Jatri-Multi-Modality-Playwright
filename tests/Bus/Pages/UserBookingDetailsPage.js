class UserBookingDetailsPage {
    constructor(page) {
        this.boradingPointDropdown = page.locator('div select');
        this.droppingPointDropdown = page.locator('div select');
        this.travelerDropdown = page.locator('div select');
        this.continueButton = page.getByText('Continue');
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async userBookingDetails() {
        await this.boradingPointDropdown.nth(0).selectOption("Shamoli Counter");
        await this.delay(1000);
        await this.droppingPointDropdown.nth(1).selectOption("Cox's Bazar Sadar Counter");
        await this.delay(1000);
        await this.travelerDropdown.nth(2).selectOption("Mehedi Hasan Shovon");
        await this.delay(1000);
        await this.continueButton.click();
        await this.delay(1000)
    }
}
module.exports = { UserBookingDetailsPage };