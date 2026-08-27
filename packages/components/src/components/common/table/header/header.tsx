import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { SearchInput } from '@/components/common/input/input';
import type { DataTableFeatures } from '@/components/common/table/utils';
import { IvyIcons } from '@axonivy/ui-icons';
import { flexRender, type Column, type HeaderContext, type HeaderGroup, type ReactTable, type RowData } from '@tanstack/react-table';
import type { ComponentProps } from 'react';
import { TableHead, TableHeader, TableRow } from '../table';
import { expandButton, resizer, resizerLine, sortButton, sortHead } from './header.css';

type TableGlobalFilterProps<TData extends RowData> = {
  table: ReactTable<DataTableFeatures, TData>;
  active?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (filter: string) => void;
};

function TableGlobalFilter<TData extends RowData>({ table, active, placeholder, autoFocus, onChange }: TableGlobalFilterProps<TData>) {
  if (active === false) {
    return null;
  }
  return (
    <SearchInput
      placeholder={placeholder ?? 'Search'}
      value={table.state.globalFilter}
      onChange={filter => {
        onChange?.(filter);
        table.setGlobalFilter(filter);
      }}
      autoFocus={autoFocus}
    />
  );
}

function ColumnResizer<TData extends RowData>({ header }: { header: HeaderContext<DataTableFeatures, TData, unknown> }) {
  return (
    <Flex
      justifyContent='center'
      onMouseDown={header.header.getResizeHandler()}
      onTouchStart={header.header.getResizeHandler()}
      className={resizer}
      data-resize-state={header.column.getIsResizing() ? 'active' : 'inactive'}
    >
      <div className={resizerLine} />
    </Flex>
  );
}

type TableResizableHeaderProps<TData extends RowData> = ComponentProps<typeof TableRow> & {
  headerGroups: Array<HeaderGroup<DataTableFeatures, TData>>;
};

function TableResizableHeader<TData extends RowData>({ headerGroups, ...props }: TableResizableHeaderProps<TData>) {
  return (
    <TableHeader>
      {headerGroups.map(headerGroup => (
        <TableRow key={headerGroup.id} onDoubleClick={() => headerGroup.headers.forEach(header => header.column.resetSize())} {...props}>
          {headerGroup.headers.map((header, index) => (
            <TableHead key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
              <Flex direction='row' justifyContent='space-between' alignItems='center' gap={2}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                {headerGroup.headers.length !== index + 1 && <ColumnResizer header={header.getContext()} />}
              </Flex>
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

type SortableHeaderProps<TData extends RowData, TValue> = { column: Column<DataTableFeatures, TData, TValue>; name: string };

function SortableHeader<TData extends RowData, TValue>({ column, name }: SortableHeaderProps<TData, TValue>) {
  return (
    <Flex direction='row' justifyContent='space-between' alignItems='center' className={sortHead}>
      <span>{name}</span>
      <Button
        className={sortButton}
        aria-label={`Sort by ${name}`}
        onClick={() => column.toggleSorting()}
        data-sort-state={column.getIsSorted()}
        icon={column.getIsSorted() ? IvyIcons.Chevron : IvyIcons.Straighten}
        rotate={90}
      />
    </Flex>
  );
}

type ExpandableHeaderProps<TData extends RowData> = {
  header: HeaderContext<DataTableFeatures, TData, string>;
  name: string;
};

function ExpandableHeader<TData extends RowData>({ header, name }: ExpandableHeaderProps<TData>) {
  return (
    <Flex direction='row' alignItems='center' gap={1}>
      <Button
        icon={IvyIcons.Chevron}
        className={expandButton}
        aria-label={header.table.getIsAllRowsExpanded() ? 'Collapse tree' : 'Expand tree'}
        data-state={header.table.getIsAllRowsExpanded() ? 'expanded' : 'collapsed'}
        onClick={header.table.getToggleAllRowsExpandedHandler()}
      />
      <span>{name}</span>
    </Flex>
  );
}

export { ExpandableHeader, SortableHeader, TableGlobalFilter, TableResizableHeader };
