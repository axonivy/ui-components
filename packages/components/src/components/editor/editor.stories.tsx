import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from './editor';
import { Default as ToolbarStory } from '../master/toolbar/toolbar.stories';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, Flex } from '@/components/common';
import { SidebarHeader } from '../detail/header/header';
import { IvyIcons } from '@axonivy/ui-icons';
import * as React from 'react';

const meta: Meta<typeof Editor> = {
  title: 'Editor',
  component: Editor
};

export default meta;

type Story = StoryObj<typeof Editor>;

const EditorStory = () => {
  const [sideBar, setSideBar] = React.useState(true);
  return (
    <Editor>
      <ResizablePanelGroup direction='horizontal' style={{ minHeight: 200 }}>
        <ResizablePanel defaultSize={75} minSize={50}>
          <Flex direction='column' style={{ height: '100%' }}>
            <ToolbarStory sideBarCollapse={() => setSideBar(old => !old)} />
            <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
              <span>Content</span>
            </Flex>
          </Flex>
        </ResizablePanel>
        {sideBar && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={25} minSize={10}>
              <Flex direction='column' style={{ height: '100%' }}>
                <SidebarHeader icon={IvyIcons.Script} title='Script' />
                <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                  <span>Sidebar</span>
                </Flex>
              </Flex>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </Editor>
  );
};

export const Default: Story = {
  render: () => <EditorStory />
};
