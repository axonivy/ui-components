import type { Meta, StoryObj } from '@storybook/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';
import { Flex } from '@/components/common';
import { vars } from '@/styles/theme.css';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Common/Resizeable',
  component: ResizablePanelGroup,
  argTypes: {
    direction: { control: 'select', defaultValue: 'horizontal', options: ['horizontal', 'vertical'] }
  }
};

export default meta;

type Story = StoryObj<{ direction: 'horizontal' | 'vertical'; withHandle: boolean }>;

export const Default: Story = {
  args: {
    direction: 'horizontal',
    withHandle: true
  },
  render: ({ direction, withHandle }) => (
    <Flex justifyContent='center' alignItems='center'>
      <ResizablePanelGroup
        autoSaveId='ivy-resizable'
        direction={direction}
        style={{ minHeight: '200px', border: vars.border.basic, borderRadius: vars.border.radius }}
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
