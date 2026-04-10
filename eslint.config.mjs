import config from '@axonivy/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default config.defineConfig(
  ...config.base,
  ...config.tailwind('packages/components/src/styles/globals.css', import.meta.dirname),
  // TypeScript configs
  {
    name: 'typescript-eslint',
    languageOptions: {
      parserOptions: {
        project: true, // Uses tsconfig.json from current directory
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  // Storybook configs
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.stories.tsx'],
    rules: {
      '@eslint-react/rules-of-hooks': 'off'
    }
  },
  // Project-specific overrides and custom rules
  {
    name: 'ignored-files',
    ignores: ['**/dev-packages/**', '**/.storybook/**', '**/storybook-static/**']
  }
);
