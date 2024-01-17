import * as React from 'react';

import { cn } from '../../utils/class-name';
import IvyIcon from '../icon/icon';
import type { WithClassName } from '../../types/types';
import { IvyIcons } from '@axonivy/ui-icons';
import { message as messageClass } from './message.css';
import { cva, type VariantProps } from 'class-variance-authority';

const messageVariants = cva(messageClass, {
  variants: {
    variant: {
      default: '',
      description: 'description',
      info: 'info',
      warning: 'warning',
      error: 'error'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const ivyIconForSeverity = (variant: VariantProps<typeof messageVariants>['variant']) => {
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

export type MessageProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof messageVariants> & { message?: string };

const Message = React.forwardRef<HTMLParagraphElement, MessageProps & WithClassName>(
  ({ message, variant, className, children, ...props }, ref) => {
    const body = message ? message : children;
    const icon = ivyIconForSeverity(variant);
    return (
      <p ref={ref} className={cn(messageVariants({ variant }), className)} title={message} {...props}>
        {icon && <IvyIcon icon={icon} />}
        {body}
      </p>
    );
  }
);
Message.displayName = 'Message';

export { Message };
