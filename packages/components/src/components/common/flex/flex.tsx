import * as React from 'react';
import { cn } from '@/utils/class-name';
import type { FlexVariants } from './flex.css';
import { flex } from './flex.css';
import type { WithClassName } from '@/types/types';

const Flex = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & FlexVariants & WithClassName>(
  ({ direction, gap, alignItems, justifyContent, className, children, ...props }, ref) => {
    return (
      <div className={cn(flex({ direction, gap, alignItems, justifyContent }), className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
Flex.displayName = 'Flex';

export { Flex };
