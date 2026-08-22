import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productHeading: Locator;
  readonly addToCartButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Scope to #content because the site header logo is also an h1.
    this.productHeading = page.locator('#content').getByRole('heading', { level: 1 });
    this.addToCartButton = page.locator('#button-cart');
    this.successMessage = page.getByText('Success: You have added');
  }

  async expectLoaded(productName: string): Promise<void> {
    await expect(this.productHeading).toHaveText(productName);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.successMessage).toBeVisible();
  }
}
