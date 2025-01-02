class HomePage {
    constructor(page) {
        this.page = page;
        this.fromCity = page.locator("id=from");
        this.destinationCity = page.locator("id=to");
        this.calendarOpen = page.locator("id=date");
    }

    async openHomepage() {
        await this.page.goto("https://dev-jatri.jatritech.com/");
    }
}

module.exports = { HomePage }