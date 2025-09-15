import { cn } from '@/utils/class-name';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva('inline-flex items-center gap-1 border p-1 text-xs whitespace-nowrap', {
  variants: {
    variant: {
      default: 'border-transparent bg-p300 text-background',
      primary: 'border-transparent bg-p50 text-p300',
      secondary: 'border-transparent bg-n100 text-body',
      orange: 'border-transparent bg-orange-300 text-body dark:bg-orange-800',
      green: 'border-transparent bg-green-300 text-body dark:bg-green-800',
      blue: 'border-transparent bg-blue-300 text-body dark:bg-blue-800',
      red: 'border-transparent bg-red-300 text-body dark:bg-red-800',
      pink: 'border-transparent bg-pink-300 text-body dark:bg-pink-800',
      purple: 'border-transparent bg-purple-300 text-body dark:bg-purple-800',
      yellow: 'border-transparent bg-yellow-300 text-body dark:bg-yellow-800',
      outline: 'border-n100 bg-transparent text-body'
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
