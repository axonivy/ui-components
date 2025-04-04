import '@xyflow/react/dist/style.css';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { CustomNode } from '@/components/editor/graph/nodes/customNode';
import FloatingEdge from '@/components/editor/graph/edges/floatingEdge';
import { IvyIcons } from '@axonivy/ui-icons';
import { Background, ConnectionMode, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, type Node } from '@xyflow/react';
import { BasicSelect } from '@/components/common/select/select';
import CircleFloatingEdge from '@/components/editor/graph/edges/circleFloatingEdge';
import FloatingConnectionLine from '@/components/editor/graph/edges/FloatingConnectionLine';
import useCustomGraph from '@/components/editor/graph/data/useCustomGraph';

export type CustomNodeData = {
  id: string;
  label: string;
  info?: string;
  content?: React.ReactNode;
  target?: Array<EdgeData>;
  options?: {
    highlightNode?: boolean;
    disableHandles?: boolean;
    controls?: React.ReactNode;
    expandContent?: boolean;
  };
};

export type EdgeData = {
  id: string;
  label?: string;
};

export type GraphNode = Node<{ CustomNodeData: CustomNodeData }, 'custom'>;

export type GraphProps = {
  graphNodes: CustomNodeData[];
  options?: {
    filter?: boolean;
    circleFloatingEdges?: boolean;
    minimap?: boolean;
    controls?: boolean;
  };
};

const CustomGraph = ({ graphNodes, options }: GraphProps) => {
  const { edges, nodes, onConnect, onEdgesChange, onFilterApply, onLayout, onNodesChange, selectedNode } = useCustomGraph({
    graphNodes,
    options
  });

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={{ custom: CustomNode }}
      edgeTypes={{ floating: options?.circleFloatingEdges ? CircleFloatingEdge : FloatingEdge }}
      connectionMode={ConnectionMode.Loose}
      fitView={true}
      onNodeDoubleClick={(e, node) => {
        if (options?.filter) {
          onFilterApply(node.id);
        }
      }}
      connectionLineComponent={options?.circleFloatingEdges ? FloatingConnectionLine : undefined}
    >
      {options?.controls !== false && <Controls />}
      {options?.minimap !== false && <MiniMap />}
      <Background gap={12} size={1} />
      <Panel position='top-right'>
        <Flex direction='row' gap={1}>
          <Button
            icon={IvyIcons.Process}
            rotate={90}
            size='large'
            onClick={() => onLayout('TB')}
            title='horizontal alignment'
            style={{ background: 'white', boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))' }}
          />
          <Button
            icon={IvyIcons.Process}
            size='large'
            title='vertical alignment'
            onClick={() => onLayout('LR')}
            style={{ background: 'white', boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))' }}
          />
        </Flex>
      </Panel>
      {options?.filter && (
        <Panel position='top-left'>
          <BasicSelect
            value={selectedNode}
            onValueChange={onFilterApply}
            items={[
              { value: 'all', label: 'Show all' },
              ...graphNodes.map(node => ({
                value: node.id,
                label: node.label
              }))
            ]}
            menuWidth='200px'
          />
        </Panel>
      )}
    </ReactFlow>
  );
};

const Graph = ({ graphNodes, options }: GraphProps) => {
  return (
    <ReactFlowProvider>
      <CustomGraph graphNodes={graphNodes} options={options} />
    </ReactFlowProvider>
  );
};
Graph.displayName = 'Graph';

export { Graph };
