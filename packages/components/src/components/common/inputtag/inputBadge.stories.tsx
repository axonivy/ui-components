import type { Meta, StoryObj } from '@storybook/react';
import { InputBadge, InputBadgeArea } from './inputBadge';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '../flex/flex';

const badgeRegex = [
  {
    delimiter: {
      start: '<%=',
      end: '%>'
    },
    badgeTextGen: (text: string) => {
      return text;
    },
    icon: IvyIcons.StartProgram
  },
  {
    delimiter: {
      start: '#{ data.',
      end: '}'
    },
    badgeTextGen: (text: string) => {
      return text;
    },
    icon: IvyIcons.File
  },
  {
    delimiter: {
      start: '#{ logic.',
      end: '}'
    },
    badgeTextGen: (text: string) => {
      return text;
    },
    icon: IvyIcons.Process
  }
];

const meta: Meta<typeof InputBadge> = {
  title: 'Common/InputBadge',
  component: InputBadge,
  tags: ['autodocs'],
  argTypes: {
    value: { type: 'string', description: 'field input containing badges' },
    badgeRegex: { description: 'object containing badge delimiter, icon & fuction to format badge-text' }
  },
  args: {
    value: '<%= ivy.log.info() %> noBadge1 #{ data.demoData }\nnoBadge2 #{ logic.demoLogic }',
    badgeRegex: badgeRegex
  }
};

export default meta;

type Story = StoryObj<typeof InputBadge>;

export const Default: Story = {
  render: props => (
    <Flex>
      <InputBadge {...props} />
    </Flex>
  )
};

export const BadgeArea: Story = {
  render: props => (
    <Flex>
      <InputBadgeArea {...props} />
    </Flex>
  )
};
