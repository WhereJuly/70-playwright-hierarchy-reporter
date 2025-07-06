'use strict';

import { test, expect, PlaywrightTestArgs } from '@playwright/test';

test.describe('Example Two Tests', () => {

    test('Should have successful test 1', async ({ page }: PlaywrightTestArgs) => {
        expect(page).toBeTruthy();
    });

    test('Should have successful test 2', async ({ page }: PlaywrightTestArgs) => {
        expect(page).toBeTruthy();
    });

    test.describe('Dummy Nested Suite Test', () => {

        test('Example 1', async ({ page }: PlaywrightTestArgs) => {
            expect(page).toBeTruthy();
        });

        test('Example 2', async ({ page }: PlaywrightTestArgs) => {
            expect(page).toBeTruthy();
        });

    });

});
