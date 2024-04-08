import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    disabled: false
  },
  argTypes: {
    variant: { control: 'select', defaultValue: 'undefined', options: ['undefined', 'primary', 'outline'] },
    size: { control: 'select', defaultValue: 'undefined', options: ['undefined', 'large', 'small'] },
    icon: { control: 'select', options: Object.values(IvyIcons) },
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
    size: undefined
  },
  render: props => <Button {...props} />
};

export const Group: Story = {
  render: props => (
    <Flex direction='row' gap={1}>
      <Button {...props} icon={IvyIcons.Selector} />
      <Button {...props} icon={IvyIcons.MultiSelection} />
    </Flex>
  )
};
