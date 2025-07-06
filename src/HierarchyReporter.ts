import type {
    Reporter,
    TestCase,
    TestResult,
    FullResult,
} from '@playwright/test/reporter';

function indent(level: number) {
    return '  '.repeat(level);
}

export default class HierarchyReporter implements Reporter {
    private lastHeader = '';
    private lastTitlePath: string[] = [];

    onBegin() {
        console.log('\n📋 Test Run Starting...\n');
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const titlePath = test.titlePath();

        const projectName = titlePath[1] ?? 'unknown-project';
        const testFile = titlePath[2] ?? 'unknown-file';
        const header = `[${projectName}] ${testFile}`;

        const nestedPath = titlePath.slice(3); // describe + test title

        if (header !== this.lastHeader) {
            console.log(header);
            this.lastHeader = header;
            this.lastTitlePath = [];
        }

        let common = 0;
        while (
            common < this.lastTitlePath.length &&
            common < nestedPath.length &&
            this.lastTitlePath[common] === nestedPath[common]
        ) {
            common++;
        }

        for (let i = common; i < nestedPath.length; i++) {
            const isLeaf = i === nestedPath.length - 1;
            const symbols = {
                passed: result.status === 'passed' ? '✓' : undefined,
                failed: result.status === 'failed' ? '✗' : '?'
            };
            const statusSymbol = isLeaf ? symbols.passed ?? symbols.failed + ' ' : '';
            console.log(`${indent(i + 1)}${statusSymbol}${nestedPath[i]}`);
        }

        this.lastTitlePath = nestedPath;
    }

    onEnd(result: FullResult) {
        console.log(`\n🧪 Test run finished with status: ${result.status.toUpperCase()}\n`);
    }
}
