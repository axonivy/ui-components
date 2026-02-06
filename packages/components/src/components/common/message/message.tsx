import { useField } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const messageStyles = cva('m-0 inline-flex items-center gap-1 px-1 text-xs font-normal', {
  variants: {
    variant: {
      description: 'text-neutral-700',
      info: '',
      warning: 'text-warning',
      error: 'text-error'
    }
  }
});

type MessageVariants = VariantProps<typeof messageStyles>;

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
export type MessageData = MessageVariants & { message?: string; singleLine?: boolean };

export type MessageProps = ComponentProps<'p'> & MessageData;

function Message({ message, variant, className, singleLine, children, ...props }: MessageProps) {
  const { messageProps } = useField();
  const icon = ivyIconForSeverity(variant);
  return (
    <p
      data-slot='message'
      className={cn(singleLine && 'w-full', messageStyles({ variant }), className, 'ui-message')}
      title={message}
      data-state={variant}
      {...messageProps}
      {...props}
    >
      {icon && <IvyIcon icon={icon} />}
      {message ? <span className={cn(singleLine && 'truncate')}>{message}</span> : children}
    </p>
  );
}

export { Message };
