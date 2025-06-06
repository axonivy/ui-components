import type { Meta, StoryObj } from '@storybook/react-vite';
import { BasicInscriptionTabs } from './inscriptionTabs';
import { insciptionTabsData } from '@/components/common/inscription-tabs/tabData';
import React from 'react';
import { Flex } from '@/components/common/flex/flex';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/common/resizeable/resizable';

const meta: Meta<typeof BasicInscriptionTabs> = {
  title: 'Common/InscriptionTabs',
  component: BasicInscriptionTabs
};

export default meta;

type Story = StoryObj<typeof BasicInscriptionTabs>;

export const Default: Story = {
  render: () => {
    const [tab, setTab] = React.useState('General');
    return (
      <Flex justifyContent='center' alignItems='center'>
        <ResizablePanelGroup autoSaveId='ivy-resizable' direction='horizontal'>
          <ResizablePanel>
            <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
              <span>Content</span>
            </Flex>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={25}>
            <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
              <BasicInscriptionTabs value={tab} onChange={setTab} tabs={insciptionTabsData} />
            </Flex>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Flex>
    );
  }
};
