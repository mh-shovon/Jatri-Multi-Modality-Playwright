const { test } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
const { AdminControllerPage } = require('../Controller/AdminControllerPage');
const dataSet = JSON.parse(JSON.stringify(require('../JsonFiles/AdminCredentials.json')));

let page;
let adminControllerPage;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    adminControllerPage = new AdminControllerPage(page)
});

test('Test-1 :: Visit the control panel', async () => {
    try {
        const homePage = adminControllerPage.getHomePage();
        await homePage.openHomepage();
    } catch (error) {
        console.error('Failed to Login:', error);
        throw error;
    }
});

test('Test-2 :: Login with valid credential', async () => {
    try {
        const loginPage = adminControllerPage.getLoginPage();
        await loginPage.enterValidEmail(dataSet.userEmail);
        await loginPage.enterValidPassword(dataSet.userPassword);
        await loginPage.clickOnLoginButton();
    } catch (error) {
        console.error('Failed to Login:', error);
        throw error;
    }
});