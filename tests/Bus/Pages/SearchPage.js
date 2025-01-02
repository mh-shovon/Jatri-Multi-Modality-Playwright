class SearchPage {
    constructor(page) {
        //this.page = page;

        this.fromCity = page.locator("id=from");
        this.searchFromCity = page.locator("id=search-from")
        this.fromCitySubCityList = page.locator("ul li .font-normal");

        this.destinationCity = page.locator("id=to");
        this.searchDestinationCity = page.locator("id=search-to");
        this.destinationCitySubCityList = page.locator("ul li .font-normal");

        this.calendarOpen = page.locator("id=date");
    }

    async setFromCity() {
        await this.fromCity.click();
        await this.searchFromCity.pressSequentially("dha");
        let desiredFromCityName = "Dhaka";
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
        function delay(time) {
            return new Promise(function(resolve) {
                setTimeout(resolve, time)
            });
        }
        await this.destinationCity.click();
        await delay(2*1000);
        await this.searchDestinationCity.pressSequentially("cox");
        await delay(2*1000);
        let desiredDestinationCityName = "Cox's Bazar";
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
        await this.calendarOpen.click();
    }
}

module.exports = { SearchPage };