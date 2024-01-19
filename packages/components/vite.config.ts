import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [veVitePlugin(), visualizer()],
  resolve: {
    alias: {
      '@axonivy/ui-icons': resolve(__dirname, '../../packages/icons/src-gen'),
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'components',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@axonivy/ui-icons', 'react', 'react/jsx-runtime', 'react-dom']
    }
  }
});
