import { Badge } from '@/components/common/badge/badge';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => (
    <Flex direction='column' gap={2} alignItems='center'>
      <Flex direction='row' gap={2} alignItems='center'>
        <Badge>Badge</Badge>
        <Badge variant='primary'>Primary</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='destructive'>Destructive</Badge>
        <Badge variant='outline'>Outline</Badge>
      </Flex>
      <Flex direction='row' gap={2} alignItems='center'>
        <Badge>
          <IvyIcon icon={IvyIcons.Check} />
          Verified
        </Badge>
        <Badge variant='destructive' size='s'>
          <IvyIcon icon={IvyIcons.Close} />
          Declined
        </Badge>
        <Badge variant='outline' size='xs'>
          <IvyIcon icon={IvyIcons.Clock} />
          Time
        </Badge>
      </Flex>
      <Flex direction='row' gap={2} alignItems='center'>
        <Badge round>9+</Badge>
        <Badge round size='s' variant='destructive'>
          9
        </Badge>
        <Badge round size='xs' variant='outline'>
          8
        </Badge>
      </Flex>
    </Flex>
  )
};
