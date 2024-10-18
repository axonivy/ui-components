import type { Meta, StoryObj } from '@storybook/react';
import { InputTag, InputTagArea, type TagTextProps } from './inputTag';
import { IvyIcons } from '@axonivy/ui-icons';

const tagOrText = (value: string): TagTextProps | undefined => {
  if (value.startsWith('noTag')) return undefined;
  return { icon: IvyIcons.ArrowRight, text: value };
};

const meta: Meta<typeof InputTag> = {
  title: 'Common/InputTag',
  component: InputTag,
  tags: ['autodocs'],
  args: {
    tags: ['tag1', 'noTag', 'tag3'],
    lines: [
      ['noTag1', 'tag2', 'tag3'],
      ['tag4', 'noTag5', 'tag6'],
      ['tag7', 'tag8', 'noTag9']
    ],
    tagOrText: tagOrText
  }
};

export default meta;

type Story = StoryObj<typeof InputTag>;

export const Default: Story = {
  render: props => (
    <div style={{ display: 'flex' }}>
      <InputTag {...props} />
    </div>
  )
};

export const TagArea: Story = {
  render: props => (
    <div style={{ display: 'flex' }}>
      <InputTagArea {...props} />
    </div>
  )
};
