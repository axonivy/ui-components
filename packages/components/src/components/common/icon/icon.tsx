import * as React from 'react';
import type { IvyIcons } from '@axonivy/ui-icons';
import { cn } from '@/utils/class-name';

export type IvyIconProps = {
  icon: IvyIcons;
  rotate?: 45 | 90 | 180 | 270;
  spin?: boolean;
};

interface IconProps extends IvyIconProps, React.ComponentProps<'i'> {}

const IvyIcon = ({ icon, rotate, spin, className, ...props }: IconProps) => (
  <i className={cn('ivy', `ivy-${icon}`, rotate && `ivy-rotate-${rotate}`, spin && 'ivy-spin', className)} {...props} />
);

export { IvyIcon };
