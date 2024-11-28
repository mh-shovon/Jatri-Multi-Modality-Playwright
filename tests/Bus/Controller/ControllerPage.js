const { HomePage } = require('../Pages/HomePage');
const { LoginPage } = require('../Pages/LoginPage');

class ControllerPage{
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page)
    }

    getHomePage(){
        return this.homePage;
    }

    getLoginPage(){
        return this.loginPage;
    }
}
module.exports = { ControllerPage };