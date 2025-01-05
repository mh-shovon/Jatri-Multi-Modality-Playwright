const { test } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
const { ControllerPage } = require('../Controller/ControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../JsonFiles/UserInfo.json')));
const { fetchOtpFromRedis } = require('../OTP/GetOtpFromRedis');
const { fetchMostRecentOtpFromMongo } = require('../OTP/GerOtpFromDatabase')

test.skip('Test-1 :: Visit the website and login with valid OTP from Redis', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    try {
        const homePage = controllerPage.getHomePage();
        await homePage.openHomepage();

        const loginPage = controllerPage.getLoginPage();
        await loginPage.openLoginPage();
        await loginPage.enterValidPhoneNumber(dataSet.userPhoneNumber);
        await loginPage.clickOnGetOtpButton();

        function delay(time) {
            return new Promise(function(resolve) {
                setTimeout(resolve, time)
            });
        }
        await delay(10 * 1000);
        console.log('Waiting for OTP...');

        await delay(10 * 1000);
        const otp = await fetchOtpFromRedis(dataSet.userPhoneNumber);
        await loginPage.enterValidOtp(otp);
    } catch (error) {
        console.error('Failed to fetch OTP:', error);
        throw error;
    }
});

test.beforeEach('Test-2 :: Visit the website and login with valid OTP from Database', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    try {
        const homePage = controllerPage.getHomePage();
        await homePage.openHomepage();

        const loginPage = controllerPage.getLoginPage();
        await loginPage.openLoginPage();
        await loginPage.enterValidPhoneNumber(dataSet.userPhoneNumber);
        await loginPage.clickOnGetOtpButton();

        console.log('Waiting for OTP...');

        const otp = await fetchMostRecentOtpFromMongo(dataSet.userPhoneNumber);
        console.log(`Fetched OTP: ${otp}`);
        await loginPage.enterValidOtp(otp);
    } catch (error) {
        console.error('Failed to fetch OTP:', error);
        throw error;
    }
});

test('Test-3 :: Enter search details for searching trips', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.setFromCity();
        await searchPage.setDestinationCity();
        await searchPage.setJourneyDate();
        await searchPage.clickOnSearchBtn();
    } catch (error) {
        console.error('Failed to set search Data', error);
    }
});
