import { cn } from '@/utils/class-name';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { seperator } from './separator.css';

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
    className={cn(seperator, className, 'ui-separator')}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
