import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { breadcrumbEllipsis, breadcrumbItem, breadcrumbLink, breadcrumbList, breadcrumbPage, breadcrumbSeparator } from './breadcrumb.css';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return <ol data-slot='breadcrumb-list' className={cn(breadcrumbList, 'ui-breadcrumb-list', className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='breadcrumb-item' className={cn(breadcrumbItem, 'ui-breadcrumb-item', className)} {...props} />;
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';
  return <Comp data-slot='breadcrumb-link' className={cn(breadcrumbLink, 'ui-breadcrumb-link', className)} {...props} />;
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn(breadcrumbPage, 'ui-breadcrumb-page', className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn(breadcrumbSeparator, 'ui-breadcrumb-seperator', className)}
      {...props}
    >
      {children ?? '/'}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn(breadcrumbEllipsis, 'ui-breadcrumb-ellipsis', className)}
      {...props}
    >
      <IvyIcon icon={IvyIcons.Dots} />
    </span>
  );
}

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
