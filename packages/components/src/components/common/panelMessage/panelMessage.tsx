import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Message } from '@/components/common/message/message';
import { IvyIcons } from '@axonivy/ui-icons';
import * as React from 'react';
import { panel, panelIcon, panelMessage } from './panelMessage.css';

type PanelMessageProps = {
  mode?: 'column' | 'row';
  icon?: IvyIcons;
  message: string;
} & React.ComponentProps<typeof Flex>;

const PanelMessage = ({ message, mode = 'column', icon = IvyIcons.DragDrop, ...props }: PanelMessageProps) => (
  <Flex justifyContent='center' alignItems='center' direction={mode} className={panel} {...props}>
    <IvyIcon icon={icon} className={panelIcon({ mode })} />
    <Message className={panelMessage}>{message}</Message>
  </Flex>
);
PanelMessage.displayName = 'PanelMessage';

export { PanelMessage };
