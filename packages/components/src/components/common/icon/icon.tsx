import * as React from 'react';
import type { IvyIcons } from '@axonivy/ui-icons';
import { cn } from '@/utils/class-name';
import type { WithClassName } from '@/types/types';

export type IvyIconProps = React.ButtonHTMLAttributes<HTMLElement> & {
  icon: IvyIcons;
  rotate?: 45 | 90 | 180 | 270;
};

const IvyIcon = React.forwardRef<HTMLElement, IvyIconProps & WithClassName>(({ icon, rotate, className, ...props }, ref) => {
  return <i className={cn('ivy', `ivy-${icon}`, rotate && `ivy-rotate-${rotate}`, className)} {...props} ref={ref} />;
});

export { IvyIcon };
