import type { Preview } from '@storybook/react';
import '../src/global.css';
import './preview.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        // // Change title based on selected value
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      return (
        <div className='editor-root' data-theme={theme}>
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
