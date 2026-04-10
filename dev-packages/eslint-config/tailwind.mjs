import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss';
import { defineConfig } from 'eslint/config';

export const tailwind = tailwindEntryPoint =>
  defineConfig({
    name: 'eslint-plugin-better-tailwindcss',
    plugins: {
      'better-tailwindcss': tailwindcssPlugin
    },
    rules: {
      ...tailwindcssPlugin.configs['recommended'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/no-unknown-classes': [
        'warn',
        {
          ignore: ['ui-*', 'ivy*']
        }
      ]
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: tailwindEntryPoint
      }
    }
  });
