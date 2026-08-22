// spec: tests/register/register-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../../fixtures/test.fixture';

const PASSWORD = 'Password1!';

test.describe('Successful Registration', () => {
  test('user can register a new account with newsletter opted out', async ({ registerPage }) => {
    await registerPage.goto();
    await registerPage.expectLoaded();

    await registerPage.fillPersonalDetails(
      'John', 'Doe', `john.doe+${Date.now()}@example.com`, '0412345678',
    );
    await registerPage.fillPassword(PASSWORD);
    
    await expect(registerPage.newsletterNo).toBeChecked();

    await registerPage.submitAndExpectSuccess();
  });

  test('user can register a new account with newsletter opted in', async ({ registerPage }) => {
    await registerPage.goto();
    await registerPage.expectLoaded();

    await registerPage.fillPersonalDetails(
      'Jane', 'Smith', `jane.smith+${Date.now()}@example.com`, '0498765432',
    );
    await registerPage.fillPassword(PASSWORD);
    await registerPage.newsletterYes.check();
    await expect(registerPage.newsletterYes).toBeChecked();

    await registerPage.submitAndExpectSuccess();
  });

  test('user can navigate to login page via the link on the register page', async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.loginPageLink.click();
    await expect(page).toHaveURL(/route=account\/login/);
    await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
  });

  test('user can reach the register page from New Customer section on the login page', async ({ page }) => {
    await page.goto('index.php?route=account/login');
    await expect(page.getByRole('heading', { name: 'New Customer' })).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/route=account\/register/);
    await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
  });
});
