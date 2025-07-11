import { getBezierPath, type ConnectionLineComponentProps, type InternalNode } from '@xyflow/react';
import { getCircleEdgeParams } from './graphEdgeUtils';

const FloatingConnectionLine = ({ toX, toY, fromPosition, toPosition, fromNode }: ConnectionLineComponentProps) => {
  if (!fromNode) {
    return null;
  }

  const targetNode = {
    id: 'connection-target',
    measured: {
      width: 1,
      height: 1
    },
    internals: {
      positionAbsolute: { x: toX, y: toY }
    }
  };

  const { sx, sy } = getCircleEdgeParams(fromNode, targetNode as InternalNode);
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
    targetX: toX,
    targetY: toY
  });

  return (
    <g>
      <path fill='none' stroke={'var(--N900)'} strokeWidth={1.5} className='animated' d={edgePath} />
      <circle cx={toX} cy={toY} fill={'var(--background)'} r={3} stroke={'var(--N900)'} strokeWidth={1.5} />
    </g>
  );
};

export default FloatingConnectionLine;
