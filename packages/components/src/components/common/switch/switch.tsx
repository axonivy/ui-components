import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/utils/class-name';
import { root, thumb, type SwitchVariants, switchSize, thumbIcon } from './switch.css';
import { useField, Field } from '@/components/common/fieldset/fieldset';
import { type IvyIconProps, IvyIcon } from '@/components/common/icon/icon';
import { useReadonly } from '@/context/useReadonly';
import { Label } from '@/components/common/label/label';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SwitchVariants & { icon?: IvyIconProps }
>(({ size, icon, disabled, className, ...props }, ref) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <SwitchPrimitives.Root
      className={cn(root, switchSize({ size }), className, 'ui-switch')}
      disabled={readonly || disabled}
      {...inputProps}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn(thumb)}>
        {icon && <IvyIcon icon={icon.icon} rotate={icon.rotate} className={thumbIcon({ size })} />}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export type BasicSwitchProps = React.ComponentPropsWithoutRef<typeof Switch> & {
  label: string;
};

const BasicSwitch = ({ label, ...props }: BasicSwitchProps) => (
  <Field direction='row' alignItems='center' gap={2}>
    <Switch {...props} />
    <Label>{label}</Label>
  </Field>
);
BasicSwitch.displayName = 'BasicSwitch';

export { Switch, BasicSwitch };
