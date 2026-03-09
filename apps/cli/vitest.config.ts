import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.config.ts',
        '**/*.test.ts',
      ],
      // Exclude CLI entry point from coverage (lines that check require.main === module)
      excludeAfterRemap: true,
      ignoreEmptyLines: true,
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 88,
        statements: 90,
      },
    },
  },
});
