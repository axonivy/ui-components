import { IvyIcons } from '@axonivy/ui-icons';
import { emptyDetail, emptyDetailIcon, emptyDetailMessage } from './emptyDetail.css';
import { Flex, IvyIcon, Message } from '@/components/common';

type EmptyDetailProps = {
  message: string;
};

const EmptyDetail = ({ message }: EmptyDetailProps) => (
  <Flex justifyContent='center' alignItems='center' direction='column' className={emptyDetail}>
    <IvyIcon icon={IvyIcons.DragDrop} className={emptyDetailIcon} />
    <Message className={emptyDetailMessage}>{message}</Message>
  </Flex>
);
EmptyDetail.displayName = 'EmptyDetail';

export { EmptyDetail };
