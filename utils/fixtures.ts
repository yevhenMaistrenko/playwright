import { test as base } from '@playwright/test';
import { ParfumePage } from '../pages/parfumePage';
import { BasePage } from '../pages/basePage';

type MyFixtures = {
  parfumePage: ParfumePage;
  basePage: BasePage;
};

export const test = base.extend<MyFixtures>({
  parfumePage: async ({ page }, use) => {
    await use(new ParfumePage(page));
  },
    
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});
export { expect } from '@playwright/test';