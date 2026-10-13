# Playwright Framework Demo

A small, production-style Playwright + TypeScript test framework. It shows how I structure automation so it stays readable and cheap to maintain as it grows.

[![Playwright tests](https://github.com/Spbr97/playwright-framework-demo/actions/workflows/playwright.yml/badge.svg)](https://github.com/Spbr97/playwright-framework-demo/actions/workflows/playwright.yml)

## What it demonstrates

| Concern | Where |
|---|---|
| Page Object Model | [`pages/TodoPage.ts`](pages/TodoPage.ts): locators and actions live here; tests contain no raw selectors |
| Fixtures | [`fixtures/index.ts`](fixtures/index.ts): page objects injected into tests, already navigated |
| UI tests | [`tests/ui/`](tests/ui): add, complete, edit, remove, filter and clear flows (TodoMVC) |
| API tests | [`tests/api/`](tests/api): status codes, response shape, query filtering, negative case (JSONPlaceholder) |
| Separate projects | `ui` and `api` projects in [`playwright.config.ts`](playwright.config.ts), runnable independently |
| CI | [GitHub Actions](.github/workflows/playwright.yml): typecheck, run, upload HTML report; retries and traces on CI only |
| Stable locators | Role, label and test-id locators and web-first assertions. No fixed sleeps |

## Run it

```bash
npm install
npx playwright install chromium
npm test              # everything
npm run test:ui       # UI only
npm run test:api      # API only
npm run report        # open the HTML report
```

## Design notes

- Tests describe behaviour; page objects own the how. A UI change means editing one file, not every test.
- Assertions auto-wait, so there are no `waitForTimeout` calls and far fewer flaky runs.
- Retries and traces are enabled in CI only, so local failures stay loud and CI failures come with evidence.
- Public demo targets are used so anyone can clone and run this with no setup or credentials.

## About

Built by Sibaprasada Ratha, SDET with 5+ years in Playwright / TypeScript automation (Selenium-to-Playwright migrations, CI/CD integration, API testing). Open to part-time contract work.
