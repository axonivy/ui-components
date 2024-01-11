import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { IvyIcons } from '@axonivy/ui-icons/src-gen';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', defaultValue: 'default', options: ['default', 'primary', 'outline'] },
    size: { control: 'select', defaultValue: 'default', options: ['default', 'icon'] },
    icon: { control: 'select', options: IvyIcons }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: ({ variant, size, icon }) => (
    <Button variant={variant} size={size} icon={icon}>
      Click
    </Button>
  )
};

export const WithIcon: Story = {
  args: {
    icon: IvyIcons.Home
  },
  render: ({ variant, size, icon }) => (
    <Button variant={variant} size={size} icon={icon}>
      Home
    </Button>
  )
};

export const IconOnly: Story = {
  args: {
    icon: IvyIcons.Home,
    size: 'icon'
  },
  render: ({ variant, size, icon }) => <Button variant={variant} size={size} icon={icon} />
};
