import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Spinner',
  component: Spinner,
  argTypes: {
    size: { type: 'string', control: 'select', options: [undefined, 'large', 'medium', 'small'] },
    color: {
      control: 'select',
      options: ['neutral', 'background', 'body', 'success', 'error', 'warning']
    }
  },
  args: {
    size: undefined
  }
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: props => <Spinner {...props} />
};
