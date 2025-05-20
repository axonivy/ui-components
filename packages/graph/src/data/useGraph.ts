import { useCallback, useEffect, useState } from 'react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  useReactFlow,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange
} from '@xyflow/react';
import type { NodeData, GraphNode, GraphProps } from '../graph';
import { getLayoutedElements, type Direction } from './getLayoutedElements';

export const CHAR_WIDTH = 7.5;
export const DEFAULT_NODE_WIDTH = 172;
export const DEFAULT_NODE_HEIGHT = 50;

const useGraph = ({ graphNodes, options }: GraphProps) => {
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
        fitView({ maxZoom: options?.zoomOnInit?.applyOnLayoutAndFilter ? options.zoomOnInit.level : undefined });
      });
    },
    [fitView, getEdges, getNodes, options?.zoomOnInit]
  );

  const onFilterApply = useCallback(
    (selectedId?: string) => {
      setSelectedNode(selectedId ?? 'all');
      const filteredNodes = options?.filter && selectedId ? filterNodesBySelectedNode(graphNodes, selectedId) : graphNodes;
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements({
        ...mapNodesAndEdges(filteredNodes, getNodes(), options, selectedId),
        direction: 'TB'
      });
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
      setTimeout(() => {
        window.requestAnimationFrame(() => {
          fitView({ maxZoom: options?.zoomOnInit?.applyOnLayoutAndFilter ? options.zoomOnInit.level : undefined });
        });
      }, 0);
    },
    [fitView, getNodes, graphNodes, options]
  );

  // Initialize layouted nodes and edges
  useEffect(() => {
    setSelectedNode('all');
    setNodes(getLayoutedElements({ ...mapNodesAndEdges(graphNodes, getNodes(), options), direction: 'TB' }).nodes);
    setEdges(getLayoutedElements({ ...mapNodesAndEdges(graphNodes, getNodes(), options), direction: 'TB' }).edges);
  }, [graphNodes, options, getNodes]);

  return { nodes, edges, selectedNode, onNodesChange, onEdgesChange, onConnect, onLayout, onFilterApply };
};

export { useGraph };

function filterNodesBySelectedNode(graphNodes: Array<NodeData>, selectedNode: string): Array<NodeData> {
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
const getNodeSize = (node: NodeData, existingNodes: GraphNode[]): { width: number; height: number } => {
  const measuredSize = existingNodes.find(n => n.id === node.id)?.measured;
  if (measuredSize && typeof measuredSize.width === 'number' && typeof measuredSize.height === 'number') {
    return measuredSize as { width: number; height: number };
  }

  const calculatedWidth = Math.max(node.label.length * CHAR_WIDTH, DEFAULT_NODE_WIDTH);
  return {
    width: calculatedWidth,
    height: DEFAULT_NODE_HEIGHT
  };
};

const mapNodesAndEdges = (graphNodes: NodeData[], existingNodes: GraphNode[], options?: GraphProps['options'], selectedNode?: string) => {
  const newNodes: GraphNode[] = graphNodes.map(node => ({
    id: node.id,
    position: { x: 0, y: 0 },
    data: {
      nodeData: {
        ...node,
        options: {
          ...node.options,
          highlightNode: node.options?.highlightNode && !options?.filter ? node.options?.highlightNode : node.id === selectedNode,
          disableHandles: node.options?.disableHandles ?? options?.circleFloatingEdges ?? false
        }
      }
    },
    measured: getNodeSize(node, existingNodes),
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
  return { nodes: newNodes, edges: newEdges };
};
