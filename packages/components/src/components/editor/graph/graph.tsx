import '@xyflow/react/dist/style.css';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { CustomNode } from '@/components/editor/graph/customNode';
import FloatingEdge from '@/components/editor/graph/floatingEdge';
import { getLayoutedElements } from '@/components/editor/graph/getLayoutedElements';
import { IvyIcons } from '@axonivy/ui-icons';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';

export type Direction = 'TB' | 'LR';
export type GraphNodeData = {
  id: string;
  label: string;
  content?: React.ReactNode;
  highlightNode?: boolean;
};

export type GraphEdge = {
  source: string;
  target: string;
  label?: string;
};

export type GraphNode = Node<{ GraphNodeData: GraphNodeData }, 'custom'>;

export type GraphProps = {
  graphNodes: GraphNodeData[];
  graphEdges: GraphEdge[];
  options: {
    topLeftCustomControl?: React.ReactNode;
    filter?: {
      filterNode: string;
      setFilterNode: (node: string) => void;
      filterOnSelect: boolean;
    };
  };
};

const Graph = ({ graphNodes, graphEdges, options }: GraphProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { getNodes, getEdges, fitView } = useReactFlow<GraphNode>();

  const onNodesChange: OnNodesChange = useCallback(changes => setNodes(nds => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange: OnEdgesChange = useCallback(changes => setEdges(eds => applyEdgeChanges(changes, eds)), [setEdges]);

  const onConnect: OnConnect = useCallback(
    params =>
      setEdges(eds =>
        addEdge(
          {
            ...params,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow }
          },
          eds
        )
      ),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction: Direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements({ nodes: getNodes(), edges: getEdges(), direction });
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [fitView, getEdges, getNodes]
  );

  useEffect(() => {
    let filteredNodes = graphNodes;
    let filteredEdges = graphEdges;

    if (options.filter && options.filter.filterNode !== 'all') {
      const connectedEdges = graphEdges.filter(
        edge => edge.source === options.filter?.filterNode || edge.target === options.filter?.filterNode
      );
      const connectedNodeIds = new Set(connectedEdges.flatMap(edge => [edge.source, edge.target]));
      filteredNodes = graphNodes.filter(node => connectedNodeIds.has(node.id));
      filteredEdges = connectedEdges;
    }

    const newNodes: GraphNode[] = filteredNodes.map(node => ({
      id: node.id,
      position: { x: 0, y: 0 },
      data: {
        GraphNodeData: node
      },
      type: 'custom'
    }));

    const newEdges: Edge[] = filteredEdges.map((edge, index) => ({
      id: index.toString(),
      label: edge.label,
      source: edge.source,
      target: edge.target,
      sourceHandle: 'b',
      targetHandle: 't',
      type: 'floating',
      markerEnd: {
        type: MarkerType.Arrow,
        width: 15,
        height: 15
      },
      style: { strokeWidth: 2 }
    }));

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements({ nodes: newNodes, edges: newEdges, direction: 'TB' });

    setNodes(prevNodes =>
      layoutedNodes.map(node => ({
        ...node,
        position: prevNodes.find(n => n.id === node.id)?.position || node.position // Keep existing position if available
      }))
    );
    setEdges(layoutedEdges);
  }, [graphEdges, graphNodes, options.filter]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={{ custom: CustomNode }}
      edgeTypes={{ floating: FloatingEdge }}
      connectionMode={ConnectionMode.Loose}
      fitView={true}
      onNodeDoubleClick={(e, node) => {
        options.filter?.setFilterNode(node.id);
      }}
    >
      <Controls />
      <MiniMap />
      <Background gap={12} size={1} />
      <Panel position='top-right'>
        <Flex direction='row' gap={1}>
          <Button
            icon={IvyIcons.Process}
            rotate={90}
            size='large'
            onClick={() => onLayout('TB')}
            style={{ background: 'white', boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))' }}
          />
          <Button
            icon={IvyIcons.Process}
            size='large'
            onClick={() => onLayout('LR')}
            style={{ background: 'white', boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))' }}
          />
        </Flex>
      </Panel>
      {options.topLeftCustomControl && <Panel position='top-left'>{options.topLeftCustomControl}</Panel>}
    </ReactFlow>
  );
};

Graph.displayName = 'Graph';

export { Graph };
