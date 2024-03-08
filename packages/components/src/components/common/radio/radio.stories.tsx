import type { Meta, StoryObj } from '@storybook/react';
import { Field, Label } from '@/components/common';
import { RadioGroup, RadioGroupItem } from './radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Common/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    disabled: false
  },
  argTypes: {
    orientation: { control: 'select', defaultValue: 'horizontal', options: ['horizontal', 'vertical'] }
  }
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: props => (
    <RadioGroup defaultValue='option-one' {...props}>
      <Field direction='row' alignItems='center' gap={2}>
        <RadioGroupItem value='option-one' />
        <Label>Option One</Label>
      </Field>
      <Field direction='row' alignItems='center' gap={2}>
        <RadioGroupItem value='option-two' />
        <Label>Option Two</Label>
      </Field>
      <Field direction='row' alignItems='center' gap={2}>
        <RadioGroupItem value='option-three' />
        <Label>Option Three</Label>
      </Field>
    </RadioGroup>
  )
};
