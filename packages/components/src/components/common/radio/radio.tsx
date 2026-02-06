import { useField } from '@/components/common/field/field';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { ComponentProps } from 'react';

/**
 * RadioGroup, based on {@link https://www.radix-ui.com/docs/primitives/components/radio-group | Radix UI RadioGroup}
 */
function RadioGroup({ disabled, className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const readonly = useReadonly();
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn(
        `
          flex gap-4
          data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-2
        `,
        className,
        `ui-radio-group`
      )}
      disabled={readonly || disabled}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  const { inputProps } = useField();
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        `
          size-4 shrink-0 rounded-full border border-solid border-border-basic
          bg-n25
          focus-visible:outline-2
          enabled:hover:border-border-active enabled:hover:bg-p50
          disabled:cursor-not-allowed disabled:opacity-75
          data-[state=checked]:border-border-active data-[state=checked]:bg-p50
        `,
        className,
        'ui-radio-group-item'
      )}
      {...inputProps}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className={cn(`
          relative flex size-full items-center justify-center
          after:block after:size-1.5 after:rounded-full after:bg-p300
        `)}
      />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
