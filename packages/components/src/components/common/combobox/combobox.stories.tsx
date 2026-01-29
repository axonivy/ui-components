import { BasicField } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { composeStory, type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue
} from './combobox';

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

const countries = [
  { code: '', value: '', continent: '', label: 'Select country' },
  {
    code: 'ar',
    value: 'argentina',
    label: 'Argentina',
    continent: 'South America'
  },
  { code: 'au', value: 'australia', label: 'Australia', continent: 'Oceania' },
  { code: 'br', value: 'brazil', label: 'Brazil', continent: 'South America' },
  { code: 'ca', value: 'canada', label: 'Canada', continent: 'North America' },
  { code: 'cn', value: 'china', label: 'China', continent: 'Asia' },
  {
    code: 'co',
    value: 'colombia',
    label: 'Colombia',
    continent: 'South America'
  },
  { code: 'eg', value: 'egypt', label: 'Egypt', continent: 'Africa' },
  { code: 'fr', value: 'france', label: 'France', continent: 'Europe' },
  { code: 'de', value: 'germany', label: 'Germany', continent: 'Europe' },
  { code: 'it', value: 'italy', label: 'Italy', continent: 'Europe' },
  { code: 'jp', value: 'japan', label: 'Japan', continent: 'Asia' },
  { code: 'ke', value: 'kenya', label: 'Kenya', continent: 'Africa' },
  { code: 'mx', value: 'mexico', label: 'Mexico', continent: 'North America' },
  {
    code: 'nz',
    value: 'new-zealand',
    label: 'New Zealand',
    continent: 'Oceania'
  },
  { code: 'ng', value: 'nigeria', label: 'Nigeria', continent: 'Africa' },
  {
    code: 'za',
    value: 'south-africa',
    label: 'South Africa',
    continent: 'Africa'
  },
  { code: 'kr', value: 'south-korea', label: 'South Korea', continent: 'Asia' },
  {
    code: 'gb',
    value: 'united-kingdom',
    label: 'United Kingdom',
    continent: 'Europe'
  },
  {
    code: 'us',
    value: 'united-states',
    label: 'United States',
    continent: 'North America'
  }
];

export function ComboboxWithCustomItems() {
  return (
    <Combobox
      items={countries.filter(country => country.code !== '')}
      itemToStringValue={(country: (typeof countries)[number]) => country.label}
    >
      <ComboboxInput placeholder='Search countries...' />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {country => (
            <ComboboxItem key={country.code} value={country} style={{ height: 30 }}>
              <Flex direction='column' gap={1}>
                <span style={{ fontWeight: 'bold' }}>{country.label}</span>
                <span style={{ fontStyle: 'italic' }}>
                  {country.continent} ({country.code})
                </span>
              </Flex>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const timezones = [
  {
    value: 'Americas',
    items: ['(GMT-5) New York', '(GMT-8) Los Angeles', '(GMT-6) Chicago', '(GMT-5) Toronto', '(GMT-8) Vancouver', '(GMT-3) São Paulo']
  },
  {
    value: 'Europe',
    items: ['(GMT+0) London', '(GMT+1) Paris', '(GMT+1) Berlin', '(GMT+1) Rome', '(GMT+1) Madrid', '(GMT+1) Amsterdam']
  },
  {
    value: 'Asia/Pacific',
    items: ['(GMT+9) Tokyo', '(GMT+8) Shanghai', '(GMT+8) Singapore', '(GMT+4) Dubai', '(GMT+11) Sydney', '(GMT+9) Seoul']
  }
] as const;

export function ComboboxWithGroupsAndSeparator() {
  return (
    <Combobox items={timezones}>
      <ComboboxInput placeholder='Select a timezone' />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {item => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < timezones.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export function ComboboxMultiple() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Combobox items={frameworks} multiple value={value} onValueChange={setValue}>
      <ComboboxChips>
        <ComboboxValue>
          {value.map(item => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder='Add framework' />
      </ComboboxChips>
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

const DefaultCombobox = composeStory(Default, meta);

export const WithFieldset: Story = {
  render: ({ disabled }) => (
    <BasicField label='Many entries' message={{ message: 'this is a warning', variant: 'warning' }}>
      <DefaultCombobox disabled={disabled} />
    </BasicField>
  )
};
