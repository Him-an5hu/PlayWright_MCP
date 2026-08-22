import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmInput: Locator;
  readonly newsletterNo: Locator;
  readonly newsletterYes: Locator;
  readonly agreeCheckbox: Locator;
  readonly continueButton: Locator;
  readonly loginPageLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.telephoneInput = page.getByPlaceholder('Telephone');
    this.passwordInput = page.getByPlaceholder('Password', { exact: true });
    this.confirmInput = page.getByPlaceholder('Password Confirm');
    // Radio buttons have no accessible label; select by name+value.
    this.newsletterNo = page.locator('input[name="newsletter"][value="0"]');
    this.newsletterYes = page.locator('input[name="newsletter"][value="1"]');
    // Agree checkbox has no accessible name in the DOM.
    this.agreeCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.loginPageLink = page.getByRole('link', { name: 'login page' });
  }

  async goto(): Promise<void> {
    await this.page.goto('index.php?route=account/register');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
  }

  async fillPersonalDetails(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.confirmInput.fill(password);
  }

  async submitAndExpectSuccess(): Promise<void> {
    await this.agreeCheckbox.check();
    await this.continueButton.click();
    await expect(
      this.page.getByRole('heading', { name: 'Your Account Has Been Created!' }),
    ).toBeVisible();
  }
}