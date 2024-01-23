import * as React from 'react';
import { cn } from '@/utils/class-name';
import type { WithClassName } from '@/types/types';
import { cva, type VariantProps } from 'class-variance-authority';
import { dot } from './state.css';

const stateVariants = cva(dot, {
  variants: {
    state: {
      configured: 'configured',
      warning: 'warning',
      error: 'error'
    }
  }
});

export type StateDotProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof stateVariants> & {};

const StateDot = React.forwardRef<HTMLDivElement, StateDotProps & WithClassName>(({ state, className, ...props }, ref) => (
  <div ref={ref} className={cn(stateVariants({ state }), className)} data-state={state} {...props} />
));
StateDot.displayName = 'StateDot';

export { StateDot };
