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

export type GraphProps = { graphNodes: GraphNodeData[]; graphEdges: GraphEdge[] };

const Graph = ({ graphNodes, graphEdges }: GraphProps) => {
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
    const newNodes: GraphNode[] = graphNodes.map(node => ({
      id: node.id,
      position: { x: 0, y: 0 },
      data: {
        GraphNodeData: node
      },
      type: 'custom'
    }));

    const newEdges: Edge[] = graphEdges.map((edge, index) => ({
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
  }, [graphEdges, graphNodes]);

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
    >
      <Controls />
      <MiniMap />
      <Background gap={12} size={1} />
      <Panel position='top-right'>
        <Flex direction='row' gap={1}>
          <Button
            icon={IvyIcons.Process}
            rotate={90}
            onClick={() => onLayout('TB')}
            style={{ background: 'white', boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))' }}
          />
          <Button
            icon={IvyIcons.Process}
            onClick={() => onLayout('LR')}
            style={{ background: 'white', boxShadow: 'var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))' }}
          />
        </Flex>
      </Panel>
    </ReactFlow>
  );
};

Graph.displayName = 'Graph';

export { Graph };
