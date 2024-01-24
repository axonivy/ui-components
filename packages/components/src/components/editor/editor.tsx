import * as React from 'react';
import { editor } from './editor.css';
import { cn } from '@/utils/class-name';

const Editor = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn(editor, className)} ref={ref} {...props}>
      {children}
    </div>
  );
});
Editor.displayName = 'Editor';

export { Editor };
