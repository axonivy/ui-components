import '@axonivy/ui-icons/src-gen/ivy-icons.css';
import type { Preview } from '@storybook/react-vite';
import { ReadonlyProvider } from '../packages/components/src/context/useReadonly';
import '../packages/components/src/styles/global.css';
import '../packages/components/src/styles/globals.css';
import './preview.css';

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
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ]
      }
    },
    readonly: {
      defaultValue: 'false',
      toolbar: {
        icon: 'unlock',
        items: [
          { value: 'false', icon: 'unlock', title: 'Read & Write' },
          { value: 'true', icon: 'lock', title: 'Readonly' }
        ]
      }
    }
  },

  decorators: [
    (StoryFn, context) => {
      const theme = context.globals.theme;
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(theme);
      return (
        <ReadonlyProvider readonly={context.globals.readonly === 'true'}>
          <StoryFn />
        </ReadonlyProvider>
      );
    }
  ],

  tags: ['autodocs']
};

export default preview;
