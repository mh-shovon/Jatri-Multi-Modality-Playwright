const { test } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
const { ControllerPage } = require('../Controller/ControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../JsonFiles/UserInfo.json')));
const { fetchOtpFromRedis } = require('../OTP/GetOtpFromRedis');
const { fetchMostRecentOtpFromMongo } = require('../OTP/GerOtpFromDatabase');

let page;
let controllerPage;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    controllerPage = new ControllerPage(page);
});

test.skip('Test-1 :: Visit the website and login with valid OTP from Redis', async () => {
    try {
        const homePage = controllerPage.getHomePage();
        await homePage.openHomepage();

        const loginPage = controllerPage.getLoginPage();
        await loginPage.openLoginPage();
        await loginPage.enterValidPhoneNumber(dataSet.userPhoneNumber);
        await loginPage.clickOnGetOtpButton();

        console.log('Waiting for OTP...');
        const otp = await fetchOtpFromRedis(dataSet.userPhoneNumber);
        console.log(`Fetched OTP: ${otp}`);
        await loginPage.enterValidOtp(otp);
    } catch (error) {
        console.error('Failed to fetch OTP:', error);
        throw error;
    }
});

test('Test-2 :: Visit the website and login with valid OTP from Database', async () => {
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

test('Test-3 :: Enter From City for searching trips', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.setFromCity();
    } catch (error) {
        console.error('Failed to set from city', error);
        throw error;
    }
});

test('Test-4 :: Enter Destination City for searching trips', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.setDestinationCity();
    } catch (error) {
        console.error('Failed to set destination city', error);
        throw error;
    }
});

test('Test-5 :: Enter Journey Date for searching trips', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.setJourneyDate();
    } catch (error) {
        console.error('Failed to set journey date', error);
        throw error;
    }
});

test('Test-6 :: Click on Search Button for searching trips', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.clickOnSearchBtn();
    } catch (error) {
        console.error('Failed to click on search button', error);
        throw error;
    }
});

test('Test-7 :: Check the Trips page is visible or not', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.checkThePageIsLoadedOrNot();
    } catch (error) {
        console.error('Failed to load the page', error);
        throw error;
    }
});

test.afterAll(async () => {
    await page.pause();
});
