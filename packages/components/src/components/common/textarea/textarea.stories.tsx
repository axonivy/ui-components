import { BasicField } from '@/components/common/field/field';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Common/Textarea',
  component: Textarea,
  args: {
    disabled: false,
    autoResize: false
  }
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: props => <Textarea placeholder='Email' {...props} />
};

export const WithFieldset: Story = {
  render: props => (
    <BasicField label='Name' message={{ message: 'this is a warning', variant: 'warning' }}>
      <Textarea {...props} />
    </BasicField>
  )
};
