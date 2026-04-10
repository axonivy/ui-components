import { Button } from '@/components/common/button/button';
import { useField } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { Input, InputGroup } from '@/components/common/input/input';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/common/popover/popover';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { useCombobox } from 'downshift';
import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type KeyboardEvent, type ReactNode } from 'react';
import { content, item as itemClass } from './combobox.css';

export type ComboboxOption = {
  value: string;
};

export type ComboboxProps<T extends ComboboxOption> = Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange' | 'onKeyDown'> & {
  value: string;
  onChange: (change: string) => void;
  options: T[];
  optionsLimit?: number;
  optionFilter?: (item: T, input?: string) => boolean;
  itemRender?: (item: T) => ReactNode;
  onKeyDownExtended?: (e: KeyboardEvent<HTMLInputElement>) => void;
  renderInContainer?: boolean;
};

const defaultFilter = (option: ComboboxOption, input?: string): boolean => {
  if (!input) {
    return true;
  }
  const filter = input.toLowerCase();
  return option.value.toLowerCase().includes(filter);
};

/**
 * Combobox, based on {@link https://www.downshift-js.com/use-combobox | Downshift JS useCombobox}
 */
const Combobox = <T extends ComboboxOption>({
  value,
  onChange,
  options,
  optionFilter = defaultFilter,
  optionsLimit,
  itemRender = option => <span>{option.value}</span>,
  disabled,
  className,
  onKeyDownExtended,
  renderInContainer = false,
  ...props
}: ComboboxProps<T>) => {
  const [filteredItems, setFilteredItems] = useState(options);
  const [prevItems, setPrevItems] = useState(options);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFilteredItems = (items: T[]) => {
    if (optionsLimit !== undefined) {
      setFilteredItems(items.slice(0, optionsLimit));
    } else {
      setFilteredItems(items);
    }
  };

  if (prevItems !== options) {
    updateFilteredItems(options);
    setPrevItems(options);
  }

  const { inputProps } = useField();

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    openMenu,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    selectedItem,
    selectItem
  } = useCombobox({
    inputId: inputProps.id,
    labelId: inputProps['aria-labelledby'],
    onSelectedItemChange(change) {
      updateFilteredItems(options);
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
        updateFilteredItems(options.filter(option => optionFilter(option, change.inputValue)));
      }
    },
    items: filteredItems,
    itemToString(item) {
      return item?.value ?? '';
    },
    initialSelectedItem: { value }
  });

  useEffect(() => {
    selectItem({ value });
  }, [options, selectItem, value]);
  const readonly = useReadonly();
  return (
    <Popover open={isOpen}>
      <div className='ui-combobox' ref={containerRef}>
        <PopoverAnchor asChild>
          <InputGroup className={className}>
            <Input
              {...getInputProps({
                onKeyDown: e => {
                  if (e.key === 'Enter') {
                    if (!isOpen) {
                      openMenu();
                      setHighlightedIndex(0);
                      return;
                    }
                  }
                  onKeyDownExtended?.(e);
                }
              })}
              className={className}
              {...props}
              disabled={readonly || disabled}
            />
            <Button
              {...getToggleButtonProps()}
              icon={IvyIcons.Chevron}
              rotate={90}
              aria-label='toggle menu'
              disabled={readonly || disabled}
              type='button'
            />
          </InputGroup>
        </PopoverAnchor>
        <div {...getMenuProps()}>
          <PopoverContent
            onOpenAutoFocus={e => e.preventDefault()}
            onMouseDown={e => e.preventDefault()}
            className={cn(content, 'ui-combobox-menu')}
            container={renderInContainer ? containerRef.current : undefined}
          >
            {filteredItems.map((item, index) => (
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
      </div>
    </Popover>
  );
};
Combobox.displayName = 'Combobox';

export { Combobox };
