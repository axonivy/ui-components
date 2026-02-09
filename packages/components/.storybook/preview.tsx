import type { Preview } from '@storybook/react-vite';
import './preview.css';
import '../src/styles/global.css';
import '@axonivy/ui-icons/src-gen/ivy-icons.css';
import React from 'react';
import { ReadonlyProvider } from '../src/context/useReadonly';

const preview: Preview = {
  parameters: {
    controls: {
      exclude: ['asChild', 'className']
    },
    backgrounds: { disable: true }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'light' },
          { value: 'dark', title: 'dark' }
        ],
        showName: true
      }
    },
    readonly: {
      defaultValue: false,
      toolbar: {
        icon: 'unlock',
        items: [
          { value: false, icon: 'unlock', title: 'Read & Write' },
          { value: true, icon: 'lock', title: 'Readonly' }
        ],
        showName: false
      }
    }
  },
  decorators: [
    (StoryFn, context) => {
      const theme = context.globals.theme;
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(theme);
      return (
        <ReadonlyProvider readonly={context.globals.readonly}>
          <StoryFn />
        </ReadonlyProvider>
      );
    }
  ]
};

export default preview;
