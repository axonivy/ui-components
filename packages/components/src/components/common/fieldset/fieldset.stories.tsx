import type { Meta, StoryObj } from '@storybook/react';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { Field, Fieldset } from '@/components/common/fieldset/fieldset';
import { Input } from '@/components/common/input/input';
import { Label } from '@/components/common/label/label';

const meta: Meta<typeof Field> = {
  title: 'Common/Field',
  component: Field,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: props => (
    <Field {...props}>
      <Label>Name</Label>
      <Input />
    </Field>
  )
};

export const WithMessage: StoryObj<typeof Fieldset> = {
  render: props => (
    <Fieldset label='Name' message={{ message: 'this is a warning', variant: 'warning' }} {...props}>
      <Input />
    </Fieldset>
  )
};

export const WithControl: StoryObj<typeof Fieldset> = {
  render: props => (
    <Fieldset label='Name' control={<Button icon={IvyIcons.Trash} aria-label='Remove row' onClick={() => alert('remove')} />} {...props}>
      <Input />
    </Fieldset>
  )
};
