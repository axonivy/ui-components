import * as React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { cn } from '@/utils/class-name';
import { iconOnly, toggleBar, toggleBarItem } from './toggleBar.css';
import { useReadonly } from '@/context';
import { IvyIcon, useField, type IvyIconProps } from '@/components';

type ToggleBarItemWithIconProps = React.ComponentPropsWithoutRef<typeof ToggleGroup.Item> &
  IvyIconProps & {
    size?: 'small' | 'large' | undefined;
  };

type ToggleBarProps = React.ComponentPropsWithoutRef<typeof ToggleGroup.Root> & {
  gap?: 1 | 2 | 3 | 4 | undefined;
};

const ToggleBar = React.forwardRef<React.ElementRef<typeof ToggleGroup.Root>, ToggleBarProps>(
  ({ disabled, className, gap, ...props }, ref) => {
    const readonly = useReadonly();
    return (
      <ToggleGroup.Root
        className={cn(toggleBar({ gap }), className, 'ui-toggle-bar')}
        disabled={readonly || disabled}
        {...props}
        ref={ref}
      />
    );
  }
);
ToggleBar.displayName = ToggleGroup.Root.displayName;

const ToggleBarItem = React.forwardRef<React.ElementRef<typeof ToggleGroup.Item>, React.ComponentPropsWithoutRef<typeof ToggleGroup.Item>>(
  ({ className, ...props }, ref) => {
    const { inputProps } = useField();
    return (
      <ToggleGroup.Item ref={ref} className={cn(toggleBarItem, className, 'ui-toggle-bar-item')} {...inputProps} {...props}>
        {props.children}
      </ToggleGroup.Item>
    );
  }
);
ToggleBarItem.displayName = ToggleGroup.Item.displayName;

const ToggleBarItemOnlyIcon = ({ icon, rotate, size, ...props }: ToggleBarItemWithIconProps) => (
  <ToggleBarItem className={iconOnly({ size })} {...props}>
    <IvyIcon icon={icon} rotate={rotate} />
  </ToggleBarItem>
);
ToggleBarItemOnlyIcon.displayName = 'ToggleBarItemOnlyIcon';

export { ToggleBar, ToggleBarItem, ToggleBarItemOnlyIcon };
