# Playwright MCP Test Context

## Role

Act as a senior Playwright TypeScript automation engineer.

Use the existing Playwright project structure and Playwright MCP browser capabilities to implement and validate the requested test scenario.

Do not introduce unnecessary frameworks, libraries, Page Objects, fixtures, or utilities for this initial test.

## Technology

* Playwright
* TypeScript
* Playwright Test
* Playwright MCP
* GitHub Copilot

## Application Under Test

Base URL:

https://tutorialsninja.com/demo/

This is a demo e-commerce application.

## Test Scenario

Automate the following end-to-end scenario:

1. Navigate to the application.
2. Click the search field.
3. Enter `Iphone`.
4. Execute the search.
5. Verify that search results are displayed.
6. Click the listed iPhone result.
7. Click `Add to Cart`.
8. Open the cart from the top-right corner.
9. Click `Checkout`.
10. Verify that the following message is displayed:

`Products marked with *** are not available in the desired quantity or not in stock!`

## Automation Rules

### Navigation

Start from:

`https://tutorialsninja.com/demo/`

Use Playwright navigation:

```typescript
await page.goto('https://tutorialsninja.com/demo/');
```

### Locators

Prefer Playwright semantic locators:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. CSS selectors when necessary

Avoid brittle XPath and selectors based on generated CSS classes.

Before choosing a locator, inspect the actual page using Playwright MCP when browser interaction is available.

### Search

Search for `Iphone`.

The test must verify that search results are displayed before selecting the product.

Do not assume the exact product locator without inspecting the page.

### Product

After searching for `Iphone`:

* Identify the listed iPhone product.
* Click the product.
* Verify that the product page has loaded.
* Click `Add to Cart`.

Do not use arbitrary waits.

Do not use:

```typescript
await page.waitForTimeout(...)
```

Use Playwright's automatic waiting and assertions.

### Cart

After adding the product:

* Open the shopping cart from the top-right area.
* Navigate to Checkout.

Prefer role-based or text-based locators.

### Checkout Validation

At checkout, verify this exact message:

`Products marked with *** are not available in the desired quantity or not in stock!`

Use a Playwright assertion such as:

```typescript
await expect(page.getByText(
  'Products marked with *** are not available in the desired quantity or not in stock!'
)).toBeVisible();
```

If the exact locator does not work, inspect the DOM using Playwright MCP and choose a stable locator.

## Test Structure

Create a Playwright Test using TypeScript.

Preferred structure:

```typescript
import { test, expect } from '@playwright/test';

test('verify iPhone checkout stock warning', async ({ page }) => {
  // test implementation
});
```

Keep the test simple for this initial MCP validation.

Do not create Page Objects unless explicitly requested.

## Assertions

The test must contain meaningful assertions for:

1. Search results are displayed.
2. The iPhone product page is opened.
3. The product can be added to the cart.
4. Checkout page is reached.
5. The expected stock/quantity warning is displayed.

## Waiting

Never use arbitrary sleeps.

Do not use:

```typescript
await page.waitForTimeout(5000);
```

Prefer:

```typescript
await expect(locator).toBeVisible();
```

or other Playwright auto-waiting mechanisms.

## MCP Usage

When Playwright MCP is available:

1. Open the application.
2. Inspect the page.
3. Identify stable locators.
4. Execute the workflow.
5. Use the observed application structure when generating the Playwright test.
6. Do not blindly guess selectors.

MCP browser exploration should be used to understand the application, while the final test should be normal maintainable Playwright TypeScript code.

## Validation

After generating the test:

1. Run the test.
2. If it fails, inspect the failure.
3. Determine whether the issue is:

   * locator
   * timing
   * application behavior
   * test implementation
4. Fix the root cause.
5. Re-run the test.

Do not hide failures with retries or arbitrary waits.

## Expected Result

The test is successful when the checkout page displays:

`Products marked with *** are not available in the desired quantity or not in stock!`

## Important

For this first test, favor simplicity.

Do not add:

* custom frameworks
* additional dependencies
* unnecessary abstractions
* complex fixtures
* unnecessary Page Objects
* unnecessary helper classes

The goal is to validate that:

**GitHub Copilot + Playwright MCP + Playwright TypeScript**

can inspect the application and produce a working end-to-end test.
