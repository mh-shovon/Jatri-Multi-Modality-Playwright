class SearchPage {
    constructor(page) {
        this.page = page;
        this.fromCity = page.locator("id=from");
        this.destinationCity = page.locator("id=to");
        this.calendarOpen = page.locator("id=date");
    }

    async setSearchData() {
        await this.fromCity.type("Dha")
    }
}

module.exports = { SearchPage };