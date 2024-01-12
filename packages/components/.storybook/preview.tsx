import type { Preview } from '@storybook/react';
import '../src/global.css';
import './preview.css';
import '@axonivy/ui-icons/lib/ivy-icons.css';
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
      default: 'light',
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
      return (
        <div className='editor-root' data-theme={theme}>
          <style>{`body {background-color: ${context.parameters.backgrounds.values.find(t => t.name === theme).value}}`}</style>
          <StoryFn />
        </div>
      );
    }
  ]
};

export default preview;
