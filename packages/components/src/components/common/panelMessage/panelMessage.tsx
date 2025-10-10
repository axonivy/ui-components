import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Message } from '@/components/common/message/message';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ComponentProps } from 'react';
import { panel, panelIcon, panelMessage } from './panelMessage.css';

type PanelMessageProps = {
  mode?: 'column' | 'row';
  icon?: IvyIcons;
  message: string;
} & ComponentProps<typeof Flex>;

const PanelMessage = ({ message, mode = 'column', icon = IvyIcons.DragDrop, className, children, ...props }: PanelMessageProps) => (
  <Flex
    justifyContent='center'
    alignItems='center'
    direction={mode}
    gap={2}
    className={cn(panel({ mode }), className, 'ui-panel-message')}
    {...props}
  >
    <IvyIcon icon={icon} className={panelIcon({ mode })} />
    <Message className={panelMessage}>{message}</Message>
    {children}
  </Flex>
);
PanelMessage.displayName = 'PanelMessage';

export { PanelMessage };
