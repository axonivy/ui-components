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
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, icon, variant, size, children, ...props }, ref) => {
  return (
    <button className={cn(buttonVariants({ className, variant, size }))} ref={ref} {...props}>
      {icon && <IvyIcon icon={icon} />}
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export { Button };
