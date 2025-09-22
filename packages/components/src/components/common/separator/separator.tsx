import { cn } from '@/utils/class-name';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

/**
 * Separator, based on {@link https://www.radix-ui.com/docs/primitives/components/separator | Radix UI Separator}
 */
const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'ui-separator bg-n200 data-[orientation=horizontal]:my-4 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:mx-4 data-[orientation=vertical]:my-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
      className
    )}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
