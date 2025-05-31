import { Page, Locator, expect } from '@playwright/test';

export default class InventoryPage {
    private readonly page: Page;
    readonly pageTitle: Locator;
    readonly allItems: Locator;
    readonly sortingDropdown: Locator;
    readonly pricesFromPage;
    readonly productNamesFromPage;


    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title').filter({ hasText: 'Products' });
        this.allItems = page.locator('.inventory_item');
        this.sortingDropdown = page.locator('.product_sort_container');
        this.pricesFromPage = '.inventory_item_price';
        this.productNamesFromPage = '.inventory_item_name '


    }

    async waitPageIsOpen() {
        await expect(this.pageTitle).toBeVisible();
    }

    async getAllPrices() {
        const prices = await this.page.$$eval(this.pricesFromPage, elements =>
            elements.map(el => {
                const text = el.textContent || '';
                const clean = text.replace('$', '').trim();
                return parseFloat(clean);
            })
        );
        return prices;
    }

    async selectSortingOption(option: string) {
        await this.sortingDropdown.selectOption(option)
    }

    async getAllProductNames(): Promise<string[]> {
        return this.page.$$eval(this.productNamesFromPage, elements =>
            elements.map(el => el.textContent?.trim() || ''));
    }
}