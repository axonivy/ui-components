import { useField } from '@/components/common/field/field';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

/**
 * RadioGroup, based on {@link https://www.radix-ui.com/docs/primitives/components/radio-group | Radix UI RadioGroup}
 */
const RadioGroup = ({ disabled, className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  const readonly = useReadonly();
  return (
    <RadioGroupPrimitive.Root
      className={cn('ui-radio-group flex gap-4 data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-2', className)}
      disabled={readonly || disabled}
      {...props}
    />
  );
};
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = ({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  const { inputProps } = useField();
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'ui-radio-group-item size-4 shrink-0 rounded-full border-1 border-solid border-border-basic bg-n25 focus-visible:outline-2 enabled:hover:border-border-active enabled:hover:bg-p50 disabled:cursor-not-allowed disabled:opacity-75 data-[state=checked]:border-border-active data-[state=checked]:bg-p50',
        className
      )}
      {...inputProps}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn('relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-p300')}
      />
    </RadioGroupPrimitive.Item>
  );
};
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
