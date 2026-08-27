import { Flex } from '@/components/common/flex/flex';
import { TableGlobalFilter } from '@/components/common/table/header/header';
import { SelectRow } from '@/components/common/table/row/row';
import { Table, TableBody, TableCell } from '@/components/common/table/table';
import { ExpandableCell } from '@/components/common/table/tree/tree';
import { dataTreeHelper } from '@/components/common/table/utils';
import { vars } from '@/styles/theme.css';
import { cn } from '@/utils/class-name';
import type { IvyIcons } from '@axonivy/ui-icons';
import { flexRender, useTable } from '@tanstack/react-table';
import { useState } from 'react';
import { outlineContainer } from './outline.css';

export type OutlineNode = {
  id: string;
  title: string;
  info?: string;
  icon?: IvyIcons;
  children: Array<OutlineNode>;
};

export type OutlineProps = {
  outline: Array<OutlineNode>;
  selection?: string;
  onClick?: (id: string) => void;
  onDoubleClick?: () => void;
  options?: { searchPlaceholder?: string };
};

const { columnHelper, tableOptions } = dataTreeHelper<OutlineNode>();
const outlineColumns = columnHelper.columns([
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: cell => (
      <ExpandableCell cell={cell} icon={cell.row.original.icon}>
        <span>{cell.getValue()}</span>
        <span style={{ color: vars.color.n500 }}>{cell.row.original.info}</span>
      </ExpandableCell>
    )
  })
]);

const Outline = ({ outline, selection, onClick, onDoubleClick, options }: OutlineProps) => {
  const table = useTable({
    ...tableOptions,
    data: outline,
    columns: outlineColumns,
    globalFilterFn: ({ original }, _, filter) =>
      original.title.toLowerCase().includes(filter.toLowerCase()) ||
      (original.info?.toLowerCase().includes(filter.toLowerCase()) as boolean)
  });
  const [prevSelection, setPrevSelection] = useState<string | undefined>();
  if (selection !== undefined && prevSelection !== selection) {
    setPrevSelection(selection);
    const rowId = table.getRowModel().flatRows.find(row => row.original.id === selection)?.id;
    if (!rowId) return;
    table.setRowSelection({ [rowId]: true });
  }
  return (
    <Flex direction='column' gap={4} className={cn(outlineContainer, 'ui-outline')}>
      <TableGlobalFilter table={table} autoFocus={true} placeholder={options?.searchPlaceholder} />
      <Table>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <SelectRow
              key={row.original.id}
              row={row}
              onClick={() => onClick && onClick(row.original.id)}
              onDoubleClick={() => onDoubleClick && onDoubleClick()}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
};
Outline.displayName = 'Outline';

export { Outline };
