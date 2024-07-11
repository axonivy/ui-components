import type { Meta, StoryObj } from '@storybook/react';
import { EmptyDetail } from './emptyDetail';
import { Default as ToolbarStory } from '../../toolbar/toolbar.stories';
import { Flex, ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/common';
import * as React from 'react';

const meta: Meta<typeof EmptyDetail> = {
  title: 'Editor/EmptyDetail',
  component: EmptyDetail,
  tags: ['autodocs'],
  args: {
    message: 'This is a message'
  },
  argTypes: {
    message: { control: 'text' },
    mode: { control: 'radio' }
  }
};

export default meta;

type Story = StoryObj<typeof EmptyDetail>;

export const Default: Story = {
  args: {
    message: 'Nothing there yet. Select an Element to edit its properties.',
    mode: 'column'
  },
  render: props => <EmptyDetail message={props.message} mode={props.mode} />
};

type StoryWithEditor = StoryObj;

const EditorWithEmptyDetailStory = () => {
  const [sideBar, setSideBar] = React.useState(true);
  return (
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
            <EmptyDetail message='Nothing there yet. Select an Element to edit its properties.' mode='column' />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};

export const EditorWithEmptyDetail: StoryWithEditor = {
  render: () => <EditorWithEmptyDetailStory />
};
