import { ROW_VIRTUALIZE_INDEX_ATTRIBUTE } from '@/components/common/table/table';
import { resetAndSetRowSelection, selectRow, type DataTableFeatures } from '@/components/common/table/utils';
import { useReadonly } from '@/context/useReadonly';
import { type ReactTable, type Row, type RowData, type RowSelectionState, type Table } from '@tanstack/react-table';
import { useState, type KeyboardEvent } from 'react';

export const useMultiSelectRow = <TData extends RowData>(table: ReactTable<DataTableFeatures, TData>) => {
  const [lastSelectedRowId, setLastSelectedRowId] = useState<string | null>(null);

  const handleMultiSelectOnRow = (row: Row<DataTableFeatures, TData>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const isMultiSelect = event.ctrlKey || event.metaKey;
    const isRangeSelect = event.shiftKey;
    const currentSelection = table.state.rowSelection;

    if (isRangeSelect && lastSelectedRowId !== null) {
      const allRows = table.getRowModel().rows;
      const lastSelectedRowIndex = allRows.findIndex(r => r.id === lastSelectedRowId);
      const currentRowIndex = allRows.findIndex(r => r.id === row.id);

      if (lastSelectedRowIndex !== -1 && currentRowIndex !== -1) {
        let [start, end] = [lastSelectedRowIndex, currentRowIndex];
        if (start > end) {
          [start, end] = [end, start];
        }
        const newSelection = isMultiSelect ? { ...currentSelection } : {};

        for (let i = start; i <= end; i++) {
          const selectId = allRows.at(i)?.id;
          if (selectId !== undefined) {
            newSelection[selectId] = true;
          }
        }
        table.setRowSelection(newSelection);
      }
    } else if (isMultiSelect) {
      const newSelection: RowSelectionState = currentSelection[row.id]
        ? Object.fromEntries(Object.entries(currentSelection).filter(([selectedRowId]) => selectedRowId !== row.id))
        : { ...currentSelection, [row.id]: true };
      table.setRowSelection(newSelection);
      setLastSelectedRowId(row.id);
    } else {
      selectRow(table, row.id);
      setLastSelectedRowId(row.id);
    }
  };

  return { handleMultiSelectOnRow };
};

interface KeyHandlerOptions<TData extends RowData> {
  multiSelect?: boolean;
  reorder?: { updateOrder?: (moveIndexes: number[], toIndex: number, data: TData[]) => void; getRowId?: (row: TData) => string };
  lazyLoadChildren?: (row: Row<DataTableFeatures, TData>) => void;
  resetSelectionOnTab?: boolean;
  resetSelectionOnEscape?: boolean;
}

interface TableKeyboardHandlerProps<TData extends RowData> {
  table: Table<DataTableFeatures, TData>;
  data: Array<TData>;
  options?: KeyHandlerOptions<TData>;
}

export const useTableKeyHandler = <TData extends RowData>({ table, data, options }: TableKeyboardHandlerProps<TData>) => {
  const [rootIndex, setRootIndex] = useState<number | undefined>();
  const readonly = useReadonly();

  const handleKeyDown = (event: KeyboardEvent<HTMLTableElement>, onEnterAction?: (row: Row<DataTableFeatures, TData>) => void) => {
    const actions: Record<string, () => void> = {
      ArrowUp: () => handleArrowKeyUpDown(event, -1),
      ArrowDown: () => handleArrowKeyUpDown(event, 1),
      ArrowLeft: () => toggleExpand(false, table.getSelectedRowModel().flatRows[0], options?.lazyLoadChildren),
      ArrowRight: () => toggleExpand(true, table.getSelectedRowModel().flatRows[0], options?.lazyLoadChildren),
      Tab: () => options?.resetSelectionOnTab && table.resetRowSelection(),
      Enter: () => handleEnter?.(onEnterAction, table.getSelectedRowModel().flatRows[0]),
      Escape: () => options?.resetSelectionOnEscape && table.resetRowSelection()
    };
    const action = actions[event.key];
    if (action) {
      event.stopPropagation();
      action();
    }
  };

  const handleEnter = (onEnterAction?: (row: Row<DataTableFeatures, TData>) => void, row?: Row<DataTableFeatures, TData>) => {
    if (row !== undefined) {
      onEnterAction?.(row);
    }
  };

  const handleArrowKeyUpDown = (event: KeyboardEvent<HTMLTableElement>, direction: -1 | 1) => {
    event.preventDefault();
    const { multiSelect = false, reorder } = options || {};
    const allRows = table.getRowModel().rows;
    const selectedRows = table.getSelectedRowModel().flatRows;

    const newReorderIndex = calculateNewReorderIndex({
      direction,
      allRows,
      selectedRows
    });
    const newSelectIndex = calculateNewSelectIndex(direction, newReorderIndex, allRows.length);
    if (!readonly && event.altKey && reorder?.updateOrder && reorder.getRowId) {
      const moveIndexes = selectedRows.map(row => row.index);
      const rowId = reorder.getRowId;
      const moveIds = selectedRows.map(row => rowId(row.original));
      reorder.updateOrder(moveIndexes, newReorderIndex, data);
      resetAndSetRowSelection(table, data, moveIds, reorder.getRowId);
      setRootIndex(newReorderIndex);
    } else if (event.shiftKey && multiSelect) {
      toggleMultiRowSelection(direction, newSelectIndex, allRows, selectedRows);
    } else {
      table.resetRowSelection();
      allRows[newReorderIndex]?.toggleSelected();
      setRootIndex(newReorderIndex);
      scrollToNextRow(event, newReorderIndex);
    }
  };

  const toggleMultiRowSelection = <TData extends RowData>(
    direction: -1 | 1,
    newIndex: number | undefined,
    allRows: Array<Row<DataTableFeatures, TData>>,
    selectedRows: Array<Row<DataTableFeatures, TData>>
  ): void => {
    if (newIndex === undefined) {
      return;
    }
    if (rootIndex === undefined && selectedRows.length === 1) {
      setRootIndex(selectedRows[0]?.index);
    }
    if (direction === 1) {
      const firstSelectedRow = selectedRows.at(0);
      if (firstSelectedRow === undefined || rootIndex === allRows.indexOf(firstSelectedRow) || selectedRows.length === 1) {
        allRows.at(newIndex)?.toggleSelected();
      } else {
        firstSelectedRow.toggleSelected();
      }
    } else {
      const lastSelectedRow = selectedRows.at(-1);
      if (lastSelectedRow === undefined || rootIndex === allRows.indexOf(lastSelectedRow) || selectedRows.length === 1) {
        allRows.at(newIndex)?.toggleSelected();
      } else {
        lastSelectedRow.toggleSelected();
      }
    }
  };

  return { handleKeyDown };
};

const scrollToNextRow = (event: KeyboardEvent<HTMLTableElement>, newReorderIndex: number) => {
  let scrollRow = Array.from(event.currentTarget.rows).find(
    row => row.getAttribute(ROW_VIRTUALIZE_INDEX_ATTRIBUTE) === `${newReorderIndex}`
  );
  if (!scrollRow) {
    scrollRow = event.currentTarget.rows[newReorderIndex];
  }
  if (scrollRow) {
    scrollRow.scrollIntoView({ block: 'center' });
  } else {
    event.currentTarget.scrollIntoView({ block: 'end' });
  }
};

const toggleExpand = <TData extends RowData>(
  expand: boolean,
  row?: Row<DataTableFeatures, TData>,
  loadChildren?: (row: Row<DataTableFeatures, TData>) => void
) => {
  if (row === undefined || !row.getCanExpand()) {
    return;
  }
  if (expand && !row.getIsExpanded()) {
    loadChildren?.(row);
    row.toggleExpanded();
  } else if (!expand && row.getIsExpanded()) {
    row.toggleExpanded();
  }
};

interface CalculateNewReorderIndexProps<TData extends RowData> {
  direction: -1 | 1;
  allRows: Array<Row<DataTableFeatures, TData>>;
  selectedRows: Array<Row<DataTableFeatures, TData>>;
}

const calculateNewReorderIndex = <TData extends RowData>({
  direction,
  allRows,
  selectedRows
}: CalculateNewReorderIndexProps<TData>): number => {
  const allRowsCount = allRows.length;
  const firstSelectedRow = selectedRows.at(0);
  const lastSelectedRow = selectedRows.at(-1);
  if (firstSelectedRow === undefined || lastSelectedRow === undefined) {
    return direction === 1 ? 0 : allRowsCount - 1;
  }
  const firstSelectedRowIndex = allRows.indexOf(firstSelectedRow);
  const lastSelectedRowIndex = allRows.indexOf(lastSelectedRow);
  const baseIndex = direction === 1 ? lastSelectedRowIndex : firstSelectedRowIndex;
  return (baseIndex + direction + allRowsCount) % allRowsCount;
};

const calculateNewSelectIndex = (direction: -1 | 1, reorderIndex: number, allRowsCount: number): number | undefined => {
  if ((direction === 1 && reorderIndex === 0) || (direction === -1 && reorderIndex === allRowsCount - 1)) {
    return undefined;
  }
  return reorderIndex;
};
