import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly stockWarning: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stockWarning = page.getByText(
      'Products marked with *** are not available in the desired quantity or not in stock!'
    );
  }

  async expectStockWarningVisible(): Promise<void> {
    await expect(this.stockWarning).toBeVisible();
  }
}
