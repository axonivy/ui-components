import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, ExtendedComboboxItem, extendedOptionFilter } from './combobox';
import { Fieldset } from '..';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Combobox> = {
  title: 'Common/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const languages = [
  { label: 'English', value: 'en', icon: IvyIcons.SubReceiveOutline, info: 'this is additional info' },
  { label: 'French', value: 'fr', icon: IvyIcons.Check, info: 'crazy language' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' }
];

export const Default: Story = {
  render: ({ disabled }) => <Combobox value='' onChange={() => {}} options={languages} disabled={disabled} />
};

export const WithExtendedItem: Story = {
  render: ({ disabled }) => (
    <Combobox
      value=''
      onChange={() => {}}
      options={languages}
      disabled={disabled}
      itemRender={option => <ExtendedComboboxItem {...option} />}
      optionFilter={extendedOptionFilter}
    />
  )
};

export const WithFieldset: Story = {
  render: ({ disabled }) => (
    <Fieldset label='Many entries' message={{ message: 'this is a warning', variant: 'warning' }}>
      <Combobox value='' onChange={() => {}} options={[...languages, ...languages]} disabled={disabled} />
    </Fieldset>
  )
};
