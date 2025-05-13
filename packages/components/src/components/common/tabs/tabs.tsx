import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { tabs, tabsList, tabsTrigger, type TabsVariants } from './tabs.css';
import { cn } from '@/utils/class-name';

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & TabsVariants;

/**
 * Tabs, based on {@link https://www.radix-ui.com/docs/primitives/components/tabs | Radix UI Tabs}
 */
const Tabs = ({ className, variant, ...props }: TabsProps) => (
  <TabsPrimitive.Root className={cn(className, tabs({ variant }), 'ui-tabs')} {...props} />
);
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List className={cn(tabsList, className, 'ui-tabs-list')} {...props} />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger className={cn(tabsTrigger, className, 'ui-tabs-trigger')} {...props} />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn(className, 'ui-tabs-content')} {...props} />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
