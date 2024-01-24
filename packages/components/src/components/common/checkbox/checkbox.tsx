import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/utils/class-name';
import { checkboxIndicator, checkboxRoot } from './checkbox.css';
import { IvyIcons } from '@axonivy/ui-icons';
import { IvyIcon } from '@/components/common';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn(checkboxRoot, className)} {...props}>
    <CheckboxPrimitive.Indicator className={cn(checkboxIndicator)}>
      <IvyIcon icon={IvyIcons.Check} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
