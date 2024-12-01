const { test } = require('@playwright/test');
const { ControllerPage } = require('../Controller/ControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../JsonFiles/UserInfo.json')));
require('dotenv').config();
const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

test('Test-1 :: Visit the website and login with valid OTP', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    const homePage = controllerPage.getHomePage();
    await homePage.openHomepage();

    const loginPage = controllerPage.getLoginPage();
    await loginPage.openLoginPage();
    await loginPage.enterValidPhoneNumber(dataSet.userPhoneNumber);
    await loginPage.clickOnGetOtpButton();

    console.log('Waiting for OTP...');

    function delay(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    }
    await delay(10 * 1000);

    let otp;
    while (!otp) {
        otp = await redis.get('auth-mm:cache:' + dataSet.userPhoneNumber);
        otp = JSON.parse(otp);
        if (!otp) {
            await new Promise(resolve => setTimeout(resolve, 60 * 1000));
        }
    }
    console.log(`Retrieved OTP: ${otp}`);
    dataSet.userOtp = otp;

    await loginPage.enterValidOtp(dataSet.userOtp);

    redis.disconnect();
});
