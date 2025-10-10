import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';
import type { FlexVariants } from './flex.css';
import { flex } from './flex.css';

const Flex = ({ direction, gap, alignItems, justifyContent, className, ...props }: ComponentProps<'div'> & FlexVariants) => (
  <div className={cn(flex({ direction, gap, alignItems, justifyContent }), className, 'ui-flex')} {...props} />
);
Flex.displayName = 'Flex';

export { Flex };
