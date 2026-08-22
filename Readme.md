# CI & Test Configuration Reference

## Change `.github/workflows/playwright.yml` for CI infrastructure

| What you want | Setting |
|---|---|
| Run on a different OS (Windows, macOS) | `runs-on` |
| Change trigger branches | `on.push.branches` / `on.pull_request.branches` |
| Add a scheduled run (cron) | `on.schedule` |
| Set environment variables / secrets | `env:` block or `secrets` |
| Run only specific tests on CI | `run: npx playwright test --grep @smoke` |
| Upload different artifacts (Allure, videos) | `upload-artifact` paths |
| Add steps (lint, build, docker, deploy) | new `steps` entries |
| Increase job timeout | `timeout-minutes` |

## Change `playwright.config.ts` for test behaviour

| What you want | Setting |
|---|---|
| Run on a different browser (Chrome, Safari, Edge) | `projects` array |
| Change base URL per environment | `environments.ts` → `baseURL` |
| Change retries | `retries` |
| Change parallel workers | `workers` |
| Add/remove reporters (Allure, JUnit, HTML) | `reporter` |
| Enable screenshots / video / trace | `use.screenshot`, `use.video`, `use.trace` |
| Change test directory or file pattern | `testDir` |
| Set global timeout | `timeout`, `expect.timeout` |