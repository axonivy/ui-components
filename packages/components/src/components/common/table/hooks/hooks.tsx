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

export const useTableKeyHandler = <TData,>(table: Table<TData>, data: Array<TData>) => {
  const rowCount = table.getRowCount() - 1;
  const allRows = table.getRowModel().rows;
  const selectedRows = table.getSelectedRowModel().flatRows;
  const firstSelectedRow = selectedRows[0];
  const lastSelectedRow = selectedRows[selectedRows.length - 1];
  const firstRow = allRows[0];
  const lastRow = allRows[rowCount];

  const handleKeyDownOnSelectRow = (event: React.KeyboardEvent<HTMLTableElement>, enterAction?: (row: Row<TData>) => void) => {
    event.stopPropagation();
    switch (event.key) {
      case 'ArrowUp':
        if (firstSelectedRow) {
          if (firstSelectedRow.id === firstRow.id) {
            lastRow.toggleSelected();
          } else {
            allRows[allRows.findIndex(row => row.id === firstSelectedRow.id) - 1].toggleSelected();
          }
        } else {
          lastRow.toggleSelected();
        }
        break;
      case 'ArrowDown':
        if (firstSelectedRow) {
          if (firstSelectedRow.id === lastRow.id) {
            firstRow.toggleSelected();
          } else {
            allRows[allRows.findIndex(row => row.id === firstSelectedRow.id) + 1].toggleSelected();
          }
        } else {
          firstRow.toggleSelected();
        }

        break;
      case 'ArrowRight':
        if (firstSelectedRow && !firstSelectedRow.getIsExpanded()) {
          firstSelectedRow.toggleExpanded();
        }
        break;
      case 'ArrowLeft':
        if (firstSelectedRow && firstSelectedRow.getIsExpanded()) {
          firstSelectedRow.toggleExpanded();
        }
        break;
      case 'Tab':
        table.resetRowSelection();
        break;
      case 'Enter':
        if (selectedRows.length === 1 && firstSelectedRow && enterAction) {
          enterAction(firstSelectedRow);
        }
        break;
      default:
        break;
    }
  };

  const [rootSelectRow, setRootSelectRow] = React.useState<Row<TData> | undefined>(undefined);

  React.useEffect(() => {
    if (firstSelectedRow && rootSelectRow === undefined) {
      setRootSelectRow(firstSelectedRow);
    }
  }, [firstSelectedRow, rootSelectRow]);

  const handleKeyDownOnReorderRow = (
    event: React.KeyboardEvent<HTMLTableElement>,
    updateOrder: (moveIndexes: number[], toIndex: number) => void,
    getRowId: (row: TData) => string,
    enterAction?: (row: Row<TData>) => void
  ) => {
    event.stopPropagation();
    const isAltPressed = event.altKey;
    const isShiftPressed = event.shiftKey;
    switch (event.key) {
      case 'ArrowUp':
        if (selectedRows.length > 0 && selectedRows.length !== allRows.length) {
          const newIndex = calculateNewIndex(-1);
          if (isAltPressed) {
            const moveIndexes = selectedRows.map(row => row.index);
            const moveIds = selectedRows.map(row => getRowId(row.original));
            updateOrder(moveIndexes, newIndex);
            resetAndSetRowSelection(table, data, moveIds, getRowId);
          } else {
            if (isShiftPressed) {
              toggleShiftRow(-1, newIndex);
            } else {
              table.resetRowSelection();
              setRootSelectRow(allRows[newIndex]);
              allRows[newIndex].toggleSelected();
            }
          }
        } else {
          table.resetRowSelection();
          setRootSelectRow(lastRow);
          lastRow.toggleSelected();
        }
        break;
      case 'ArrowDown':
        if (selectedRows.length > 0 && selectedRows.length !== allRows.length) {
          const newIndex = calculateNewIndex(1);
          if (isAltPressed) {
            const moveIndexes = selectedRows.map(row => row.index);
            const moveIds = selectedRows.map(row => getRowId(row.original));
            updateOrder(moveIndexes, newIndex);
            resetAndSetRowSelection(table, data, moveIds, getRowId);
          } else {
            if (isShiftPressed) {
              toggleShiftRow(1, newIndex);
            } else {
              table.resetRowSelection();
              setRootSelectRow(allRows[newIndex]);
              allRows[newIndex].toggleSelected();
            }
          }
        } else {
          table.resetRowSelection();
          setRootSelectRow(firstRow);
          firstRow.toggleSelected();
        }
        break;
      case 'Tab':
        table.resetRowSelection();
        break;
      case 'Enter':
        if (selectedRows.length === 1 && firstSelectedRow && enterAction) {
          enterAction(firstSelectedRow);
        }
        break;
      default:
        break;
    }
  };

  function calculateNewIndex(direction: -1 | 1): number {
    if (selectedRows.length === 1) {
      if (direction === 1) {
        return firstSelectedRow.index + 1 > rowCount ? 0 : firstSelectedRow.index + 1;
      } else {
        return firstSelectedRow.index - 1 < 0 ? rowCount : firstSelectedRow.index - 1;
      }
    } else {
      if (direction === 1) {
        return selectedRows[selectedRows.length - 1].index + 1 > rowCount ? 0 : selectedRows[selectedRows.length - 1].index + 1;
      } else {
        return firstSelectedRow.index - 1 < 0 ? rowCount : firstSelectedRow.index - 1;
      }
    }
  }

  function toggleShiftRow(direction: -1 | 1, newIndex: number): void {
    if (direction === 1) {
      if (newIndex !== 0) {
        if (rootSelectRow?.index === firstSelectedRow.index || selectedRows.length === 1) {
          allRows[newIndex].toggleSelected();
        } else {
          allRows[firstSelectedRow.index].toggleSelected();
        }
      }
    } else {
      if (newIndex !== rowCount) {
        if (rootSelectRow?.index === lastSelectedRow.index || selectedRows.length === 1) {
          allRows[newIndex].toggleSelected();
        } else {
          allRows[lastSelectedRow.index].toggleSelected();
        }
      }
    }
  }

  return { handleKeyDownOnSelectRow, handleKeyDownOnReorderRow };
};
