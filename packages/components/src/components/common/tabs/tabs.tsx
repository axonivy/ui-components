import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { tabs, tabsList, tabsTrigger, type TabsVariants } from './tabs.css';
import { cn } from '@/utils/class-name';

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & TabsVariants;

/**
 * Tabs, based on {@link https://www.radix-ui.com/docs/primitives/components/tabs | Radix UI Tabs}
 */
const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn(className, tabs({ variant }), 'ui-tabs')} {...props} />
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={cn(tabsList, className, 'ui-tabs-list')} {...props} />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn(tabsTrigger, className, 'ui-tabs-trigger')} {...props} />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn(className, 'ui-tabs-content')} {...props} />);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
