import * as React from 'react';

import { cn } from '@/utils/class-name';
import { textarea } from './textarea.css';
import { useAutoResize, type AutoResizeProps } from './useAutoResize';
import { useReadonly } from '@/context';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, AutoResizeProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ autoResize, value, onChange, maxRows, className, style, disabled, ...props }, ref) => {
    const readonly = useReadonly();
    const { style: height, ...resize } = useAutoResize({ autoResize, value, onChange, maxRows });
    return (
      <textarea
        className={cn(textarea, className, 'ui-textarea')}
        ref={ref}
        disabled={readonly || disabled}
        style={{ ...height, ...style }}
        {...props}
        {...resize}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
