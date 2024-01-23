import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label, Button, Flex } from '@/components/common';
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
    <Flex direction='column' gap={1}>
      <Label htmlFor='name'>Name</Label>
      <Input id='name' {...props} />
    </Flex>
  )
};

export const WithButton: Story = {
  render: props => (
    <Flex direction='column' gap={1}>
      <Label htmlFor='name'>Name</Label>
      <Flex alignItems='center' gap={1}>
        <Input id='name' {...props} />
        <Button type='submit' icon={IvyIcons.ListSearch} />
      </Flex>
    </Flex>
  )
};
