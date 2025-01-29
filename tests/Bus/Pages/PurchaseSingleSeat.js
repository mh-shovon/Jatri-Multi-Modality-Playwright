class PurchaseSingleSeat {
    constructor(page) {
        this.allSeats = page.locator('button[class] [fill="none"]');
        this.blockSeats = page.locator('button[disabled]');
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
            await this.delay(1000);
            const isBlocked = await this.blockSeats.locator(`nth=${i}`).count() > 0;
            await this.delay(1000);
            if (!isBlocked) {
                await this.delay(1000);
                await seat.click();
                await this.delay(1000);
                console.log(`Seat ${i + 1} selected.`);
                return;  // Exit loop after selecting the first available seat
            } else {
                console.log(`Seat ${i + 1} is sold/blocked.`);
            }
        }
    }
}
module.exports = { PurchaseSingleSeat };