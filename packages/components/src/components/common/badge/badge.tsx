import { cn } from '@/utils/class-name';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva('inline-flex items-center gap-1 whitespace-nowrap border p-1 text-xs', {
  variants: {
    variant: {
      default: 'bg-p300 text-background border-transparent',
      primary: 'text-p300 bg-p50 border-transparent',
      secondary: 'bg-n100 text-body border-transparent',
      orange: 'text-body border-transparent bg-orange-300 dark:bg-orange-800',
      green: 'text-body border-transparent bg-green-300 dark:bg-green-800',
      blue: 'text-body border-transparent bg-blue-300 dark:bg-blue-800',
      red: 'text-body border-transparent bg-red-300 dark:bg-red-800',
      pink: 'text-body border-transparent bg-pink-300 dark:bg-pink-800',
      purple: 'text-body border-transparent bg-purple-300 dark:bg-purple-800',
      yellow: 'text-body border-transparent bg-yellow-300 dark:bg-yellow-800',
      outline: 'text-body border-n100 bg-transparent'
    },
    size: {
      default: 'h-6',
      s: 'h-5',
      xs: 'h-4'
    },
    round: {
      true: 'rounded-full',
      false: 'rounded-md'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    round: false
  }
});

function Badge({
  className,
  variant = 'default',
  size = 'default',
  round = false,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';
  return <Comp data-slot='badge' className={cn(badgeVariants({ variant, size, round }), className, 'ui-badge')} {...props} />;
}

export { Badge };
