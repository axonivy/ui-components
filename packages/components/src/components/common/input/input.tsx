import * as React from 'react';

import { cn } from '@/utils/class-name';
import { input } from './input.css';
import { useReadonly } from '@/context';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ disabled, className, type, ...props }, ref) => {
  const readonly = useReadonly();
  return <input type={type} className={cn(input, className, 'ui-input')} disabled={readonly || disabled} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
