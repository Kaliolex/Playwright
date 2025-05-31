import { test, expect } from '@playwright/test';
import LoginPage from '../swag-labs/LoginPage';
import InventoryPage from '../swag-labs/InventoryPage';
import Header from '../swag-labs/Header';

test.describe('Inventory tests', () => {
    test.beforeEach(async ({ page }) => {
        let loginPage = new LoginPage(page);
        await loginPage.openPage();
        await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    });

    test('Page elements are displayed', async ({ page }) => {
        let inventoryPage = new InventoryPage(page)
        let header = new Header(page)
        await inventoryPage.waitPageIsOpen()
        await expect(header.burgerMenuIcon).toBeVisible();
        await expect(header.cartIcon).toBeVisible();
        await expect(inventoryPage.sortingDropdown).toBeVisible();
    });

    test('6 products are displayed in the page', async ({ page }) => {
        let inventoryPage = new InventoryPage(page);
        await inventoryPage.waitPageIsOpen();
        await expect(inventoryPage.allItems).toHaveCount(6);
    });

    test('Product price sorting by asc', async ({ page }) => {

        let inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortingOption('lohi');
        let pagePrices = await inventoryPage.getAllPrices();
        let sortedPrices = [...pagePrices].sort((a, b) => a - b);
        expect(pagePrices).toEqual(sortedPrices);
        console.log(pagePrices)
        console.log(sortedPrices)
    });

    test('Product price sorting by desc', async ({ page }) => {

        let inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortingOption('hilo');
        let pagePrices = await inventoryPage.getAllPrices();
        let sortedPrices = [...pagePrices].sort((a, b) => b - a);
        expect(pagePrices).toEqual(sortedPrices);
        console.log(pagePrices)
        console.log(sortedPrices)
    });

    test('Product name sorting by asc', async ({ page }) => {
        let inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortingOption('az');
        let productNames = await inventoryPage.getAllProductNames();
        let sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
        expect(productNames).toEqual(sortedNames);
        console.log(productNames)
        console.log(sortedNames)
    });

    test('Product name sorting by desc', async ({ page }) => {
        let inventoryPage = new InventoryPage(page);
        await inventoryPage.selectSortingOption('za');
        let productNames = await inventoryPage.getAllProductNames();
        let sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
        expect(productNames).toEqual(sortedNames);
        console.log(productNames)
        console.log(sortedNames)
    });
});

