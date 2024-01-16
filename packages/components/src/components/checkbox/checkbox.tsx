import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '../../utils/class-name';
import type { WithClassName } from '../../types/types';
import { checkboxIndicator, checkboxRoot } from './checkbox.css';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & WithClassName
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn(checkboxRoot, className)} {...props}>
    <CheckboxPrimitive.Indicator className={cn(checkboxIndicator)}>
      <svg width={24} height={24} aria-hidden='true'>
        <path
          transform='translate(7 9)'
          d={`M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1
                    1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712
                    6A.999.999 0 0 1 3.788 9z`}
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
