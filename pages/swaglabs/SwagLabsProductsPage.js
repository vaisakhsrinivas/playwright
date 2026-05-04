const { expect } = require('@playwright/test');


class SwagLabsProductsPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator('.title');
        this.productItems = page.locator('.inventory_item');
    }

    async verifyProductsPage() {
        await expect(this.productTitle).toHaveText('Products');
    }

    async verifyProductItems() {
        const count = await this.productItems.count()
        await expect (count).toBeGreaterThan(0);
    }}

module.exports = SwagLabsProductsPage;