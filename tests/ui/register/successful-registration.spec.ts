// spec: tests/register/register-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Successful Registration', () => {
  test('should register a new account with all valid details and newsletter opt-out', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
    await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();

    // 2. Fill First Name
    await page.locator('input[name="firstname"]').fill('John');

    // 3. Fill Last Name
    await page.locator('input[name="lastname"]').fill('Doe');

    // 4. Fill E-Mail with a unique address
    const email = `john.doe+${Date.now()}@example.com`;
    await page.locator('input[name="email"]').fill(email);

    // 5. Fill Telephone
    await page.locator('input[name="telephone"]').fill('0412345678');

    // 6. Fill Password
    await page.locator('input[name="password"]').fill('Password1!');

    // 7. Fill Password Confirm
    await page.locator('input[name="confirm"]').fill('Password1!');

    // 8. Verify Newsletter is set to No by default
    await expect(page.locator('input[name="newsletter"][value="0"]')).toBeChecked();

    // 9. Check the Privacy Policy agreement checkbox
    await page.locator('input[name="agree"]').click();

    // 10. Click the Continue button and verify success
    await page.locator('input[value="Continue"]').click();
    await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();
  });

  test('should register a new account with newsletter subscription opted in', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
    await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();

    // 2. Fill all required fields with valid unique data
    await page.locator('input[name="firstname"]').fill('Jane');
    await page.locator('input[name="lastname"]').fill('Smith');
    const email = `jane.smith+${Date.now()}@example.com`;
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="telephone"]').fill('0498765432');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');

    // 3. Select the Yes radio button for Newsletter
    await page.locator('input[name="newsletter"][value="1"]').click();
    await expect(page.locator('input[name="newsletter"][value="1"]')).toBeChecked();

    // 4. Check the Privacy Policy agreement checkbox
    await page.locator('input[name="agree"]').click();

    // 5. Click the Continue button and verify success
    await page.locator('input[value="Continue"]').click();
    await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();
  });

  test('should navigate to login page using the login link on the register page', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
    await expect(page.getByText('If you already have an account with us, please login at the')).toBeVisible();

    // 2. Click the 'login page' link in the introductory paragraph
    await page.getByRole('link', { name: 'login page' }).click();
    await expect(page).toHaveURL(/route=account\/login/);
    await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
  });

  test('should reach the register page from the New Customer section on the login page', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/login');
    await expect(page.getByRole('heading', { name: 'New Customer' })).toBeVisible();

    // 2. Click the Continue button in the New Customer section
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/route=account\/register/);
    await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
  });
});
