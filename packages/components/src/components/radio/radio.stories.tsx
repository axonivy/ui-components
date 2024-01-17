import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../label/label';
import { RadioGroup, RadioGroupItem } from './radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'RadioGroup',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-2)' }}>
        <RadioGroupItem value='option-one' id='option-one' />
        <Label htmlFor='option-one'>Option One</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-2)' }}>
        <RadioGroupItem value='option-two' id='option-two' />
        <Label htmlFor='option-two'>Option Two</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-2)' }}>
        <RadioGroupItem value='option-three' id='option-three' />
        <Label htmlFor='option-three'>Option Three</Label>
      </div>
    </RadioGroup>
  )
};
