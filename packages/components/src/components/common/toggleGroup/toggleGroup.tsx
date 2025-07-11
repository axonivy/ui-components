import { cn } from '@/utils/class-name';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as React from 'react';
import { toggleGroup, type ToggleGroupVariants } from './toggleGroup.css';

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleGroupVariants;

/**
 * ToggleGroup, based on {@link https://www.radix-ui.com/docs/primitives/components/toggle-group | Radix UI ToggleGroup}
 */
const ToggleGroup = ({ className, gap, ...props }: ToggleGroupProps) => (
  <ToggleGroupPrimitive.Root className={cn(toggleGroup({ gap }), className, 'ui-toggle-group')} {...props} />
);
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = ({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) => (
  <ToggleGroupPrimitive.Item className={cn(className, 'ui-toggle-group-item')} {...props} />
);
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
