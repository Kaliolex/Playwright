import LoginPage from '../swag-labs/LoginPage';
import { test, expect } from '@playwright/test';

test('Success login', async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.openPage()
    await loginPage.enterUsername('standard_user')
    await loginPage.enterPassword('secret_sauce')
    await loginPage.clickLoginButton()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

});

test('Authorization without login', async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.openPage()
    await loginPage.enterPassword('secret_sauce')
    await loginPage.clickLoginButton()

    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username is required')

});

test('Authorization without password', async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.openPage()
    await loginPage.enterUsername('standard_user')
    await loginPage.clickLoginButton()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Password is required')

});

test('Incorrect login', async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.openPage()
    await loginPage.enterUsername('test_user')
    await loginPage.enterPassword('secret_sauce')
    await loginPage.clickLoginButton()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')

});

test('Incorrect password', async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.openPage()
    await loginPage.enterUsername('standard_user')
    await loginPage.enterPassword('test_sauce')
    await loginPage.clickLoginButton()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')

});

test('Locked user login', async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.openPage()
    await loginPage.enterUsername('locked_out_user')
    await loginPage.enterPassword('secret_sauce')
    await loginPage.clickLoginButton()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.')

});

test('Problem user login', async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.openPage()
    await loginPage.enterUsername('problem_user')
    await loginPage.enterPassword('secret_sauce')
    await loginPage.clickLoginButton()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});