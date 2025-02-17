import '@xyflow/react/dist/style.css';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { CustomNode } from '@/components/editor/graph/customNode';
import FloatingEdge from '@/components/editor/graph/floatingEdge';
import { getLayoutedElements, type Direction } from '@/components/editor/graph/getLayoutedElements';
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
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import { BasicSelect } from '@/components/common/select/select';

export type CustomNodeData = {
  id: string;
  label: string;
  content?: React.ReactNode;
  highlightNode?: boolean;
};

export type EdgeData = {
  source: string;
  target: string;
  label?: string;
};

export type GraphNode = Node<{ CustomNodeData: CustomNodeData }, 'custom'>;

export type GraphProps = {
  graphNodes: CustomNodeData[];
  graphEdges: EdgeData[];
  options?: {
    filter?: boolean;
  };
};

const CustomGraph = ({ graphNodes, graphEdges, options }: GraphProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>('all');

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

    if (options?.filter && selectedNode !== 'all') {
      const connectedEdges = graphEdges.filter(edge => edge.source === selectedNode || edge.target === selectedNode);
      const connectedNodeIds = new Set(connectedEdges.flatMap(edge => [edge.source, edge.target]));
      filteredNodes = graphNodes.filter(node => connectedNodeIds.has(node.id));
      filteredEdges = connectedEdges;
    }

    const newNodes: GraphNode[] = filteredNodes.map(node => ({
      id: node.id,
      position: { x: 0, y: 0 },
      data: {
        CustomNodeData: {
          ...node,
          highlightNode: node.highlightNode && !options?.filter ? node.highlightNode : node.id === selectedNode
        }
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
  }, [graphEdges, graphNodes, options?.filter, selectedNode]);

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
        if (options?.filter) {
          setSelectedNode(node.id);
        }
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
      {options?.filter && (
        <Panel position='top-left'>
          <BasicSelect
            value={selectedNode}
            onValueChange={setSelectedNode}
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

const Graph = ({ graphNodes, graphEdges, options }: GraphProps) => {
  return (
    <ReactFlowProvider>
      <CustomGraph graphNodes={graphNodes} graphEdges={graphEdges} options={options} />
    </ReactFlowProvider>
  );
};
Graph.displayName = 'Graph';

export { Graph };
