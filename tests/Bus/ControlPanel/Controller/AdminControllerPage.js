const { HomePage } = require('../Pages/HomePage/HomePage');
const { LoginPage } = require('../Pages/LoginPage/LoginPage');

class AdminControllerPage {
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(this.page);
    }

    getHomePage(){
        return this.homePage;
    }

    getLoginPage(){
        return this.loginPage;
    }
}
module.exports = { AdminControllerPage };