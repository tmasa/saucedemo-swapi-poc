import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { test } from "../../setup/saucedemo-fixtures";

export type CompletionText = {
    title: string | null;
    content: string | null;
}

export class CheckoutCompletePage extends BasePage {

    protected readonly completionTitle: Locator;
    protected readonly completionContent: Locator;

    constructor(page: Page) {
        super(page);
        this.completionTitle = page.getByTestId("complete-header");
        this.completionContent = page.getByTestId("complete-text");
    }

    private async getCompletionTitle(): Promise<string | null> {
        return await test.step(`Retrieve completion title`, async () => {
            return await this.completionTitle.textContent();
        });
    }

    private async getCompletionContent(): Promise<string | null> {
        return await test.step(`Retrieve completion message`, async () => {
            return await this.completionContent.textContent();
        });
    }

    async getCompletionText(): Promise<CompletionText> {
        return {
            title: await this.getCompletionTitle(),
            content: await this.getCompletionContent(),
        };
    }

}