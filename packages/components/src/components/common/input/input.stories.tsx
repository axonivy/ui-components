import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputGroup } from './input';
import { Button, Fieldset } from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: props => <Input type='email' placeholder='Email' {...props} />
};

export const WithLabel: Story = {
  render: props => (
    <Fieldset label='Name'>
      <Input {...props} />
    </Fieldset>
  )
};

export const WithButton: Story = {
  render: props => (
    <Fieldset label='Name'>
      <InputGroup>
        <Input {...props} />
        <Button type='submit' icon={IvyIcons.ListSearch} />
      </InputGroup>
    </Fieldset>
  )
};
