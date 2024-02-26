import { Flex, Label, Message, type MessageData } from '@/components';
import { cn } from '@/utils/class-name';
import * as React from 'react';

type FieldsetContextValue = {
  id: string;
};

const FieldsetContext = React.createContext<FieldsetContextValue>({} as FieldsetContextValue);

export const useFieldset = () => {
  const { id } = React.useContext(FieldsetContext);
  return createIds(id);
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

export type FieldsetProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string;
  control?: React.ReactNode;
  message?: MessageData;
};

const Fieldset = React.forwardRef<HTMLDivElement, FieldsetProps>(({ label, control, message, className, children, ...props }, ref) => {
  const id = React.useId();
  const { labelProps, messageProps } = createIds(id);
  return (
    <FieldsetContext.Provider value={{ id }}>
      <Flex direction='column' gap={1} ref={ref} className={cn(className, 'ui-fieldset')} {...props}>
        <Flex alignItems='center' justifyContent='space-between' className={cn('ui-fieldset-label')}>
          <Label {...labelProps}>{label}</Label>
          {control}
        </Flex>
        {children}
        {message && <Message {...messageProps} {...message} />}
      </Flex>
    </FieldsetContext.Provider>
  );
});
Fieldset.displayName = 'Fieldset';

export { Fieldset };
