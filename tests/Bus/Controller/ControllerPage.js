const { HomePage } = require('../Pages/HomePage');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchPage}  = require('../Pages/SearchPage');
const { TripListPage } = require('../Pages/TripListPage');
const { SeatViewPage } = require('../Pages/SeatViewPage');

class ControllerPage{
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.searchPage = new SearchPage(this.page);
        this.tripListPage = new TripListPage(this.page);
        this.seatViewPage = new SeatViewPage(this.page);
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

    getTripListPage(){
        return this.tripListPage;
    }

    getSeatViewPage(){
        return this.seatViewPage;
    }
}
module.exports = { ControllerPage };