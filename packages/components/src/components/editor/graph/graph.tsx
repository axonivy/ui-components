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
import FloatingConnectionLine from '@/components/editor/graph/FloatingConnectionLine';
import CircleFloatingEdge from '@/components/editor/graph/circleFloatingEdge';

export type CustomNodeData = {
  id: string;
  label: string;
  content?: React.ReactNode;
  target?: Array<EdgeData>;
  options?: {
    highlightNode?: boolean;
    disableHandles?: boolean;
    controls?: React.ReactNode;
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
    const filteredNodes = options?.filter ? filterNodesBySelectedNode(graphNodes, selectedNode) : graphNodes;
    const newNodes: GraphNode[] = filteredNodes.map(node => ({
      id: node.id,
      position: { x: 0, y: 0 },
      data: {
        CustomNodeData: {
          ...node,
          options: {
            ...node.options,
            highlightNode: node.options?.highlightNode && !options?.filter ? node.options?.highlightNode : node.id === selectedNode,
            disableHandles: options?.circleFloatingEdges ? options?.circleFloatingEdges : false
          }
        }
      },
      type: 'custom'
    }));

    const newEdges: Edge[] = graphNodes.flatMap(
      node =>
        node.target?.map((target, index) => ({
          id: `${node.id}-${target.id}-${index}`,
          source: node.id,
          target: target.id,
          label: target.label,
          sourceHandle: 'b',
          targetHandle: 't',
          type: 'floating',
          markerEnd: { type: MarkerType.Arrow, width: 15, height: 15 },
          style: { strokeWidth: 2 }
        })) || []
    );

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements({ nodes: newNodes, edges: newEdges, direction: 'TB' });
    setNodes(prevNodes =>
      layoutedNodes.map(node => ({
        ...node,
        position: prevNodes.find(n => n.id === node.id)?.position || node.position // Keep existing position if available
      }))
    );
    setEdges(layoutedEdges);
  }, [graphNodes, options?.circleFloatingEdges, options?.filter, selectedNode]);

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
          setSelectedNode(node.id);
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

const Graph = ({ graphNodes, options }: GraphProps) => {
  return (
    <ReactFlowProvider>
      <CustomGraph graphNodes={graphNodes} options={options} />
    </ReactFlowProvider>
  );
};
Graph.displayName = 'Graph';

export { Graph };

function filterNodesBySelectedNode(graphNodes: Array<CustomNodeData>, selectedNode: string): Array<CustomNodeData> {
  let filteredNodes = graphNodes;

  if (selectedNode !== 'all') {
    const selectedNodeIds = new Set<string>();

    graphNodes.forEach(node => {
      if (node.id === selectedNode) {
        selectedNodeIds.add(node.id);

        if (node.target && node.target.length > 0) {
          node.target.forEach(target => {
            const targetNode = graphNodes.find(n => n.id === target.id);
            if (targetNode) {
              selectedNodeIds.add(targetNode.id);
            }
          });
        }
      }

      if (node.target && node.target.length > 0 && node.target.some(edge => edge.id === selectedNode)) {
        selectedNodeIds.add(node.id);
      }
    });

    filteredNodes = graphNodes.filter(node => selectedNodeIds.has(node.id));
  }

  return filteredNodes;
}
