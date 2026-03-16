import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../packages/**/src/**/*.mdx', '../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-vitest')],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },

  docs: {},

  core: {
    disableTelemetry: true
  },

  typescript: {
    reactDocgen: 'react-docgen'
  }
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
