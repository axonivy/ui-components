import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='skeleton' className={cn('animate-pulse rounded-md bg-n100', className)} {...props} />;
}

export { Skeleton };
