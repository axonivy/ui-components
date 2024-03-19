import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableRow } from '../table';
import { ExpandableCell } from './tree';
import { ExpandableHeader, TableResizableHeader, useTableExpand } from '..';
import { treeData, type Variable } from './data';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Tree',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const columns: ColumnDef<Variable, string>[] = [
  {
    accessorKey: 'name',
    header: header => <ExpandableHeader name='Expand' header={header} />,
    cell: cell => <ExpandableCell cell={cell} icon={IvyIcons.User} />,
    minSize: 50
  },
  {
    accessorKey: 'value',
    header: () => <span>Value</span>,
    cell: cell => <div>{cell.getValue()}</div>
  }
];

function TreeTableDemo() {
  const expanded = useTableExpand<Variable>();
  const table = useReactTable({
    ...expanded.options,
    data: treeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...expanded.tableState
    }
  });

  return (
    <Table>
      <TableResizableHeader headerGroups={table.getHeaderGroups()} />
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const Tree: Story = {
  render: () => <TreeTableDemo />
};
