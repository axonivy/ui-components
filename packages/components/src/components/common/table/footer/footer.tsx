import { Button, Flex } from '@/components';
import { useReadonly } from '@/context';
import { IvyIcons } from '@axonivy/ui-icons';
import { addRowLine, addRowBtn, addRowBlock } from './footer.css';

const TableAddRow = ({ addRow }: { addRow: () => void }) => {
  const readonly = useReadonly();
  return (
    <Flex alignItems='center' direction='row' gap={1} className={addRowBlock}>
      <Button icon={IvyIcons.Plus} onClick={addRow} disabled={readonly} className={addRowBtn} variant='outline' aria-label='Add row' />
      <div className={addRowLine} />
    </Flex>
  );
};
TableAddRow.displayName = 'TableAddRow';

export { TableAddRow };
