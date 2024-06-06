import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: 'select', defaultValue: 'undefined', options: ['undefined', 'large', 'small'] }
  }
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: props => <Spinner {...props} />
};
