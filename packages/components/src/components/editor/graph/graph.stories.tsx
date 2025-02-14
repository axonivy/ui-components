import type { Meta, StoryObj } from '@storybook/react';
import { Graph } from '@/components/editor/graph/graph';
import { dataClasses, dataClassRelations } from '@/components/editor/graph/data';
import { ReactFlowProvider } from '@xyflow/react';

const meta: Meta<typeof Graph> = {
  title: 'Editor/Graph',
  component: Graph
};

export default meta;

type Story = StoryObj<typeof Graph>;

export const Default: Story = {
  render: () => {
    return (
      <ReactFlowProvider>
        <Graph graphNodes={dataClasses} graphEdges={dataClassRelations} />
      </ReactFlowProvider>
    );
  }
};
