class SeatViewPage {
    constructor(page) {
        this.allSeats = page.locator('button[class]');
        this.blockSeats = page.locator('button[disabled]');
    }

    async selectSingleSeatFromSeatView() {
        const totalSeats = await this.allSeats.count();
        console.log(`Total seats: ${totalSeats}`);

        const blockSeatsCount = await this.blockSeats.count();
        console.log(`Sold seats: ${blockSeatsCount}`);

        for (let i = 0; i < totalSeats; i++) {
            const seat = this.allSeats.nth(i);

            const isDisabled = await seat.getAttribute('disabled');
            if (!isDisabled) {
                await seat.click();
                console.log(`Seat ${i + 1} selected.`);
            } else {
                console.log(`Seat ${i + 1} is sold.`);
            }
        }

    }
}

module.exports = { SeatViewPage: SeatViewPage };