import { Button } from '@/components/common/button/button';
import { IvyIcon } from '@/components/common/icon/icon';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/common/input-group/input-group';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { useRef } from 'react';
import {
  chip,
  chipRemove,
  chips,
  chipsInput,
  clearIcon,
  comboboxInput,
  content,
  empty,
  indicatorIcon,
  item,
  itemIndicator,
  label,
  list,
  separator,
  trigger,
  triggerIcon
} from './combobox.css';

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot='combobox-value' {...props} />;
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger data-slot='combobox-trigger' className={cn(trigger, className)} {...props}>
      {children}
      <IvyIcon icon={IvyIcons.Chevron} className={triggerIcon} />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot='combobox-clear'
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton size='icon-xs'>
          <IvyIcon icon={IvyIcons.Close} className={clearIcon} />
        </InputGroupButton>
      }
    />
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn(comboboxInput, className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align='inline-end'>
        {showTrigger && <ComboboxTrigger render={<InputGroupButton size='icon-xs' data-slot='input-group-button' disabled={disabled} />} />}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props & Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={cn('isolate', 'z-50')}
        style={{ isolation: 'isolate', zIndex: 50 }}
      >
        <ComboboxPrimitive.Popup
          data-slot='combobox-content'
          data-chips={!!anchor}
          className={cn(content, className, 'group/combobox-content')}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return <ComboboxPrimitive.List data-slot='combobox-list' className={cn(list, className)} {...props} />;
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item data-slot='combobox-item' className={cn(item, className)} {...props}>
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className={itemIndicator}>
            <IvyIcon icon={IvyIcons.Check} className={indicatorIcon} />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot='combobox-group' className={cn(className)} {...props} />;
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return <ComboboxPrimitive.GroupLabel data-slot='combobox-label' className={cn(label, className)} {...props} />;
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot='combobox-collection' {...props} />;
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return <ComboboxPrimitive.Empty data-slot='combobox-empty' className={cn(empty, className)} {...props} />;
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return <ComboboxPrimitive.Separator data-slot='combobox-separator' className={cn(separator, className)} {...props} />;
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props) {
  return <ComboboxPrimitive.Chips data-slot='combobox-chips' className={cn(chips, className)} {...props} />;
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip data-slot='combobox-chip' className={cn(chip, className)} {...props}>
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className={chipRemove}
          data-slot='combobox-chip-remove'
          render={<Button size='small' icon={IvyIcons.Close} />}
        />
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return <ComboboxPrimitive.Input data-slot='combobox-chip-input' className={cn(chipsInput, className)} {...props} />;
}

function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor
};
