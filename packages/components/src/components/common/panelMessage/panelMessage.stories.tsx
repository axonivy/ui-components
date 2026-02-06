import { Button } from '@/components/common/button/button';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PanelMessage } from './panelMessage';

const meta: Meta<typeof PanelMessage> = {
  title: 'Common/Message/PanelMessage',
  component: PanelMessage
};

export default meta;

type Story = StoryObj<typeof PanelMessage>;

export const Default: Story = {
  args: {
    message: 'Nothing there yet. Select an Element to edit its properties.',
    mode: 'column'
  },
  argTypes: {
    mode: { type: 'string', control: 'select', defaultValue: 'default', options: ['column', 'row'] }
  },
  render: props => <PanelMessage {...props} />
};

export const Row: Story = {
  args: {
    message: 'Drag first element inside the layout',
    mode: 'row'
  },
  render: props => <PanelMessage {...props} />
};

export const ErrorMessage: Story = {
  args: {
    message: 'An error occured',
    mode: 'column',
    icon: IvyIcons.ErrorXMark
  },
  render: props => <PanelMessage {...props} />
};

export const WithButton: Story = {
  args: {
    message: 'Nothing here yet, click button to add something',
    mode: 'column'
  },
  render: props => (
    <PanelMessage {...props}>
      <Button icon={IvyIcons.Plus} size='large' variant='primary'>
        Add Something
      </Button>
    </PanelMessage>
  )
};
