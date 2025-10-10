import { useField } from '@/components/common/field/field';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';
import { textarea } from './textarea.css';
import { useAutoResize, type AutoResizeProps } from './useAutoResize';

export interface TextareaProps extends ComponentProps<'textarea'>, AutoResizeProps {}

const Textarea = ({ autoResize, value, onChange, maxRows, className, style, disabled, ...props }: TextareaProps) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  const { style: height, ...resize } = useAutoResize({ autoResize, value, onChange, maxRows });
  return (
    <textarea
      className={cn(textarea, className, 'ui-textarea')}
      disabled={readonly || disabled}
      style={{ ...height, ...style }}
      {...inputProps}
      {...props}
      {...resize}
    />
  );
};
Textarea.displayName = 'Textarea';

export { Textarea };
