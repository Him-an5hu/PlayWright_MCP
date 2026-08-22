import { Locator, Page } from '@playwright/test';
import { SearchResultsPage } from './SearchResultsPage';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;
  readonly cartCheckoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search input[name="search"]');
    this.searchButton = page.locator('#search button');
    this.cartButton = page.locator('#cart button');
    this.cartCheckoutLink = page.locator('#cart').getByRole('link', { name: 'Checkout' });
  }

  async goto(): Promise<void> {
    // A leading slash would resolve against the origin and drop the /demo/ path in baseURL.
    await this.page.goto('');
  }

  async searchFor(term: string): Promise<SearchResultsPage> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    return new SearchResultsPage(this.page);
  }

  async openCartDropdown(): Promise<void> {
    await this.cartButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.cartCheckoutLink.click();
  }
}
