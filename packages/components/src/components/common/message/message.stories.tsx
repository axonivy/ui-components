import { BasicField } from '@/components/common/field/field';
import { Input } from '@/components/common/input/input';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Message } from './message';

const meta: Meta<typeof Message> = {
  title: 'Common/Message',
  component: Message,
  argTypes: {
    variant: { type: 'string', control: 'select', defaultValue: 'default', options: [undefined, 'description', 'info', 'warning', 'error'] }
  },
  args: {
    message: 'This is a message',
    variant: undefined
  }
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  render: props => <Message {...props} />
};

export const WithInput: Story = {
  render: ({ message, variant }) => (
    <BasicField label='Name' message={{ message, variant }}>
      <Input />
    </BasicField>
  )
};

export const WithLink: Story = {
  render: () => (
    <Message>
      This is an{' '}
      <a href='#' className='text-blue-600'>
        embedded
      </a>{' '}
      link.
    </Message>
  )
};

export const MultiOrSingleLine: Story = {
  args: {
    singleLine: false,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  render: props => <Message {...props} />
};
