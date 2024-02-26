import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/utils/class-name';
import { root, thumb, type SwitchVariants, switchSize } from './switch.css';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SwitchVariants
>(({ size, className, ...props }, ref) => (
  <SwitchPrimitives.Root className={cn(root, switchSize({ size }), className)} {...props} ref={ref}>
    <SwitchPrimitives.Thumb className={cn(thumb)} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
