import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  readonly parfumePageLabel: Locator;
  readonly acceptAllButton: Locator;
  readonly menu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.parfumePageLabel = page.locator('[data-uid="FragrancesNavNode_DE"]');
    this.acceptAllButton = page.locator('button.button.button__primary.uc-list-button__accept-all');
    this.menu = page.locator('[id*="tippy"]');


  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async handleCoockieConsent() {
    await this.page.addLocatorHandler(this.acceptAllButton, async () => {
      console.log('popup found');
      await this.acceptAllButton.click();
      console.log('popup closed');
      await this.acceptAllButton.waitFor({ state: "detached" });
      console.log('popup verified');
    });
  }

  async handleMenu() {
    await this.page.addLocatorHandler(this.menu, async () => {
      console.log('menu found');
      await this.page.mouse.move(0, 0);
      console.log('menu closed');
      await this.menu.waitFor({ state: "hidden" });
      console.log('menu verified');
    });
  }

  async openParfumePage() {
    await this.parfumePageLabel.click();
  }

  async waitForCoockieConsent() {
    await this.acceptAllButton.waitFor();
  }

}