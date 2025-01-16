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

test('Test-5 :: Enter Journey Date(Current Date) for searching trips', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.setJourneyDateUsingCurrentDate();
    } catch (error) {
        console.error('Failed to set journey date', error);
        throw error;
    }
});

test.skip('Test-6 :: Enter Journey Date(Static Date) for searching trips', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.setJourneyDateUsingStaticDate();
    } catch (error) {
        console.error('Failed to set journey date', error);
        throw error;
    }
});

test('Test-7 :: Click on Search Button for searching trips', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.searchTrip();
    } catch (error) {
        console.error('Failed to click on search button', error);
        throw error;
    }
});

test('Test-8 :: Change the services to the bus section', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.openTheBusSection();
    } catch (error) {
        console.error('Failed to change the tab', error);
        throw error;
    }
});

test('Test-9 :: Search trips for the opposite direction using by direction switch button ', async () => {
    try {
        const searchPage = controllerPage.getSearchPage();
        await searchPage.modifySearch();
    } catch (error) {
        console.error('Failed to modifying the search', error);
        throw error;
    }
});

test('Test-10 :: Find a specific trips for ticketing and go to the seat paln', async () => {
    try {
        const tripViewPage = controllerPage.getTripViewPage();
        await tripViewPage.findTripsAndGoToTheSelectSeatsSection();
    } catch (error) {
        console.error('Failed to search the trip', error);
        throw error;
    }
});

test('Test-10 :: Select a single seat from the seat view section', async () => {
    try {
        const seatViewPage = controllerPage.getSeatViewPage();
        await seatViewPage.selectSingleSeatFromSeatView();
    } catch (error) {
        console.error('Failed to select a seat', error);
        throw error;
    }
});

test.afterAll(async () => {
    await page.pause();
});
