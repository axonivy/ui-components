import { cn } from '@/utils/class-name';
import { skeleton } from './skeleton.css';

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => <div className={cn(skeleton, className)} {...props} />;
Skeleton.displayName = 'Skeleton';

export { Skeleton };
