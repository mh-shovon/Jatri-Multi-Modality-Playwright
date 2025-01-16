class HomePage {
    constructor(page) {
        this.page = page;
    }

    async openHomepage() {
        await this.page.goto("https://dev-jatri.jatritech.com/");
    }
}

module.exports = { HomePage }