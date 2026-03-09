import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';
import { spinner, type SpinnerVariants } from './spinner.css';

type SpinnerProps = ComponentProps<'span'> & SpinnerVariants & { color?: string };

/* from https://cssloaders.github.io/, licensed under MIT */
const Spinner = ({ size, className, color, ...props }: SpinnerProps) => (
  <span className={cn(spinner({ size, color }), 'ui-spinner', className)} {...props} />
);
Spinner.displayName = 'Spinner';

export { Spinner };
