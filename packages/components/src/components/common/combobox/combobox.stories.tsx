import { BasicCombobox, BasicMultiCombobox, type BasicComboboxItem } from '@/components/common/combobox/combobox';
import { BasicField } from '@/components/common/field/field';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BasicCombobox> = {
  title: 'Common/BasicCombobox',
  component: BasicCombobox,
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof BasicCombobox>;

export const Default: Story = {
  render: ({ disabled }) => (
    <BasicCombobox items={langs} disabled={disabled} placeholder='Search for e.g. Typescript' emptyLabel='No language found' />
  )
};

export const MultiCombobox: Story = {
  render: ({ disabled }) => {
    return (
      <BasicMultiCombobox
        items={langs}
        multiple
        disabled={disabled}
        placeholder='Search for e.g. Typescript'
        emptyLabel='No languages found'
      />
    );
  }
};

export const WithFieldset: Story = {
  render: ({ disabled }) => (
    <BasicField label='Many entries' message={{ message: 'this is a warning', variant: 'warning' }}>
      <BasicCombobox items={[...langs]} disabled={disabled} />
    </BasicField>
  )
};

const langs: BasicComboboxItem[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'cs', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' }
];
