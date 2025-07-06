# playwright-hierarchy-reporter

A simple custom Playwright reporter that prints test results hierarchically in the console similar to Vitest `verbose` reporter.

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
import HierarchyReporter from 'playwright-hierarchy-reporter';

export default defineConfig({
 reporter: [[new HierarchyReporter()]]
});
```

## Development

Install dependencies

```bash
npm install
```

### Running tests

Develop with TDD running tests with `npm run test` and visually checking the test output. They will test the reporter source code in `./src` folder. As with normal testing, assess the console output correctness.

As you finish development, run a snapshot test with `npm run test:snapshot`. It will run the actual reporter and compare its output with the predefined snapshot residing in `./tests/expected-output.snapshot.txt`.

## License

MIT
