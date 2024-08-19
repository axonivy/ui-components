import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './message';
import { Input } from '@/components/common/input/input';
import { Fieldset } from '@/components/common/fieldset/fieldset';

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
  render: ({ message, variant }) => (
    <Fieldset label='Name' message={{ message, variant }}>
      <Input />
    </Fieldset>
  )
};

export const WithLink: Story = {
  render: () => (
    <Message>
      This is an <a href='#'>embedded</a> link.
    </Message>
  )
};
