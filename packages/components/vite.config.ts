import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [veVitePlugin(), visualizer(), react(), dts({ tsconfigPath: './tsconfig.production.json' })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'components',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@axonivy/ui-icons', 'react', 'react/jsx-runtime', 'react-dom']
    }
  },
  test: {
    name: 'components',
    include: ['src/**/*.test.ts?(x)'],
    alias: {
      'test-utils': resolve(__dirname, 'src/test-utils/test-utils.tsx')
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/test-utils/setupTests.tsx'],
    css: false
  }
});
