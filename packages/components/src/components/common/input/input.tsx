import * as React from 'react';

import { cn } from '@/utils/class-name';
import { input } from './input.css';
import { useReadonly } from '@/context';
import { useFieldset } from '@/components';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ disabled, className, type, ...props }, ref) => {
  const readonly = useReadonly();
  const { inputProps } = useFieldset();
  return (
    <input type={type} className={cn(input, className, 'ui-input')} disabled={readonly || disabled} ref={ref} {...inputProps} {...props} />
  );
});
Input.displayName = 'Input';

export { Input };
