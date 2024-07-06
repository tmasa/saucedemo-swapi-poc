import { expect } from "@playwright/test";
import { test } from "../../../setup/saucedemo-fixtures";
import { CartItems } from "../../../data/static-data/cart-items";
import { successfulCheckoutMessage } from "../../../data/static-data/order";

test('Checkout test', async ({ standardUser, checkoutInformation }) => {

  await standardUser.inventoryPage.addItemToCartByName(CartItems.BACKPACK);
  await standardUser.inventoryPage.addItemToCartByIndex(2);
  const cartPage = await standardUser.header.clickOnCartButton();
  const checkoutInformationPage = await cartPage.clickOnCheckoutButton();

  await checkoutInformationPage.fillData(checkoutInformation);
  const checkoutOverviewPage = await checkoutInformationPage.clickOnContinueButton();
  const checkoutCompletionPage = await checkoutOverviewPage.clickOnFinishButton();
  expect(await checkoutCompletionPage.getCompletionText(), "Verify that completion message is correct").toEqual(successfulCheckoutMessage);
});
