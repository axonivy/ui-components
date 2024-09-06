import { setupTable } from '@/utils/table/test-utils/setup';
import { describe, expect, test } from 'vitest';
import { addRow, deleteFirstSelectedRow, selectRow } from './table';

const newRowData = { name: 'newDataName', value: 'newDataValue' };

describe('selectRow', () => {
  test('default', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    selectRow(table, '1');
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }]);
  });

  describe('rowIdNotProvided', () => {
    test('undefined', () => {
      const { table, onRowSelectionChangeValues } = setupTable();
      selectRow(table, undefined);
      expect(onRowSelectionChangeValues).toEqual([{}]);
    });

    test('empty', () => {
      const { table, onRowSelectionChangeValues } = setupTable();
      selectRow(table, '');
      expect(onRowSelectionChangeValues).toEqual([{}]);
    });
  });
});

test('addRow', () => {
  const { data, table, onRowSelectionChangeValues } = setupTable();
  const originalData = structuredClone(data);
  const newData = addRow(table, data, newRowData);
  expect(data).toEqual(originalData);
  expect(newData).not.toBe(data);
  expect(newData).toHaveLength(4);
  expect(newData[3]).toEqual(newRowData);
  expect(onRowSelectionChangeValues).toEqual([{ '3': true }]);
});

describe('deleteFirstSelectedRow', () => {
  test('default', () => {
    const { data, table, onRowSelectionChangeValues } = setupTable();
    const originalData = structuredClone(data);
    table.getState().rowSelection = { '1': true };
    const { newData, selection } = deleteFirstSelectedRow(table, data);
    expect(data).toEqual(originalData);
    expect(newData).not.toBe(data);
    expect(newData).toHaveLength(2);
    expect(newData[0]).toEqual(data[0]);
    expect(newData[1]).toEqual(data[2]);
    expect(selection).toEqual(1);
    expect(onRowSelectionChangeValues).toEqual([]);
  });

  test('lastElementInList', () => {
    const { data, table, onRowSelectionChangeValues } = setupTable();
    const originalData = structuredClone(data);
    table.getState().rowSelection = { '2': true };
    const { newData, selection } = deleteFirstSelectedRow(table, data);
    expect(data).toEqual(originalData);
    expect(newData).not.toBe(data);
    expect(newData).toHaveLength(2);
    expect(newData[0]).toEqual(data[0]);
    expect(newData[1]).toEqual(data[1]);
    expect(selection).toEqual(1);
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }]);
  });

  test('lastRemainingElement', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const data = [{ name: 'NameData0', value: 'ValueData0' }];
    const originalData = structuredClone(data);
    table.getState().rowSelection = { '0': true };
    const { newData, selection } = deleteFirstSelectedRow(table, data);
    expect(data).toEqual(originalData);
    expect(newData).not.toBe(data);
    expect(newData).toHaveLength(0);
    expect(selection).toBeUndefined();
    expect(onRowSelectionChangeValues).toEqual([{}]);
  });

  test('noSelection', () => {
    const { data, table, onRowSelectionChangeValues } = setupTable();
    const originalData = structuredClone(data);
    table.getState().rowSelection = {};
    const { newData, selection } = deleteFirstSelectedRow(table, data);
    expect(data).toEqual(originalData);
    expect(newData).not.toBe(data);
    expect(newData).toEqual(data);
    expect(selection).toBeUndefined();
    expect(onRowSelectionChangeValues).toEqual([]);
  });
});
