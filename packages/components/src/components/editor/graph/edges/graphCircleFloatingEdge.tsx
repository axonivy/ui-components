import { customEdge } from '@/components/editor/graph/edges/graphEdge.css';
import { getCircleEdgeParams } from '@/components/editor/graph/edges/graphEdgeUtils';
import { useGraphEdge } from '@/components/editor/graph/edges/useGraphEdge';
import type { EdgeProps } from '@xyflow/react';
import { EdgeLabelRenderer } from '@xyflow/react';

const GraphCircleFloatingEdge = ({ id, source, target, markerEnd, style, label }: EdgeProps) => {
  const { edgePath, labelX, labelY } = useGraphEdge(source, target, getCircleEdgeParams);

  if (!edgePath) return null;

  return (
    <>
      <path id={id} className='react-flow__edge-path' d={edgePath} strokeWidth={2} markerEnd={markerEnd} style={style} />

      {label && (
        <EdgeLabelRenderer>
          <div className={customEdge} style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}>
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default GraphCircleFloatingEdge;
