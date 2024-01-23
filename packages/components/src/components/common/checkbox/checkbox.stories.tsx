import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Label } from '@/components/common';

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <Checkbox id='terms' {...props} />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  )
};
