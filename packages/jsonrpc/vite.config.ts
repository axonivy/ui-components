import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [visualizer(), dts({ tsconfigPath: './tsconfig.production.json' })],
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
      fileName: 'jsonrpc',
      formats: ['es']
    }
  },
  test: {
    name: 'jsonrpc',
    include: ['src/**/*.test.ts?(x)'],
    globals: true,
    css: false
  }
});
