import { cn } from '@/utils/class-name';
import { skeleton } from './skeleton.css';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(skeleton, className)} {...props} />;
}

export { Skeleton };
