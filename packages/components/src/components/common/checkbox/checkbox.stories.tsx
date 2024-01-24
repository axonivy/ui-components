import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Flex, Label } from '@/components/common';

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: props => (
    <Flex alignItems='center' gap={1}>
      <Checkbox id='terms' {...props} />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </Flex>
  )
};
