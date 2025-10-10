import { cn } from '@/utils/class-name';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentProps } from 'react';
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

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
