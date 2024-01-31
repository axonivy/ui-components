import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';
import { ThemeProvider, useTheme } from '.';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Context/Theme',
  component: ThemeProvider
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return <Button icon={IvyIcons.DarkMode} size='large' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />;
};

export const Default: Story = {
  render: () => (
    <ThemeProvider root={window.document.body}>
      <ThemeSwitch />
    </ThemeProvider>
  )
};
