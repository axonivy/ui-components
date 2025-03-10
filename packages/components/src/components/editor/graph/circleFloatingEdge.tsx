import { getCircleEdgeParams } from '@/utils/graph';
import type { EdgeProps } from '@xyflow/react';
import { EdgeLabelRenderer, getBezierPath, useInternalNode } from '@xyflow/react';

function CircleFloatingEdge({ id, source, target, markerEnd, style, label }: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getCircleEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
  });

  return (
    <>
      <path id={id} className='react-flow__edge-path' d={edgePath} strokeWidth={2} markerEnd={markerEnd} style={style} />

      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              background: 'white',
              padding: '2px 5px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap'
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default CircleFloatingEdge;
