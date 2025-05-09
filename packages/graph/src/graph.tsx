import '@xyflow/react/dist/style.css';
import { IvyIcons } from '@axonivy/ui-icons';
import { Background, ConnectionMode, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, type Node } from '@xyflow/react';
import { BasicSelect, Button, Flex } from '@axonivy/ui-components';
import { useGraph } from './data/useGraph';
import GraphCircleFloatingEdge from './edges/graphCircleFloatingEdge';
import FloatingConnectionLine from './edges/FloatingConnectionLine';
import GraphFloatingEdge from './edges/graphFloatingEdge';
import { GraphNode } from './nodes/graphNode';

export type NodeData = {
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

export type GraphNode = Node<{ nodeData: NodeData }, 'custom'>;

export type GraphProps = {
  graphNodes: NodeData[];
  options?: {
    filter?: boolean;
    circleFloatingEdges?: boolean;
    minimap?: boolean;
    controls?: boolean;
  };
};

const GraphRoot = ({ graphNodes, options }: GraphProps) => {
  const { edges, nodes, onConnect, onEdgesChange, onFilterApply, onLayout, onNodesChange, selectedNode } = useGraph({
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
      nodeTypes={{ custom: GraphNode }}
      edgeTypes={{ floating: options?.circleFloatingEdges ? GraphCircleFloatingEdge : GraphFloatingEdge }}
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
      <GraphRoot graphNodes={graphNodes} options={options} />
    </ReactFlowProvider>
  );
};
Graph.displayName = 'Graph';

export { Graph };
