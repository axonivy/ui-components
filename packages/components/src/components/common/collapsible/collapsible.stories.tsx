import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleContent, CollapsibleControl, CollapsibleState, CollapsibleTrigger } from './collapsible';
import { IvyIcons } from '@axonivy/ui-icons';
import type { MessageData } from '@/components';

const meta: Meta<typeof Collapsible> = {
  title: 'Common/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <div>@radix-ui/colors</div>
        <div>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
};

export const State: StoryObj<MessageData & typeof CollapsibleState> = {
  argTypes: {
    state: { control: 'select', defaultValue: undefined, options: ['configured', 'warning', 'error'] }
  },
  args: {
    messages: [
      { variant: 'warning', message: 'this is a warning' },
      { variant: 'info', message: 'info message' }
    ]
  },
  render: ({ state, messages }) => {
    return (
      <Collapsible>
        <CollapsibleTrigger state={<CollapsibleState state={state} messages={messages} />}>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>@radix-ui/colors</div>
          <div>@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
};

export const Controls: Story = {
  render: () => {
    const control = (
      <CollapsibleControl
        controls={[
          { icon: IvyIcons.ArrowsMaximize, onClick: () => alert('Maximize'), title: 'Maximize' },
          { icon: IvyIcons.Search, onClick: () => console.log('yey'), title: 'Search', toggle: true }
        ]}
      />
    );
    return (
      <Collapsible>
        <CollapsibleTrigger control={control}>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>@radix-ui/colors</div>
          <div>@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
};
