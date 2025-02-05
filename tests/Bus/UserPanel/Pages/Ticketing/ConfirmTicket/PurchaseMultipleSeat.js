class PurchaseMultipleSeat {
    constructor(page) {
        this.allSeats = page.locator('button[class] [fill="none"]');
        this.blockSeats = page.locator('button[disabled]');
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async selectMultipleSeatsFromSeatView(seatsToSelect = 2) {
        await this.delay(2000);
        const totalSeats = await this.allSeats.count();
        console.log(`Total seats: ${totalSeats}`);
        const blockSeatsCount = await this.blockSeats.count();
        console.log(`Sold/Blocked seats: ${blockSeatsCount}`);
        let selectedSeats = 0;
        for (let i = 0; i < totalSeats; i++) {
            if (selectedSeats >= seatsToSelect) {
                console.log(`Successfully selected ${selectedSeats} seats.`);
                return
            }
            const seat = this.allSeats.nth(i);
            await this.delay(1000);
            const isBlocked = await this.blockSeats.locator(`nth=${i}`).count() > 0;
            await this.delay(1000);
            if (!isBlocked) {
                await this.delay(1000);
                await seat.click();
                await this.delay(1000);
                selectedSeats++;
                console.log(`Seat ${i + 1} selected. Total selected: ${selectedSeats}`);
            } else {
                console.log(`Seat ${i + 1} is sold/blocked.`);
            }
        }
        if (selectedSeats < seatsToSelect) {
            console.log(`Warning: Only ${selectedSeats} seats were available and selected.`);
        }
    }
}
module.exports = { PurchaseMultipleSeat };