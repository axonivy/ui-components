import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import { defineProject } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineProject({
  plugins: [veVitePlugin(), react()],
  test: {
    name: 'graph',
    include: ['src/**/*.test.ts?(x)'],
    globals: true,
    css: false
  }
});
