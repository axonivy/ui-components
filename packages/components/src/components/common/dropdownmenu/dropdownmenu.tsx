import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ComponentProps } from 'react';
import { IvyIcon } from '../icon/icon';

// !!! Todo: move icons to the right side

/**
 * DropdownMenu, based on {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu | Radix UI DropdownMenu}
 */
function DropdownMenu(props: ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />;
}

function DropdownMenuPortal(props: ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal {...props} />;
}

function DropdownMenuTrigger(props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  collisionPadding = 4,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          'w-48 max-w-(--radix-dropdown-menu-content-available-width) min-w-32 rounded-sm border border-solid border-border-basic bg-background p-1 text-body shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:animate-in',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup(props: ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />;
}

function DropdownMenuItem({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
      className={cn(
        'flex items-center gap-1 rounded-xs bg-transparent px-2 py-1.5 text-xs outline-0 select-none focus:bg-p50 data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot='dropdown-menu-checkbox-item'
      className={cn(
        'flex items-center gap-1 rounded-xs bg-transparent px-2 py-1.5 ps-6 text-xs outline-0 select-none focus:bg-p50 data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span data-slot='dropdown-menu-checkbox-item-indicator' className='absolute left-2.5 flex size-4 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator asChild>
          <IvyIcon icon={IvyIcons.Check} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />;
}

function DropdownMenuRadioItem({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot='dropdown-menu-radio-item'
      className={cn(
        'flex items-center gap-1 rounded-xs bg-transparent px-2 py-1.5 ps-6 text-xs outline-0 select-none focus:bg-p50 data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span data-slot='dropdown-menu-radio-item-indicator' className='absolute left-2.5 flex size-4 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator className={cn('after:block after:size-1.5 after:rounded-full after:bg-current')} />
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot='dropdown-menu-label'
      className={cn('flex items-center gap-1 px-2 py-1.5 font-semibold', className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator data-slot='dropdown-menu-separator' className={cn('-mx-1 my-1 h-px bg-n200', className)} {...props} />
  );
}

function DropdownMenuShortcut({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot='dropdown-menu-shortcut' className={cn('peer ml-auto text-xs opacity-40', className)} {...props} />;
}

function DropdownMenuSub({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />;
}

function DropdownMenuSubTrigger({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot='dropdown-menu-sub-trigger'
      className={cn(
        'group flex items-center gap-1 rounded-xs bg-transparent px-2 py-1.5 text-xs outline-0 select-none focus:bg-p50 data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <IvyIcon icon={IvyIcons.Chevron} className='ml-auto group-has-data-[slot="dropdown-menu-shortcut"]:ml-0' />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  sideOffset = 6,
  collisionPadding = 4,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot='dropdown-menu-sub-content'
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(
        'w-48 max-w-(--radix-dropdown-menu-content-available-width) min-w-32 rounded-sm border border-solid border-border-basic bg-background p-1 text-body shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:animate-in',
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
};
