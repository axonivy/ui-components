import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel, type RowSelectionState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { MessageRow, ReorderRow, ReorderHandleWrapper, SelectRow } from './row';
import { useMultiSelectRow, useTableSelect } from '../hooks/hooks';
import { Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { tableData, type Payment } from '../data';
import { arraymove, arrayMoveMultiple, indexOf } from '@/utils/array';
import { resetAndSetRowSelection } from '@/utils/table/table';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Row',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: () => <span>Status</span>,
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    minSize: 50
  },
  {
    accessorKey: 'email',
    header: () => <span>Email</span>,
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <span>Amount</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div>{formatted}</div>;
    }
  }
];

export const Select: StoryObj<{ enableMultiRowSelection: boolean }> = {
  args: {
    enableMultiRowSelection: false
  },
  render: ({ enableMultiRowSelection }) => {
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      enableMultiRowSelection,
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });
    const handleKeyDownOnSelectRow = (event: React.KeyboardEvent<HTMLTableElement>) => {
      event.stopPropagation();
      const row = table.getSelectedRowModel().flatRows[0];
      switch (event.key) {
        case 'ArrowUp':
          if (row) {
            table.getRowModel().flatRows[row.index - 1 < 0 ? table.getRowCount() - 1 : row.index - 1].toggleSelected();
          } else {
            table.getRowModel().flatRows[table.getRowCount() - 1].toggleSelected();
          }
          break;
        case 'ArrowDown':
          if (row) {
            table.getRowModel().flatRows[row.index + 1 > table.getRowCount() - 1 ? 0 : row.index + 1].toggleSelected();
          } else {
            table.getRowModel().flatRows[0].toggleSelected();
          }
          break;
        case 'Tab':
          table.setRowSelection({});
          break;
        default:
          break;
      }
    };
    return (
      <Table onKeyDown={handleKeyDownOnSelectRow}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} onClick={() => rowSelection.options.onRowSelectionChange({})}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row} onDoubleClick={() => alert(`Double click on row: ${row.id}`)}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const Message: Story = {
  render: () => {
    const table = useReactTable({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel()
    });
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <Fragment key={row.id}>
              {/* TODO: change row border color to message variant color */}
              <TableRow>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
              <MessageRow
                message={index === 2 ? { message: 'This is an error', variant: 'error' } : undefined}
                columnCount={columns.length}
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const Reorder: Story = {
  render: () => {
    const [data, setData] = React.useState(tableData);
    const updateOrder = (moveId: string, targetId: string) => {
      const fromIndex = indexOf(data, obj => obj.id === moveId);
      const toIndex = indexOf(data, obj => obj.id === targetId);
      arraymove(data, fromIndex, toIndex);
      setData([...data]);
    };
    const reorderColumns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      }
    ];
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      data,
      columns: reorderColumns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });
    const handleKeyDownOnReorderRow = (event: React.KeyboardEvent<HTMLTableElement>) => {
      event.stopPropagation();
      const isAltPressed = event.altKey;
      const row = table.getSelectedRowModel().flatRows[0];
      switch (event.key) {
        case 'ArrowUp':
          if (row) {
            const newIndex = row.index - 1 < 0 ? table.getRowCount() - 1 : row.index - 1;
            if (isAltPressed) {
              const moveId = row.index;
              arraymove(data, moveId, newIndex);
              setData([...data]);
              table.getRowModel().flatRows[newIndex].toggleSelected();
            } else {
              table.getRowModel().flatRows[newIndex].toggleSelected();
            }
          } else {
            table.getRowModel().flatRows[table.getRowCount() - 1].toggleSelected();
          }
          break;
        case 'ArrowDown':
          if (row) {
            const newIndex = row.index + 1 > table.getRowCount() - 1 ? 0 : row.index + 1;
            if (isAltPressed) {
              const moveId = row.index;
              arraymove(data, moveId, newIndex);
              setData([...data]);
              table.getRowModel().flatRows[newIndex].toggleSelected();
            } else {
              table.getRowModel().flatRows[newIndex].toggleSelected();
            }
          } else {
            table.getRowModel().flatRows[0].toggleSelected();
          }
          break;
        case 'Tab':
          table.setRowSelection({});
          break;
        default:
          break;
      }
    };
    return (
      <Table onKeyDown={handleKeyDownOnReorderRow}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <ReorderRow key={row.id} row={row} id={row.original.id} updateOrder={updateOrder}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} onClick={() => table.options.meta?.updateData(row.id, cell.column.id, cell.getValue() + '1')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </ReorderRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const MultiSelectWithReorder: Story = {
  render: () => {
    const [data, setData] = React.useState(tableData);

    const reorderColumns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      }
    ];
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      enableMultiRowSelection: true,
      data,
      columns: reorderColumns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });
    const { handleMultiSelectOnRow } = useMultiSelectRow(table);
    const updateOrder = (moveId: string, targetId: string) => {
      const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original.id);
      const moveIds = selectedRows.length > 1 ? selectedRows : [moveId];
      const moveIndexes = moveIds.map(moveId => indexOf(data, obj => obj.id === moveId));
      const toIndex = indexOf(data, obj => obj.id === targetId);
      arrayMoveMultiple(data, moveIndexes, toIndex);
      setData([...data]);
      resetAndSetRowSelection(table, data, moveIds, row => row.id);
    };

    const handleKeyDownOnReorderRow = (event: React.KeyboardEvent<HTMLTableElement>) => {
      event.stopPropagation();
      const isAltPressed = event.altKey;
      const isShiftPressed = event.shiftKey;
      const rows = table.getSelectedRowModel().flatRows;
      switch (event.key) {
        case 'ArrowUp':
          if (rows.length > 0 && rows.length !== table.getRowModel().flatRows.length) {
            let newIndex = 0;
            if (rows.length === 1) {
              const row = table.getSelectedRowModel().flatRows[0];
              newIndex = row.index - 1 < 0 ? table.getRowCount() - 1 : row.index - 1;
            } else {
              const indices = rows.map(row => row.index);
              let gapFound = false;
              for (let i = 0; i < indices.length - 1; i++) {
                if (indices[i + 1] - indices[i] > 1) {
                  newIndex = indices[i + 1] - 1;
                  gapFound = true;
                  break;
                }
              }
              if (!gapFound) {
                newIndex = indices[0] - 1 < 0 ? table.getRowCount() - 1 : indices[0] - 1;
              }
            }
            if (isAltPressed) {
              const moveIndexes = table.getSelectedRowModel().flatRows.map(row => row.index);
              arrayMoveMultiple(data, moveIndexes, newIndex);
              setData([...data]);
              const newSelection: RowSelectionState = {};
              if (newIndex === table.getRowCount() - 1) {
                for (let i = 0; i <= rows.length - 1; i++) {
                  newSelection[table.getRowCount() - 1 - i] = true;
                }
              } else {
                moveIndexes.forEach(index => {
                  newSelection[index - 1] = true;
                });
              }
              table.setRowSelection({});
              table.setRowSelection(newSelection);
            } else {
              if (isShiftPressed) {
                table.getRowModel().flatRows[newIndex].toggleSelected();
              } else {
                table.setRowSelection({});
                table.getRowModel().flatRows[newIndex].toggleSelected();
              }
            }
          } else {
            table.setRowSelection({});
            table.getRowModel().flatRows[table.getRowCount() - 1].toggleSelected();
          }
          break;
        case 'ArrowDown':
          if (rows.length > 0 && rows.length !== table.getRowModel().flatRows.length) {
            let newIndex = 0;
            if (rows.length === 1) {
              const row = table.getSelectedRowModel().flatRows[0];
              newIndex = row.index + 1 > table.getRowCount() - 1 ? 0 : row.index + 1;
            } else {
              const indices = rows.map(row => row.index);
              let gapFound = false;
              for (let i = 0; i < indices.length - 1; i++) {
                if (indices[i + 1] - indices[i] > 1) {
                  newIndex = indices[i] + 1;
                  gapFound = true;
                  break;
                }
              }
              if (!gapFound) {
                newIndex = indices[indices.length - 1] + 1 > table.getRowCount() - 1 ? 0 : indices[indices.length - 1] + 1;
              }
            }

            if (isAltPressed) {
              const moveIndexes = table.getSelectedRowModel().flatRows.map(row => row.index);
              arrayMoveMultiple(data, moveIndexes, newIndex);
              setData([...data]);
              const newSelection: RowSelectionState = {};
              if (newIndex === 0) {
                for (let i = 0; i <= rows.length - 1; i++) {
                  newSelection[0 + i] = true;
                }
              } else {
                moveIndexes.forEach(index => {
                  newSelection[index + 1] = true;
                });
              }
              table.setRowSelection({});
              table.setRowSelection(newSelection);
            } else {
              if (isShiftPressed) {
                table.getRowModel().flatRows[newIndex].toggleSelected();
              } else {
                table.setRowSelection({});
                table.getRowModel().flatRows[newIndex].toggleSelected();
              }
            }
          } else {
            table.setRowSelection({});
            table.getRowModel().flatRows[0].toggleSelected();
          }
          break;
        case 'Tab':
          table.setRowSelection({});
          break;
        default:
          break;
      }
    };

    return (
      <Table onKeyDown={handleKeyDownOnReorderRow}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <ReorderRow
              key={row.id}
              row={row}
              id={row.original.id}
              updateOrder={updateOrder}
              onDrag={!row.getIsSelected() ? () => table.resetRowSelection() : undefined}
              onClick={event => handleMultiSelectOnRow(row, event)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} onClick={() => table.options.meta?.updateData(row.id, cell.column.id, cell.getValue() + '1')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </ReorderRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};
