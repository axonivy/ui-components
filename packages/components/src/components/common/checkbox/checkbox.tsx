import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { Field, useField } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { Label } from '@/components/common/label/label';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ComponentProps } from 'react';

/**
 * Checkbox, based on {@link https://www.radix-ui.com/docs/primitives/components/checkbox | Radix UI Checkbox}
 * Use the {@link BasicCheckbox} component for a Checkbox with a label
 */
function Checkbox({ disabled, className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'flex h-4.25 w-4.25 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border-basic bg-n25 enabled:hover:border-border-active enabled:hover:bg-p50 enabled:focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-75 data-[state=checked]:border-border-active data-[state=checked]:bg-p50',
        className,
        'ui-checkbox'
      )}
      disabled={readonly || disabled}
      {...inputProps}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className={cn('flex items-center justify-center text-p300', 'ui-checkbox-indicator')}
      >
        <IvyIcon icon={IvyIcons.Check} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export type BasicCheckboxProps = ComponentProps<typeof Checkbox> & {
  label: string;
};

const BasicCheckbox = ({ label, ...props }: BasicCheckboxProps) => (
  <Field direction='row' alignItems='center' gap={2}>
    <Checkbox {...props} />
    <Label>{label}</Label>
  </Field>
);
BasicCheckbox.displayName = 'BasicCheckbox';

export { BasicCheckbox, Checkbox };
