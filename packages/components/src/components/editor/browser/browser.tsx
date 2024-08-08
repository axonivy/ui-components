import * as React from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable, type ColumnDef, type Row } from '@tanstack/react-table';
import {
  BasicCollapsible,
  Button,
  ExpandableCell,
  Flex,
  IvyIcon,
  SearchInput,
  SelectRow,
  Table,
  TableBody,
  TableCell,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useTableExpand,
  useTableSelect
} from '@/components/common';
import type { IvyIcons } from '@axonivy/ui-icons';
import { fullHeight, info, overflowAuto, overflowHidden } from './browser.css';
import { cn } from '@/utils';

export type BrowserNode<TData = unknown> = {
  value: string;
  info: string;
  icon: IvyIcons;
  children: Array<BrowserNode<TData>>;
  data?: TData;
  isLoaded?: boolean;
};

export const useBrowser = (data: Array<BrowserNode>, loadChildren?: (row: Row<BrowserNode>) => void) => {
  const columns: ColumnDef<BrowserNode, string>[] = [
    {
      accessorKey: 'value',
      cell: cell => (
        <ExpandableCell
          cell={cell}
          icon={cell.row.original.icon}
          lazy={
            cell.row.original.isLoaded !== undefined && loadChildren !== undefined
              ? { isLoaded: cell.row.original.isLoaded, loadChildren }
              : undefined
          }
        >
          <span>{cell.getValue()}</span>
          <span className={info}>{cell.row.original.info}</span>
        </ExpandableCell>
      )
    }
  ];

  const [filter, setFilter] = React.useState('');
  const expanded = useTableExpand<BrowserNode>({ '0': true });
  const select = useTableSelect<BrowserNode>();
  const table = useReactTable({
    ...expanded.options,
    ...select.options,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
      ...expanded.tableState,
      ...select.tableState
    }
  });
  return { table, globalFilter: { filter, setFilter } };
};

export type BrowserResult<TData = unknown> = {
  value: string;
  data?: TData;
  firstLine?: string;
};

export type Browser = {
  name: string;
  icon: IvyIcons;
  browser: ReturnType<typeof useBrowser>;
  header?: React.ReactNode;
  infoProvider?: (row?: Row<BrowserNode>) => React.ReactNode;
  applyModifier?: (row: Row<BrowserNode>) => BrowserResult;
};

export type BrowsersViewProps = {
  browsers: Array<Browser>;
  apply: (browserName: string, result?: BrowserResult) => void;
  applyBtn?: { label?: string; icon?: IvyIcons };
};

const BrowsersView = ({ browsers, apply, applyBtn }: BrowsersViewProps) => {
  const [tab, setTab] = React.useState(browsers[0].name);
  const selectedRow = () => {
    const table = browsers.find(b => b.name === tab)?.browser?.table;
    if (table) {
      return table.getRowModel().rowsById[Object.keys(table.getState().rowSelection)[0]];
    }
    return;
  };
  const infoProvider = (row?: Row<BrowserNode>) => {
    const info = browsers.find(b => b.name === tab)?.infoProvider;
    if (info) {
      return info(row);
    }
    return row?.original.value;
  };
  const applyHandler = (doubleClickRow?: Row<BrowserNode>) => {
    const row = doubleClickRow ?? selectedRow();
    const browser = browsers.find(b => b.name === tab);
    if (!row || !browser) {
      return; // nothing selected
    }
    const value = row.original.value;
    const data = row.original.data;
    let result: BrowserResult = { value, data };
    if (browser.applyModifier !== undefined) {
      result = browser.applyModifier(row);
    }
    apply(browser.name, result);
  };
  return (
    <Tabs value={tab} onValueChange={setTab} className={cn(fullHeight, overflowHidden)}>
      <Flex direction='column' gap={1} className={fullHeight}>
        <TabsList>
          {browsers.map(browser => (
            <TabsTrigger key={browser.name} value={browser.name}>
              <IvyIcon icon={browser.icon} />
              {browser.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <Flex direction='column' gap={1} justifyContent='space-between' className={cn(fullHeight, overflowAuto)}>
          {browsers.map(({ name, header, browser: { table, globalFilter } }) => (
            <TabsContent key={name} value={name} asChild>
              <Flex direction='column' gap={1} className={cn(fullHeight, overflowAuto)}>
                {header}
                <SearchInput placeholder='Search' autoFocus={true} value={globalFilter.filter} onChange={globalFilter.setFilter} />
                <div className={overflowAuto}>
                  <Table>
                    <TableBody>
                      {table.getRowModel().rows.map(row => (
                        <SelectRow key={row.id} row={row} onDoubleClick={() => applyHandler(row)}>
                          {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                          ))}
                        </SelectRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Flex>
            </TabsContent>
          ))}
          <BasicCollapsible label='Info' style={{ maxHeight: 50 }}>
            {infoProvider(selectedRow())}
          </BasicCollapsible>
          <Flex direction='row' justifyContent='flex-end' gap={1}>
            <Button aria-label='Cancel' onClick={() => apply(tab)} size='large'>
              Cancel
            </Button>
            <Button
              aria-label={applyBtn?.label ?? 'Apply'}
              icon={applyBtn?.icon}
              onClick={() => applyHandler()}
              size='large'
              variant='primary'
            >
              {applyBtn?.label ?? 'Apply'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
};
BrowsersView.displayName = 'BrowsersView';

export { BrowsersView };
