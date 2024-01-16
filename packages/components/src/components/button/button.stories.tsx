import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { IvyIcons } from '@axonivy/ui-icons/src-gen';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    disabled: false
  },
  argTypes: {
    variant: { control: 'select', defaultValue: 'default', options: ['default', 'primary', 'outline'] },
    size: { control: 'select', defaultValue: 'default', options: ['default', 'icon'] },
    icon: { control: 'select', options: IvyIcons },
    toggle: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: props => <Button {...props}>Click</Button>
};

export const WithIcon: Story = {
  args: {
    icon: IvyIcons.Home
  },
  render: props => <Button {...props}>Home</Button>
};

export const IconOnly: Story = {
  args: {
    icon: IvyIcons.Home,
    size: 'icon'
  },
  render: props => <Button {...props} />
};
