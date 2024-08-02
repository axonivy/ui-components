import * as React from 'react';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex, IvyIcon, Message } from '@/components/common';
import { panel, panelIcon, panelMessage } from './panelMessage.css';

type PanelMessageProps = {
  mode?: 'column' | 'row';
  icon?: IvyIcons;
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

const PanelMessage = React.forwardRef<HTMLDivElement, PanelMessageProps>(
  ({ message, mode = 'column', icon = IvyIcons.DragDrop, ...props }, ref) => (
    <Flex justifyContent='center' alignItems='center' direction={mode} className={panel} ref={ref} {...props}>
      <IvyIcon icon={icon} className={panelIcon({ mode })} />
      <Message className={panelMessage}>{message}</Message>
    </Flex>
  )
);
PanelMessage.displayName = 'PanelMessage';

/**
 * @deprecated Use {@link PanelMessage} instead.
 */
const EmptyDetail = PanelMessage;

export { PanelMessage, EmptyDetail };
