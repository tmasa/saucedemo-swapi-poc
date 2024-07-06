import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { test } from "../../setup/saucedemo-fixtures";
import { InventoryPage } from "@pages/inventory/inventory-page";
import { CheckoutCompletePage } from "@pages/checkout-complete/checkout-complete-page";

// TODO: Implement logic to verify content
export class CheckoutOverviewPage extends BasePage {

    protected readonly cancelButton: Locator;
    protected readonly finishButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.finishButton = page.getByRole('button', { name: 'Finish', exact: true });
    }

    async clickOnFinishButton(): Promise<CheckoutCompletePage> {
        return await test.step(`Click on Complete button`, async () => {
            await this.finishButton.click();
            return new CheckoutCompletePage(this.page);
        });
    }

    async clickOnCancelButton(): Promise<InventoryPage> {
        return await test.step(`Click on Cancel button`, async () => {
            await this.cancelButton.click();
            return new InventoryPage(this.page);
        });
    }

}