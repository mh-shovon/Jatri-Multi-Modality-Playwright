const { HomePage } = require('../Pages/HomePage');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchPage}  = require('../Pages/SearchPage');
const { TripListPage } = require('../Pages/TripListPage');
const { PurchaseSingleSeat } = require('../Pages/PurchaseSingleSeat');
const { PurchaseMultipleSeat } = require('../Pages/PurchaseMultipleSeat')

class ControllerPage{
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.searchPage = new SearchPage(this.page);
        this.tripListPage = new TripListPage(this.page);
        this.purchaseSingleSeat = new PurchaseSingleSeat(this.page);
        this.purchaseMultipleSeat = new PurchaseMultipleSeat(this.page);
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

    getPurchaseSingleSeat(){
        return this.purchaseSingleSeat;
    }

    getPurchaseMultipleSeat(){
        return this.purchaseMultipleSeat;
    }
}
module.exports = { ControllerPage };