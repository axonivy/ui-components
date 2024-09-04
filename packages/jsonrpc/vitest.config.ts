import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    dir: 'src',
    include: ['**/*.test.ts?(x)'],
    globals: true,
    css: false,
    reporters: process.env.CI ? ['basic', 'junit'] : ['default'],
    outputFile: 'report.xml'
  }
});
