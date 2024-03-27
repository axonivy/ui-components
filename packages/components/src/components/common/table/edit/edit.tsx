import { Input, type InputProps, SimpleSelect, type SimpleSelectProps } from '@/components';
import type { CellContext, RowData } from '@tanstack/react-table';
import * as React from 'react';
import { editCell } from './edit.css';
import { Combobox, type ComboboxOption, type ComboboxProps } from '../../combobox/combobox';
import { cn } from '@/utils';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

const useEditCell = <TData,>(cell: CellContext<TData, string>) => {
  const initialValue = cell.getValue();
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const updateValue = (value: string) => {
    setValue(value);
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };
  const onBlur = () => updateValue(value);
  return { value, setValue, updateValue, onBlur };
};

type InputCellProps<TData> = InputProps & {
  cell: CellContext<TData, string>;
};

const InputCell = <TData,>({ cell, ...props }: InputCellProps<TData>) => {
  const { value, setValue, onBlur } = useEditCell(cell);
  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      className={cn(editCell, 'ui-table-edit-cell')}
      {...props}
    />
  );
};
InputCell.displayName = 'InputCell';

type SelectCellProps<TData> = SimpleSelectProps & {
  cell: CellContext<TData, string>;
};

const SelectCell = <TData,>({ cell, ...props }: SelectCellProps<TData>) => {
  const { value, updateValue } = useEditCell(cell);
  return <SimpleSelect value={value} onValueChange={updateValue} className={cn(editCell, 'ui-table-edit-cell')} {...props} />;
};
SelectCell.displayName = 'SelectCell';

type ComboCellProps<TData, TCombo extends ComboboxOption> = Omit<ComboboxProps<TCombo>, 'value' | 'onChange'> & {
  cell: CellContext<TData, string>;
};

const ComboCell = <TData, TCombo extends ComboboxOption>({ cell, ...props }: ComboCellProps<TData, TCombo>) => {
  const { value, updateValue } = useEditCell(cell);
  return <Combobox {...props} value={value} onChange={updateValue} className={cn(editCell, 'ui-table-edit-cell')} />;
};
ComboCell.displayName = 'ComboCell';

export { InputCell, SelectCell, ComboCell };
