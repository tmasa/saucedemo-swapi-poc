import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as dotenv from 'dotenv';

export const STANDARD_USER_STATE: string = path.join(__dirname, '.auth/standard_user.json');
export const VISUAL_USER_STATE: string = path.join(__dirname, '.auth/visual_user.json');

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  // Generates types before tests run - https://quicktype.io/typescript
  // globalSetup: 'setup/globalSetup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    launchOptions: {
      //To be able to follow what happens during the test
      slowMo: 500,
    },
    headless: false,
    testIdAttribute: 'data-test',
    baseURL: 'https://saucedemo.com',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'tests/e2e/setup/setup.spec.ts',
      fullyParallel: true,
    },

    {
      name: 'saucedemo-e2e-chrome',
      use: { 
        ...devices['Desktop Chrome'],
      },
      testMatch: 'tests/e2e/main/**.spec.ts',
      dependencies: ['setup']
    },
  ],
});
