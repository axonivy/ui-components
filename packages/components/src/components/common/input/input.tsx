import * as React from 'react';

import { cn } from '@/utils/class-name';
import { input, inputGroup } from './input.css';
import { useReadonly } from '@/context';
import { Flex, useField } from '@/components';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ disabled, className, type, ...props }, ref) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <input type={type} className={cn(input, className, 'ui-input')} disabled={readonly || disabled} ref={ref} {...inputProps} {...props} />
  );
});
Input.displayName = 'Input';

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <Flex ref={ref} direction='row' gap={1} alignItems='center' className={cn(inputGroup, className, 'ui-inputgroup')} {...props} />;
});

export { Input, InputGroup };
