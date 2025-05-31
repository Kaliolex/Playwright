import { Page, Locator } from '@playwright/test';

export default class LoginPage {
    private readonly page: Page;
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('//input[@id="user-name"]');
        this.passwordField = page.locator('//input[@id="password"]');
        this.loginButton = page.locator('//input[@id="login-button"]');
     

    }

    async openPage(): Promise<void> {
        await this.page.goto('/');
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameField.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click(); 
    }

    async loginWithCredentials(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}