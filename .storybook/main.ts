import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../**/src/**/*.mdx', '../**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
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
  return dirname(require.resolve(join(value, "package.json")));
}
