import { getBezierPath, useInternalNode, type InternalNode } from '@xyflow/react';
import type { EdgeParams } from './graphEdgeUtils';

export const useGraphEdge = (source: string, target: string, getParamsFn: (source: InternalNode, target: InternalNode) => EdgeParams) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return { edgePath: null, labelX: 0, labelY: 0 };
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getParamsFn(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
  });

  return { edgePath, labelX, labelY };
};
