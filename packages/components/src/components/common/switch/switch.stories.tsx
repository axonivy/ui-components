import type { Meta, StoryObj } from '@storybook/react';
import { Switch, BasicSwitch } from './switch';

import { IvyIcons } from '@axonivy/ui-icons';

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

type StoryWithIcon = StoryObj<typeof Switch>;

export const WithIcon: StoryWithIcon = {
  render: ({ ...props }) => <Switch {...props} icon={{ icon: IvyIcons.Eye }} size='large' />
};
