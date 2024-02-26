import * as React from 'react';
import { cn } from '@/utils/class-name';
import { button, iconOnly, type ButtonVariants } from './button.css';
import { IvyIcon, type IvyIconProps } from '@/components/common';
import type { IvyIcons } from '@axonivy/ui-icons';

export type Control = { title: string; icon: IvyIcons; onClick: () => void; toggle?: boolean };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, icon, rotate, variant, size, toggle, children, ...props }, ref) => {
    const toggleProps = useToggle(toggle);
    return (
      <button
        className={cn(button({ variant, size }), className, children === undefined && iconOnly({ size }), 'ui-button')}
        ref={ref}
        {...toggleProps}
        {...props}
      >
        {icon && <IvyIcon icon={icon} rotate={rotate} />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
