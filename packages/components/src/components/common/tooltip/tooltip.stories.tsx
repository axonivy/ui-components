import { Button } from '@/components/common/button/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BasicTooltip, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip',
  component: Tooltip,
  args: {
    delayDuration: 700
  }
};

export default meta;

export const Default: StoryObj<typeof Tooltip> = {
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

export const Basic_Tooltip: StoryObj<typeof BasicTooltip> = {
  render: ({ delayDuration }) => (
    <BasicTooltip content='Add to library' delayDuration={delayDuration}>
      <Button variant={'outline'}>Hover</Button>
    </BasicTooltip>
  )
};
