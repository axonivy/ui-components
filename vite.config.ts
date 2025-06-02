import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [veVitePlugin(), visualizer(), react()],
  resolve: {
    alias: {
      '@axonivy/ui-components/lib': resolve(__dirname, './packages/components/lib'),
      '@axonivy/ui-components': resolve(__dirname, './packages/components/src'),
      '@': resolve(__dirname, './packages/components/src')
    }
  },
  optimizeDeps: {
    include: ['@vanilla-extract/recipes/createRuntimeFn']
  }
});
