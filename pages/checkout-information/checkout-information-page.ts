import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { test } from "../../setup/saucedemo-fixtures";
import { CartPage } from "@pages/cart/cart-page";
import { CheckoutOverviewPage } from "@pages/checkout-overview/checkout-overview-page";

export type CheckoutInformationData = {
    firstName: string,
    lastName: string,
    postalCode: string,
}
export class CheckoutInformationPage extends BasePage {

    protected readonly firstName: Locator;
    protected readonly lastName: Locator;
    protected readonly postalCode: Locator;
    protected readonly cancelButton: Locator;
    protected readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByTestId("firstName");
        this.lastName = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    }

    async clickOnContinueButton(): Promise<CheckoutOverviewPage> {
        return await test.step(`Click on Continue button`, async () => {
            await this.continueButton.click();
            return new CheckoutOverviewPage(this.page);
        });
    }

    async clickOnCancelButton(): Promise<CartPage> {
        return await test.step(`Click on Cancel button`, async () => {
            await this.cancelButton.click();
            return new CartPage(this.page);
        });
    }

    async fillData(input: CheckoutInformationData): Promise<void> {
        return await test.step(`Fill checkout information form`, async () => {
            await this.firstName.fill(input.firstName);
            await this.lastName.fill(input.lastName);
            await this.postalCode.fill(input.postalCode);
        });
    }
}