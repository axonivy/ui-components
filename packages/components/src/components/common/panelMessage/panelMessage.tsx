import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Message } from '@/components/common/message/message';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const panelStyles = cva('h-full text-n800', {
  variants: {
    mode: {
      row: 'p-0',
      column: 'p-5'
    }
  }
});

const panelIconStyles = cva('text-center', {
  variants: {
    mode: {
      row: 'text-[20px]',
      column: 'text-[54px]'
    }
  }
});

const panelMessageStyles = 'p-0 text-center text-sm';

type PanelMessageProps = {
  mode?: VariantProps<typeof panelStyles>['mode'];
  icon?: IvyIcons;
  message: string;
} & ComponentProps<typeof Flex>;

function PanelMessage({ message, mode = 'column', icon = IvyIcons.DragDrop, className, children, ...props }: PanelMessageProps) {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      direction={mode}
      gap={2}
      className={cn(panelStyles({ mode }), className, 'ui-panel-message')}
      {...props}
    >
      <IvyIcon icon={icon} className={panelIconStyles({ mode })} />
      <Message className={panelMessageStyles}>{message}</Message>
      {children}
    </Flex>
  );
}

export { PanelMessage };
