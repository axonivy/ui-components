import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  inscriptionTabsContent,
  inscriptionTabsContentScrollArea,
  inscriptionTabsList,
  inscriptionTabsRoot,
  inscriptionTabStateDot,
  inscriptionTabsTrigger,
  tabsTriggerLabel
} from './inscriptionTabs.css';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';

export type InscriptionTabProps = {
  id: string;
  name: string;
  state: StateDotProps;
  reset: { dirty: boolean; action: () => void };
  content: React.ReactNode;
  icon: IvyIcons;
  control?: React.ReactNode;
};

export type InscriptionTabsProps = {
  tabs: InscriptionTabProps[];
  value?: string;
  onChange?: (change: string) => void;
};

/**
 * Tabs, based on {@link https://www.radix-ui.com/docs/primitives/components/tabs | Radix UI Tabs}
 */
const InscriptionTabs = ({ tabs, value, onChange, ...props }: InscriptionTabsProps & { children: React.ReactNode }) => {
  const defaultTab = tabs.length > 0 ? tabs[0].id : '';
  return (
    <TabsPrimitive.Root
      className={cn(inscriptionTabsRoot, 'ui-inscription-tabs')}
      defaultValue={defaultTab}
      value={value}
      onValueChange={onChange}
      {...props}
    />
  );
};
InscriptionTabs.displayName = TabsPrimitive.Root.displayName;

const InscriptionTabList = ({ tabs }: Pick<InscriptionTabsProps, 'tabs'>) => (
  <TabsPrimitive.List className={cn(inscriptionTabsList, 'ui-inscription-tabs-list', `tabs-${tabs.length >= 5 ? 'many' : 'few'}`)}>
    {tabs.map((tab, index) => (
      <InscriptionTabTrigger key={`${index}-${tab.id}`} tab={tab} />
    ))}
  </TabsPrimitive.List>
);
InscriptionTabList.displayName = TabsPrimitive.List.displayName;

const InscriptionTabTrigger = ({ tab }: { tab: InscriptionTabProps }) => {
  const state = tab.state.messages?.find(message => message.variant === 'error')
    ? 'error'
    : tab.state.messages?.find(message => message.variant === 'warning')
      ? 'warning'
      : undefined;

  return (
    <TabsPrimitive.Trigger
      className={cn(inscriptionTabsTrigger, 'ui-inscription-tabs-trigger')}
      data-message={state}
      value={tab.id}
      aria-label={tab.id}
      title={tab.name}
    >
      {tab.state.state !== undefined && (
        <StateDot state={tab.state.state} messages={tab.state.messages} size='small' className={inscriptionTabStateDot} />
      )}
      <IvyIcon icon={tab.icon} />
      <div className={tabsTriggerLabel}>{tab.name}</div>
    </TabsPrimitive.Trigger>
  );
};
InscriptionTabTrigger.displayName = TabsPrimitive.Trigger.displayName;

const InscriptionTabContent = ({ tabs }: Pick<InscriptionTabsProps, 'tabs'>) =>
  tabs.map((tab, index) => (
    <TabsPrimitive.Content className={cn(inscriptionTabsContent, 'ui-inscription-tabs-content')} key={`${index}-${tab}`} value={tab.id}>
      <Flex direction='column' gap={3} className={inscriptionTabsContentScrollArea}>
        {tab.content}
      </Flex>
      {tab.control}
    </TabsPrimitive.Content>
  ));
InscriptionTabContent.displayName = TabsPrimitive.Content.displayName;

const BasicInscriptionTabs = (props: InscriptionTabsProps) => (
  <InscriptionTabs {...props}>
    <InscriptionTabList {...props} />
    <InscriptionTabContent {...props} />
  </InscriptionTabs>
);
BasicInscriptionTabs.displayName = 'BasicField';

export { InscriptionTabs, InscriptionTabList, InscriptionTabTrigger, InscriptionTabContent, BasicInscriptionTabs };
