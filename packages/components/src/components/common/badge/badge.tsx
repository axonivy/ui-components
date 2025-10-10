import { badge, type BadgeVariants } from '@/components/common/badge/badge.css';
import { cn } from '@/utils/class-name';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';

function Badge({
  className,
  variant = 'default',
  size = 'default',
  round = false,
  asChild = false,
  ...props
}: ComponentProps<'span'> & BadgeVariants & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';
  return <Comp data-slot='badge' className={cn(badge({ variant, size, round }), className, 'ui-badge')} {...props} />;
}

export { Badge };
