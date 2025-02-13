import { Handle, Position, type NodeProps } from '@xyflow/react';
import { customNode, customNodeHeader, normal, original } from '@/components/editor/graph/customNode.css';
import type { GraphNode } from '@/components/editor/graph/graph';

export function CustomNode({ data, selected }: NodeProps<GraphNode>) {
  return (
    <>
      <Handle type='source' position={Position.Top} id='t' />
      <Handle type='source' position={Position.Left} id='l' />
      <Handle type='source' position={Position.Right} id='r' />
      <Handle type='source' position={Position.Bottom} id='b' />
      <div className={`${customNode} ${selected ? selected : data.GraphNodeData.highlightNode ? original : normal}`}>
        <div className={customNodeHeader}>{data.GraphNodeData.label}</div>
        <hr />
        {data.GraphNodeData.content}
      </div>
    </>
  );
}
