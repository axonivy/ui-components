import { cn } from '@/utils/class-name';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentProps, ReactNode } from 'react';
import { tooltipContent } from './tooltip.css';

const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Tooltip, based on {@link https://www.radix-ui.com/docs/primitives/components/tooltip | Radix UI Tooltip}
 */
const Tooltip = (props: ComponentProps<typeof TooltipPrimitive.Root>) => <TooltipPrimitive.Root {...props} />;
Tooltip.displayName = TooltipPrimitive.Root.displayName;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({ className, sideOffset = 4, ...props }: ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content sideOffset={sideOffset} className={cn(tooltipContent, className, 'ui-tooltip-content')} {...props} />
  </TooltipPrimitive.Portal>
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type BasicTooltipProps = {
  content: ReactNode;
  children: ReactNode;
  delayDuration?: number;
} & ComponentProps<typeof TooltipPrimitive.Content>;

const BasicTooltip = ({ children, content, delayDuration, ...contentProps }: BasicTooltipProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...contentProps}>{content}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
BasicTooltip.displayName = 'BasicTooltip';

export { BasicTooltip, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
