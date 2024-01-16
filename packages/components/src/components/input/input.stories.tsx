import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from '../label/label';
import { Button } from '../button/button';
import { IvyIcons } from '@axonivy/ui-icons/src-gen';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: ({ disabled }) => <Input type='email' placeholder='Email' disabled={disabled} />
};

export const WithLabel: Story = {
  render: ({ disabled }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <Label htmlFor='name'>Name</Label>
      <Input id='name' disabled={disabled} />
    </div>
  )
};

export const WithButton: Story = {
  render: ({ disabled }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <Label htmlFor='name'>Name</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Input id='name' disabled={disabled} />
        <Button type='submit' size='icon' icon={IvyIcons.ListSearch} />
      </div>
    </div>
  )
};
