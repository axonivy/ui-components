import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './message';
import { Label, Input } from '@/components/common';

const meta: Meta<typeof Message> = {
  title: 'Common/Message',
  component: Message,
  tags: ['autodocs'],
  args: {
    message: 'This is a message'
  },
  argTypes: {
    variant: { control: 'select', defaultValue: 'default', options: ['default', 'description', 'info', 'warning', 'error'] }
  }
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  render: props => <Message {...props} />
};

export const WithInput: Story = {
  render: props => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <Label htmlFor='name'>Name</Label>
      <Input id='name' />
      <Message {...props} />
    </div>
  )
};

export const WithLink: Story = {
  render: () => (
    <Message>
      This is an <a href='#'>embedded</a> link.
    </Message>
  )
};
