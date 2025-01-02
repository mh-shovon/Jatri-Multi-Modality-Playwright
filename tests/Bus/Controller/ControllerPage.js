const { HomePage } = require('../Pages/HomePage');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchPage}  = require('../Pages/SearchPage');

class ControllerPage{
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.searchPage = new SearchPage(this.page);
    }

    getHomePage(){
        return this.homePage;
    }

    getLoginPage(){
        return this.loginPage;
    }

    getSearchPage(){
        return this.searchPage;
    }
}
module.exports = { ControllerPage };