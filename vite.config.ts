import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), veVitePlugin(), visualizer(), react()],
  optimizeDeps: {
    include: ['@vanilla-extract/recipes/createRuntimeFn']
  },
  resolve: {
    alias: {
      '@axonivy/ui-components/lib': resolve(__dirname, './packages/components/lib'),
      '@axonivy/ui-components': resolve(__dirname, './packages/components/src'),
      '@': resolve(__dirname, './packages/components/src')
    }
  },
  test: {
    projects: [
      'packages/*/vite.config.ts',
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium'
              }
            ]
          }
        }
      }
    ]
  }
});
