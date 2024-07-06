import { Locator } from "@playwright/test";
import { test } from "../../setup/saucedemo-fixtures";

export class InventoryItem {
    private readonly name: Locator;
    private readonly description: Locator;
    private readonly price: Locator;
    private readonly addToCartButton: Locator;

    constructor(hostElement: Locator) {
        this.name = hostElement.getByTestId("inventory-item-name");
        this.description = hostElement.getByTestId("inventory-item-desc");
        this.price = hostElement.getByTestId("inventory-item-price");
        this.addToCartButton = hostElement.getByRole('button', { name: 'Add to cart', exact: true });
    }

    async clickOnAddToCartButton(): Promise<void> {
        return await test.step(`Click on Add to cart button`, async () => {
            await this.addToCartButton.click();
        });
    }

    async getItemName(): Promise<string | null> {
        return await test.step(`Get name of the item`, async () => {
            return await this.name.textContent();
        });
    }

}