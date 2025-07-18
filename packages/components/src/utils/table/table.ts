import type { Table } from '@tanstack/react-table';

export const selectRow = <TData>(table: Table<TData>, rowId?: string) => {
  if (!rowId || rowId === '') {
    table.setRowSelection({});
  } else {
    table.setRowSelection({ [rowId]: true });
  }
};

export const addRow = <TData>(table: Table<TData>, data: Array<TData>, newRowData: TData) => {
  const newData = structuredClone(data);
  newData.push(newRowData);
  selectRow(table, String(newData.length - 1));
  return newData;
};

export const deleteFirstSelectedRow = <TData>(table: Table<TData>, data: Array<TData>) => {
  const newData = structuredClone(data);
  const selectedRow = table.getSelectedRowModel().flatRows[0];
  if (!selectedRow) {
    return { newData };
  }
  newData.splice(selectedRow.index, 1);
  const selection = adjustSelectionAfterDeletionOfRow(newData, table, selectedRow.index);
  return { newData, selection };
};

export const adjustSelectionAfterDeletionOfRow = <TData>(data: Array<TData>, table: Table<TData>, rowIndex: number) => {
  if (!data || data.length === 0) {
    selectRow(table);
    return;
  }

  if (rowIndex >= data.length) {
    const selection = data.length - 1;
    selectRow(table, String(selection));
    return selection;
  }

  selectRow(table, String(rowIndex));
  return rowIndex;
};

export const deleteAllSelectedRows = <TData>(table: Table<TData>, data: Array<TData>) => {
  const selectedRows = table.getSelectedRowModel().flatRows;
  const selectIndex = selectedRows.at(0)?.index;
  if (selectIndex === undefined) {
    return { newData: data };
  }
  const newData = structuredClone(data);
  const rowIndicesToDelete = selectedRows.map(row => row.index).sort((a, b) => b - a);
  for (const rowIndex of rowIndicesToDelete) {
    newData.splice(rowIndex, 1);
  }

  const selection = adjustSelectionAfterDeletionOfRow(newData, table, selectIndex);
  return { newData, selection };
};

export const resetAndSetRowSelection = <TData>(
  table: Table<TData>,
  data: Array<TData>,
  moveIds: string[],
  getRowId: (row: TData) => string
) => {
  table.resetRowSelection();
  const newSelection: Record<number, boolean> = data.reduce((acc: Record<number, boolean>, row, index) => {
    if (moveIds.includes(getRowId(row))) {
      acc[index] = true;
    }
    return acc;
  }, {});
  table.setRowSelection(newSelection);
};
