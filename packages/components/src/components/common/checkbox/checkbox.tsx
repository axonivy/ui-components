import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/utils/class-name';
import { checkboxIndicator, checkboxRoot } from './checkbox.css';
import { IvyIcons } from '@axonivy/ui-icons';
import { Field, IvyIcon, Label, useField } from '@/components/common';
import { useReadonly } from '@/context';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ disabled, className, ...props }, ref) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxRoot, className, 'ui-checkbox')}
      disabled={readonly || disabled}
      {...inputProps}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn(checkboxIndicator)}>
        <IvyIcon icon={IvyIcons.Check} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export type BasicCheckboxProps = React.ComponentPropsWithoutRef<typeof Checkbox> & {
  label: string;
};

const BasicCheckbox = ({ label, ...props }: BasicCheckboxProps) => (
  <Field direction='row' alignItems='center' gap={2}>
    <Checkbox {...props} />
    <Label>{label}</Label>
  </Field>
);
BasicCheckbox.displayName = 'BasicCheckbox';

export { Checkbox, BasicCheckbox };
