import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tailwindcss(), veVitePlugin(), visualizer(), react(), dts({ tsconfigPath: './tsconfig.production.json' })],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      fileName: 'components',
      formats: ['es']
    },
    rolldownOptions: {
      external: ['@axonivy/ui-icons', 'react', 'react/jsx-runtime', 'react-dom', /@base-ui\/react/]
    }
  },
  test: {
    name: 'components',
    include: ['src/**/*.test.ts?(x)'],
    alias: {
      'test-utils': resolve(import.meta.dirname, 'src/test-utils/test-utils.tsx')
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/test-utils/setupTests.tsx'],
    css: false
  }
});
