import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  customNode,
  customNodeHeaderInfo,
  customNodeHeaderLabel,
  expander,
  expanderClose,
  expanderOpen,
  normalNode,
  originalNode,
  selectedNode
} from '@/components/editor/graph/nodes/customNode.css';
import type { GraphNode } from '@/components/editor/graph/graph';
import { Flex } from '@/components/common/flex/flex';
import { Separator } from '@/components/common/separator/separator';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState } from 'react';
import { IvyIcon } from '@/components/common/icon/icon';

export const CustomNode = ({ data, selected }: NodeProps<GraphNode>) => {
  const disableHandles = data.CustomNodeData.options?.disableHandles;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Handle type='source' position={Position.Top} id='t' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <Handle type='source' position={Position.Left} id='l' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <Handle type='source' position={Position.Right} id='r' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <Handle type='source' position={Position.Bottom} id='b' style={{ pointerEvents: 'none', opacity: disableHandles ? 0 : 1 }} />
      <div className={`${customNode} ${selected ? selectedNode : data.CustomNodeData.options?.highlightNode ? originalNode : normalNode}`}>
        <div style={{ padding: '10px' }}>
          <Flex direction='row' alignItems='center' justifyContent='space-between' gap={4} style={{ minWidth: '150px' }}>
            <Flex direction='column' gap={1}>
              <div className={customNodeHeaderLabel}>{data.CustomNodeData.label}</div>
              {data.CustomNodeData.info && expanded && <div className={customNodeHeaderInfo}>{data.CustomNodeData.info}</div>}
            </Flex>
            <Flex direction='row' gap={1} alignItems='center' style={{ height: '20px' }}>
              {data.CustomNodeData.options?.controls}
              {data.CustomNodeData.options?.expandContent && (
                <>
                  <Separator decorative orientation='vertical' style={{ marginInline: 'var(--size-1)' }} />
                  <IvyIcon
                    icon={IvyIcons.Chevron}
                    className={`${expander} ${expanded ? expanderOpen : expanderClose}`}
                    onClick={() => {
                      setExpanded(!expanded);
                    }}
                  />
                </>
              )}
            </Flex>
          </Flex>
          {data.CustomNodeData.content && expanded && (
            <Separator decorative orientation='horizontal' style={{ marginBlock: 'var(--size-2)' }} />
          )}
          {expanded && data.CustomNodeData.content}
        </div>
      </div>
    </>
  );
};
