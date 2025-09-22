import { cn } from '@/utils/class-name';

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('animate-pulse rounded-md bg-n100', className)} {...props} />
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
