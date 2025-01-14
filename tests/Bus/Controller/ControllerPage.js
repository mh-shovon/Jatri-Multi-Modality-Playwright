const { HomePage } = require('../Pages/HomePage');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchPage}  = require('../Pages/SearchPage');
const { TripViewPage } = require('../Pages/TripViewPage');

class ControllerPage{
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.searchPage = new SearchPage(this.page);
        this.tripViewPage = new TripViewPage(this.page);
        this.seatViewPage = new TripViewPage(this.page);
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

    getTripViewPage(){
        return this.tripViewPage;
    }

    getSeatViewPage(){
        return this.seatViewPage;
    }
}
module.exports = { ControllerPage };