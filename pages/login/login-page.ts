import test from '@playwright/test';
import { Page, Locator } from 'playwright';
import { InventoryPage } from '@pages/inventory/inventory-page';

export class LoginPage {

    private readonly userName: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.userName = this.page.getByTestId("username");
        this.password = this.page.getByTestId("password");
        this.loginButton = this.page.getByTestId("login-button");
    }

    async login(userName: string, password: string): Promise<InventoryPage> {
        return await test.step(`Login using credentials ${userName}`, async () => {
            await this.userName.fill(userName);
            await this.password.fill(password);
            await this.loginButton.click();
            return new InventoryPage(this.page);
        });
    }

}