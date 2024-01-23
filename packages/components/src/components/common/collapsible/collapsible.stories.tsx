import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleContent, CollapsibleControl, CollapsibleState, CollapsibleTrigger } from './collapsible';
import { IvyIcons } from '@axonivy/ui-icons';

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
      <div>@radix-ui/primitives</div>
      <CollapsibleContent>
        <div>@radix-ui/colors</div>
        <div>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
};

export const State: StoryObj<typeof CollapsibleState> = {
  argTypes: {
    state: { control: 'select', options: ['configured', 'warning', 'error'] }
  },
  render: ({ state = 'configured' }) => (
    <Collapsible>
      <CollapsibleTrigger state={<CollapsibleState state={state} />}>Toggle</CollapsibleTrigger>
      <div>@radix-ui/primitives</div>
      <CollapsibleContent>
        <div>@radix-ui/colors</div>
        <div>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
};

export const Controls: Story = {
  render: () => {
    const control = (
      <CollapsibleControl
        controls={[
          { icon: IvyIcons.ArrowsMaximize, onClick: () => alert('Maximize'), title: 'Maximize' },
          { icon: IvyIcons.Search, onClick: () => console.log('yey'), title: 'Search' }
        ]}
      />
    );
    return (
      <Collapsible>
        <CollapsibleTrigger control={control}>Toggle</CollapsibleTrigger>
        <div>@radix-ui/primitives</div>
        <CollapsibleContent>
          <div>@radix-ui/colors</div>
          <div>@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
};
