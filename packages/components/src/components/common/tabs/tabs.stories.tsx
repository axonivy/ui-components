import type { Meta, StoryObj } from '@storybook/react-vite';
import { BasicInscriptionTabs, Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { IvyIcon } from '../icon/icon';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';
import { insciptionTabsData } from '@/components/common/tabs/inscriptionTabData';
import React from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  argTypes: {
    orientation: { type: 'string', control: 'select', options: ['horizontal', 'vertical'] },
    variant: { type: 'string', control: 'select', options: ['slim', 'inscription', undefined] }
  },
  args: {
    orientation: 'horizontal',
    variant: undefined
  }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: props => (
    <Tabs defaultValue='attribute' {...props}>
      <Flex direction={props.orientation === 'vertical' ? 'row' : 'column'} gap={4} style={{ width: 300 }}>
        <TabsList>
          <TabsTrigger value='attribute'>
            <IvyIcon icon={IvyIcons.Attribute} />
            Attribute
          </TabsTrigger>
          <TabsTrigger value='functions'>
            <IvyIcon icon={IvyIcons.Function} />
            Functions
          </TabsTrigger>
        </TabsList>
        <TabsContent value='attribute'>Attribute list</TabsContent>
        <TabsContent value='functions'>Function list</TabsContent>
      </Flex>
    </Tabs>
  )
};

export const InscriptionTabs: Story = {
  render: () => {
    const [tab, setTab] = React.useState('General');
    return <BasicInscriptionTabs value={tab} onChange={setTab} tabs={insciptionTabsData} />;
  }
};
