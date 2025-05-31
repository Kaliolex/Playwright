import { Page, Locator, expect } from '@playwright/test';

export default class Header {
    private readonly page: Page;
    readonly burgerMenuIcon: Locator;
    readonly cartIcon: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuIcon = page.locator('#react-burger-menu-btn');
        this.cartIcon = page.locator('.shopping_cart_link'); 
    }
}