import * as React from 'react';

import { cn } from '@/utils/class-name';
import { input, inputGroup, searchIcon } from './input.css';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { useField } from '@/components/common/fieldset/fieldset';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { useReadonly, ReadonlyProvider } from '@/context/useReadonly';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ disabled, className, type, ...props }, ref) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return (
    <input type={type} className={cn(input, className, 'ui-input')} disabled={readonly || disabled} ref={ref} {...inputProps} {...props} />
  );
});
Input.displayName = 'Input';

type SearchInputProps = Omit<InputProps, 'value' | 'onChange'> & { value?: string; onChange?: (change: string) => void };

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({ value, onChange, ...props }, ref) => {
  const [filter, setFilter] = React.useState(value ?? '');
  React.useEffect(() => {
    setFilter(value ?? '');
  }, [value]);
  const updateValue = (change: string) => {
    setFilter(change);
    if (onChange) {
      onChange(change);
    }
  };
  return (
    <ReadonlyProvider readonly={false}>
      <InputGroup>
        <IvyIcon icon={IvyIcons.Search} className={searchIcon} />
        <Input value={filter} onChange={e => updateValue(e.target.value)} {...props} ref={ref} />
        {filter.length > 0 && <Button icon={IvyIcons.Close} onClick={() => updateValue('')} title='Clean' />}
      </InputGroup>
    </ReadonlyProvider>
  );
});
SearchInput.displayName = 'SearchInput';

type PasswordInputProps = Omit<InputProps, 'value' | 'onChange' | 'type'> & { value?: string; onChange?: (change: string) => void };

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ value, onChange, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <InputGroup>
      <Input value={value} onChange={updateValue} type={showPassword ? 'text' : 'password'} {...props} ref={ref} />
      <Button icon={IvyIcons.Eye} onClick={() => setShowPassword(!showPassword)} aria-label='Show password' />
    </InputGroup>
  );
});
PasswordInput.displayName = 'PasswordInput';

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <Flex ref={ref} direction='row' gap={1} alignItems='center' className={cn(inputGroup, className, 'ui-inputgroup')} {...props} />
));
InputGroup.displayName = 'InputGroup';

export { Input, InputGroup, SearchInput, PasswordInput };
