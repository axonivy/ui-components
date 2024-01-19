import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label, Button } from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: props => <Input type='email' placeholder='Email' {...props} />
};

export const WithLabel: Story = {
  render: props => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <Label htmlFor='name'>Name</Label>
      <Input id='name' {...props} />
    </div>
  )
};

export const WithButton: Story = {
  render: props => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <Label htmlFor='name'>Name</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Input id='name' {...props} />
        <Button type='submit' icon={IvyIcons.ListSearch} />
      </div>
    </div>
  )
};
