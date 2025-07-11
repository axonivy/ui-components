import { useField } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as React from 'react';
import { message as messageClass, type MessageVariants } from './message.css';

const ivyIconForSeverity = (variant: NonNullable<MessageVariants>['variant']) => {
  switch (variant) {
    case 'info':
      return IvyIcons.InfoCircle;
    case 'warning':
      return IvyIcons.Caution;
    case 'error':
      return IvyIcons.ErrorXMark;
  }
  return undefined;
};
export type MessageData = MessageVariants & { message?: string };

export type MessageProps = React.ComponentProps<'p'> & MessageData;

const Message = ({ message, variant, className, children, ...props }: MessageProps) => {
  const { messageProps } = useField();
  const body = message ? message : children;
  const icon = ivyIconForSeverity(variant);
  return (
    <p className={cn(messageClass({ variant }), className, 'ui-message')} title={message} data-state={variant} {...messageProps} {...props}>
      {icon && <IvyIcon icon={icon} />}
      {body}
    </p>
  );
};
Message.displayName = 'Message';

export { Message };
