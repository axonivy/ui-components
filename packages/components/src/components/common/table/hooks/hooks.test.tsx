import { useMultiSelectRow } from '@/components/common/table/hooks/hooks';
import { setupTable } from '@/components/common/table/test-utils/setup';
import { act } from 'react';
import { customRenderHook } from 'test-utils';

describe('handleMultiSelectOnRowClick', () => {
  test('ctrl+click selects/deselects row', () => {
    const { table, onRowSelectionChangeValues, setRowSelectionState } = setupTable();
    const { result } = customRenderHook(() => useMultiSelectRow(table));
    const row = table.getRowModel().rows[1];
    const event = { ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;

    act(() => result.current.handleMultiSelectOnRow(row!, event));
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }]);
    setRowSelectionState({ '1': true });
    act(() => result.current.handleMultiSelectOnRow(row!, event));
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }, {}]);
  });

  test('shift+click selects a range of rows', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = customRenderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const event = { shiftKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[0]!, event));
    act(() => result.current.handleMultiSelectOnRow(rows[2]!, event));
    expect(onRowSelectionChangeValues[1]).toEqual({ '0': true, '1': true, '2': true });
  });

  test('shift+click deselect a range of rows', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = customRenderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const event = { shiftKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[0]!, event));
    act(() => result.current.handleMultiSelectOnRow(rows[3]!, event));
    act(() => result.current.handleMultiSelectOnRow(rows[2]!, event));
    expect(onRowSelectionChangeValues[2]).toEqual({ '0': true, '1': true, '2': true });
  });

  test('ctrl+shift+click adds a range to the existing selection', () => {
    const { table, onRowSelectionChangeValues, setRowSelectionState } = setupTable();
    const { result } = customRenderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const ctrlEvent = { ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    const ctrlShiftEvent = { shiftKey: true, ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[0]!, ctrlEvent));
    setRowSelectionState({ '0': true });
    act(() => result.current.handleMultiSelectOnRow(rows[2]!, ctrlEvent));
    expect(onRowSelectionChangeValues[1]).toEqual({ '0': true, '2': true });
    setRowSelectionState({ '0': true, '2': true });
    act(() => result.current.handleMultiSelectOnRow(rows[4]!, ctrlShiftEvent));
    expect(onRowSelectionChangeValues[2]).toEqual({ '0': true, '2': true, '3': true, '4': true });
  });

  test('ctrl+shift+click on selected row does nothing', () => {
    const { table, onRowSelectionChangeValues, setRowSelectionState } = setupTable();
    const { result } = customRenderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const event = { shiftKey: true, ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[3]!, event));
    setRowSelectionState({ '3': true });
    act(() => result.current.handleMultiSelectOnRow(rows[3]!, event));
    expect(onRowSelectionChangeValues[1]).toEqual({ '3': true });
  });

  test('non-ctrl click selects single row', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = customRenderHook(() => useMultiSelectRow(table));
    const row = table.getRowModel().rows[1];
    const event = { ctrlKey: false } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(row!, event));
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }]);
  });
});
