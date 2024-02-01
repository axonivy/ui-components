import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';
import { Flex, Label } from '@/components';

const meta: Meta<typeof Switch> = {
  title: 'Common/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    disabled: false
  },
  argTypes: {
    size: { control: 'select', defaultValue: 'default', options: ['default', 'small', 'large'] }
  }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: props => (
    <Flex alignItems='center' gap={2}>
      <Switch id='airplane-mode' {...props} />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </Flex>
  )
};
