import type { Meta, StoryObj } from '@storybook/react';
import { Default as ToolbarStory } from './toolbar/toolbar.stories';
import { SidebarHeader } from './sidebar/header/header';
import { IvyIcons } from '@axonivy/ui-icons';
import * as React from 'react';
import { Flex } from '@/components/common/flex/flex';
import { PanelMessage } from '@/components/common/panelMessage/panelMessage';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/common/resizeable/resizable';

const meta: Meta = {
  title: 'Editor'
};

export default meta;

type Story = StoryObj;

const EditorStory = () => {
  const [sideBar, setSideBar] = React.useState(true);
  return (
    <ResizablePanelGroup direction='horizontal' style={{ minHeight: 200 }}>
      <ResizablePanel defaultSize={75} minSize={50}>
        <Flex direction='column' style={{ height: '100%' }}>
          <ToolbarStory sideBarCollapse={() => setSideBar(old => !old)} />
          <PanelMessage message='content' />
        </Flex>
      </ResizablePanel>
      {sideBar && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} minSize={10}>
            <Flex direction='column' style={{ height: '100%' }}>
              <SidebarHeader icon={IvyIcons.Script} title='Script' />
              <PanelMessage mode='row' message='sidebar' icon={IvyIcons.Settings} />
            </Flex>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};

export const Default: Story = {
  render: () => <EditorStory />
};
