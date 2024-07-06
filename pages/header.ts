import { Locator, Page } from "@playwright/test";
import { test } from "../setup/saucedemo-fixtures";
import { CartPage } from "./cart/cart-page";
import { BasePage } from "./base-page";

export class Header extends BasePage {
    private readonly burgerMenu: Locator;
    private readonly title: Locator;
    private readonly cartButton: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        const hostElement = page.getByTestId("primary-header");
        this.cartButton = hostElement.getByTestId('shopping-cart-badge');
        this.title = hostElement.locator('css=.header_label');
        this.burgerMenu = hostElement.getByRole('button', { name: 'Open Menu', exact: true });
        this.cartBadge = hostElement.getByTestId("shopping-cart-badge");
    }

    async clickOnCartButton() {
        return await test.step(`Open cart page by clicking on cart button`, async () => {
            await this.cartButton.click();
            return new CartPage(this.page);
        });
    }
}