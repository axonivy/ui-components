import * as React from 'react';
import { cn } from '@/utils/class-name';
import type { IvyIcons } from '@axonivy/ui-icons';
import { button, iconOnly, type ButtonVariants } from './button.css';
import { IvyIcon } from '@/components/common';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    icon?: IvyIcons;
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, icon, variant, size, toggle, children, ...props }, ref) => {
  const toggleProps = useToggle(toggle);
  return (
    <button
      className={cn(button({ variant, size }), className, children === undefined && iconOnly({ size }))}
      ref={ref}
      {...toggleProps}
      {...props}
    >
      {icon && <IvyIcon icon={icon} />}
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export { Button };
