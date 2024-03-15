import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Field, Label } from '@/components/common';

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
    <Field direction='row' alignItems='center' gap={2}>
      <Checkbox {...props} />
      <Label>Accept terms and conditions</Label>
    </Field>
  )
};
