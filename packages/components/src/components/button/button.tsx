import * as React from 'react';
import { cn } from '../../utils/class-name';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { IvyIcons } from '@axonivy/ui-icons';
import './button.css';
import IvyIcon from '../icon/icon';

const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: '',
      primary: 'primary',
      outline: 'outline'
    },
    size: {
      default: '',
      small: 'small',
      icon: 'icon-only'
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, icon, variant, size, toggle, children, ...props }, ref) => {
  const toggleProp = toggle !== undefined ? (toggle ? { 'data-state': 'on' } : { 'data-state': 'off' }) : {};
  return (
    <button className={cn(buttonVariants({ className, variant, size }))} ref={ref} {...toggleProp} {...props}>
      {icon && <IvyIcon icon={icon} />}
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export { Button };
