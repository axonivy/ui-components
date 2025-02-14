import { Handle, Position, type NodeProps } from '@xyflow/react';
import { customNode, customNodeHeader, normalNode, originalNode, selectedNode } from '@/components/editor/graph/customNode.css';
import type { GraphNode } from '@/components/editor/graph/graph';

export function CustomNode({ data, selected }: NodeProps<GraphNode>) {
  return (
    <>
      <Handle type='source' position={Position.Top} id='t' style={{ pointerEvents: 'none' }} />
      <Handle type='source' position={Position.Left} id='l' style={{ pointerEvents: 'none' }} />
      <Handle type='source' position={Position.Right} id='r' style={{ pointerEvents: 'none' }} />
      <Handle type='source' position={Position.Bottom} id='b' style={{ pointerEvents: 'none' }} />
      <div className={`${customNode} ${selected ? selectedNode : data.CustomNodeData.highlightNode ? originalNode : normalNode}`}>
        <div className={customNodeHeader}>{data.CustomNodeData.label}</div>
        {data.CustomNodeData.content && <hr />}
        {data.CustomNodeData.content}
      </div>
    </>
  );
}
