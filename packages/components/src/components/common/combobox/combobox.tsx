import * as React from 'react';

import { Button, Flex, Input, IvyIcon, Popover, PopoverAnchor, PopoverContent, useFieldset } from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';
import { useReadonly } from '@/context';
import { useCombobox } from 'downshift';
import { cn } from '@/utils/class-name';
import { content, item as itemClass, itemIcon, itemInfo } from './combobox.css';

export type ComboboxOption = {
  value: string;
};

export type ComboboxProps<T extends ComboboxOption> = Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> & {
  value: string;
  onChange: (change: string) => void;
  options: T[];
  optionFilter?: (item: T, input?: string) => boolean;
  itemRender?: (item: T) => React.ReactNode;
};

const defaultFilter = (option: ComboboxOption, input?: string): boolean => {
  if (!input) {
    return true;
  }
  const filter = input.toLowerCase();
  return option.value.toLowerCase().includes(filter);
};

const Combobox = <T extends ComboboxOption>({
  value,
  onChange,
  options,
  optionFilter = defaultFilter,
  itemRender = option => <span>{option.value}</span>,
  disabled,
  ...props
}: ComboboxProps<T>) => {
  const [filteredItems, setFilteredItems] = React.useState(options);
  React.useEffect(() => setFilteredItems(options), [options]);

  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem, selectItem } =
    useCombobox({
      onSelectedItemChange(change) {
        setFilteredItems(options);
        if (change.inputValue !== value) {
          onChange(change.inputValue ?? '');
        }
      },
      stateReducer(state, actionAndChanges) {
        switch (actionAndChanges.type) {
          case useCombobox.stateChangeTypes.InputBlur:
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
            selectItem({ value: actionAndChanges.changes.inputValue ?? '' });
        }
        return actionAndChanges.changes;
      },
      onInputValueChange(change) {
        if (change.type !== useCombobox.stateChangeTypes.FunctionSelectItem) {
          setFilteredItems(options.filter(option => optionFilter(option, change.inputValue)));
        }
      },
      items: filteredItems,
      itemToString(item) {
        return item?.value ?? '';
      },
      initialSelectedItem: { value }
    });

  React.useEffect(() => {
    selectItem({ value });
    setFilteredItems(options);
  }, [options, selectItem, value]);

  const { inputProps } = useFieldset();
  const readonly = useReadonly();
  return (
    <Popover open={isOpen}>
      <div className='ui-combobox'>
        <PopoverAnchor asChild>
          <Flex alignItems='center' gap={1}>
            <Input {...getInputProps()} {...inputProps} {...props} disabled={readonly || disabled} />
            <Button
              {...getToggleButtonProps()}
              icon={IvyIcons.Chevron}
              rotate={90}
              aria-label='toggle menu'
              disabled={readonly || disabled}
            />
          </Flex>
        </PopoverAnchor>
        <PopoverContent onOpenAutoFocus={e => e.preventDefault()} className={cn(content, 'ui-combobox-menu')} {...getMenuProps()}>
          {isOpen &&
            filteredItems.map((item, index) => (
              <Flex
                gap={2}
                className={cn(itemClass, 'ui-combobox-item')}
                data-highlighted={highlightedIndex === index ? '' : undefined}
                data-state={selectedItem?.value === item.value ? 'checked' : 'unchecked'}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                {itemRender(item)}
              </Flex>
            ))}
        </PopoverContent>
      </div>
    </Popover>
  );
};
Combobox.displayName = 'Combobox';

const ComboboxItemIcon = ({ icon }: { icon?: IvyIcons }) => {
  if (icon === undefined) {
    return null;
  }
  return <IvyIcon className={itemIcon} icon={icon} />;
};

const ComboboxItemInfo = ({ info }: { info?: string }) => {
  if (info === undefined) {
    return null;
  }
  return <span className={itemInfo}>{info}</span>;
};

export type ExtendedComboboxOption = ComboboxOption & {
  label?: string;
  info?: string;
  icon?: IvyIcons;
};

export const extendedOptionFilter = (option: ExtendedComboboxOption, input?: string) => {
  if (!input) {
    return true;
  }
  const filter = input.toLowerCase();
  const filterIncludes = (value?: string) => {
    if (value === undefined) {
      return true;
    }
    return value.toLocaleLowerCase().includes(filter);
  };
  return filterIncludes(option.value) || filterIncludes(option.label) || filterIncludes(option.info);
};

const ExtendedComboboxItem = (option: ExtendedComboboxOption) => (
  <>
    <Flex direction='column' gap={1}>
      <Flex gap={1}>
        <ComboboxItemIcon icon={option.icon} />
        <span>{option.label ?? option.value}</span>
      </Flex>
      <ComboboxItemInfo info={option.info} />
    </Flex>
  </>
);
export { Combobox, ComboboxItemInfo, ExtendedComboboxItem };
