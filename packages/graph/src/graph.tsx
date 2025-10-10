import { BasicSelect, Button, Flex } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { Background, ConnectionMode, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { ReactNode } from 'react';
import { CHAR_WIDTH, useGraph } from './data/useGraph';
import FloatingConnectionLine from './edges/FloatingConnectionLine';
import GraphCircleFloatingEdge from './edges/graphCircleFloatingEdge';
import GraphFloatingEdge from './edges/graphFloatingEdge';
import './graph.css';
import { GraphNode } from './nodes/graphNode';

export type NodeData = {
  id: string;
  label: string;
  info?: string;
  content?: ReactNode;
  target?: Array<EdgeData>;
  options?: {
    highlightNode?: boolean;
    disableHandles?: boolean;
    controls?: ReactNode;
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
    filter?: {
      enabled: boolean;
      allLabel?: string;
    };
    circleFloatingEdges?: boolean;
    minimap?: boolean;
    controls?: boolean;
    zoomOnInit?: {
      level: number;
      applyOnLayoutAndFilter?: boolean;
    };
  };
};

const GraphRoot = ({ graphNodes, options }: GraphProps) => {
  const { edges, nodes, onConnect, onEdgesChange, onFilterApply, onLayout, onNodesChange, selectedNode } = useGraph({
    graphNodes,
    options
  });

  const selectItems = [
    { value: 'all', label: options?.filter?.allLabel ?? 'Show all' },
    ...graphNodes.map(node => ({
      value: node.id,
      label: node.label
    }))
  ];

  const longestLabelLength = Math.max(...selectItems.map(item => item.label.length));
  const menuWidth = `${longestLabelLength * CHAR_WIDTH}px`;

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={{ hideAttribution: true }}
      onConnect={onConnect}
      nodeTypes={{ custom: GraphNode }}
      edgeTypes={{ floating: options?.circleFloatingEdges ? GraphCircleFloatingEdge : GraphFloatingEdge }}
      connectionMode={ConnectionMode.Loose}
      fitView={true}
      fitViewOptions={{ maxZoom: options?.zoomOnInit?.level }}
      onNodeDoubleClick={(e, node) => {
        if (options?.filter) {
          onFilterApply(node.id);
        }
      }}
      connectionLineComponent={options?.circleFloatingEdges ? FloatingConnectionLine : undefined}
    >
      {options?.controls !== false && <Controls position='bottom-right' orientation='horizontal' />}
      {options?.minimap !== false && <MiniMap position='bottom-left' />}
      <Background gap={12} size={1} bgColor='var(--N25)' style={{ borderRadius: 'var(--size-2)' }} />
      <Panel position='top-right'>
        <Flex direction='row' gap={1}>
          <Button
            icon={IvyIcons.ArrowsSplitHorizontal}
            rotate={90}
            size='large'
            onClick={() => onLayout('TB')}
            title='horizontal alignment'
            style={{
              boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))',
              backgroundColor: 'var(--background)'
            }}
          />
          <Button
            icon={IvyIcons.ArrowsSplitHorizontal}
            size='large'
            title='vertical alignment'
            onClick={() => onLayout('LR')}
            style={{
              boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))',
              backgroundColor: 'var(--background)'
            }}
          />
        </Flex>
      </Panel>
      {options?.filter && (
        <Panel position='top-left'>
          <BasicSelect value={selectedNode} onValueChange={onFilterApply} items={selectItems} menuWidth={menuWidth} />
        </Panel>
      )}
    </ReactFlow>
  );
};

const Graph = ({ graphNodes, options }: GraphProps) => (
  <ReactFlowProvider>
    <GraphRoot graphNodes={graphNodes} options={options} />
  </ReactFlowProvider>
);
Graph.displayName = 'Graph';

export { Graph };
