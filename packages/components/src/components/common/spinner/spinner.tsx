import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';
import { spinner, type SpinnerVariants } from './spinner.css';

type SpinnerProps = ComponentProps<'span'> & SpinnerVariants;

/* from https://cssloaders.github.io/, licensed under MIT */
const Spinner = ({ size, className, ...props }: SpinnerProps) => <span className={cn(spinner({ size }), className)} {...props} />;
Spinner.displayName = 'Spinner';

export { Spinner };
