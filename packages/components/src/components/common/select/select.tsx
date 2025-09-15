import { useField } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

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
    <SelectPrimitive.Trigger
      className={cn(
        'ui-select-trigger flex h-9 w-full cursor-pointer items-center justify-between gap-1 rounded-xs border-1 border-solid border-border-input-color bg-n25 p-2.5 text-xs text-body outline-none select-none focus:border-border-active disabled:cursor-not-allowed disabled:opacity-75 data-[placeholder]:text-current/50',
        className
      )}
      {...inputProps}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <IvyIcon icon={IvyIcons.Chevron} rotate={90} className='text-base' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton className={cn('flex items-center justify-center p-1', className)} {...props}>
    <IvyIcon icon={IvyIcons.Chevron} rotate={270} />
  </SelectPrimitive.ScrollUpButton>
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton className={cn('flex items-center justify-center p-1', className)} {...props}>
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
    <SelectPrimitive.Content
      className={cn(
        'ui-select-content relative z-10 max-h-80 w-(--radix-popper-anchor-width) overflow-hidden rounded-sm border-1 border-solid border-border-basic bg-background p-0 shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:animate-in',
        className
      )}
      position={position}
      sideOffset={sideOffset}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className='p-1'>{children}</SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label className={cn('ui-select-label p-2 ps-8 font-bold', className)} {...props} />
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = ({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    className={cn(
      'ui-select-item relative flex items-center py-2 ps-8 pe-2 outline-none select-none data-[highlighted]:bg-p50 data-[state=checked]:bg-p300 data-[state=checked]:text-background',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className='absolute left-2 flex size-3.5 items-center justify-center'>
      <IvyIcon icon={IvyIcons.Check} />
    </SelectPrimitive.ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator className={cn('ui-select-separator -mx-1 my-1 h-px bg-n200', className)} {...props} />
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
