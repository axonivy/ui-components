import { Flex } from '@/components/common/flex/flex';
import { ExpandableHeader, TableGlobalFilter, TableResizableHeader } from '@/components/common/table/header/header';
import { useTableKeyHandler } from '@/components/common/table/hooks/hooks';
import { SelectRow } from '@/components/common/table/row/row';
import { dataTreeHelper, type DataTableFeatures } from '@/components/common/table/utils';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { flexRender, useTable, type Table as ReactTable, type Row } from '@tanstack/react-table';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../table';
import { treeData, type Variable } from './data';
import { ExpandableCell } from './tree';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Tree',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const TreeTableDemo = ({ table }: { table: ReactTable<DataTableFeatures, Variable> }) => (
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

const { columnHelper, tableOptions } = dataTreeHelper<Variable>();

export const Default: Story = {
  render: () => {
    const columns = columnHelper.columns([
      columnHelper.accessor('name', {
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => <ExpandableCell cell={cell} icon={IvyIcons.User} />,
        minSize: 50
      }),
      columnHelper.accessor('value', {
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      })
    ]);
    const table = useTable({
      ...tableOptions,
      data: treeData,
      columns
    });
    return <TreeTableDemo table={table} />;
  }
};

export const CustomValue: Story = {
  render: () => {
    const columns = columnHelper.columns([
      columnHelper.accessor('name', {
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => (
          <ExpandableCell cell={cell} icon={IvyIcons.User}>
            <>
              <span style={{ textDecoration: 'line-through' }}>{cell.getValue()}</span>
              <span style={{ color: 'gray' }}>More info</span>
            </>
          </ExpandableCell>
        ),
        minSize: 50
      }),
      columnHelper.accessor('value', {
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      })
    ]);

    const table = useTable({
      ...tableOptions,
      data: treeData,
      columns
    });
    return <TreeTableDemo table={table} />;
  }
};

export const Lazy: Story = {
  render: () => {
    const [data, setData] = useState<Array<Variable>>([
      ...treeData,
      {
        name: 'click to load more',
        value: '',
        isLoaded: false,
        children: []
      }
    ]);

    const loadChildrenFor = (tree: Array<Variable>): Array<Variable> =>
      tree.map(node => {
        // in real impl you need to search for the node which should be loaded!
        if (node.isLoaded === false) {
          node.children = [{ name: 'load more', value: '', isLoaded: false, children: [] }];
          node.isLoaded = true;
        } else {
          loadChildrenFor(node.children);
        }
        return node;
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loadLazy = (row: Row<DataTableFeatures, Variable>) => {
      setData(old => loadChildrenFor(old));
    };

    const columns = columnHelper.columns([
      columnHelper.accessor('name', {
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => (
          <ExpandableCell
            cell={cell}
            icon={IvyIcons.User}
            lazy={{ isLoaded: cell.row.original.isLoaded ?? true, loadChildren: loadLazy }}
          />
        ),
        minSize: 50
      }),
      columnHelper.accessor('value', {
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      })
    ]);

    const table = useTable({
      ...tableOptions,
      data,
      columns
    });

    return <TreeTableDemo table={table} />;
  }
};

export const Search: Story = {
  render: () => {
    const columns = columnHelper.columns([
      columnHelper.accessor('name', {
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => <ExpandableCell cell={cell} icon={IvyIcons.User} />,
        minSize: 50
      }),
      columnHelper.accessor('value', {
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      })
    ]);

    const table = useTable({
      ...tableOptions,
      data: treeData,
      columns
    });

    return (
      <Flex direction='column' gap={1}>
        <TableGlobalFilter table={table} />
        <TreeTableDemo table={table} />
      </Flex>
    );
  }
};

export const Select: Story = {
  render: () => {
    const columns = columnHelper.columns([
      columnHelper.accessor('name', {
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => <ExpandableCell cell={cell} icon={IvyIcons.User} />,
        minSize: 50
      }),
      columnHelper.accessor('value', {
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      })
    ]);

    const table = useTable({
      ...tableOptions,
      data: treeData,
      columns
    });
    const { handleKeyDown } = useTableKeyHandler({ table, data: treeData });

    return (
      <Flex direction='column' gap={1}>
        <TableGlobalFilter table={table} />
        <Table onKeyDown={handleKeyDown}>
          <TableResizableHeader headerGroups={table.getHeaderGroups()} />
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <SelectRow key={row.id} row={row}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </SelectRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    );
  }
};
