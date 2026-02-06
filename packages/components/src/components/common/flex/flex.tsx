import { cn } from '@/utils/class-name';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const flexVariants = cva('flex', {
  variants: {
    direction: {
      column: 'flex-col',
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse'
    },
    gap: {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4'
    },
    alignItems: {
      center: 'items-center'
    },
    justifyContent: {
      center: 'justify-center',
      'space-between': 'justify-between',
      'flex-end': 'justify-end'
    }
  }
});

function Flex({
  direction,
  gap,
  alignItems,
  justifyContent,
  className,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof flexVariants>) {
  return <div className={cn(flexVariants({ direction, gap, alignItems, justifyContent }), className, 'ui-flex')} {...props} />;
}

export { Flex };
