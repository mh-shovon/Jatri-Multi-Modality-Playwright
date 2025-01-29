const { HomePage } = require('../Pages/HomePage');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchPage}  = require('../Pages/SearchPage');
const { TripListPage } = require('../Pages/TripListPage');
const { PurchaseSingleSeat } = require('../Pages/PurchaseSingleSeat');
const { PurchaseMultipleSeat } = require('../Pages/PurchaseMultipleSeat')
const { UserBookingDetailsPage } = require('../Pages/UserBookingDetailsPage');
const { SelectingPaymentMethodPage } = require('../Pages/SelectingPaymentMethodPage');
const { TicketConfirmationPage } = require('../Pages/TicketConfirmationPage');

class ControllerPage{
    constructor(page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.searchPage = new SearchPage(this.page);
        this.tripListPage = new TripListPage(this.page);
        this.purchaseSingleSeat = new PurchaseSingleSeat(this.page);
        this.purchaseMultipleSeat = new PurchaseMultipleSeat(this.page);
        this.userBookingDetailsPage = new UserBookingDetailsPage(this.page);
        this.selectingPaymentMethodPage = new SelectingPaymentMethodPage(this.page);
        this.ticketConfirmationPage = new TicketConfirmationPage(this.page)
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

    getUserBookingDetailsPage(){
        return this.userBookingDetailsPage;
    }

    getSelectingPaymentMethodPage(){
        return this.selectingPaymentMethodPage;
    }

    getTicketConfirmationPage(){
        return this.ticketConfirmationPage;
    }
}
module.exports = { ControllerPage };