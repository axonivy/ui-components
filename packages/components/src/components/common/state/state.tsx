import * as React from 'react';
import { cn } from '@/utils/class-name';
import { dot, type DotVariants } from './state.css';
import type { MessageData } from '@/components';
import { Flex, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Message } from '@/components/common';

const stateFromMessages = (messages: Array<MessageData>): NonNullable<DotVariants>['state'] => {
  if (messages.find(({ variant }) => variant === 'error')) {
    return 'error';
  }
  if (messages.find(({ variant }) => variant === 'warning')) {
    return 'warning';
  }
  return undefined;
};

type StateDotProps = React.HTMLAttributes<HTMLDivElement> & DotVariants & { messages?: Array<MessageData> };

const StateDot = React.forwardRef<HTMLDivElement, StateDotProps>(({ state, messages = [], className, ...props }, ref) => {
  const dotState = stateFromMessages(messages) ?? state;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <div ref={ref} className={cn(dot({ state: dotState }), className, 'ui-state-dot')} data-state={dotState} {...props} />
        </TooltipTrigger>
        {messages.length > 0 && (
          <TooltipContent collisionPadding={10} sideOffset={10}>
            <Flex direction='column'>
              {messages.map((msg, index) => (
                <Message key={index} {...msg} />
              ))}
            </Flex>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
});
StateDot.displayName = 'StateDot';

export { StateDot };
