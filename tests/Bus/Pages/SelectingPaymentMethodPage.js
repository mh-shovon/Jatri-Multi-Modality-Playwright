class SelectingPaymentMethodPage {
    constructor(page) {
        //this.enterCouponCode = page.locator('#coupon-code')
        //this.applyCouponButton = page.getByText('Apply coupon');
        this.couponAvailable = page.locator('.overflow-hidden label')
        //this.paymentWithBkashRadioButton = page.locator('#bkash');
        this.paymentWithCreditDebitCardRadioButton = page.locator('#credit-debit-card')
        this.termsAndConditionCheckBox = page.locator('.peer');
        this.proceedToPayButton = page.getByText('Proceeded to pay');
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
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
        await this.delay(2000);
        await this.termsAndConditionCheckBox.click();
        await this.delay(2000);
        await this.proceedToPayButton.click();
        await this.delay(2000);
    }
}
module.exports = { SelectingPaymentMethodPage };