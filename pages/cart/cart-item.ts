import { Locator } from "@playwright/test";
import { test } from "../../setup/saucedemo-fixtures";

export class CartItem {
    private readonly name: Locator;
    private readonly quantity: Locator;
    private readonly description: Locator;
    private readonly price: Locator;
    private readonly removeFromCartButton: Locator;

    constructor(hostElement: Locator) {
        this.quantity = hostElement.getByTestId("item-quantity");
        this.description = hostElement.getByTestId("inventory-item-desc");
        this.price = hostElement.getByTestId("inventory-item-price");
        this.name = hostElement.getByTestId("inventory-item-name");
        this.removeFromCartButton = hostElement.getByRole('button', { name: 'Remove', exact: true });
    }

    async clickOnRemoveFromCartButton(): Promise<void> {
        return await test.step(`Click on Remove button`, async () => {
            await this.removeFromCartButton.click();
        });
    }

    async getItemName(): Promise<string | null> {
        return await test.step(`Get name of the item`, async () => {
            return await this.name.textContent();
        });
    }

}