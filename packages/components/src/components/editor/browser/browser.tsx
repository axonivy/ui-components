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
import { vars } from '@/styles/theme.css';
import { fullHeight, overflowAuto, overflowHidden } from './browser.css';
import { cn } from '@/utils';

export type BrowserNode<TData = unknown> = {
  value: string;
  info: string;
  icon: IvyIcons;
  data?: TData;
  children: Array<BrowserNode>;
};

export const useBrowser = (data: Array<BrowserNode>) => {
  const columns: ColumnDef<BrowserNode, string>[] = [
    {
      accessorKey: 'value',
      cell: cell => (
        <ExpandableCell cell={cell} icon={cell.row.original.icon}>
          <span>{cell.getValue()}</span>
          <span style={{ color: vars.color.n500 }}>{cell.row.original.info}</span>
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

type BrowserValue<TData = unknown> = {
  cursor: string;
  data?: TData;
  firstLine?: string;
};

type Browser = {
  name: string;
  icon: IvyIcons;
  browser: ReturnType<typeof useBrowser>;
  infoProvider?: (row?: Row<BrowserNode>) => React.ReactNode;
  applyModifier?: (value: string) => BrowserValue;
};

type BrowsersViewProps = {
  browsers: Array<Browser>;
  apply: (value?: BrowserValue, type?: string) => void;
};

const BrowsersView = ({ browsers, apply }: BrowsersViewProps) => {
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
  const applyHandler = (row?: Row<BrowserNode>) => {
    const selected = row ?? selectedRow();
    const value = selected?.original.value;
    const data = selected?.original.data;
    const browser = browsers.find(b => b.name === tab);
    if (!value || !browser) {
      return; // nothing selected
    }
    let modifier = browser.applyModifier;
    if (!modifier) {
      modifier = (value: string) => ({ cursor: value, data: data });
    }
    apply(modifier(value), browser.name);
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
          {browsers.map(({ name, browser: { table, globalFilter } }) => (
            <TabsContent key={name} value={name} asChild>
              <Flex direction='column' gap={1} className={cn(fullHeight, overflowAuto)}>
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
            <Button aria-label='Cancel' onClick={() => apply()} size='large'>
              Cancel
            </Button>
            <Button aria-label='Apply' onClick={() => applyHandler()} size='large' variant='primary'>
              Apply
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
};
BrowsersView.displayName = 'BrowsersView';

export { BrowsersView };
