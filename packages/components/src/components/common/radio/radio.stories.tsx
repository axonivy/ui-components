import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Label } from '@/components/common';
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
      <Flex alignItems='center' gap={2}>
        <RadioGroupItem value='option-one' id='option-one' />
        <Label htmlFor='option-one'>Option One</Label>
      </Flex>
      <Flex alignItems='center' gap={2}>
        <RadioGroupItem value='option-two' id='option-two' />
        <Label htmlFor='option-two'>Option Two</Label>
      </Flex>
      <Flex alignItems='center' gap={2}>
        <RadioGroupItem value='option-three' id='option-three' />
        <Label htmlFor='option-three'>Option Three</Label>
      </Flex>
    </RadioGroup>
  )
};
