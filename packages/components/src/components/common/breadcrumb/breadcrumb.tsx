import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';

function Breadcrumb({ className, ...props }: ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' className={cn(className, 'ui-breadcrumb')} {...props} />;
}

function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn(
        'ui-breadcrumb-list m-0 flex cursor-default list-none flex-wrap items-center gap-2 p-0 wrap-break-word text-n800',
        className,
        'ui-breadcrumb-list'
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot='breadcrumb-item' className={cn('inline-flex items-center gap-1', className, 'ui-breadcrumb-item')} {...props} />;
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn('text-inherit decoration-inherit transition-colors hover:text-body', className, 'ui-breadcrumb-link')}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('text-body', className, 'ui-breadcrumb-page')}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn('inline-flex items-center', className, 'ui-breadcrumb-separator')}
      {...props}
    >
      {children ?? '/'}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn('inline-flex cursor-pointer items-center justify-center hover:text-body', className, 'ui-breadcrumb-ellipsis')}
      {...props}
    >
      <IvyIcon icon={IvyIcons.Dots} />
    </span>
  );
}

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
