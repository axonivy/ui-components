import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputGroup, PasswordInput, SearchInput } from './input';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { Fieldset } from '@/components/common/fieldset/fieldset';

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

export const File: Story = {
  render: props => (
    <Fieldset label='File'>
      <Input type='file' {...props} />
    </Fieldset>
  )
};

export const Password: StoryObj<typeof PasswordInput> = {
  render: props => (
    <Fieldset label='Password'>
      <PasswordInput {...props} />
    </Fieldset>
  )
};

export const Search: StoryObj<typeof SearchInput> = {
  render: props => {
    return <SearchInput {...props} placeholder='Search...' />;
  }
};
