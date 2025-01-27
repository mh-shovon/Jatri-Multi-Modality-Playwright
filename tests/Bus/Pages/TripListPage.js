class TripListPage {
    constructor(page) {
        this.tripOrCoachNo = page.locator(".mt-1");
        this.selectSeatsBtn = page.getByRole('button', {name: 'Select Seats'});
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async findTripsAndGoToTheSelectSeatsSection() {
        let desiredTripOrCoachNo = "MT-Automation-001";
        let tripOrCoachNoCount = await this.tripOrCoachNo.count();
        let i = 0;
        let isTripFound = false;
        while (i < tripOrCoachNoCount) {
            if (desiredTripOrCoachNo === await this.tripOrCoachNo.nth(i).textContent()) {
                await this.selectSeatsBtn.nth(i).click();
                isTripFound = true;
                break;
            }
            i++;
        }
        if (!isTripFound) {
            console.log("Trip or coach no not found in the list");
        }
    }
}

module.exports = { TripListPage };