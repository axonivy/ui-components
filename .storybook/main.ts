import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../**/src/**/*.mdx', '../**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],

  framework: {
    name: '@storybook/react-vite',
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
