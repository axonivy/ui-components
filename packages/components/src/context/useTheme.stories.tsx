import type { Meta, StoryObj } from '@storybook/react-vite';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { ThemeProvider, useTheme } from '@/context/useTheme';
import { capitalize } from '@/utils/string';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Context/Theme',
  component: ThemeProvider
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      icon={IvyIcons.DarkMode}
      size='large'
      onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
    >
      {capitalize(theme)}
    </Button>
  );
};

export const Default: Story = {
  render: () => (
    <ThemeProvider root={window.document.body}>
      <ThemeSwitch />
    </ThemeProvider>
  )
};
