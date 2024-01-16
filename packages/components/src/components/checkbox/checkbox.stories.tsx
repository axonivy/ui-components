import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Label } from '../label/label';

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: ({ disabled }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <Checkbox id='terms' disabled={disabled} />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  )
};
