import { SearchInput } from '@/components/common/input/input';
import { resetAndSetRowSelection, selectRow } from '@/utils/table/table';
import {
  getFilteredRowModel,
  getSortedRowModel,
  type ExpandedState,
  type SortingState,
  type TableOptions,
  type TableState,
  getExpandedRowModel,
  type Row,
  type Table,
  type RowSelectionState
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

export const useTableSelect = <TData,>(initialSelecteState?: RowSelectionState): UseTableSelectRetunValue<TData> => {
  const [rowSelection, setRowSelection] = React.useState(initialSelecteState ?? {});
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

interface KeyHandlerOptions<TData> {
  multiSelect?: boolean;
  reorder?: { updateOrder?: (moveIndexes: number[], toIndex: number) => void; getRowId?: (row: TData) => string };
  lazyLoadChildren?: (row: Row<TData>) => void;
}

interface TableKeyboardHandlerProps<TData> {
  table: Table<TData>;
  data: Array<TData>;
  options?: KeyHandlerOptions<TData>;
}

export const useTableKeyHandler = <TData,>({ table, data, options }: TableKeyboardHandlerProps<TData>) => {
  const [rootIndex, setRootIndex] = React.useState<number | undefined>(undefined);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableElement>, onEnterAction?: (row: Row<TData>) => void) => {
    event.stopPropagation();

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        handleArrowKeyUpDown(event);
        break;
      }
      case 'ArrowRight':
        toggleExpand(table.getSelectedRowModel().flatRows, true, options?.lazyLoadChildren);
        break;
      case 'ArrowLeft':
        toggleExpand(table.getSelectedRowModel().flatRows, false, options?.lazyLoadChildren);
        break;
      case 'Tab':
        table.resetRowSelection();
        break;
      case 'Enter':
        handleEnterKey(table.getSelectedRowModel().flatRows, onEnterAction);
        break;
      default:
        break;
    }
  };

  const handleArrowKeyUpDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    const { multiSelect = false, reorder } = options || {};
    const allRows = table.getRowModel().rows;
    const selectedRows = table.getSelectedRowModel().flatRows;
    const direction = event.key === 'ArrowUp' ? -1 : 1;

    const newReorderIndex = calculateNewReorderIndex(
      direction,
      allRows.indexOf(selectedRows[0]),
      allRows.indexOf(selectedRows[selectedRows.length - 1]),
      selectedRows.length,
      allRows.length
    );
    const newSelectIndex = calculateNewSelectIndex(direction, newReorderIndex, allRows.length);
    if (reorder?.updateOrder && reorder.getRowId && event.altKey) {
      const moveIndexes = selectedRows.map(row => row.index);
      const moveIds = selectedRows.map(row => reorder.getRowId!(row.original));
      reorder.updateOrder(moveIndexes, newReorderIndex);
      resetAndSetRowSelection(table, data, moveIds, reorder.getRowId);
      setRootIndex(newReorderIndex);
    } else if (multiSelect && event.shiftKey) {
      toggleRowWithShift(direction, newSelectIndex, allRows, selectedRows);
    } else {
      table.resetRowSelection();
      allRows[newReorderIndex].toggleSelected();
      setRootIndex(newReorderIndex);
    }
  };

  const toggleRowWithShift = <TData,>(
    direction: -1 | 1,
    newIndex: number | undefined,
    allRows: Array<Row<TData>>,
    selectedRows: Array<Row<TData>>
  ): void => {
    if (newIndex === undefined) {
      return;
    }
    if (rootIndex === undefined && selectedRows.length === 1) {
      setRootIndex(selectedRows[0].index);
    }
    if (direction === 1) {
      if (rootIndex === allRows.indexOf(selectedRows[0]) || selectedRows.length === 1) {
        allRows[newIndex].toggleSelected();
      } else {
        selectedRows[0].toggleSelected();
      }
    } else {
      if (rootIndex === allRows.indexOf(selectedRows[selectedRows.length - 1]) || selectedRows.length === 1) {
        allRows[newIndex].toggleSelected();
      } else {
        selectedRows[selectedRows.length - 1].toggleSelected();
      }
    }
  };

  return { handleKeyDown };
};

const handleEnterKey = <TData,>(selectedRows: Array<Row<TData>>, onEnterAction?: (row: Row<TData>) => void) => {
  if (selectedRows.length === 1 && onEnterAction) {
    onEnterAction(selectedRows[0]);
  }
};

const toggleExpand = <TData,>(rows: Row<TData>[], expand: boolean, loadChildren?: (row: Row<TData>) => void) => {
  if (rows.length === 1) {
    if (expand && !rows[0].getIsExpanded()) {
      if (loadChildren) {
        loadChildren(rows[0]);
      }
      rows[0].toggleExpanded();
    } else if (!expand && rows[0].getIsExpanded()) {
      rows[0].toggleExpanded();
    }
  }
};

const calculateNewReorderIndex = (
  direction: -1 | 1,
  firstSelectedRowIndex: number,
  lastSelectedRowIndex: number,
  selectedRowsCount: number,
  allRowsCount: number
): number => {
  if (selectedRowsCount === 0) {
    return direction === 1 ? 0 : allRowsCount - 1;
  }
  const baseIndex = direction === 1 ? lastSelectedRowIndex : firstSelectedRowIndex;
  return (baseIndex + direction + allRowsCount) % allRowsCount;
};

const calculateNewSelectIndex = (direction: -1 | 1, reorderIndex: number, allRowsCount: number): number | undefined => {
  if ((direction === 1 && reorderIndex === 0) || (direction === -1 && reorderIndex === allRowsCount - 1)) {
    return undefined;
  }
  return reorderIndex;
};
