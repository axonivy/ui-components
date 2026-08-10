import type { DataTableFeatures } from '@/components/common/table/utils';
import type { ReactTable, RowSelectionState, Updater } from '@tanstack/react-table';

export const setupTable = () => {
  const data = [
    { name: 'NameData0', value: 'ValueData0' },
    { name: 'NameData1', value: 'ValueData1' },
    { name: 'NameData2', value: 'ValueData2' },
    { name: 'NameData3', value: 'ValueData4' },
    { name: 'NameData4', value: 'ValueData4' }
  ];
  const onRowSelectionChangeValues: Array<Updater<RowSelectionState>> = [];
  const state: { rowSelection: RowSelectionState } = { rowSelection: {} };
  const rows = data.map((original, index) => ({ id: String(index), index, original }));
  const setRowSelectionState = (rowSelection: RowSelectionState) => {
    state.rowSelection = rowSelection;
  };

  const table = {
    getState: () => state,
    getRowModel: () => ({ rows }),
    getSelectedRowModel: () => ({ flatRows: rows.filter(row => state.rowSelection[row.id]) }),
    setRowSelection: (value: Updater<RowSelectionState>) => {
      state.rowSelection = typeof value === 'function' ? value(state.rowSelection) : value;
      onRowSelectionChangeValues.push(value);
    },
    resetRowSelection: () => {
      state.rowSelection = {};
      onRowSelectionChangeValues.push({});
    },
    state
  } as unknown as ReactTable<DataTableFeatures, (typeof data)[number]>;

  return { data, table, onRowSelectionChangeValues, setRowSelectionState };
};
