import * as React from 'react';

import { cn } from '../../utils/class-name';
import { textarea } from './textarea.css';
import { useAutoResize, type AutoResizeProps } from './useAutoResize';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, AutoResizeProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ autoResize, value, onChange, maxRows, className, ...props }, ref) => {
    const resize = useAutoResize({ autoResize, value, onChange, maxRows });
    return <textarea className={cn(textarea, className)} ref={ref} {...props} {...resize} />;
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
