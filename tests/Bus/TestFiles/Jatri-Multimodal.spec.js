const { test, expect } = require('@playwright/test');
const { ControllerPage } = require('../Controller/ControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../JsonFiles/UserInfo.json')));
const Redis = require('ioredis');

const redis = new Redis({
    host: '128.199.226.196',
    port: 6379,
    password: 'JfzjT!MtVDAJZSqSPFv5KWDERaxHm9EQDq9SsDQ0pKP4dh8iwVJ8a4ffBBIJI'
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
    let otp;
    while (!otp) {
        otp = await redis.get('auth-mm:cache:01983285059');
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
