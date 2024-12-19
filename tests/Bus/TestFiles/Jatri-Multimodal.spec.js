const { test } = require('@playwright/test');
const { ControllerPage } = require('../Controller/ControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../JsonFiles/UserInfo.json')));
//const { fetchOtpFromRedis } = require('../OTP/OtpGenerateFromRedis');
const { fetchMostRecentOtpFromMongo } = require('../OTP/GerOtpFromDatabase')

test('Test-1 :: Visit the website and login with valid OTP', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    try {
        const homePage = controllerPage.getHomePage();
        await homePage.openHomepage();

        const loginPage = controllerPage.getLoginPage();
        await loginPage.openLoginPage();
        await loginPage.enterValidPhoneNumber(dataSet.userPhoneNumber);
        await loginPage.clickOnGetOtpButton();

        console.log('Waiting for OTP...');

        // function delay(time) {
        //     return new Promise(function(resolve) {
        //         setTimeout(resolve, time)
        //     });
        // }
        // await delay(10 * 1000);

        // OTP from Redis -------->
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
