import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';
import { Field, Label } from '@/components';

const meta: Meta<typeof Switch> = {
  title: 'Common/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    disabled: false
  },
  argTypes: {
    size: { control: 'select', defaultValue: 'default', options: ['default', 'small', 'large'] }
  }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: props => (
    <Field direction='row' alignItems='center' gap={2}>
      <Switch {...props} />
      <Label>Airplane Mode</Label>
    </Field>
  )
};
