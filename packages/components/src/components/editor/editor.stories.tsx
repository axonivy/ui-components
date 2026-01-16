import { Flex } from '@/components/common/flex/flex';
import { PanelMessage } from '@/components/common/panelMessage/panelMessage';
import { ResizableGroup, ResizableHandle, ResizablePanel } from '@/components/common/resizeable/resizable';
import { Default as Sidebar } from '@/components/editor/sidebar/sidebar.stories';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Default as ToolbarStory } from './toolbar/toolbar.stories';

const meta: Meta = {
  title: 'Editor'
};

export default meta;

type Story = StoryObj;

const EditorStory = () => {
  const [sideBar, setSideBar] = useState(true);
  return (
    <ResizableGroup orientation='horizontal' style={{ minHeight: 200 }}>
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
            <Sidebar />
          </ResizablePanel>
        </>
      )}
    </ResizableGroup>
  );
};

export const Default: Story = {
  render: () => <EditorStory />
};
