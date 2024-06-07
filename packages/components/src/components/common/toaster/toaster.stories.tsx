import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './toaster';
import { Button } from '../button/button';
import { toast } from 'sonner';
import { IvyIcon } from '../icon/icon';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components';

const meta: Meta<typeof Toaster> = {
  title: 'Common/Toaster',
  component: Toaster
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (props, { globals }) => (
    <Flex direction='row' gap={2}>
      <Button
        variant='outline'
        onClick={() =>
          toast('Event', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo')
            },
            closeButton: true
          })
        }
      >
        Show Event
      </Button>
      <Button
        variant='outline'
        onClick={() =>
          toast(
            <>
              <IvyIcon icon={IvyIcons.ErrorXMark} />
              Error
            </>
          )
        }
      >
        Custom React Event
      </Button>
      <Toaster {...props} theme={globals.theme} />
    </Flex>
  )
};
