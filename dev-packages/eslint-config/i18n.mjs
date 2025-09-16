import i18next from 'eslint-plugin-i18next';
import { defineConfig } from 'eslint/config';

export const i18n = defineConfig({
  name: 'eslint-plugin-i18next',
  ...i18next.configs['flat/recommended'],
  files: ['**/*.{ts,tsx}'],
  ignores: ['**/*.{test,spec}.{ts,tsx}'],
  rules: {
    'i18next/no-literal-string': [
      'warn',
      {
        mode: 'jsx-only',
        'jsx-attributes': { include: ['label', 'aria-label', 'title', 'name'] }
      }
    ]
  }
});
