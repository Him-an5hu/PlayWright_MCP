// spec: tests/register/register-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Registration Field Validation', () => {
  test('should show errors when all required fields are left empty', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Leave all fields empty and click Continue
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('First Name must be between 1 and 32 characters!')).toBeVisible();
    await expect(page.getByText('Last Name must be between 1 and 32 characters!')).toBeVisible();
    await expect(page.getByText('E-Mail Address does not appear to be valid!')).toBeVisible();
    await expect(page.getByText('Telephone must be between 3 and 32 characters!')).toBeVisible();
    await expect(page.getByText('Password must be between 4 and 20 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when First Name is missing', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Leave First Name empty, fill all other required fields
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`missing.fname+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('First Name must be between 1 and 32 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when Last Name is missing', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Leave Last Name empty, fill all other required fields
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="email"]').fill(`missing.lname+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Last Name must be between 1 and 32 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when E-Mail is missing', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Leave E-Mail empty, fill all other required fields
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('E-Mail Address does not appear to be valid!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when E-Mail format is invalid', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Enter malformed email, fill all other required fields
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill('notanemail');
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('E-Mail Address does not appear to be valid!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when registering with an already-registered email', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Use the known demo account email that is already registered
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Warning: E-Mail Address is already registered!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when Telephone is missing', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Leave Telephone empty, fill all other required fields
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`missing.phone+${Date.now()}@example.com`);
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Telephone must be between 3 and 32 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when Password is missing', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Leave Password and Password Confirm empty, fill all other required fields
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`missing.pass+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Password must be between 4 and 20 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when password is too short (less than 4 characters)', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Enter a 3-character password
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`short.pass+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('123');
    await page.locator('input[name="confirm"]').fill('123');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Password must be between 4 and 20 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when Password and Password Confirm do not match', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Enter mismatched passwords
    await page.locator('input[name="firstname"]').fill('Test');
    await page.locator('input[name="lastname"]').fill('User');
    await page.locator('input[name="email"]').fill('mismatch.test@example.com');
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('DifferentPass!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Password confirmation does not match password!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when Privacy Policy checkbox is not checked', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Fill all required fields but do NOT check Privacy Policy
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`no.policy+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Warning: You must agree to the Privacy Policy!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when First Name exceeds 32 characters', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Enter a First Name with 33 characters
    await page.locator('input[name="firstname"]').fill('a'.repeat(33));
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`long.fname+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('First Name must be between 1 and 32 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when Telephone is fewer than 3 characters', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Enter a 2-character telephone
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`short.phone+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('12');
    await page.locator('input[name="password"]').fill('Password1!');
    await page.locator('input[name="confirm"]').fill('Password1!');
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Telephone must be between 3 and 32 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });

  test('should show error when password exceeds 20 characters', async ({ page }) => {
    // 1. Navigate to Register Account page
    await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');

    // 2. Enter a 21-character password
    await page.locator('input[name="firstname"]').fill('John');
    await page.locator('input[name="lastname"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`long.pass+${Date.now()}@example.com`);
    await page.locator('input[name="telephone"]').fill('0412345678');
    await page.locator('input[name="password"]').fill('a'.repeat(21));
    await page.locator('input[name="confirm"]').fill('a'.repeat(21));
    await page.locator('input[name="agree"]').click();
    await page.locator('input[value="Continue"]').click();

    await expect(page.getByText('Password must be between 4 and 20 characters!')).toBeVisible();
    await expect(page).toHaveURL(/route=account\/register/);
  });
});
