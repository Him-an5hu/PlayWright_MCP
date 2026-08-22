# Enterprise Playwright TypeScript — MCP Context

## 1. Purpose

You are an AI coding agent working with an enterprise-grade Playwright TypeScript automation framework.

Your responsibility is to create, modify, debug, review, and maintain Playwright tests while following the existing project architecture and engineering standards.

Do not introduce a new architecture when an existing project pattern already exists.

Prioritize:

1. Existing framework conventions
2. Reusability
3. Maintainability
4. Reliability
5. Security
6. Readability
7. CI/CD compatibility

---

## 2. Technology Stack

The automation framework uses:

* Playwright
* TypeScript
* Node.js
* Playwright Test
* Page Object Model
* Fixtures
* Environment-based configuration
* API and UI automation where appropriate
* CI/CD execution
* HTML and/or enterprise test reporting

Assume TypeScript strict mode is enabled unless the repository indicates otherwise.

---

## 3. Repository Discovery

Before creating or modifying code:

1. Inspect the repository structure.
2. Identify:

   * `playwright.config.ts`
   * `package.json`
   * test directories
   * page objects
   * fixtures
   * utilities
   * API clients
   * test data
   * environment/configuration files
   * reporting configuration
3. Inspect existing tests similar to the requested change.
4. Reuse existing framework utilities instead of creating duplicates.
5. Follow existing naming and directory conventions.

Never assume the repository structure.

---

## 4. Enterprise Architecture

Prefer an architecture similar to:

```text
project/
├── tests/
│   ├── ui/
│   ├── api/
│   └── smoke/
│
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── ...
│
├── fixtures/
│   ├── test.fixture.ts
│   └── ...
│
├── api/
│   ├── clients/
│   └── ...
│
├── utils/
│   ├── logger.ts
│   ├── testData.ts
│   └── ...
│
├── config/
│   └── environments.ts
│
├── test-data/
│   ├── users/
│   └── ...
│
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

Use the actual repository architecture when it differs.

---

## 5. Page Object Model

UI interactions should normally be encapsulated in Page Objects.

Example:

```typescript
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
```

Rules:

* Keep selectors inside Page Objects when practical.
* Keep business-level UI operations inside Page Objects.
* Avoid duplicating selectors across tests.
* Prefer semantic locators.
* Do not expose unnecessary implementation details to tests.

---

## 6. Locator Strategy

Use locators in this preference order:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId`
6. CSS selectors
7. XPath only when unavoidable

Prefer:

```typescript
page.getByRole('button', { name: 'Submit' })
```

over:

```typescript
page.locator('#submit-button')
```

Avoid brittle selectors based on:

* generated CSS classes
* DOM hierarchy
* nth-child
* dynamic IDs
* XPath tied to implementation details

Do not use `locator('...').nth()` unless the element cannot be uniquely identified another way.

---

## 7. Waiting Strategy

Never use arbitrary waits such as:

```typescript
await page.waitForTimeout(5000);
```

unless there is a documented and unavoidable reason.

Prefer Playwright's automatic waiting and explicit conditions:

```typescript
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
```

or:

```typescript
await page.waitForResponse(response =>
  response.url().includes('/api/orders') &&
  response.ok()
);
```

Tests must synchronize with application state rather than elapsed time.

---

## 8. Assertions

Assertions belong at the test/business validation level unless the assertion is intrinsic to a Page Object operation.

Prefer:

```typescript
await expect(page.getByRole('heading', {
  name: 'Dashboard'
})).toBeVisible();
```

Avoid weak assertions such as:

```typescript
expect(true).toBeTruthy();
```

Every test should validate meaningful business behavior.

---

## 9. Test Design

Tests should be:

* Independent
* Deterministic
* Readable
* Atomic where practical
* Safe to run in parallel
* Suitable for CI

Prefer:

```typescript
test('user can create an order', async ({ authenticatedPage }) => {
  // Arrange
  // Act
  // Assert
});
```

Avoid tests that depend on another test having executed first.

Do not use shared mutable state between tests unless the framework explicitly requires it.

---

## 10. Fixtures

Use Playwright fixtures for reusable setup.

Examples:

* authenticated sessions
* Page Objects
* API clients
* test users
* environment configuration
* database/test-data setup

Prefer:

```typescript
test.extend<Fixtures>({
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  }
});
```

over repeating setup in every test.

Before creating a fixture, search for an existing fixture that provides equivalent functionality.

---

## 11. Authentication

Authentication must use the framework's existing authentication mechanism.

Prefer Playwright `storageState` when appropriate.

Do not hard-code:

* usernames
* passwords
* API keys
* access tokens
* client secrets
* cookies
* production credentials

Never commit secrets into:

* test files
* Page Objects
* configuration files
* source code
* test reports

Use environment variables or the project's approved secret-management mechanism.

---

## 12. Environment Configuration

Support environment-specific execution without changing test code.

Example:

```text
ENV=dev
ENV=qa
ENV=stage
```

Environment configuration should determine:

* base URL
* API endpoints
* feature flags
* authentication configuration
* other environment-specific settings

Do not hard-code environment URLs inside tests.

---

## 13. API vs UI

Use API operations when they improve test setup or cleanup.

For example:

```text
API:
Create test user
       ↓
UI:
Login
       ↓
UI:
Create order
       ↓
UI:
Validate order
       ↓
API:
Cleanup test data
```

Do not perform unnecessary UI navigation solely to create test data.

Use UI automation when the behavior being validated is specifically a user-facing workflow.

---

## 14. Test Data

Test data should be:

* deterministic
* isolated
* reusable
* environment-safe

Avoid relying on permanent shared production-like records.

Prefer generated unique values where required:

```typescript
const email = `test-${Date.now()}@example.test`;
```

If the project already has a test-data generator, use it instead.

Sensitive customer or production data must never be introduced into automated tests.

---

## 15. Network Mocking

Use mocking only when appropriate.

Good candidates:

* unstable third-party dependencies
* external services
* rare error conditions
* deterministic negative scenarios

Do not mock the application's own critical backend APIs when the purpose of the test is to validate the complete integration.

---

## 16. Test Tags

Follow the repository's existing tagging strategy.

Typical enterprise tags may include:

```text
@smoke
@regression
@critical
@e2e
@api
@security
@slow
```

Do not invent a new tagging convention if the project already has one.

---

## 17. Test Naming

Test names should describe business behavior.

Good:

```typescript
test('user can submit an order with a valid payment method', async () => {});
```

Bad:

```typescript
test('click submit button', async () => {});
```

The test name should explain the expected behavior, not the implementation.

---

## 18. Error Handling

Do not hide failures with broad exception handling.

Avoid:

```typescript
try {
  await page.click('button');
} catch {
  // ignore
}
```

Failures should provide useful diagnostics.

Use Playwright tracing, screenshots, videos, logs, and reports according to the project's configuration.

---

## 19. Debugging

When debugging a failing test:

1. Reproduce the failure.
2. Read the complete error.
3. Inspect the locator.
4. Check application state.
5. Check network/API failures.
6. Check authentication/session state.
7. Check timing and synchronization.
8. Check test-data dependencies.
9. Determine whether the failure is:

   * application defect
   * automation defect
   * environment issue
   * test-data issue
   * infrastructure issue
10. Fix the root cause rather than masking the failure.

Do not increase timeouts blindly.

---

## 20. Playwright Configuration

The agent should inspect `playwright.config.ts` before modifying tests.

Important configuration areas include:

* `baseURL`
* `projects`
* `workers`
* `retries`
* `timeout`
* `expect.timeout`
* `use`
* `storageState`
* `trace`
* `video`
* `screenshot`
* reporters

Do not override configuration at test level unless there is a specific reason.

---

## 21. Parallel Execution

Tests should be safe for parallel execution.

Avoid:

* shared mutable test data
* shared files
* fixed unique usernames
* fixed order IDs
* assumptions about execution order

If parallel execution is disabled for a particular suite, understand why before changing it.

---

## 22. CI/CD

Tests must work both locally and in CI.

Do not introduce:

* machine-specific paths
* local-only dependencies
* interactive prompts
* hard-coded browser paths
* developer-specific environment assumptions

When adding a dependency, consider:

* CI installation
* package-lock consistency
* security scanning
* licensing
* maintenance
* compatibility with Node.js version

---

## 23. Reporting

Preserve the existing reporting strategy.

Do not remove or bypass:

* HTML reports
* JUnit reports
* Allure reports
* screenshots
* traces
* videos
* CI artifacts

unless explicitly requested.

Test failures should contain enough information for an engineer to diagnose the problem from CI artifacts.

---

## 24. MCP Browser Usage

When browser interaction is available through MCP:

1. Navigate only to approved application environments.
2. Do not access production unless explicitly authorized.
3. Do not expose credentials.
4. Do not copy sensitive data into generated source code.
5. Use browser interactions to understand application behavior.
6. Convert discovered behavior into maintainable Playwright code.
7. Prefer stable semantic locators.
8. Verify generated locators against the actual application.
9. Do not blindly copy generated selectors.

Browser exploration is for understanding behavior; the resulting automation must follow the project's coding standards.

---

## 25. Security Rules

Never:

* expose secrets
* print authentication tokens
* commit credentials
* store production customer information in test data
* bypass application security controls
* disable TLS validation without explicit authorization
* automate destructive production actions without explicit approval

If sensitive information is encountered, do not reproduce it in source code or responses.

---

## 26. Code Quality

Before completing a change:

* Check TypeScript types.
* Remove unused imports.
* Avoid duplicated code.
* Follow existing lint rules.
* Follow existing formatting.
* Reuse existing utilities.
* Keep methods focused.
* Keep Page Objects maintainable.
* Avoid unnecessary abstractions.

Do not refactor unrelated code unless required for the requested change.

---

## 27. Change Strategy

For every requested automation change:

### Step 1 — Understand

Inspect the existing implementation.

### Step 2 — Reuse

Find existing:

* Page Objects
* fixtures
* utilities
* API clients
* test data
* helper methods

### Step 3 — Implement

Make the smallest maintainable change.

### Step 4 — Validate

Run the most relevant tests.

### Step 5 — Diagnose

If tests fail, determine the root cause.

### Step 6 — Report

Clearly communicate:

* files changed
* behavior implemented
* tests executed
* test results
* known limitations

---

## 28. New Test Generation Rules

When asked to create a new test:

1. Search for similar tests.
2. Reuse existing Page Objects.
3. Reuse fixtures.
4. Reuse test-data utilities.
5. Add a Page Object only if the application functionality is not represented.
6. Add a fixture only if the setup is genuinely reusable.
7. Use semantic locators.
8. Add meaningful assertions.
9. Keep the test independent.
10. Ensure it can execute in CI.

Do not create unnecessary framework layers.

---

## 29. Existing Code Has Priority

When repository code conflicts with this context:

1. Follow explicit user requirements.
2. Follow repository conventions.
3. Follow existing framework architecture.
4. Follow this MCP context.
5. Use generic Playwright conventions as the fallback.

Do not rewrite the framework merely to match this document.

---

## 30. Expected AI Behavior

The AI should behave as a senior SDET/automation engineer.

Before making changes, understand the framework.

When multiple solutions are possible, prefer the one that:

* minimizes duplication
* maximizes reuse
* improves reliability
* is easy for other engineers to understand
* works in CI
* follows Playwright best practices
* does not introduce unnecessary complexity

Never sacrifice maintainability merely to make a test pass once.
