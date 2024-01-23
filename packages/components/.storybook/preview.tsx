import type { Preview } from '@storybook/react';
import './preview.css';
import '../src/styles/global.css';
import '@axonivy/ui-icons/ivy-icons.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#2c2c2c' }
      ]
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'light' },
          { value: 'dark', icon: 'cirlce', title: 'dark' }
        ],
        showName: true
      }
    }
  },
  decorators: [
    (StoryFn, context) => {
      const theme = context.globals.theme;
      const color = context.parameters.backgrounds.values.find(t => t.name === theme).value;
      const body = document.body;
      body.classList.remove('dark', 'light');
      body.classList.add(theme);
      body.style.background = color;
      return <StoryFn />;
    }
  ]
};

export default preview;
