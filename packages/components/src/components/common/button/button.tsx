import * as React from 'react';
import { cn } from '@/utils/class-name';
import { button, iconOnly, type ButtonVariants } from './button.css';
import { Flex } from '@/components/common/flex/flex';
import { type IvyIconProps, IvyIcon } from '@/components/common/icon/icon';

export type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariants &
  Partial<IvyIconProps> & {
    toggle?: boolean;
  };

const useToggle = (toggle?: boolean) => {
  if (toggle === undefined) {
    return {};
  }
  if (toggle) {
    return { 'data-state': 'on', 'aria-pressed': true };
  }
  return { 'data-state': 'off', 'aria-pressed': false };
};

const Button = ({ className, icon, rotate, spin, variant, size, toggle, children, ...props }: ButtonProps) => {
  const toggleProps = useToggle(toggle);
  return (
    <button
      className={cn(button({ variant, size }), className, children === undefined && iconOnly({ size }), 'ui-button')}
      {...toggleProps}
      {...props}
    >
      {icon && <IvyIcon icon={icon} rotate={rotate} spin={spin} />}
      {children}
    </button>
  );
};
Button.displayName = 'Button';

export type ButtonGroupProps = React.ComponentProps<typeof Flex> & { controls: Array<ButtonProps> };

const ButtonGroup = ({ controls, className, ...props }: ButtonGroupProps) => (
  <Flex gap={1} className={cn(className, 'ui-button-group')} {...props}>
    {controls.map(control => (
      <Button key={control.title} {...control} />
    ))}
  </Flex>
);
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup };
