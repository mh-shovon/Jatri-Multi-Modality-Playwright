const { test } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
const { ControllerPage } = require('../Controller/ControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../JsonFiles/UserInfo.json')));
//const { fetchOtpFromRedis } = require('../OTP/OtpGenerateFromRedis');
const { fetchMostRecentOtpFromMongo } = require('../OTP/GerOtpFromDatabase')

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

test.beforeEach('Test-1 :: Visit the website and login with valid OTP', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    try {
        const homePage = controllerPage.getHomePage();
        await homePage.openHomepage();

        const loginPage = controllerPage.getLoginPage();
        await loginPage.openLoginPage();
        await loginPage.enterValidPhoneNumber(dataSet.userPhoneNumber);
        await loginPage.clickOnGetOtpButton();

        console.log('Waiting for OTP...');

        // OTP from Redis -------->
        // await delay(10 * 1000); [For redis use this wait]
        // const otp = await fetchOtpFromRedis(dataSet.userPhoneNumber);
        // await loginPage.enterValidOtp(otp);

        // OTP from Database ------>
        const otp = await fetchMostRecentOtpFromMongo(dataSet.userPhoneNumber);
        console.log(`Fetched OTP: ${otp}`);
        await loginPage.enterValidOtp(otp);
    } catch (error) {
        console.error('Failed to fetch OTP:', error);
        throw error;
    }
});

test('Test-2 :: Enter search details for searching trips', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    try {
        const searchPage = controllerPage.getSearchPage();
        await delay(3 * 1000);
        await searchPage.setFromCity();
        await delay(3 * 1000);
        await searchPage.setDestinationCity();
        await delay(3 * 1000);
        await searchPage.setJourneyDate();
        await delay(3 * 1000);
    } catch (error) {
        console.error('Failed to set search Data', error);
    }
});
