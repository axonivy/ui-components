import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tabs/tabs';
import { vars } from '@/styles/theme.css';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResizableGroup, ResizableHandle, ResizablePanel, useDefaultLayout, usePanelRef } from './resizable';

const meta: Meta<typeof ResizableGroup> = {
  title: 'Common/Resizeable',
  component: ResizableGroup
};

export default meta;

type Story = StoryObj<{ orientation: 'horizontal' | 'vertical'; withHandle: boolean }>;

export const Default: Story = {
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] }
  },
  args: {
    orientation: 'horizontal',
    withHandle: true
  },
  render: ({ orientation, withHandle }) => {
    const { defaultLayout, onLayoutChanged } = useDefaultLayout({
      groupId: 'resizable-default',
      storage: localStorage
    });
    return (
      <Flex justifyContent='center' alignItems='center'>
        <ResizableGroup
          defaultLayout={defaultLayout}
          onLayoutChanged={onLayoutChanged}
          orientation={orientation}
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
        </ResizableGroup>
      </Flex>
    );
  }
};

export const Conditional: StoryObj<{ showLeftPanel: boolean; showRightPanel: boolean }> = {
  args: {
    showLeftPanel: true,
    showRightPanel: true
  },
  render: ({ showLeftPanel, showRightPanel }) => {
    const { defaultLayout, onLayoutChanged } = useDefaultLayout({
      groupId: 'resizable-conditional',
      storage: localStorage
    });

    return (
      <Flex justifyContent='center' alignItems='center'>
        <ResizableGroup
          defaultLayout={defaultLayout}
          onLayoutChanged={onLayoutChanged}
          orientation='horizontal'
          style={{ minHeight: '200px', border: vars.border.basic, borderRadius: vars.border.r2 }}
        >
          {showLeftPanel && (
            <>
              <ResizablePanel id='left'>
                <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                  <span>Left</span>
                </Flex>
              </ResizablePanel>
              <ResizableHandle />
            </>
          )}
          <ResizablePanel id='center'>
            <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
              <span>Middle</span>
            </Flex>
          </ResizablePanel>
          {showRightPanel && (
            <>
              <ResizableHandle />
              <ResizablePanel id='right'>
                <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                  <span>Right</span>
                </Flex>
              </ResizablePanel>
            </>
          )}
        </ResizableGroup>
      </Flex>
    );
  }
};

export const ContentHandle: Story = {
  render: () => {
    const { defaultLayout, onLayoutChanged } = useDefaultLayout({
      groupId: 'resizable-content-handle',
      storage: localStorage
    });
    const bottomRef = usePanelRef();
    return (
      <Tabs variant='slim'>
        <Flex justifyContent='center' alignItems='center'>
          <ResizableGroup
            defaultLayout={defaultLayout}
            onLayoutChanged={onLayoutChanged}
            orientation='vertical'
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
            <ResizablePanel panelRef={bottomRef} defaultSize={25} minSize={10} collapsible>
              <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                <TabsContent value='Log'>Log</TabsContent>
                <TabsContent value='Mail'>Mail</TabsContent>
              </Flex>
            </ResizablePanel>
          </ResizableGroup>
        </Flex>
      </Tabs>
    );
  }
};
