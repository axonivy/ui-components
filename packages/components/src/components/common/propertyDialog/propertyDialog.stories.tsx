import { IvyIcons } from '@axonivy/ui-icons';
import type { PropertyDialogProps } from './propertyDialog';
import { PropertyDialog } from './propertyDialog';
import type { Meta, StoryObj } from '@storybook/react';
import './propertyDialog.stories.css';

const content = <div>Test</div>;

const stuff: PropertyDialogProps = {
  icon: IvyIcons.SelectionTool,
  location: document.getElementById('propDialog')!,
  onOpenChange: open => {
    console.log(open);
  },
  open: false,
  content: content
};

const meta: Meta<typeof PropertyDialog> = {
  title: 'Common/PropertyDialog',
  component: PropertyDialog,
  tags: ['autodocs'],
  args: {
    ...stuff
  }
};

export default meta;

type Story = StoryObj<typeof PropertyDialog>;

export const Default: Story = {
  render: () => (
    <div id='propDialog'>
      <PropertyDialog {...stuff} />
    </div>
  )
};
