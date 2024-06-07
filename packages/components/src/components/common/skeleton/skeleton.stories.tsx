import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';
import { Flex } from '../flex/flex';

const meta: Meta<typeof Skeleton> = {
  title: 'Common/Skeleton',
  component: Skeleton
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <Flex direction='column' gap={3}>
      <Skeleton style={{ height: 125, width: 250, borderRadius: 10 }} />
      <Flex direction='column' gap={2}>
        <Skeleton style={{ height: '1rem', width: 250 }} />
        <Skeleton style={{ height: '1rem', width: 200 }} />
      </Flex>
    </Flex>
  )
};
