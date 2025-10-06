import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export const reactHooksLatest = defineConfig({
  name: 'eslint-plugin-react-hooks-latest',
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    'react-hooks': reactHooks
  },
  extends: ['react-hooks/recommended-latest'],
  rules: {
    'react-hooks/incompatible-library': 'off'
  }
});
