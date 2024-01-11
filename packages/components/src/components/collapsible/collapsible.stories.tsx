import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Collapsible> = {
  title: 'Collapsible',
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

export const State: StoryObj<typeof CollapsibleTrigger> = {
  argTypes: {
    state: { control: 'select', options: ['configured', 'warning', 'error'] }
  },
  render: ({ state = 'configured' }) => (
    <Collapsible>
      <CollapsibleTrigger state={state}>Toggle</CollapsibleTrigger>
      <div>@radix-ui/primitives</div>
      <CollapsibleContent>
        <div>@radix-ui/colors</div>
        <div>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
};

export const Controls: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger control={{ label: 'Maximize', icon: IvyIcons.ArrowsMaximize, action: () => alert('Maximize') }}>
        Toggle
      </CollapsibleTrigger>
      <div>@radix-ui/primitives</div>
      <CollapsibleContent>
        <div>@radix-ui/colors</div>
        <div>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
};
