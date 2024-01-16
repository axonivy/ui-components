import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../label/label';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Textarea',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <Label htmlFor='name'>Name</Label>
      <Textarea id='name' {...props} />
    </div>
  )
};
