import { test, expect } from '@playwright/test';

const pageURL: string = 'https://www.saucedemo.com/'
const uNameField: string = '//input[@id="user-name"]'
const password: string = '//input[@id="password"]'
const loginButton: string = '//input[@id="login-button"]'

test('Success login', async ({ page }) => {
    await page.goto(pageURL)
    await page.locator(uNameField).type('standard_user')
    await page.locator(password).type('secret_sauce')
    await page.locator(loginButton).click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

});

test('Authorization without login', async ({ page }) => {
    await page.goto(pageURL)
    await page.locator(password).type('secret_sauce')
    await page.locator(loginButton).click()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username is required')

});

test('Authorization without password', async ({ page }) => {
    await page.goto(pageURL)
    await page.locator(uNameField).type('standard_user')
    await page.locator(loginButton).click()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Password is required')

});

test('Incorrect login', async ({ page }) => {
    await page.goto(pageURL)
    await page.locator(uNameField).type('test_user')
    await page.locator(password).type('secret_sauce')
    await page.locator(loginButton).click()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')

});

test('Incorrect password', async ({ page }) => {
    await page.goto(pageURL)
    await page.locator(uNameField).type('standard_user')
    await page.locator(password).type('secret_test')
    await page.locator(loginButton).click()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')

});

test('Locked user login', async ({ page }) => {
    await page.goto(pageURL)
    await page.locator(uNameField).type('locked_out_user')
    await page.locator(password).type('secret_sauce')
    await page.locator(loginButton).click()
    await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.')

});

test('Problem user login', async ({ page }) => {
    await page.goto(pageURL)
    await page.locator(uNameField).type('problem_user')
    await page.locator(password).type('secret_sauce')
    await page.locator(loginButton).click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});