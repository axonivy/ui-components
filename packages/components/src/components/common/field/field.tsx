import { Flex } from '@/components/common/flex/flex';
import { Label } from '@/components/common/label/label';
import { type MessageData, Message } from '@/components/common/message/message';
import { cn } from '@/utils/class-name';
import * as React from 'react';
import { field } from './field.css';

type FieldContextValue = {
  id: string;
};

const FieldContext = React.createContext<FieldContextValue>({} as FieldContextValue);

export const useField = () => {
  const { id } = React.useContext(FieldContext);
  const newId = React.useId();
  return createIds(id ?? newId);
};

const createIds = (id: string) => {
  const labelId = `${id}-label`;
  const inputId = `${id}-input`;
  const messageId = `${id}-message`;
  return {
    labelProps: {
      id: labelId,
      htmlFor: inputId
    },
    inputProps: {
      id: inputId,
      'aria-labelledby': labelId,
      'aria-describedby': messageId
    },
    messageProps: {
      id: messageId
    }
  };
};

/**
 * Field is a wrapper for Labels and Inputs so they are linked automatically together.
 * Use the {@link useField} hook to access the FieldContext properties.
 * Use the {@link BasicField} component for a Field with predefined Label and Message block.
 */
const Field = ({ direction = 'column', gap = 1, className, ...props }: React.ComponentProps<typeof Flex>) => {
  const id = React.useId();
  return (
    <FieldContext.Provider value={{ id }}>
      <Flex direction={direction} gap={gap} className={cn(className, 'ui-field')} {...props} />
    </FieldContext.Provider>
  );
};
Field.displayName = 'Field';

export type BasicFieldProps = React.ComponentProps<typeof Field> & {
  label?: string;
  control?: React.ReactNode;
  message?: MessageData;
};

const BasicField = ({ label, control, message, className, children, ...props }: BasicFieldProps) => (
  <Field className={cn(className, field, 'ui-fieldset')} data-message-state={message ? message.variant : undefined} {...props}>
    <Flex alignItems='center' justifyContent='space-between' className={cn('ui-fieldset-label')}>
      <Label>{label}</Label>
      {control}
    </Flex>
    {children}
    {message && <Message {...message} />}
  </Field>
);
BasicField.displayName = 'BasicField';

export { BasicField, Field };
