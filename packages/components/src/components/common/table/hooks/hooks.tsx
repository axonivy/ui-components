import { SearchInput } from '@/components/common/input/input';
import { selectRow } from '@/utils/table/table';
import {
  getFilteredRowModel,
  getSortedRowModel,
  type ExpandedState,
  type SortingState,
  type TableOptions,
  type TableState,
  getExpandedRowModel,
  type Row,
  type Table
} from '@tanstack/react-table';
import * as React from 'react';

type UseTableGlobalFilterRetunValue<TData> = {
  filter: React.ReactNode;
  options: Required<Pick<TableOptions<TData>, 'onGlobalFilterChange' | 'getFilteredRowModel' | 'filterFromLeafRows'>>;
  tableState: Partial<TableState>;
};

type UseTableGlobalFilterOptions = { searchActive?: boolean; searchPlaceholder?: string; searchAutoFocus?: boolean };

export const useTableGlobalFilter = <TData,>(options?: UseTableGlobalFilterOptions): UseTableGlobalFilterRetunValue<TData> => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const searchActive = options?.searchActive === undefined || options?.searchActive;
  return {
    filter: searchActive ? (
      <SearchInput
        placeholder={options?.searchPlaceholder ?? 'Search'}
        value={globalFilter}
        onChange={setGlobalFilter}
        autoFocus={options?.searchAutoFocus}
      />
    ) : null,
    options: { onGlobalFilterChange: setGlobalFilter, getFilteredRowModel: getFilteredRowModel(), filterFromLeafRows: true },
    tableState: { globalFilter }
  };
};

type UseTableSelectRetunValue<TData> = {
  options: Required<
    Pick<TableOptions<TData>, 'onRowSelectionChange' | 'enableRowSelection' | 'enableMultiRowSelection' | 'enableSubRowSelection'>
  >;
  tableState: Partial<TableState>;
};

export const useTableSelect = <TData,>(): UseTableSelectRetunValue<TData> => {
  const [rowSelection, setRowSelection] = React.useState({});
  return {
    options: {
      onRowSelectionChange: setRowSelection,
      enableRowSelection: true,
      enableMultiRowSelection: false,
      enableSubRowSelection: false
    },
    tableState: { rowSelection }
  };
};

type UseTableSortRetunValue<TData> = {
  options: Required<Pick<TableOptions<TData>, 'onSortingChange' | 'getSortedRowModel'>>;
  tableState: Partial<TableState>;
};

export const useTableSort = <TData,>(): UseTableSortRetunValue<TData> => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  return {
    options: { onSortingChange: setSorting, getSortedRowModel: getSortedRowModel() },
    tableState: { sorting }
  };
};

type UseTableExpandReturnValue<TData> = {
  options: Required<Pick<TableOptions<TData>, 'onExpandedChange' | 'getSubRows' | 'getExpandedRowModel'>>;
  tableState: Partial<TableState>;
};

export const useTableExpand = <TData extends { children: Array<TData> }>(initState?: ExpandedState): UseTableExpandReturnValue<TData> => {
  const [expanded, setExpanded] = React.useState<ExpandedState>(initState ?? true);
  return {
    options: { onExpandedChange: setExpanded, getSubRows: row => row.children, getExpandedRowModel: getExpandedRowModel() },
    tableState: { expanded }
  };
};

export const useMultiSelectRow = <TData,>(table: Table<TData>) => {
  const [lastSelectedRowId, setLastSelectedRowId] = React.useState<string | null>(null);

  const handleMultiSelectOnRow = (row: Row<TData>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const isMultiSelect = event.ctrlKey || event.metaKey;
    const isRangeSelect = event.shiftKey;
    const currentSelection = table.getState().rowSelection;

    if (isRangeSelect && lastSelectedRowId !== null) {
      const allRows = table.getRowModel().rows;
      const lastSelectedRowIndex = allRows.findIndex(r => r.id === lastSelectedRowId);
      const currentRowIndex = allRows.findIndex(r => r.id === row.id);

      if (lastSelectedRowIndex !== -1 && currentRowIndex !== -1) {
        const [start, end] = [lastSelectedRowIndex, currentRowIndex].sort((a, b) => a - b);
        const newSelection = isMultiSelect ? { ...currentSelection } : {};

        for (let i = start; i <= end; i++) {
          newSelection[allRows[i].id] = true;
        }
        table.setRowSelection(newSelection);
      }
    } else if (isMultiSelect) {
      const newSelection = { ...currentSelection, [row.id]: !currentSelection[row.id] };
      table.setRowSelection(newSelection);
      setLastSelectedRowId(row.id);
    } else {
      selectRow(table, row.id);
      setLastSelectedRowId(row.id);
    }
  };

  return { handleMultiSelectOnRow };
};
