import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { Field, useField } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { Label } from '@/components/common/label/label';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';

/**
 * Checkbox, based on {@link https://www.radix-ui.com/docs/primitives/components/checkbox | Radix UI Checkbox}
 * Use the {@link BasicCheckbox} component for a Checkbox with a label
 */
const Checkbox = ({ disabled, className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'ui-checkbox flex h-[17px] w-[17px] shrink-0 cursor-pointer items-center justify-center rounded-xs border-1 border-border-basic bg-n25 enabled:hover:border-border-active enabled:hover:bg-p50 enabled:focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-75 data-[state=checked]:border-border-active data-[state=checked]:bg-p50',
        className
      )}
      disabled={readonly || disabled}
      {...inputProps}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-p300')}>
        <IvyIcon icon={IvyIcons.Check} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export type BasicCheckboxProps = React.ComponentProps<typeof Checkbox> & {
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
