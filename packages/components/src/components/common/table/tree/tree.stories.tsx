import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel, type Row } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableRow } from '../table';
import { ExpandableCell } from './tree';
import { treeData, type Variable } from './data';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState } from 'react';
import { ExpandableHeader, TableResizableHeader } from '@/components/common/table/header/header';
import { useTableExpand } from '@/components/common/table/hooks/hooks';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Tree',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

function TreeTableDemo({ data, columns }: { data?: Variable[]; columns: ColumnDef<Variable, string>[] }) {
  const expanded = useTableExpand<Variable>();
  const table = useReactTable({
    ...expanded.options,
    data: data ?? treeData,
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

export const Default: Story = {
  render: () => {
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
    return <TreeTableDemo columns={columns} />;
  }
};

export const CustomValue: Story = {
  render: () => {
    const columns: ColumnDef<Variable, string>[] = [
      {
        accessorKey: 'name',
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
      },
      {
        accessorKey: 'value',
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      }
    ];
    return <TreeTableDemo columns={columns} />;
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

    const loadChildrenFor = (tree: Array<Variable>): Array<Variable> => {
      return tree.map(node => {
        // in real impl you need to search for the node which should be loaded!
        if (node.isLoaded === false) {
          node.children = [{ name: 'load more', value: '', isLoaded: false, children: [] }];
          node.isLoaded = true;
        } else {
          loadChildrenFor(node.children);
        }
        return node;
      });
    };

    const loadLazy = (row: Row<Variable>) => {
      setData(old => loadChildrenFor(old));
      console.log('lazy laod on row', row.id);
    };

    const columns: ColumnDef<Variable, string>[] = [
      {
        accessorKey: 'name',
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => (
          <ExpandableCell
            cell={cell}
            icon={IvyIcons.User}
            lazy={{ isLoaded: cell.row.original.isLoaded ?? true, loadChildren: loadLazy }}
          />
        ),
        minSize: 50
      },
      {
        accessorKey: 'value',
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      }
    ];
    return <TreeTableDemo data={data} columns={columns} />;
  }
};
