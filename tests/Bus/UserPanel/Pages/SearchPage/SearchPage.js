class SearchPage {
    constructor(page) {
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

        this.servicesTab = page.locator(".truncate h4");

        this.directionSwitchButton = page.locator("#toggler-icon");
        this.modifySearchBtn = page.getByRole('button', {name: 'Modify Search'});

        this.noDataLogo = page.locator('.mx-auto');
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
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

    async setJourneyDateUsingCurrentDate() {
        const today = new Date();
        let day = today.getDate();
        let month = today.toLocaleString('default', { month: 'long' });
        let year = today.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        console.log(formattedDate);

        await this.calendarOpen.click();

        let searchDate = day;
        console.log(searchDate);
        let searchMonthWithYear = month + " " + year;
        console.log(searchMonthWithYear)

        const dateCells = await this.date;
        const dateCellsCount = await dateCells.count();
        for (let i = 0; i < dateCellsCount; i++) {
            const dateValue = await dateCells.nth(i).textContent();
            if (Number(dateValue) === searchDate) {
                await this.calendarOpen.click();
                console.log(`Selected date: ${searchDate}`);
                return;
            }else {
                console.log('Date not matched');
            }
        }
        console.log('Calendar selection not works: Date not found');
    }

    async setJourneyDateUsingStaticDate() {
        let searchDate = "3";
        let searchMonthWithYear = "February 2025";
        await this.calendarOpen.click();

        let attempts = 3;
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
            await this.delay(500);
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

    async searchTrip() {
        await  this.searchBtn.click();
        await this.delay(3000);
    }

    async openTheBusSection() {
        let desiredServicesTab = "Buses";
        const servicesTabOptions = await this.servicesTab;
        const servicesTabCount = await servicesTabOptions.count();
        for (let i = 0; i< servicesTabCount; i++) {
            const servicesTabName = await servicesTabOptions.nth(i).textContent();
            if (servicesTabName === desiredServicesTab) {
                await servicesTabOptions.nth(i).click();
                await this.delay(2000);
                console.log(`Selected Tab: ${desiredServicesTab}`);
                const noDataLogoIsVisible = await this.noDataLogo.isVisible();
                await this.delay(2000);
                if (noDataLogoIsVisible) {
                    console.log('No Bus Found. Please try for an another date.')
                }else {
                    console.log('Click on the Select seats of a trip');
                }
                return;
            }
        }
        console.log('Tab selection not works.');
    }

    async modifySearch(){
        await this.directionSwitchButton.click();
        await this.modifySearchBtn.click();
        await this.delay(2000);
        const noDataLogoIsVisible = await this.noDataLogo.isVisible();
        if (!noDataLogoIsVisible) {
            console.log('Click on the Select seats of a trip');
        }else {
            console.log('No Bus Found. Please try for an another date.')
        }
        await this.directionSwitchButton.click();
        await this.modifySearchBtn.click();
        await this.delay(2000);
        if (noDataLogoIsVisible) {
            console.log('No Bus Found. Please try for an another date.')
        }else {
            console.log('Click on the Select seats of a trip');
        }
    }
}

module.exports = { SearchPage };