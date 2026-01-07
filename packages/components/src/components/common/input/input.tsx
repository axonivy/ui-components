import { Button } from '@/components/common/button/button';
import { useField } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { ReadonlyProvider, useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState, type ChangeEvent, type ComponentProps } from 'react';
import { input, inputGroup, searchIcon } from './input.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends ComponentProps<'input'> {}

const Input = ({ disabled, className, type, ...props }: InputProps) => {
  const readonly = useReadonly();
  const { inputProps } = useField();
  return <input type={type} className={cn(input, className, 'ui-input')} disabled={readonly || disabled} {...inputProps} {...props} />;
};
Input.displayName = 'Input';

const BasicInput = ({ value, onChange, defaultValue, ...props }: InputProps) => {
  const [currentValue, setCurrentValue] = useState(value ?? defaultValue ?? '');
  const [prevValue, setPrevValue] = useState(value);
  if (value !== undefined && prevValue !== value) {
    setCurrentValue(value);
    setPrevValue(value);
  }
  const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
    onChange?.(event);
  };
  return <Input value={currentValue} onChange={updateValue} {...props} />;
};
BasicInput.displayName = 'BasicInput';

type SearchInputProps = Omit<InputProps, 'value' | 'onChange'> & { value?: string; onChange?: (change: string) => void };

const SearchInput = ({ value, onChange, ...props }: SearchInputProps) => {
  const [currentValue, setCurrentValue] = useState(value ?? '');
  const [prevValue, setPrevValue] = useState(value);
  if (value !== undefined && prevValue !== value) {
    setCurrentValue(value);
    setPrevValue(value);
  }
  const updateValue = (change: string) => {
    setCurrentValue(change);
    onChange?.(change);
  };
  return (
    <ReadonlyProvider readonly={false}>
      <InputGroup>
        <IvyIcon icon={IvyIcons.Search} className={searchIcon} />
        <Input value={currentValue} onChange={e => updateValue(e.target.value)} {...props} />
        {currentValue.length > 0 && <Button icon={IvyIcons.Close} onClick={() => updateValue('')} aria-label='Clean' />}
      </InputGroup>
    </ReadonlyProvider>
  );
};
SearchInput.displayName = 'SearchInput';

type PasswordInputProps = Omit<InputProps, 'value' | 'onChange' | 'type'> & { value?: string; onChange?: (change: string) => void };

const PasswordInput = ({ onChange, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup>
      <BasicInput type={showPassword ? 'text' : 'password'} onChange={e => onChange?.(e.target.value)} {...props} />
      <Button icon={IvyIcons.Eye} onClick={() => setShowPassword(!showPassword)} aria-label='Show password' />
    </InputGroup>
  );
};
PasswordInput.displayName = 'PasswordInput';

const InputGroup = ({ className, ...props }: ComponentProps<typeof Flex>) => (
  <Flex direction='row' gap={1} alignItems='center' className={cn(inputGroup, className, 'ui-inputgroup')} {...props} />
);
InputGroup.displayName = 'InputGroup';

export { BasicInput, Input, InputGroup, PasswordInput, SearchInput };
