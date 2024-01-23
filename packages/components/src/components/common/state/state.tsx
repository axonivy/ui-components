import * as React from 'react';
import { cn } from '@/utils/class-name';
import type { WithClassName } from '@/types/types';
import { dot, type DotVariants } from './state.css';

const StateDot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & DotVariants & WithClassName>(
  ({ state, className, ...props }, ref) => <div ref={ref} className={cn(dot({ state }), className)} data-state={state} {...props} />
);
StateDot.displayName = 'StateDot';

export { StateDot };
