import { execa } from 'execa';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tmp = path.resolve(__dirname, './.tmp-hierarchy');
const testFile = path.join(tmp, 'tests/example.spec.ts');
const configFile = path.join(tmp, 'playwright.config.ts');
const snapshotFile = path.join(__dirname, './expected-output.snapshot.txt');

function setup() {
    fs.mkdirSync(path.dirname(testFile), { recursive: true });

    fs.writeFileSync(
        testFile,
        `
      import { test, expect } from '@playwright/test';
      test.describe('Example Suite', () => {
        test('Example 1', () => expect(1).toBe(1));
        test('Example 2', () => expect(2).toBe(2));
      });
    `
    );

    fs.writeFileSync(
        configFile,
        `
      import { defineConfig } from '@playwright/test';
      export default defineConfig({
        testDir: './tests',
        outputDir: './tests/.outputs',
        reporter: [['../../src/index.ts']],
      });
    `
    );
}

function cleanup() {
    fs.rmSync(tmp, { recursive: true, force: true });
}

function normalizeOutput(text: string) {
    return text
        .replace(/\r\n/g, '\n')       // Normalize line endings
        .replace(/[ \t]+$/gm, '')     // Trim trailing spaces
        .trim();
}

async function run() {
    setup();

    let exitCode = 0;

    try {
        const { stdout } = await execa('npx', ['playwright', 'test', '--config', configFile], {
            cwd: tmp,
            env: { FORCE_COLOR: '0' },
        });

        const cleaned = stdout
            .replace(/✓/g, '[PASS]') // normalize symbols
            .replace(/\s+\d+ms/g, '') // remove duration
            .trim();

        const expected = fs.readFileSync(snapshotFile, 'utf8').trim();

        if (normalizeOutput(cleaned) === normalizeOutput(expected)) {
            console.log('✅ Reporter output matches snapshot.');
        } else {
            console.error('❌ Output mismatch!\n\n--- Actual ---\n' + cleaned + '\n\n--- Expected ---\n' + expected);
            exitCode = 1;
        }
    } catch (err) {
        console.error('❌ Test run failed', err);
        exitCode = 1;
    } finally {
        cleanup();
    }

    process.exit(exitCode);

}

run();
