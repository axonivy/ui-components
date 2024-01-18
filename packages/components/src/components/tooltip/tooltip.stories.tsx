import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Button } from '../button/button';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    delayDuration: 700
  }
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: ({ delayDuration }) => (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Button variant={'outline'}>Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Add to library</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};
