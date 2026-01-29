import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from './combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Common/Combobox',
  component: Combobox,
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: ({ disabled }) => {
    const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
    return (
      <Combobox items={frameworks} disabled={disabled}>
        <ComboboxInput placeholder='Select a framework' />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  }
};
