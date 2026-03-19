import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [veVitePlugin(), visualizer(), react(), dts({ tsconfigPath: './tsconfig.production.json' })],
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'graph',
      formats: ['es']
    },
    rolldownOptions: {
      external: ['@axonivy/ui-icons', '@axonivy/ui-components', 'react', 'react/jsx-runtime', 'react-dom', '@xyflow/react']
    }
  },
  test: {
    name: 'graph',
    include: ['src/**/*.test.ts?(x)'],
    globals: true,
    css: false
  }
});
