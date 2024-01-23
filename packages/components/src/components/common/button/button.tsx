import * as React from 'react';
import { cn } from '@/utils/class-name';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { IvyIcons } from '@axonivy/ui-icons';
import { button, iconOnly } from './button.css';
import { IvyIcon } from '@/components/common';

const buttonVariants = cva(button, {
  variants: {
    variant: {
      default: '',
      primary: 'primary',
      outline: 'outline'
    },
    size: {
      default: '',
      small: 'small',
      large: 'large'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
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
      className={cn(buttonVariants({ className, variant, size }), children === undefined && iconOnly)}
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
