import { Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { Locator } from "playwright";
import { test } from "../../setup/saucedemo-fixtures";
import { InventoryPage } from "@pages/inventory/inventory-page";
import { CheckoutInformationPage } from "@pages/checkout-information/checkout-information-page";

// TODO: Implement logic to verify items in the cart
export class CartPage extends BasePage {

    protected readonly cartItemContainer: Locator;
    protected readonly continueShoppingButton: Locator;
    protected readonly checkoutButton: Locator;
    constructor(page: Page) {
        super(page);
        this.cartItemContainer = page.getByTestId("cart-list");
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout', exact: true });
    }

    async clickOnContinueShoppingButton(): Promise<InventoryPage> {
        return await test.step(`Click on Continue shopping button`, async () => {
            await this.continueShoppingButton.click();
            return new InventoryPage(this.page);
        });
    }

    async clickOnCheckoutButton(): Promise<CheckoutInformationPage> {
        return await test.step(`Click on Checkout button`, async () => {
            await this.checkoutButton.click();
            return new CheckoutInformationPage(this.page);
        });
    }
}