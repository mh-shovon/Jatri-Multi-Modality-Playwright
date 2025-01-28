class PurchaseSingleSeat {
    constructor(page) {
        this.allSeats = page.locator('button[class] [fill="none"]');
        this.blockSeats = page.locator('button[disabled]');
        this.boradingPointDropdown = page.locator('div select');
        this.droppingPointDropdown = page.locator('div select');
        this.travelerDropdown = page.locator('div select');
        this.continueButton = page.getByText('Continue');
        //this.enterCouponCode = page.locator('#coupon-code')
        //this.applyCouponButton = page.getByText('Apply coupon');
        this.couponAvailable = page.locator('.overflow-hidden label')
        //this.paymentWithBkashRadioButton = page.locator('#bkash');
        this.paymentWithCreditDebitCardRadioButton = page.locator('#credit-debit-card')
        this.termsAndConditionCheckBox = page.locator('.peer');
        this.proceedToPayButton = page.getByText('Proceeded to pay');
        this.selectMobileBankingFromSandbox = page.getByText(' Mobile Banking ');
        this.selectBkashFromSandbox = page.locator('#menu2 li');
        this.succesButtonFromOtpPage = page.locator('input[value=\'Success\']')

    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async selectSingleSeatFromSeatView() {
        await this.delay(2000);
        const totalSeats = await this.allSeats.count();
        console.log(`Total seats: ${totalSeats}`);
        const blockSeatsCount = await this.blockSeats.count();
        console.log(`Sold/Blocked seats: ${blockSeatsCount}`);
        for (let i = 0; i < totalSeats; i++) {
            const seat = this.allSeats.nth(i);
            const isDisabled = await seat.getAttribute('disabled');
            if (!isDisabled) {
                await seat.click();
                console.log(`Seat ${i + 1} selected.`);
                return;
            } else {
                console.log(`Seat ${i + 1} is Sold/Blocked.`);
            }
        }
    }

    async userBookingDetails() {
        await this.boradingPointDropdown.nth(0).selectOption("Shamoli Counter");
        await this.delay(500);
        await this.droppingPointDropdown.nth(1).selectOption("Cox's Bazar Sadar Counter");
        await this.delay(500);
        await this.travelerDropdown.nth(2).selectOption("Mehedi Hasan Shovon");
        await this.delay(500);
        await this.continueButton.click();
        await this.delay(500)
    }

    async selectingPaymentMethodAndTicketConfirmation() {
        const isCouponSectionAvailable = await this.couponAvailable.nth(0).isVisible()
        if(isCouponSectionAvailable) {
            await this.couponAvailable.nth(0).click();
            await this.delay(500);
        } else {
            console.log('Promo section is not available. Skipping this step.');
        }
        await this.paymentWithCreditDebitCardRadioButton.click();
        await this.delay(500);
        await this.termsAndConditionCheckBox.click();
        await this.delay(500);
        await this.proceedToPayButton.click();
        await this.delay(1000);
        await this.selectMobileBankingFromSandbox.click();
        await this.delay(500);
        await this.selectBkashFromSandbox.nth(0).click();
        await this.delay(500);
        await this.succesButtonFromOtpPage.click();
        await this.delay(10000);
    }
}
module.exports = { PurchaseSingleSeat };