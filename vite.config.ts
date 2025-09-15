import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tailwindcss(), veVitePlugin(), visualizer(), react()],
  resolve: {
    alias: {
      '@axonivy/ui-components/lib': resolve(__dirname, './packages/components/lib'),
      '@axonivy/ui-components': resolve(__dirname, './packages/components/src'),
      '@': resolve(__dirname, './packages/components/src')
    }
  },
  test: {
    projects: ['packages/*/vite.config.ts']
  }
});
