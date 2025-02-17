import { Handle, Position, type NodeProps } from '@xyflow/react';
import { customNode, customNodeHeader, normalNode, originalNode, selectedNode } from '@/components/editor/graph/customNode.css';
import type { GraphNode } from '@/components/editor/graph/graph';
import { Flex } from '@/components/common/flex/flex';

export function CustomNode({ data, selected }: NodeProps<GraphNode>) {
  const disableHandles = data.CustomNodeData.options?.disableHandles;

  return (
    <>
      <Handle type='source' position={Position.Top} id='t' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <Handle type='source' position={Position.Left} id='l' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <Handle type='source' position={Position.Right} id='r' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <Handle type='source' position={Position.Bottom} id='b' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <div className={`${customNode} ${selected ? selectedNode : data.CustomNodeData.options?.highlightNode ? originalNode : normalNode}`}>
        <Flex direction='row' justifyContent={data.CustomNodeData.options?.controls ? 'space-between' : 'center'} alignItems='center'>
          <div className={customNodeHeader}>{data.CustomNodeData.label}</div>

          {data.CustomNodeData.options?.controls}
        </Flex>
        {data.CustomNodeData.content && <hr />}
        {data.CustomNodeData.content}
      </div>
    </>
  );
}
