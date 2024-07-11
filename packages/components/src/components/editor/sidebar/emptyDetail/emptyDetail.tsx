import * as React from 'react';
import { IvyIcons } from '@axonivy/ui-icons';
import { emptyDetail, emptyDetailIcon, emptyDetailMessage } from './emptyDetail.css';
import { Flex, IvyIcon, Message } from '@/components/common';

type EmptyDetailProps = {
  mode: 'column' | 'row';
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

const EmptyDetail = React.forwardRef<HTMLDivElement, EmptyDetailProps>(({ message, mode, ...props }, ref) => (
  <Flex justifyContent='center' alignItems='center' direction={mode} className={emptyDetail} ref={ref} {...props}>
    <IvyIcon icon={IvyIcons.DragDrop} className={emptyDetailIcon({ mode })} />
    <Message className={emptyDetailMessage}>{message}</Message>
  </Flex>
));
EmptyDetail.displayName = 'EmptyDetail';

export { EmptyDetail };
