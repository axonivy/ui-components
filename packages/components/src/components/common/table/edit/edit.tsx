import { type ComboboxOption, type ComboboxProps, Combobox } from '@/components/common/combobox-ds/combobox';
import { type InputProps, Input } from '@/components/common/input/input';
import { type BasicSelectProps, BasicSelect } from '@/components/common/select/select';
import type { DataTableFeatures } from '@/components/common/table/utils';
import { cn } from '@/utils/class-name';
import { type CellContext, type RowData } from '@tanstack/react-table';
import { useState } from 'react';
import { editCell } from './edit.css';

export const useEditCell = <TData extends RowData, TValue = unknown>(cell: CellContext<DataTableFeatures, TData, TValue>) => {
  const initialValue = cell.getValue();
  const [value, setValue] = useState(initialValue);
  const [prevValue, setPrevValue] = useState(initialValue);
  if (prevValue !== initialValue) {
    setValue(initialValue);
    setPrevValue(initialValue);
  }
  const updateValue = (value: TValue) => {
    setValue(value);
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };
  const onBlur = () => updateValue(value);
  return { value, setValue, updateValue, onBlur, className: cn(editCell, 'ui-table-edit-cell') };
};

type InputCellProps<TData extends RowData> = InputProps & {
  cell: CellContext<DataTableFeatures, TData, string | undefined>;
};

function InputCell<TData extends RowData>({ cell, className, ...props }: InputCellProps<TData>) {
  const { value, setValue, onBlur, className: editCell } = useEditCell(cell);
  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      className={cn(editCell, className)}
      onKeyDown={e => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, 1);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, -1);
        }
      }}
      {...props}
    />
  );
}

type SelectCellProps<TData extends RowData> = BasicSelectProps & {
  cell: CellContext<DataTableFeatures, TData, string | undefined>;
};

function SelectCell<TData extends RowData>({ cell, className, ...props }: SelectCellProps<TData>) {
  const { value, updateValue, className: editCell } = useEditCell(cell);
  const [open, setOpen] = useState(false);
  return (
    <BasicSelect
      value={value}
      onValueChange={updateValue}
      className={cn(editCell, className)}
      onKeyDown={e => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLButtonElement, cell, 1);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLButtonElement, cell, -1);
        }
        if (e.key === 'Enter') {
          setOpen(old => !old);
        }
      }}
      onOpenChange={setOpen}
      open={open}
      {...props}
    />
  );
}

type ComboCellProps<TData extends RowData, TCombo extends ComboboxOption> = Omit<ComboboxProps<TCombo>, 'value' | 'onChange'> & {
  cell: CellContext<DataTableFeatures, TData, string | undefined>;
};

function ComboCell<TData extends RowData, TCombo extends ComboboxOption>({ cell, className, ...props }: ComboCellProps<TData, TCombo>) {
  const { value, updateValue, className: editCell } = useEditCell(cell);
  return (
    <Combobox
      {...props}
      value={value ?? ''}
      onChange={updateValue}
      className={cn(editCell, className)}
      onKeyDownExtended={e => {
        if (e.key === 'ArrowDown' && !document.querySelector('.ui-combobox-menu')) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e.nativeEvent as any).preventDownshiftDefault = true;
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, 1);
        }
        if (e.key === 'ArrowUp' && !document.querySelector('.ui-combobox-menu')) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e.nativeEvent as any).preventDownshiftDefault = true;
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, -1);
        }
      }}
    />
  );
}

export { ComboCell, InputCell, SelectCell };

export const selectNextPreviousCell = <TData extends RowData, TValue = unknown>(
  htmlElement: HTMLButtonElement | HTMLInputElement | Element,
  cell: CellContext<DataTableFeatures, TData, TValue>,
  direction: -1 | 1
) => {
  const focusedCell = htmlElement.closest('td');
  if (focusedCell && focusedCell instanceof HTMLTableCellElement) {
    const cellIndex = cell.column.getIndex();
    const allRows = cell.table.getRowModel().flatRows;
    const rowIndex = allRows.findIndex(row => row.id === cell.row.id) + 1;
    const focusNextCell = (nextRowIndex: number, cellIndex: number) => {
      const table = focusedCell?.closest('table');
      if (!table) return;
      const validRows = Array.from(table.rows).filter(row => !row.classList.contains('ui-message-row'));
      const hasHeaderRow = validRows.some(row => !row.classList.contains('ui-select-row'));
      const hiddenRows = allRows.length - validRows.length + (hasHeaderRow ? 1 : 0);
      const rowIndex = nextRowIndex - (hasHeaderRow ? 0 : 1) - hiddenRows;
      const nextRow = validRows[rowIndex];
      if (!nextRow) return;

      const nextCell = nextRow.cells[cellIndex];
      if (nextCell) {
        let nextElement;
        if (htmlElement instanceof HTMLButtonElement) {
          nextElement = nextCell.querySelector('button');
        } else {
          nextElement = nextCell.querySelector('input');
        }

        if (nextElement && !nextElement.hasAttribute('disabled')) {
          nextElement.focus();
        } else {
          focusNextCell(nextRowIndex + direction, cellIndex);
        }
      }
    };
    focusNextCell(rowIndex + direction, cellIndex);
  }
};
