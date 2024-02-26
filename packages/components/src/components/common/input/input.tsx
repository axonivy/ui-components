import * as React from 'react';

import { cn } from '@/utils/class-name';
import { input } from './input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn(input, className, 'ui-input')} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
