import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { InventoryItem } from "./inventory-item";
import { test } from "../../setup/saucedemo-fixtures";

export class InventoryPage extends BasePage {

    protected readonly inventoryItemContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryItemContainer = page.getByTestId("inventory-container");
    }

    private async getInventoryItems(): Promise<InventoryItem[]> {
        const items: InventoryItem[] = [];
        const itemLocators = await this.inventoryItemContainer.getByTestId("inventory-item").all();
        for (const actualItem of itemLocators) {
            items.push(new InventoryItem(actualItem));
        }
        return items;
    }

    private async findInventoryItemByName(name: string): Promise<InventoryItem> {
        return await test.step(`Find item ${name} on the page`, async () => {
            const items = await this.getInventoryItems();
            for (const item of items) {
                const itemName = await item.getItemName();
                if (itemName === name) {
                    return item;
                }
            }
            throw new Error(`Did not find inventory item with name ${name}`);
        });
    }

    private async findInventoryItemByIndex(index: number): Promise<InventoryItem> {
        return await test.step(`Find ${index - 1}. product on the page`, async () => {
            const items = await this.getInventoryItems();
            if (index > items.length) {
                throw new Error(`There are only ${items.length} elements on the page, cannot click on ${index}. element!`);
            }
            return items[index - 1];
        });
    }

    async addItemToCartByName(name: string): Promise<void> {
        return await test.step(`Add product ${name} to cart`, async () => {
            const itemToClick = await this.findInventoryItemByName(name);
            await itemToClick.clickOnAddToCartButton();
        });
    }

    async addItemToCartByIndex(index: number): Promise<void> {
        return await test.step(`Add ${index - 1}. product to cart`, async () => {
            const itemToClick = await this.findInventoryItemByIndex(index);
            await itemToClick.clickOnAddToCartButton();
        });
    }

}