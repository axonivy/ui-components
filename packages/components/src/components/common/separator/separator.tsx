import { cn } from '@/utils/class-name';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type { ComponentProps } from 'react';

/**
 * Separator, based on {@link https://www.radix-ui.com/docs/primitives/components/separator | Radix UI Separator}
 */
function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot='separator'
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-n200 data-[orientation=horizontal]:my-4 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:mx-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
        'ui-separator'
      )}
      {...props}
    />
  );
}

export { Separator };
