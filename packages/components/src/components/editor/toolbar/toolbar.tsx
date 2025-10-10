import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';
import { toolbar, toolbarContainer, toolbarHeader, toolbarTitle, type ToolbarContainerVariants } from './toolbar.css';

const Toolbar = ({ className, children, ...props }: ComponentProps<'div'>) => (
  <div className={cn(toolbar, className)} {...props}>
    <div className={cn(toolbarHeader)}>{children}</div>
  </div>
);
Toolbar.displayName = 'Toolbar';

const ToolbarTitle = ({ className, children, ...props }: ComponentProps<'div'>) => (
  <div className={cn(toolbarTitle, className)} {...props}>
    {children}
  </div>
);
ToolbarTitle.displayName = 'ToolbarTitle';

const ToolbarContainer = ({ maxWidth, minWidth, className, children, ...props }: ComponentProps<'div'> & ToolbarContainerVariants) => {
  return (
    <div className={cn(toolbarContainer({ maxWidth, minWidth }), className)} {...props}>
      {children}
    </div>
  );
};

ToolbarContainer.displayName = 'ToolbarContainer';

export { Toolbar, ToolbarContainer, ToolbarTitle };
