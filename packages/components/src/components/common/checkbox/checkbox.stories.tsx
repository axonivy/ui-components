import type { Meta, StoryObj } from '@storybook/react';
import { BasicCheckbox } from './checkbox';

const meta: Meta<typeof BasicCheckbox> = {
  title: 'Common/Checkbox',
  component: BasicCheckbox,
  tags: ['autodocs'],
  argTypes: {
    asChild: { control: false }
  },
  args: {
    label: 'Accept terms and conditions',
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof BasicCheckbox>;

export const Default: Story = {
  render: ({ ...props }) => <BasicCheckbox {...props} />
};
