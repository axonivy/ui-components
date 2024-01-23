import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/utils/class-name';
import { radioGroup, radioGroupIdicator, radioGroupItem } from './radio.css';
import type { WithClassName } from '@/types/types';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & WithClassName
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn(radioGroup, className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & WithClassName
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item ref={ref} className={cn(radioGroupItem, className)} {...props}>
      <RadioGroupPrimitive.Indicator className={cn(radioGroupIdicator)} />
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
