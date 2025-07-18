import { outlineData } from '@/components/editor/sidebar/outline/data';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Outline } from './outline';

const meta: Meta<typeof Outline> = {
  title: 'Editor/Sidebar/Outline',
  component: Outline,
  argTypes: {
    selection: { control: 'text', description: `Change selection via property (e.g. '1', '2', '3')` },
    onClick: { control: false },
    onDoubleClick: { control: false },
    outline: { control: false }
  },
  args: {
    selection: ''
  }
};

export default meta;

type Story = StoryObj<typeof Outline>;

export const Default: Story = {
  render: props => <Outline {...props} outline={outlineData} />
};
