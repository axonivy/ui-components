import * as React from 'react';

import { cn } from '@/utils/class-name';
import { input, inputGroup, searchIcon } from './input.css';
import { useReadonly } from '@/context';
import { Button, Flex, IvyIcon, useField } from '@/components';
import { IvyIcons } from '@axonivy/ui-icons';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ disabled, className, type, ...props }, ref) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <input type={type} className={cn(input, className, 'ui-input')} disabled={readonly || disabled} ref={ref} {...inputProps} {...props} />
  );
});
Input.displayName = 'Input';

type SearchInputProps = Omit<InputProps, 'value' | 'onChange'> & { value?: string; onChange: (change: string) => void };

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({ value, onChange, ...props }, ref) => {
  const [filter, setFilter] = React.useState(value ?? '');
  React.useEffect(() => {
    setFilter(value ?? '');
  }, [value]);
  const updateValue = (change: string) => {
    setFilter(change);
    onChange(change);
  };
  return (
    <InputGroup>
      <IvyIcon icon={IvyIcons.Search} className={searchIcon} />
      <Input value={filter} onChange={e => updateValue(e.target.value)} {...props} ref={ref} />
      {filter.length > 0 && <Button icon={IvyIcons.Close} onClick={() => updateValue('')} />}
    </InputGroup>
  );
});
SearchInput.displayName = 'SearchInput';

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <Flex ref={ref} direction='row' gap={1} alignItems='center' className={cn(inputGroup, className, 'ui-inputgroup')} {...props} />
));
InputGroup.displayName = 'InputGroup';

export { Input, InputGroup, SearchInput };
