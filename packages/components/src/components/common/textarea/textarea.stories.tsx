import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset } from '@/components/common';
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

export const WithFieldset: Story = {
  render: props => (
    <Fieldset label='Name' message={{ message: 'this is a warning', variant: 'warning' }}>
      <Textarea {...props} />
    </Fieldset>
  )
};
