# playwright-hierarchy-reporter

A simple [custom](https://playwright.dev/docs/test-reporters#custom-reporters) Playwright reporter that prints test results hierarchically in the console, generally, similar to Vitest [verbose reporter](https://vitest.dev/guide/reporters.html#verbose-reporter).

It groups tests by project and test file on the same line, then indents nested suites and test cases, with pass/fail symbols.

```text
📋 Test Run Starting...

[chromium] unit\ExampleTest.test.ts
  Basic Example Test
    Dummy Nested Suite Test
      ✓ Example 1
      ✓ Example 2
    ✓ Should successfully do thing 1
    ✓ Should successfully do thing 2

🧪 Test run finished with status: PASSED
```

**Package Status**

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_70-playwright-hierarchy-reporter&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=WhereJuly_70-playwright-hierarchy-reporter)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_70-playwright-hierarchy-reporter&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=WhereJuly_70-playwright-hierarchy-reporter)

![npm downloads](https://img.shields.io/npm/dm/playwright-hierarchy-reporter.svg?color=green)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=green)](https://opensource.org/licenses/MIT)

## Features

- Shows `[project] test-file` as a single header line
- Nested describes and tests indented beneath
- Pass (`✓`), fail (`✗`), and other statuses shown for each test
- Avoids repeating project or test file headers

## Installation

```bash
npm install --save-dev playwright-hierarchy-reporter
```

## Usage

In your Playwright [config file](https://playwright.dev/docs/test-configuration) (e.g. `playwright.config.ts`):

```typescript
export default defineConfig({
 reporter: [['playwright-hierarchy-reporter']]
});
```

## Development

Install dependencies

```bash
npm install
```

### Running tests

Develop with TDD running tests with `npm run test` and visually checking the test output. They will test the reporter source code in `./src` folder. As with normal testing, assess the console output correctness.

As you finish development, run a snapshot test with `npm run test:snapshot`. It will run the actual reporter and compare its output with the predefined snapshot residing in `./tests/snapshot/expected-output.snapshot.txt`.

## Maintenance

The package is written in TypeScript. The project is production-ready and actively maintained.

### Contributions

Filling issues and asking questions in Discussions is welcomed.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
