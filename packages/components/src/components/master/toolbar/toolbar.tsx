import * as React from 'react';
import type { WithClassName } from '@/types/types';
import { toolbar, toolbarContainer, toolbarHeader, toolbarTitle } from './toolbar.css';
import { cn } from '@/utils/class-name';

const Toolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & WithClassName>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn(toolbar, className)} ref={ref} {...props}>
        <div className={cn(toolbarHeader)}>{children}</div>
      </div>
    );
  }
);
Toolbar.displayName = 'Toolbar';

const ToolbarTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & WithClassName>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn(toolbarTitle, className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
ToolbarTitle.displayName = 'ToolbarTitle';

type ToolbarContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth: number;
};

const ToolbarContainer = React.forwardRef<HTMLDivElement, ToolbarContainerProps & WithClassName>(
  ({ maxWidth, className, children, ...props }, ref) => {
    return (
      <div style={{ '--toolbar-container-max-width': `${maxWidth}px` }} className={cn(toolbarContainer, className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
ToolbarContainer.displayName = 'ToolbarContainer';

export { Toolbar, ToolbarTitle, ToolbarContainer };
