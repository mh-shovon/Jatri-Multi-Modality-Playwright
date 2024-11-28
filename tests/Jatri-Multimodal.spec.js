const { test, expect } = require('@playwright/test');
const { ControllerPage } = require('./Bus/Controller/ControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../tests/Bus/JsonFiles/UserInfo.json')));

test('Test-1 :: Visit the website and login with valid OTP', async ({ page }) => {
    const controllerPage = new ControllerPage(page);

    const homePage = controllerPage.getHomePage();
    await homePage.openHomepage();

    const loginPage = controllerPage.getLoginPage();
    await loginPage.openLoginPage();
    await loginPage.loginWithValidCredentials(dataSet.userPhoneNumber);
});
