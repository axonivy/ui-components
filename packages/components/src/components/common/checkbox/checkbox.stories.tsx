import type { Meta, StoryObj } from '@storybook/react';
import { BasicCheckbox } from './checkbox';

const meta: Meta<typeof BasicCheckbox> = {
  title: 'Common/Checkbox',
  component: BasicCheckbox,
  tags: ['autodocs'],
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof BasicCheckbox>;

export const Default: Story = {
  render: ({ label, ...props }) => <BasicCheckbox {...props} label={label ? label : 'Accept terms and conditions'} />
};
