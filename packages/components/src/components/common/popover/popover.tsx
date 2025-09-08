import { cn } from '@/utils/class-name';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { arrow, close, content } from './popover.css';

/**
 * Popover, based on {@link https://www.radix-ui.com/docs/primitives/components/popover | Radix UI Popover}
 */
const Popover = (props: React.ComponentProps<typeof PopoverPrimitive.Root>) => <PopoverPrimitive.Root {...props} />;
Popover.displayName = PopoverPrimitive.Root.displayName;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  container,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & Pick<React.ComponentProps<typeof PopoverPrimitive.Portal>, 'container'>) => (
  <PopoverPrimitive.Portal container={container}>
    <PopoverPrimitive.Content align={align} sideOffset={sideOffset} className={cn(content, className, 'ui-popover-content')} {...props} />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverClose = ({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) => (
  <PopoverPrimitive.Close className={cn(close, className, 'ui-popover-close')} {...props} />
);
PopoverClose.displayName = PopoverPrimitive.Close.displayName;

const PopoverArrow = ({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Arrow>) => (
  <PopoverPrimitive.Arrow className={cn(arrow, className)} {...props} />
);
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

export { Popover, PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger };
