import { Button } from '@/components/common/button/button';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

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
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'ui-popover-content max-w-(--radix-popover-content-available-width) overflow-auto rounded-sm border border-n100 bg-background p-2 text-body shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:animate-in',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverClose = ({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) => (
  <PopoverPrimitive.Close className={cn('ui-popover-close absolute top-2 right-2 rounded', className)} asChild {...props}>
    <Button icon={IvyIcons.Close} size='small' />
  </PopoverPrimitive.Close>
);
PopoverClose.displayName = PopoverPrimitive.Close.displayName;

const PopoverArrow = ({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Arrow>) => (
  <PopoverPrimitive.Arrow className={cn('ui-popover-arrow fill-n100', className)} {...props} />
);
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

export { Popover, PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger };
