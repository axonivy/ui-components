import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [veVitePlugin(), react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    dir: 'src',
    include: ['**/*.test.ts?(x)'],
    alias: {
      'test-utils': resolve(__dirname, 'src/test-utils/test-utils.tsx')
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/test-utils/setupTests.tsx'],
    css: false,
    reporters: process.env.CI ? ['basic', 'junit'] : ['default'],
    outputFile: 'report.xml'
  }
});
