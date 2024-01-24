import * as React from 'react';
import type { IvyIcons } from '@axonivy/ui-icons';
import { cn } from '@/utils/class-name';

export type IvyIconProps = {
  icon: IvyIcons;
  rotate?: 45 | 90 | 180 | 270;
};

const IvyIcon = React.forwardRef<HTMLElement, IvyIconProps & React.ButtonHTMLAttributes<HTMLElement>>(
  ({ icon, rotate, className, ...props }, ref) => {
    return <i className={cn('ivy', `ivy-${icon}`, rotate && `ivy-rotate-${rotate}`, className)} {...props} ref={ref} />;
  }
);

export { IvyIcon };
