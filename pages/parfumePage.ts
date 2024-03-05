import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ParfumePage extends BasePage {
  readonly page: Page;

  readonly closeButton: Locator;
  readonly brandLabel: Locator;
  readonly productTypeLabel: Locator;
  readonly giftForLabel: Locator;
  readonly genderLabel: Locator;
  readonly searchCheckboxInput: Locator;
  checkbox: Locator;
  checkboxLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.closeButton = page.locator('button:has-text("Schliessen")');
    this.brandLabel = page.locator('[data-testid="brand"]');
    this.productTypeLabel = page.locator('text=Produktart');
    this.giftForLabel = page.locator('[data-testid="Geschenk für"]');
    this.genderLabel = page.locator('[data-testid="gender"]');
    this.searchCheckboxInput = page.locator('input[name="facet-search"]');
  }

  async checkCheckbox(checkboxLabel: string) {
    this.checkbox = this.page.locator(`a[role="checkbox"]:has-text("${checkboxLabel}")`);
    this.checkboxLabel = this.page.locator(`button.selected-facets__value:has-text("${checkboxLabel}")`);
    let value = await this.checkbox.getAttribute("aria-checked");
    if (value == 'false') {
      await this.checkbox.click();
      while ((await this.checkboxLabel.count()) == 0) {
        await this.page.waitForTimeout(100);
      }
    }
    if (await this.closeButton.isVisible()) {
      await this.closeButton.click();
    }
  }

  async searchAndCheck(checkboxValue: string) {
    await this.searchCheckboxInput.fill(checkboxValue);
    await this.checkCheckbox(checkboxValue);
  }

  async filterByProductType(productType: string) {
    if (productType) {
      await this.productTypeLabel.click();
      await this.searchAndCheck(productType);
    }
  }

  async filterByBrand(brand: string) {
    if (brand) {
      await this.brandLabel.click();
      await this.searchAndCheck(brand);
    }
  }

  async filterByGiftFor(giftFor: string) {
    if (giftFor) {
      await this.giftForLabel.click();
      await this.searchAndCheck(giftFor);
    }
  }

  async filterByGender(gender: string) {
    if (gender) {
      await this.genderLabel.click();
      await this.checkCheckbox(gender);
    }
  }
}