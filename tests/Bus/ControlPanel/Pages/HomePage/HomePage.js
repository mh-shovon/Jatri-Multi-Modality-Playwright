class HomePage {
    constructor(page) {
        this.page = page;
    }

    async openHomepage() {
        await this.page.goto("https://admin.dev-jatri.jatritech.com/login");
    }
}

module.exports = { HomePage }