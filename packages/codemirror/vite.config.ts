import { resolve } from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [visualizer(), dts({ tsconfigPath: './tsconfig.production.json' })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'lib',
    sourcemap: true,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      external: ['@axonivy/ui-icons', '@axonivy/ui-components', '@axonivy/jsonrpc', 'react', 'react/jsx-runtime', 'react-dom']
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'codemirror',
      formats: ['es']
    }
  }
});
