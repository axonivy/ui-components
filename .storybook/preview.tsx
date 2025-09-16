import '@axonivy/ui-icons/lib/ivy-icons.css';
import type { Preview } from '@storybook/react-vite';
import 'virtual:uno.css';
import { ReadonlyProvider } from '../packages/components/src/context/useReadonly';
import '../packages/components/src/styles/global.css';
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
  ],

  tags: ['autodocs']
};

export default preview;
