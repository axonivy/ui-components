import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';
import { skeleton } from './skeleton.css';

const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => <div className={cn(skeleton, className)} {...props} />;
Skeleton.displayName = 'Skeleton';

export { Skeleton };
