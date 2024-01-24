import * as React from 'react';

import { cn } from '@/utils/class-name';
import { IvyIcon } from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';
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

export type MessageProps = React.HTMLAttributes<HTMLParagraphElement> & MessageVariants & { message?: string };

const Message = React.forwardRef<HTMLParagraphElement, MessageProps>(({ message, variant, className, children, ...props }, ref) => {
  const body = message ? message : children;
  const icon = ivyIconForSeverity(variant);
  return (
    <p ref={ref} className={cn(messageClass({ variant }), className)} title={message} {...props}>
      {icon && <IvyIcon icon={icon} />}
      {body}
    </p>
  );
});
Message.displayName = 'Message';

export { Message };
