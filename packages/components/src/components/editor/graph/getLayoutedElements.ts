import type { GraphNode } from '@/components/editor/graph/graph';
import Dagre from '@dagrejs/dagre';
import { type Edge } from '@xyflow/react';

const dagreGraph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
export type Direction = 'TB' | 'LR';

export const getLayoutedElements = ({ nodes, edges, direction = 'TB' }: { nodes: GraphNode[]; edges: Edge[]; direction: Direction }) => {
  let nodeWidth = 172;
  let nodeHeight = 100;
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach(node => {
    if (node.measured) {
      if (node.measured.height) {
        nodeHeight = node.measured.height;
      }
      if (node.measured.width) {
        nodeWidth = node.measured.width;
      }
    }
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(dagreGraph);

  const newNodes: GraphNode[] = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      }
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};
