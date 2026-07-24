import { Button } from '@/components/common/button/button';
import { useField } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { useReadonly } from '@/context/useReadonly';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';

/**
 * Combobox, based on {@link https://base-ui.com/react/components/combobox | Base UI Combobox}
 */
function ComboboxRoot<Value, Multiple extends boolean = false>({ disabled, ...props }: ComboboxPrimitive.Root.Props<Value, Multiple>) {
  const readonly = useReadonly();
  return <ComboboxPrimitive.Root disabled={readonly || disabled} {...props} />;
}

function ComboboxInputGroup({ className, ...props }: ComboboxPrimitive.InputGroup.Props) {
  return (
    <ComboboxPrimitive.InputGroup
      className={cn(
        'flex min-h-9 flex-wrap items-center gap-1 rounded-sm border border-border-input-color bg-n25 p-0.75 ps-2.5 focus-within:border-border-active focus-within:outline-none',
        'ui-combobox-root',
        className
      )}
      {...props}
    />
  );
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  return <ComboboxPrimitive.Chips className={cn('flex w-full flex-wrap items-center gap-1', className)} {...props} />;
}

function ComboboxChip({ className, ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      className={cn(
        'flex h-5 cursor-default items-center gap-1 overflow-hidden rounded-sm bg-n100 p-0.5 ps-1 text-body outline-none focus-within:bg-p75 [@media(hover:hover)]:data-highlighted:bg-p75',
        className
      )}
      {...props}
    />
  );
}

function ComboboxChipRemove(props: ComboboxPrimitive.ChipRemove.Props) {
  return <ComboboxPrimitive.ChipRemove aria-label='Remove' render={<Button icon={IvyIcons.Close} />} {...props} />;
}

const ComboboxValue = ComboboxPrimitive.Value;

function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  const { inputProps } = useField();
  return (
    <ComboboxPrimitive.Input
      className={cn('m-0 w-full min-w-0 flex-1 shrink-0 basis-12 border-none bg-transparent text-body focus:outline-none', className)}
      {...inputProps}
      {...props}
    />
  );
}

function ComboboxClear(props: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear {...props}>
      <Button icon={IvyIcons.Close} />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxTrigger(props: ComboboxPrimitive.Trigger.Props) {
  return <ComboboxPrimitive.Trigger render={<Button icon={IvyIcons.Chevron} rotate={90} />} {...props} />;
}

function ComboboxContent({
  className,
  children,
  anchor,
  align,
  alignOffset,
  side,
  sideOffset = 4,
  ...props
}: ComboboxPrimitive.Popup.Props & Pick<ComboboxPrimitive.Positioner.Props, 'anchor' | 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        className='z-50 outline-none'
        anchor={anchor}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            'max-h-[min(var(--available-height),23rem)] w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) scroll-py-2 overflow-auto overscroll-contain rounded-sm border border-n100 bg-background p-1 text-body shadow-lg transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
            className
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return <ComboboxPrimitive.Empty className={cn('p-2 leading-none text-n700 empty:m-0 empty:p-0', className)} {...props} />;
}

const ComboboxList = ComboboxPrimitive.List;

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        'relative flex h-7.75 items-center py-2 ps-8 pe-2 outline-none select-none data-highlighted:not-data-selected:before:bg-p50 data-selected:z-0 data-selected:bg-p300 data-selected:text-background [@media(hover:hover)]:data-highlighted:relative [@media(hover:hover)]:data-highlighted:z-0 [@media(hover:hover)]:data-highlighted:before:absolute [@media(hover:hover)]:data-highlighted:before:inset-0 [@media(hover:hover)]:data-highlighted:before:z-[-1] [@media(hover:hover)]:data-highlighted:before:bg-p300',
        className
      )}
      {...props}
    >
      <ComboboxPrimitive.ItemIndicator className='absolute left-2 flex size-3.5 items-center justify-center'>
        <IvyIcon icon={IvyIcons.Check} />
      </ComboboxPrimitive.ItemIndicator>
      {children}
    </ComboboxPrimitive.Item>
  );
}

export type BasicComboboxItem = {
  value: string;
  label: string;
};

export type BasicComboboxProps<Multiple extends boolean | undefined = false> = ComboboxPrimitive.Root.Props<BasicComboboxItem, Multiple> & {
  placeholder?: string;
  emptyLabel?: string;
};

function BasicCombobox({ placeholder, emptyLabel, ...props }: BasicComboboxProps<false>) {
  return (
    <ComboboxRoot {...props}>
      <ComboboxInputGroup>
        <ComboboxInput placeholder={placeholder} />
        <div className='flex h-full items-center justify-center text-neutral-500 dark:text-neutral-400'>
          <ComboboxClear />
          <ComboboxTrigger />
        </div>
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>{emptyLabel}</ComboboxEmpty>
        <ComboboxList>
          {(item: BasicComboboxItem) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxRoot>
  );
}

function BasicMultiCombobox({ placeholder, emptyLabel, ...props }: BasicComboboxProps<true>) {
  return (
    <ComboboxRoot {...props} multiple>
      <ComboboxInputGroup>
        <ComboboxChips>
          <ComboboxValue>
            {(value: BasicComboboxItem[]) => (
              <>
                {value.map(item => (
                  <ComboboxChip key={item.value} aria-label={item.label}>
                    {item.label}
                    <ComboboxChipRemove />
                  </ComboboxChip>
                ))}
                <Flex alignItems='center' gap={1} className='flex-1'>
                  <ComboboxInput placeholder={placeholder} data-value={value.map(item => item.value).join(',')} />
                  <ComboboxTrigger />
                </Flex>
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>{emptyLabel}</ComboboxEmpty>
        <ComboboxList>
          {(item: BasicComboboxItem) => (
            <ComboboxItem key={item.value} value={item}>
              <div className='truncate'>{item.label}</div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxRoot>
  );
}

export {
  BasicCombobox,
  BasicMultiCombobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxValue
};
