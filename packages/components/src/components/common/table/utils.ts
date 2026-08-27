import {
  cellSelectionFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createExpandedRowModel,
  createFilteredRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  metaHelper,
  rowExpandingFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  tableOptions,
  type RowData,
  type Table
} from '@tanstack/react-table';

type EditableTableMeta = {
  updateData: (rowId: string, columnId: string, value: unknown) => void;
};

export const dataTableFeatures = tableFeatures({
  cellSelectionFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  rowExpandingFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  expandedRowModel: createExpandedRowModel(),
  tableMeta: metaHelper<EditableTableMeta>()
});

export type DataTableFeatures = typeof dataTableFeatures;

export const dataTableHelper = <TData extends RowData>() => ({
  columnHelper: createColumnHelper<DataTableFeatures, TData>(),
  tableOptions: tableOptions<DataTableFeatures, TData>({
    features: dataTableFeatures,
    enableMultiRowSelection: false
  })
});

export const dataTreeHelper = <TData extends { children: Array<TData> }>() => ({
  columnHelper: createColumnHelper<DataTableFeatures, TData>(),
  tableOptions: tableOptions<DataTableFeatures, TData>({
    features: dataTableFeatures,
    enableMultiRowSelection: false,
    filterFromLeafRows: true,
    initialState: { expanded: true },
    getSubRows: row => row.children
  })
});

export const selectRow = <TData extends RowData>(table: Table<DataTableFeatures, TData>, rowId?: string) => {
  if (!rowId || rowId === '') {
    table.setRowSelection({});
  } else {
    table.setRowSelection({ [rowId]: true });
  }
};

export const addRow = <TData extends RowData>(table: Table<DataTableFeatures, TData>, data: Array<TData>, newRowData: TData) => {
  const newData = structuredClone(data);
  newData.push(newRowData);
  selectRow(table, String(newData.length - 1));
  return newData;
};

export const deleteFirstSelectedRow = <TData extends RowData>(table: Table<DataTableFeatures, TData>, data: Array<TData>) => {
  const newData = structuredClone(data);
  const selectedRow = table.getSelectedRowModel().flatRows[0];
  if (!selectedRow) {
    return { newData };
  }
  newData.splice(selectedRow.index, 1);
  const selection = adjustSelectionAfterDeletionOfRow(newData, table, selectedRow.index);
  return { newData, selection };
};

export const adjustSelectionAfterDeletionOfRow = <TData extends RowData>(
  data: Array<TData>,
  table: Table<DataTableFeatures, TData>,
  rowIndex: number
) => {
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

export const deleteAllSelectedRows = <TData extends RowData>(table: Table<DataTableFeatures, TData>, data: Array<TData>) => {
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

export const resetAndSetRowSelection = <TData extends RowData>(
  table: Table<DataTableFeatures, TData>,
  data: Array<TData>,
  moveIds: string[],
  getRowId: (row: TData) => string
) => {
  table.resetRowSelection();
  const newSelection: Record<string, true> = data.reduce((acc: Record<string, true>, row, index) => {
    if (moveIds.includes(getRowId(row))) {
      acc[index] = true;
    }
    return acc;
  }, {});
  table.setRowSelection(newSelection);
};
