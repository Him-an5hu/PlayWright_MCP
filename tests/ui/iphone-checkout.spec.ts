import { test } from '../../fixtures/test.fixture';

const PRODUCT_NAME = 'iPhone';

test.describe('iPhone checkout', () => {
  test('user is warned about stock availability when checking out an out-of-stock iPhone', async ({
    homePage,
    cartPage,
  }) => {
    await homePage.goto();

    const searchResultsPage = await homePage.searchFor(PRODUCT_NAME);
    await searchResultsPage.expectResultsDisplayed();

    const productPage = await searchResultsPage.openProduct(PRODUCT_NAME);
    await productPage.expectLoaded(PRODUCT_NAME);
    await productPage.addToCart();

    await homePage.openCartDropdown();
    await homePage.proceedToCheckout();

    await cartPage.expectStockWarningVisible();
  });
});
