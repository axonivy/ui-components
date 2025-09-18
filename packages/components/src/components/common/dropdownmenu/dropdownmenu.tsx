import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { IvyIcon } from '../icon/icon';

/**
 * DropdownMenu, based on {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu | Radix UI DropdownMenu}
 */
const DropdownMenu = (props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => <DropdownMenuPrimitive.Root {...props} />;
DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = ({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      'ui-dropdownmenu-sub-trigger group ui-dropdownmenu-item flex items-center gap-1 rounded-xs bg-transparent px-2 py-[6px] text-xs outline-0 select-none focus:bg-p50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <IvyIcon icon={IvyIcons.Chevron} className='ml-auto group-has-[.ui-dropdownmenu-shortcut]:ml-0' />
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = ({
  className,
  sideOffset = 6,
  collisionPadding = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    sideOffset={sideOffset}
    collisionPadding={collisionPadding}
    className={cn(
      'ui-dropdownmenu-sub-content w-48 max-w-(--radix-dropdown-menu-content-available-width) min-w-32 rounded-sm border-1 border-solid border-border-basic bg-background p-1 text-body shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:animate-in',
      className
    )}
    {...props}
  />
);
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  collisionPadding = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(
        'ui-dropdownmenu-content w-48 max-w-(--radix-dropdown-menu-content-available-width) min-w-32 rounded-sm border-1 border-solid border-border-basic bg-background p-1 text-body shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-safe:animate-in',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'ui-dropdownmenu-item flex items-center gap-1 rounded-xs bg-transparent px-2 py-[6px] text-xs outline-0 select-none focus:bg-p50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  />
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = ({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(
      'ui-dropdownmenu-checkbox-item ui-dropdownmenu-item flex items-center gap-1 rounded-xs bg-transparent px-2 py-[6px] ps-6 text-xs outline-0 select-none focus:bg-p50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className='absolute left-2.5 flex size-4 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator asChild>
        <IvyIcon icon={IvyIcons.Check} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = ({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      'ui-dropdownmenu-radio-item ui-dropdownmenu-item flex items-center gap-1 rounded-xs bg-transparent px-2 py-[6px] ps-6 text-xs outline-0 select-none focus:bg-p50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className='absolute left-2.5 flex size-4 items-center justify-center'>
      <DropdownMenuPrimitive.ItemIndicator className={cn('after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-current')} />
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) => (
  <DropdownMenuPrimitive.Label
    className={cn('ui-dropdownmenu-label flex items-center gap-1 px-2 py-[6px] font-semibold', className)}
    {...props}
  />
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator className={cn('ui-dropdownmenu-separator -mx-1 my-1 h-px bg-n200', className)} {...props} />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return <span className={cn('ui-dropdownmenu-shortcut peer ml-auto text-xs opacity-40', className)} {...props} />;
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

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
