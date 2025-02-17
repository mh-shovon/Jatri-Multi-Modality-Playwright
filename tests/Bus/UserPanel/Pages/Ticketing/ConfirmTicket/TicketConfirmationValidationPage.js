const {expect} = require("playwright/test");

class TicketConfirmationValidationPage {
    constructor(page) {
        this.page = page;
        this.confirmationLogo = page.locator("img[alt='verified icon']");
        this.confirmationMessage = page.locator("h5[class='pt-6 pb-3 text-dark text-lg lg:text-2xl font-bold']");
        this.bookingId = page.locator("p strong");
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async ticketConfirmationLogo() {
        try {
            await this.delay(2000);
            await expect(this.confirmationLogo).toBeVisible();
            console.log("Confirmation logo is visible.")
        } catch (error) {
            console.error('Logo is not visible:', error);
            throw error;
        }
    }

    async ticketConfirmationMessage() {

        try {
            await expect(this.confirmationMessage).toHaveText("Your booking is Confirmed");
            console.log("Confirmation message is shown.");
            const ticketPnr = await this.bookingId.nth(0).textContent();
            console.log(`Ticket Pnr is: ${ticketPnr}`);

        } catch (error) {
            console.error('Logo is not visible:', error);
            throw error;
        }
    }
}

module.exports = { TicketConfirmationValidationPage };