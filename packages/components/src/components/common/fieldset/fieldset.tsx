import { Flex, Label, Message, type MessageData } from '@/components/common';
import { cn } from '@/utils/class-name';
import * as React from 'react';
import { fieldset } from './fieldset.css';

type FieldsetContextValue = {
  id: string;
};

const FieldsetContext = React.createContext<FieldsetContextValue>({} as FieldsetContextValue);

export const useField = () => {
  const { id } = React.useContext(FieldsetContext);
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

const Field = React.forwardRef<React.ElementRef<typeof Flex>, React.ComponentPropsWithoutRef<typeof Flex>>(
  ({ direction = 'column', gap = 1, className, ...props }, ref) => {
    const id = React.useId();
    return (
      <FieldsetContext.Provider value={{ id }}>
        <Flex direction={direction} gap={gap} ref={ref} className={cn(className, 'ui-field')} {...props} />
      </FieldsetContext.Provider>
    );
  }
);
Field.displayName = 'Field';

export type FieldsetProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string;
  control?: React.ReactNode;
  message?: MessageData;
};

const Fieldset = React.forwardRef<HTMLDivElement, FieldsetProps>(({ label, control, message, className, children, ...props }, ref) => (
  <Field ref={ref} className={cn(className, fieldset, 'ui-fieldset')} data-message-state={message ? message.variant : undefined} {...props}>
    <Flex alignItems='center' justifyContent='space-between' className={cn('ui-fieldset-label')}>
      <Label>{label}</Label>
      {control}
    </Flex>
    {children}
    {message && <Message {...message} />}
  </Field>
));
Fieldset.displayName = 'Fieldset';

export { Field, Fieldset };
