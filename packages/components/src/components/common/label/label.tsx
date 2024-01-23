import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/utils/class-name';
import type { WithClassName } from '@/types/types';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & WithClassName
>(({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(className)} {...props} />);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
