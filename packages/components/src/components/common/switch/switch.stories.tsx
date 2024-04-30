import type { Meta, StoryObj } from '@storybook/react';
import { BasicSwitch } from './switch';

const meta: Meta<typeof BasicSwitch> = {
  title: 'Common/Switch',
  component: BasicSwitch,
  tags: ['autodocs'],
  args: {
    disabled: false
  },
  argTypes: {
    size: { control: 'select', defaultValue: 'default', options: ['default', 'small', 'large'] }
  }
};

export default meta;

type Story = StoryObj<typeof BasicSwitch>;

export const Default: Story = {
  render: ({ label, ...props }) => <BasicSwitch {...props} label={label ? label : 'Airplane Mode'} />
};
