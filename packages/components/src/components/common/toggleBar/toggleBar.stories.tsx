import type { Meta, StoryObj } from '@storybook/react';
import { ToggleBar, ToggleBarItem, ToggleBarItemOnlyIcon } from './toggleBar';
import { IvyIcons } from '@axonivy/ui-icons';
import { IvyIcon } from '../icon/icon';

const meta: Meta<typeof ToggleBar> = {
  title: 'Common/ToggleBar',
  component: ToggleBar,
  tags: ['autodocs'],
  args: {
    disabled: false,
    type: 'single',
    gap: 2
  },
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    gap: { control: 'select', options: [1, 2, 3, 4] }
  }
};

export default meta;

type Story = StoryObj<typeof ToggleBar>;

export const Default: Story = {
  render: props => (
    <ToggleBar {...props} aria-label='Class selection'>
      <ToggleBarItem value='data-class' aria-label='Data Class'>
        Option 1
      </ToggleBarItem>
      <ToggleBarItem value='business-data-class' aria-label='Business Data Class'>
        Option 2
        <IvyIcon icon={IvyIcons.AlignVertical} />
      </ToggleBarItem>
      <ToggleBarItem value='entity-class' aria-label='Entity Class'>
        Option 3
      </ToggleBarItem>
    </ToggleBar>
  )
};

//as soon as mobile/table icons are available, they still have to be adapted here
export const OnlyIcon: Story = {
  render: props => (
    <ToggleBar {...props} aria-label='Class selection'>
      <ToggleBarItemOnlyIcon icon={IvyIcons.EventStart} value='desktop' size='large' aria-label='Desktop' />
      <ToggleBarItemOnlyIcon icon={IvyIcons.LaneSwimlanes} value='tablet' size='large' aria-label='Tablet' />
      <ToggleBarItemOnlyIcon icon={IvyIcons.ChangeType} value='mobile' size='large' aria-label='Mobile' />
    </ToggleBar>
  )
};
