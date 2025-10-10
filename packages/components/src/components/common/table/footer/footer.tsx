import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { useReadonly } from '@/context/useReadonly';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ComponentProps } from 'react';
import { addRowBlock, addRowBtn, addRowLine } from './footer.css';

const TableAddRow = ({ addRow, ...props }: { addRow: () => void } & ComponentProps<typeof Button>) => {
  const readonly = useReadonly();
  return (
    <Flex alignItems='center' direction='row' gap={1} className={addRowBlock}>
      <Button
        icon={IvyIcons.Plus}
        onClick={addRow}
        disabled={readonly}
        className={addRowBtn}
        variant='outline'
        aria-label='Add row'
        {...props}
      />
      <div className={addRowLine} />
    </Flex>
  );
};
TableAddRow.displayName = 'TableAddRow';

export { TableAddRow };
