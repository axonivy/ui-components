import { SearchInput } from '@/components';
import { getFilteredRowModel, getSortedRowModel, type SortingState, type TableOptions, type TableState } from '@tanstack/react-table';
import * as React from 'react';

type UseTableGlobalFilterRetunValue<TData> = {
  filter: React.ReactNode;
  options: Required<Pick<TableOptions<TData>, 'onGlobalFilterChange' | 'getFilteredRowModel'>>;
  tableState: Partial<TableState>;
};

export const useTableGlobalFilter = <TData,>(active = true): UseTableGlobalFilterRetunValue<TData> => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  return {
    filter: active ? <SearchInput placeholder='Search' value={globalFilter} onChange={setGlobalFilter} /> : null,
    options: { onGlobalFilterChange: setGlobalFilter, getFilteredRowModel: getFilteredRowModel() },
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
