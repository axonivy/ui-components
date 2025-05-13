import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/utils/class-name';
import { checkboxIndicator, checkboxRoot } from './checkbox.css';
import { IvyIcons } from '@axonivy/ui-icons';
import { useField, Field } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { useReadonly } from '@/context/useReadonly';
import { Label } from '@/components/common/label/label';

/**
 * Checkbox, based on {@link https://www.radix-ui.com/docs/primitives/components/checkbox | Radix UI Checkbox}
 * Use the {@link BasicCheckbox} component for a Checkbox with a label
 */
const Checkbox = ({ disabled, className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <CheckboxPrimitive.Root
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

export { Checkbox, BasicCheckbox };
