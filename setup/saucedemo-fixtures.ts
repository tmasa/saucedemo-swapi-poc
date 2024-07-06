import { test as base } from "@playwright/test";
import { InventoryPage } from "@pages/inventory/inventory-page";
import { STANDARD_USER_STATE } from "../playwright.config";
import { Header } from "@pages/header";
import { CheckoutInformationData } from "@pages/checkout-information/checkout-information-page";
import { generateCheckoutInformation } from "../data/dynamic-data/generators/checkout-information-generator";

type FixturePages = {
    inventoryPage: InventoryPage;
    header: Header;
}
type SaucedemoFixtures = {
    standardUser: FixturePages;
    checkoutInformation: CheckoutInformationData,
  };

export const test = base.extend<SaucedemoFixtures>({
    standardUser: async ({ browser }, use) => {
      const context = await browser.newContext({ storageState: STANDARD_USER_STATE });
      const page = await context.newPage();
      await page.goto("/inventory.html");
      const inventoryPage = new InventoryPage(page);
      const header = new Header(page);
      await use({ inventoryPage, header });
      await context.close();
    },
    checkoutInformation: async ({ request }, use) => {
        use(await generateCheckoutInformation(request));
    },
});