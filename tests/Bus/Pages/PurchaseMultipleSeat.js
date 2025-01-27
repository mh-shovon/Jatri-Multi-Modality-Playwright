class PurchaseMultipleSeat {
    constructor(page) {
        this.allSeats = page.locator('button[class] [fill="none"]');
        this.blockSeats = page.locator('button[disabled]');
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async selectMultipleSeatFromSeatView() {
        await this.delay(2000);
        const totalSeats = await this.allSeats.count();
        console.log(`Total seats: ${totalSeats}`);
        const blockSeatsCount = await this.blockSeats.count();
        console.log(`Sold/Blocked seats: ${blockSeatsCount}`);
        let selectedSeats = 0;
        for (let i = 0; i < totalSeats; i++) {
            if (selectedSeats >= 2) {
                console.log("Successfully selected 2 seats.");
                return;
            }
            const seat = this.allSeats.nth(i);
            const isDisabled = await seat.getAttribute('disabled');
            if (!isDisabled) {
                await seat.click();
                selectedSeats++;
                console.log(`Seat ${i + 1} selected.`);
            } else {
                console.log(`Seat ${i + 1} is Sold/Blocked.`);
            }
        }
        if (selectedSeats < 2) {
            console.log("Not enough available seats found.");
        }
    }
}
module.exports = { PurchaseMultipleSeat };