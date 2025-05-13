import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/utils/class-name';
import { root, thumb, type SwitchVariants, switchSize, thumbIcon } from './switch.css';
import { useField, Field } from '@/components/common/field/field';
import { type IvyIconProps, IvyIcon } from '@/components/common/icon/icon';
import { useReadonly } from '@/context/useReadonly';
import { Label } from '@/components/common/label/label';

/**
 * Switch, based on {@link https://www.radix-ui.com/docs/primitives/components/switch | Radix UI Switch}
 */
const Switch = ({
  size,
  icon,
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root> & SwitchVariants & { icon?: IvyIconProps }) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <SwitchPrimitives.Root
      className={cn(root, switchSize({ size }), className, 'ui-switch')}
      disabled={readonly || disabled}
      {...inputProps}
      {...props}
    >
      <SwitchPrimitives.Thumb className={cn(thumb)}>
        {icon && <IvyIcon icon={icon.icon} rotate={icon.rotate} className={thumbIcon({ size })} />}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
};
Switch.displayName = SwitchPrimitives.Root.displayName;

export type BasicSwitchProps = React.ComponentProps<typeof Switch> & {
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
