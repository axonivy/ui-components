import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  tabs,
  tabsList,
  tabsTrigger,
  type TabsVariants,
  inscriptionTabsContent,
  inscriptionTabsContentScrollArea,
  inscriptionTabsRoot,
  inscriptionTabStateDot,
  inscriptionTabsTriggerLabel
} from './tabs.css';
import { cn } from '@/utils/class-name';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import type { IvyIcons } from '@axonivy/ui-icons';
import { IvyIcon } from '@/components/common/icon/icon';
import { Flex } from '@/components/common/flex/flex';

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

export type InscriptionTabProps = {
  id: string;
  name: string;
  content: React.ReactNode;
  icon: IvyIcons;
  state?: StateDotProps;
};

export type BasicInscriptionTabsProps = {
  tabs: InscriptionTabProps[];
  value?: string;
  onChange?: (change: string) => void;
};

const BasicInscriptionTabs = ({ tabs, onChange, value }: BasicInscriptionTabsProps) => {
  const defaultTab = tabs.length > 0 ? tabs[0].id : '';
  return (
    <Tabs
      variant='inscription'
      className={cn(inscriptionTabsRoot, 'ui-inscription-tabs')}
      defaultValue={defaultTab}
      value={value}
      onValueChange={onChange}
    >
      <TabsList className={cn('ui-inscription-tabs-list', `tabs-${tabs.length >= 5 ? 'many' : 'few'}`)}>
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={`${index}-${tab.id}`}
            className='ui-inscription-tabs-trigger'
            value={tab.id}
            aria-label={tab.name}
            title={tab.name}
          >
            {tab.state?.state !== undefined && (
              <StateDot state={tab.state.state} messages={tab.state.messages} size='small' className={inscriptionTabStateDot} />
            )}
            <IvyIcon icon={tab.icon} className='ivy-16' />
            <div className={inscriptionTabsTriggerLabel}>{tab.name}</div>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsPrimitive.Content className={cn(inscriptionTabsContent, 'ui-inscription-tabs-content')} key={`${index}-${tab}`} value={tab.id}>
          <Flex direction='column' gap={3} className={inscriptionTabsContentScrollArea}>
            {tab.content}
          </Flex>
        </TabsPrimitive.Content>
      ))}
    </Tabs>
  );
};
BasicInscriptionTabs.displayName = 'BasicInscriptionTabs';

export { Tabs, TabsList, TabsTrigger, TabsContent, BasicInscriptionTabs };
