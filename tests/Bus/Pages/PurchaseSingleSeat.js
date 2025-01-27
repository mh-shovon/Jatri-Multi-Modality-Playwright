class PurchaseSingleSeat {
    constructor(page) {
        this.allSeats = page.locator('button[class] [fill="none"]');
        this.blockSeats = page.locator('button[disabled]');
        this.boradingPointDropdown = page.locator('div select');
        this.boradingPointDropdownOptions = page.locator('div select option');
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async selectSingleSeatFromSeatView() {
        await this.delay(2000);
        const totalSeats = await this.allSeats.count();
        console.log(`Total seats: ${totalSeats}`);
        const blockSeatsCount = await this.blockSeats.count();
        console.log(`Sold/Blocked seats: ${blockSeatsCount}`);
        for (let i = 0; i < totalSeats; i++) {
            const seat = this.allSeats.nth(i);
            const isDisabled = await seat.getAttribute('disabled');
            if (!isDisabled) {
                await seat.click();
                console.log(`Seat ${i + 1} selected.`);
                return;
            } else {
                console.log(`Seat ${i + 1} is Sold/Blocked.`);
            }
        }
    }

    async userBookingDetails() {
        await this.boradingPointDropdown.nth(0).click();
        await this.delay(500);
        await this.boradingPointDropdownOptions.nth(2).click();
    }
}
module.exports = { PurchaseSingleSeat };