import type { EdgeProps } from '@xyflow/react';
import { EdgeLabelRenderer } from '@xyflow/react';
import { customEdge } from './graphEdge.css';
import { getEdgeParams } from './graphEdgeUtils';
import { useGraphEdge } from './useGraphEdge';

const GraphFloatingEdge = ({ id, source, target, markerEnd, style, label }: EdgeProps) => {
  const { edgePath, labelX, labelY } = useGraphEdge(source, target, getEdgeParams);

  if (!edgePath) return null;
  return (
    <>
      <path id={id} className='ui-graph-edge-path' d={edgePath} strokeWidth={2} markerEnd={markerEnd} style={style} />

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

export default GraphFloatingEdge;
