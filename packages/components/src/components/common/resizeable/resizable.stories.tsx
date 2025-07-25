import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tabs/tabs';
import { vars } from '@/styles/theme.css';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, type ImperativePanelHandle } from './resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Common/Resizeable',
  component: ResizablePanelGroup
};

export default meta;

type Story = StoryObj<{ direction: 'horizontal' | 'vertical'; withHandle: boolean }>;

export const Default: Story = {
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] }
  },
  args: {
    direction: 'horizontal',
    withHandle: true
  },
  render: ({ direction, withHandle }) => (
    <Flex justifyContent='center' alignItems='center'>
      <ResizablePanelGroup
        autoSaveId='ivy-resizable'
        direction={direction}
        style={{ minHeight: '200px', border: vars.border.basic, borderRadius: vars.border.r2 }}
      >
        <ResizablePanel defaultSize={75} minSize={50}>
          <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <span>Content</span>
          </Flex>
        </ResizablePanel>
        <ResizableHandle withHandle={withHandle} />
        <ResizablePanel defaultSize={25} minSize={10}>
          <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <span>Sidebar</span>
          </Flex>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Flex>
  )
};

export const Conditional: StoryObj<{ showLeftPanel: boolean; showRightPanel: boolean }> = {
  args: {
    showLeftPanel: true,
    showRightPanel: true
  },
  render: ({ showLeftPanel, showRightPanel }) => (
    <Flex justifyContent='center' alignItems='center'>
      <ResizablePanelGroup
        autoSaveId='conditional'
        direction='horizontal'
        style={{ minHeight: '200px', border: vars.border.basic, borderRadius: vars.border.r2 }}
      >
        {showLeftPanel && (
          <>
            <ResizablePanel id='left' order={1}>
              <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                <span>Left</span>
              </Flex>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}
        <ResizablePanel id='center' order={2}>
          <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <span>Middle</span>
          </Flex>
        </ResizablePanel>
        {showRightPanel && (
          <>
            <ResizableHandle />
            <ResizablePanel id='right' order={3}>
              <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                <span>Right</span>
              </Flex>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </Flex>
  )
};

export const ContentHandle: Story = {
  render: () => {
    const bottomRef = useRef<ImperativePanelHandle>(null);
    return (
      <Tabs variant='slim'>
        <Flex justifyContent='center' alignItems='center'>
          <ResizablePanelGroup
            autoSaveId='ivy-resizable'
            direction='vertical'
            style={{ minHeight: '200px', border: vars.border.basic, borderRadius: vars.border.r2 }}
          >
            <ResizablePanel defaultSize={75} minSize={50}>
              <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                <span>Content</span>
              </Flex>
            </ResizablePanel>
            <ResizableHandle>
              <Flex direction='row' justifyContent='space-between' alignItems='center' style={{ paddingInline: vars.size.s4 }}>
                <TabsList>
                  <TabsTrigger value='Log'>
                    <IvyIcon icon={IvyIcons.File} />
                    Log
                  </TabsTrigger>
                  <TabsTrigger value='Mail'>
                    <IvyIcon icon={IvyIcons.Receive} />
                    Mail
                  </TabsTrigger>
                </TabsList>
                <Button
                  icon={IvyIcons.Chevron}
                  rotate={90}
                  onClick={() => (bottomRef.current?.isCollapsed() ? bottomRef.current?.expand() : bottomRef.current?.collapse())}
                />
              </Flex>
            </ResizableHandle>
            <ResizablePanel ref={bottomRef} defaultSize={25} minSize={10} collapsible>
              <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                <TabsContent value='Log'>Log</TabsContent>
                <TabsContent value='Mail'>Mail</TabsContent>
              </Flex>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Flex>
      </Tabs>
    );
  }
};
