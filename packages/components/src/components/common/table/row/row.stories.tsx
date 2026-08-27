import { useMultiSelectRow, useTableKeyHandler } from '@/components/common/table/hooks/hooks';
import { dataTableHelper, resetAndSetRowSelection } from '@/components/common/table/utils';
import { arraymove, arrayMoveMultiple, indexOf } from '@/utils/array';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { flexRender, useTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { tableData, type Payment } from '../data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { MessageRow, ReorderHandleWrapper, ReorderRow, SelectRow } from './row';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Row',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const { columnHelper, tableOptions } = dataTableHelper<Payment>();
const columns = columnHelper.columns([
  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    minSize: 50
  }),
  columnHelper.accessor('email', {
    header: () => <span>Email</span>,
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  }),
  columnHelper.accessor('amount', {
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
  })
]);

export const Select: StoryObj<{ enableMultiRowSelection: boolean }> = {
  args: {
    enableMultiRowSelection: false
  },
  render: ({ enableMultiRowSelection }) => {
    const [payment, setPayment] = useState<Payment>();
    const table = useTable({
      ...tableOptions,
      enableMultiRowSelection,
      data: tableData,
      columns
    });

    useEffect(() => {
      const subscription = table.atoms.rowSelection.subscribe(() => setPayment(table.getSelectedRowModel().flatRows.at(0)?.original));
      return () => subscription.unsubscribe();
    }, [table]);

    const { handleKeyDown } = useTableKeyHandler({ table, data: tableData });

    return (
      <>
        <Table onKeyDown={handleKeyDown}>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} onClick={() => table.setRowSelection({})}>
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
        <div title='selected-row'>Selected Row: {payment ? payment.email : ''}</div>
      </>
    );
  }
};

export const Message: Story = {
  render: () => {
    const table = useTable({
      ...tableOptions,
      data: tableData,
      columns
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
                message={
                  index === 2
                    ? {
                        message:
                          'This is an error: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        variant: 'error'
                      }
                    : undefined
                }
                singleLine={false}
                columnCount={columns.length}
              />
              <MessageRow
                message={
                  index === 5
                    ? {
                        message:
                          'This is an warning: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        variant: 'warning'
                      }
                    : undefined
                }
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
    const [data, setData] = useState(tableData);
    const updateDataArray = (fromIndex: number[], toIndex: number, data: Payment[]) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      arraymove(data, fromIndex[0]!, toIndex);
      setData([...data]);
    };
    const updateOrder = (moveId: string, targetId: string) => {
      const fromIndex = indexOf(data, obj => obj.id === moveId);
      const toIndex = indexOf(data, obj => obj.id === targetId);
      updateDataArray([fromIndex], toIndex, data);
    };
    const reorderColumns = columnHelper.columns([
      columnHelper.accessor('status', {
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      }),
      columnHelper.accessor('email', {
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      })
    ]);
    const table = useTable({
      ...tableOptions,
      data,
      columns: reorderColumns
    });
    const { handleKeyDown } = useTableKeyHandler({
      table,
      data,
      options: { reorder: { updateOrder: updateDataArray, getRowId: row => row.id } }
    });

    return (
      <Table onKeyDown={handleKeyDown}>
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
    const [data, setData] = useState(() => structuredClone(tableData));

    const reorderColumns = columnHelper.columns([
      columnHelper.accessor('status', {
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      }),
      columnHelper.accessor('email', {
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      })
    ]);
    const table = useTable({
      ...tableOptions,
      data,
      columns: reorderColumns,
      enableMultiRowSelection: true
    });
    const { handleMultiSelectOnRow } = useMultiSelectRow(table);
    const updateDataArray = (moveIndexes: number[], toIndex: number, data: Payment[]) => {
      arrayMoveMultiple(data, moveIndexes, toIndex);
      setData([...data]);
    };
    const updateOrder = (moveId: string, targetId: string) => {
      const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original.id);
      const moveIds = selectedRows.length > 1 ? selectedRows : [moveId];
      const moveIndexes = moveIds.map(moveId => indexOf(data, obj => obj.id === moveId));
      const toIndex = indexOf(data, obj => obj.id === targetId);
      const newData = structuredClone(data);
      updateDataArray(moveIndexes, toIndex, newData);
      resetAndSetRowSelection(table, newData, moveIds, row => row.id);
    };
    const { handleKeyDown } = useTableKeyHandler({
      table,
      data,
      options: {
        multiSelect: true,
        reorder: { updateOrder: updateDataArray, getRowId: row => row.id },
        resetSelectionOnTab: true,
        resetSelectionOnEscape: true
      }
    });

    return (
      <Table onKeyDown={handleKeyDown}>
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
