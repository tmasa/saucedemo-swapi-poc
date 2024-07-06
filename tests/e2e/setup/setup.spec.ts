import { test as setup } from '@playwright/test';
import { assert } from "ts-essentials";
import { LoginPage } from "@pages/login/login-page";
import { Users } from "../../../data/static-data/users";
import { STANDARD_USER_STATE, VISUAL_USER_STATE } from "../../../playwright.config";

setup.describe('Generate sessions for test users', () => {
    let loginPage: LoginPage;
  
    setup.beforeEach(async ({ page }) => {
      await page.goto('/');
      loginPage = new LoginPage(page);
    });
  
    setup('Authenticate with standard user', async ({ page }) => {
      assert(process.env['DEFAULT_PASSWORD'], 'Did not set up default password in your environment variables!');
      await loginPage.login(Users.STANDARD_USER, process.env['DEFAULT_PASSWORD']);
      await page.context().storageState({
        path: STANDARD_USER_STATE,
      });
    });

    setup('Authenticate with visual user', async ({ page }) => {
      assert(process.env['DEFAULT_PASSWORD'], 'Did not set up default password in your environment variables!');
      await loginPage.login(Users.VISUAL_USER, process.env['DEFAULT_PASSWORD']);
      await page.context().storageState({
        path: VISUAL_USER_STATE,
      });
    });
  });