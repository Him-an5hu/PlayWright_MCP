# User Registration Test Plan — TutorialsNinja Demo

## Application Overview

Test plan for the Register Account page at https://tutorialsninja.com/demo/index.php?route=account/register. The form has four required personal detail fields (First Name, Last Name, E-Mail, Telephone), two password fields (Password, Password Confirm), a Newsletter subscription toggle (Yes/No, default No), a Privacy Policy agreement checkbox, and a Continue button. All tests assume a fresh browser session with no prior authentication state.

## Test Scenarios

### 1. Successful Registration

**Seed:** `tests/seed.spec.ts`

#### 1.1. should register a new account with all valid details and newsletter opt-out

**File:** `tests/ui/register/successful-registration.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: The 'Register Account' page heading is visible
    - expect: The form contains First Name, Last Name, E-Mail, Telephone, Password, Password Confirm fields
  2. Fill 'First Name' with a valid first name (e.g. John)
    - expect: Field is populated
  3. Fill 'Last Name' with a valid last name (e.g. Doe)
    - expect: Field is populated
  4. Fill 'E-Mail' with a unique valid email (e.g. john.doe+{timestamp}@example.com)
    - expect: Field is populated
  5. Fill 'Telephone' with a valid phone number (e.g. 0412345678)
    - expect: Field is populated
  6. Fill 'Password' with a valid password (e.g. Password1!)
    - expect: Field is populated and masked
  7. Fill 'Password Confirm' with the same password
    - expect: Field is populated and masked
  8. Verify Newsletter is set to 'No' (default selection)
    - expect: The 'No' radio button is selected
  9. Check the Privacy Policy agreement checkbox
    - expect: Checkbox is checked
  10. Click the 'Continue' button
    - expect: User is redirected to the account success/confirmation page
    - expect: The page heading 'Your Account Has Been Created!' is visible
    - expect: A success message confirms the account was created
    - expect: The URL changes away from the register page

#### 1.2. should register a new account with newsletter subscription opted in

**File:** `tests/ui/register/successful-registration.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Fill all required fields with valid unique data (First Name, Last Name, unique Email, Telephone, Password, Password Confirm)
    - expect: All fields are populated
  3. Select the 'Yes' radio button under Newsletter Subscribe
    - expect: 'Yes' radio button is now selected
  4. Check the Privacy Policy agreement checkbox
    - expect: Checkbox is checked
  5. Click the 'Continue' button
    - expect: Account is created successfully
    - expect: Confirmation page heading 'Your Account Has Been Created!' is visible

#### 1.3. should navigate to login page using the login link on the register page

**File:** `tests/ui/register/successful-registration.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed with text 'If you already have an account with us, please login at the login page'
  2. Click the 'login page' link in the introductory paragraph
    - expect: User is redirected to the Account Login page
    - expect: URL contains route=account/login
    - expect: 'Returning Customer' section is visible

#### 1.4. should reach the register page from the New Customer section on the login page

**File:** `tests/ui/register/successful-registration.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/login
    - expect: Login page is displayed with a 'New Customer' section
  2. Click the 'Continue' button in the 'New Customer' section
    - expect: User is redirected to the Register Account page
    - expect: URL contains route=account/register
    - expect: Registration form is visible

### 2. Registration Field Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. should show errors when all required fields are left empty

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Leave all fields empty and click the 'Continue' button
    - expect: Validation error messages appear for each required field
    - expect: Error for 'First Name' is displayed: 'First Name must be between 1 and 32 characters!'
    - expect: Error for 'Last Name' is displayed: 'Last Name must be between 1 and 32 characters!'
    - expect: Error for 'E-Mail' is displayed: 'E-Mail Address does not appear to be valid!'
    - expect: Error for 'Telephone' is displayed: 'Telephone must be between 3 and 32 characters!'
    - expect: Error for 'Password' is displayed: 'Password must be between 4 and 20 characters!'
    - expect: User remains on the registration page

#### 2.2. should show error when First Name is missing

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Leave 'First Name' empty but fill all other required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'First Name must be between 1 and 32 characters!'
    - expect: User remains on the registration page

#### 2.3. should show error when Last Name is missing

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Leave 'Last Name' empty but fill all other required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'Last Name must be between 1 and 32 characters!'
    - expect: User remains on the registration page

#### 2.4. should show error when E-Mail is missing

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Leave 'E-Mail' empty but fill all other required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'E-Mail Address does not appear to be valid!'
    - expect: User remains on the registration page

#### 2.5. should show error when E-Mail format is invalid

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Enter a malformed email (e.g. 'notanemail', 'user@', '@domain.com') in the 'E-Mail' field, fill remaining required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'E-Mail Address does not appear to be valid!'
    - expect: User remains on the registration page

#### 2.6. should show error when registering with an already-registered email

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Fill all required fields using an email address that is already registered in the system, check Privacy Policy, and click 'Continue'
    - expect: An error alert is displayed: 'Warning: E-Mail Address is already registered!'
    - expect: User remains on the registration page

#### 2.7. should show error when Telephone is missing

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Leave 'Telephone' empty but fill all other required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'Telephone must be between 3 and 32 characters!'
    - expect: User remains on the registration page

#### 2.8. should show error when Password is missing

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Leave 'Password' and 'Password Confirm' empty but fill all other required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'Password must be between 4 and 20 characters!'
    - expect: User remains on the registration page

#### 2.9. should show error when password is too short (less than 4 characters)

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Fill all required fields with valid data, enter '123' (3 characters) in 'Password' and 'Password Confirm', check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'Password must be between 4 and 20 characters!'
    - expect: User remains on the registration page

#### 2.10. should show error when Password and Password Confirm do not match

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Fill all required personal detail fields with valid data, enter 'Password1!' in 'Password' and 'DifferentPass!' in 'Password Confirm', check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'Password confirmation does not match password!'
    - expect: User remains on the registration page

#### 2.11. should show error when Privacy Policy checkbox is not checked

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Fill all required fields with valid data but do NOT check the Privacy Policy checkbox, then click 'Continue'
    - expect: An error alert or warning is displayed: 'Warning: You must agree to the Privacy Policy!'
    - expect: User remains on the registration page

#### 2.12. should show error when First Name exceeds 32 characters

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Enter a First Name string longer than 32 characters (e.g. 33 'a' characters), fill remaining required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'First Name must be between 1 and 32 characters!'
    - expect: User remains on the registration page

#### 2.13. should show error when Telephone is fewer than 3 characters

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Enter '12' (2 characters) in the 'Telephone' field, fill remaining required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'Telephone must be between 3 and 32 characters!'
    - expect: User remains on the registration page

#### 2.14. should show error when password exceeds 20 characters

**File:** `tests/ui/register/register-validation.spec.ts`

**Steps:**
  1. Navigate to https://tutorialsninja.com/demo/index.php?route=account/register
    - expect: Register Account page is displayed
  2. Enter a password of 21 characters in both 'Password' and 'Password Confirm', fill remaining required fields with valid data, check Privacy Policy, and click 'Continue'
    - expect: Error message is displayed: 'Password must be between 4 and 20 characters!'
    - expect: User remains on the registration page
