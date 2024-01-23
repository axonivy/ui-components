import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Label } from '@/components/common';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Common/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    disabled: false,
    autoResize: false
  }
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: props => <Textarea placeholder='Email' {...props} />
};

export const WithLabel: Story = {
  render: props => (
    <Flex direction='column' gap={1}>
      <Label htmlFor='name'>Name</Label>
      <Textarea id='name' {...props} />
    </Flex>
  )
};
