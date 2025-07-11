import { Button, Flex, Separator } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useState } from 'react';
import type { GraphNode as GraphNodeType } from '../graph';
import {
  containerPadding,
  customNodeHeaderInfo,
  customNodeHeaderLabel,
  expander,
  handle,
  iconHeight,
  minWidth,
  node
} from './graphNode.css';

export const GraphNode = ({ data, selected }: NodeProps<GraphNodeType>) => {
  const disableHandles = data.nodeData.options?.disableHandles;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Handle type='source' position={Position.Top} id='t' className={handle} data-handles={disableHandles} />
      <Handle type='source' position={Position.Left} id='l' className={handle} data-handles={disableHandles} />
      <Handle type='source' position={Position.Right} id='r' className={handle} data-handles={disableHandles} />
      <Handle type='source' position={Position.Bottom} id='b' className={handle} data-handles={disableHandles} />
      <div className={node} data-selected={selected} data-highlight={data.nodeData.options?.highlightNode}>
        <div className={containerPadding}>
          <Flex direction='row' alignItems='center' justifyContent='space-between' gap={4} className={minWidth}>
            <Flex direction='column' gap={1}>
              <div className={customNodeHeaderLabel}>{data.nodeData.label}</div>
              {data.nodeData.info && expanded && <div className={customNodeHeaderInfo}>{data.nodeData.info}</div>}
            </Flex>
            <Flex direction='row' gap={1} alignItems='center' className={iconHeight}>
              {data.nodeData.options?.controls}
              {data.nodeData.options?.expandContent && (
                <>
                  <Separator decorative orientation='vertical' style={{ marginInline: 'var(--size-1)' }} />
                  <Button
                    icon={IvyIcons.Chevron}
                    aria-label='Expand node'
                    aria-expanded={expanded}
                    className={expander}
                    onClick={() => setExpanded(!expanded)}
                  />
                </>
              )}
            </Flex>
          </Flex>
          {data.nodeData.content && expanded && <Separator decorative orientation='horizontal' style={{ marginBlock: 'var(--size-2)' }} />}
          {expanded && data.nodeData.content}
        </div>
      </div>
    </>
  );
};
