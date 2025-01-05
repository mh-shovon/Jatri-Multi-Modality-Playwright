class SearchPage {
    constructor(page) {
        //this.page = page;

        this.fromCity = page.locator("id=from");
        this.searchFromCity = page.locator("id=search-from")
        this.fromCitySubCityList = page.locator("ul li .font-normal");

        //this.destinationCity = page.locator("id=to");
        this.searchDestinationCity = page.locator("id=search-to");
        this.destinationCitySubCityList = page.locator("ul li .font-normal");

        this.calendarOpen = page.locator("id=date");
        this.date = page.locator(".vc-day-content");
        this.monthWithYear = page.locator(".vc-title");
        //this.calendarPreviousBtn = page.locator(".vc-prev");
        this.calendarNextBtn = page.locator(".vc-next");

        this.searchBtn = page.getByRole('button', {name: 'Search'});
    }

    async setFromCity() {
        let desiredFromCityName = "Dhaka";
        await this.fromCity.click();
        await this.searchFromCity.pressSequentially("dha");
        const fromCitySubCityListCount = await this.fromCitySubCityList.count();
        let i =0;
        while (i < fromCitySubCityListCount) {
            if(await this.fromCitySubCityList.nth(i).textContent() === desiredFromCityName) {
                await this.fromCitySubCityList.nth(i).click();
                console.log("Set the From city");
                break;
            }
            i++;
        }
    }

    async setDestinationCity() {
        let desiredDestinationCityName = "Cox's Bazar";
        await this.searchDestinationCity.pressSequentially("cox");
        const destinationCitySubCityListCount = await this.destinationCitySubCityList.count();
        let j =0;
        while (j < destinationCitySubCityListCount) {
            if(await this.destinationCitySubCityList.nth(j).textContent() === desiredDestinationCityName) {
                await this.destinationCitySubCityList.nth(j).click();
                console.log("Set the Destination city");
                break;
            }
            j++;
        }
    }

    async setJourneyDate() {
        function delay(time) {
            return new Promise(function(resolve) {
                setTimeout(resolve, time)
            });
        }

        let searchDate = "15";
        let searchMonthWithYear = "August 2025";
        await this.calendarOpen.click();

        let attempts = 1;
        const maxAttempts = 12;
        while (true) {
            const currentMonthYear = await this.monthWithYear.textContent();
            if (currentMonthYear === searchMonthWithYear) {
                console.log(`Matched month-year: ${currentMonthYear}`);
                break;
            }
            else if (attempts > maxAttempts) {
                console.log("Month-Year not found within maximum attempts.");
                return;
            }
            await this.calendarNextBtn.click();
            await delay(1000);
        }

        const dateCells = await this.date;
        const dateCellsCount = await dateCells.count();
        for (let i = 0; i < dateCellsCount; i++) {
            const dateValue = await dateCells.nth(i).textContent();
            if (dateValue === searchDate) {
                await dateCells.nth(i).click();
                console.log(`Selected date: ${searchDate}`);
                return;
            }
        }
        console.log('Calendar selection not works: Date not found');
    }

    async clickOnSearchBtn() {
        await  this.searchBtn.click();
    }
}

module.exports = { SearchPage };