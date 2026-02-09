import { Button } from '@/components/common/button/button';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentProps } from 'react';

/**
 * Popover, based on {@link https://www.radix-ui.com/docs/primitives/components/popover | Radix UI Popover}
 */
function Popover(props: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
}

function PopoverTrigger(props: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
}

function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  container,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content> & Pick<ComponentProps<typeof PopoverPrimitive.Portal>, 'container'>) {
  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'max-w-(--radix-popover-content-available-width) overflow-auto rounded-sm border border-n100 bg-background p-2 text-body shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:animate-in',
          className,
          'ui-popover-content'
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverClose({ className, ...props }: ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      data-slot='popover-close'
      className={cn('ui-popover-close absolute top-2 right-2 rounded-sm', className, 'ui-popover-close')}
      asChild
      {...props}
    >
      <Button icon={IvyIcons.Close} size='small' />
    </PopoverPrimitive.Close>
  );
}

function PopoverArrow({ className, ...props }: ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return <PopoverPrimitive.Arrow data-slot='popover-arrow' className={cn('fill-n100', className)} {...props} />;
}

export { Popover, PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger };
