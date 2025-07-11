import { useField } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';
import { content, item, itemIcon, label, scrollButton, seperator, trigger, triggerIcon, viewport } from './select.css';

/**
 * Select, based on {@link https://www.radix-ui.com/docs/primitives/components/select | Radix UI Select}
 * Also see {@link BasicSelect}
 */
const Select = ({ disabled, ...props }: SelectPrimitive.SelectProps) => {
  const readonly = useReadonly();
  return <SelectPrimitive.Root disabled={readonly || disabled} {...props} />;
};
Select.displayName = SelectPrimitive.Root.displayName;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) => {
  const { inputProps } = useField();
  return (
    <SelectPrimitive.Trigger className={cn(trigger, className, 'ui-select-trigger')} {...inputProps} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <IvyIcon icon={IvyIcons.Chevron} rotate={90} className={triggerIcon} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton className={cn(scrollButton, className)} {...props}>
    <IvyIcon icon={IvyIcons.Chevron} rotate={270} />
  </SelectPrimitive.ScrollUpButton>
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton className={cn(scrollButton, className)} {...props}>
    <IvyIcon icon={IvyIcons.Chevron} rotate={90} />
  </SelectPrimitive.ScrollDownButton>
);
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = ({
  className,
  children,
  position = 'popper',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content className={cn(content, className, 'ui-select-content')} position={position} sideOffset={sideOffset} {...props}>
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className={cn(viewport)}>{children}</SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label className={cn(label, className, 'ui-select-label')} {...props} />
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = ({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item className={cn(item, className, 'ui-select-item')} {...props}>
    <SelectPrimitive.ItemIndicator className={itemIcon}>
      <IvyIcon icon={IvyIcons.Check} />
    </SelectPrimitive.ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator className={cn(seperator, className, 'ui-select-separator')} {...props} />
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export type BasicSelectProps = SelectPrimitive.SelectProps &
  Pick<SelectPrimitive.SelectValueProps, 'placeholder' | 'tabIndex' | 'onKeyDown'> & {
    items: ReadonlyArray<{ value: string; label: string }>;
    emptyItem?: boolean;
    className?: string;
    menuWidth?: string;
  };

const BasicSelect = ({
  items,
  emptyItem,
  className,
  placeholder,
  value,
  onValueChange,
  defaultValue,
  onKeyDown,
  menuWidth,
  ...props
}: BasicSelectProps) => {
  const unknownValue = React.useMemo(() => {
    if (defaultValue && items.find(item => item.value === defaultValue) === undefined) {
      return defaultValue;
    }
    if (value && items.find(item => item.value === value) === undefined) {
      return value;
    }
    return undefined;
  }, [defaultValue, items, value]);
  const onInternalValueChange = (value: string) => {
    if (value === ' ') {
      value = '';
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select value={value} onValueChange={onInternalValueChange} defaultValue={defaultValue} {...props}>
      <SelectTrigger className={className} onKeyDown={onKeyDown}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent style={{ width: menuWidth }}>
        <SelectGroup>
          {emptyItem && value && <SelectItem value=' '></SelectItem>}
          {unknownValue && <SelectItem value={unknownValue}>{unknownValue}</SelectItem>}
          {items.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
BasicSelect.displayName = 'BasicSelect';

export {
  BasicSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};
