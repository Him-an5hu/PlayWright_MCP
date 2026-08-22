import { expect, Locator, Page } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
  readonly page: Page;
  readonly searchResultsHeading: Locator;
  readonly criteriaHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResultsHeading = page.getByRole('heading', { name: /^Search - /, level: 1 });
    this.criteriaHeading = page.getByRole('heading', { name: 'Products meeting the search criteria' });
  }

  async expectResultsDisplayed(): Promise<void> {
    await expect(this.searchResultsHeading).toBeVisible();
    await expect(this.criteriaHeading).toBeVisible();
  }

  productLink(name: string): Locator {
    return this.page.getByRole('heading', { level: 4 }).getByRole('link', { name, exact: true });
  }

  async openProduct(name: string): Promise<ProductPage> {
    await this.productLink(name).click();
    return new ProductPage(this.page);
  }
}
