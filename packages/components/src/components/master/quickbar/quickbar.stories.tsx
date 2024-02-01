import type { Meta } from '@storybook/react';
import { Button, Flex } from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';
import { Quickbar } from './quickbar';
import { useRef, useState } from 'react';

const meta: Meta<typeof Quickbar> = {
  title: 'Master/Quickbar',
  component: Quickbar
};

export default meta;

export const Default = () => {
  const [selectedElement, setSelectedElement] = useState(false);
  const anchorRef = useRef<SVGCircleElement>(null);
  return (
    <>
      <svg>
        <circle
          r='15'
          cx='15'
          cy='15'
          style={{ fill: 'white', stroke: '#8d8d8d', strokeWidth: 1, cursor: 'pointer' }}
          transform='translate(10, 10)'
          ref={anchorRef}
          onClick={() => setSelectedElement(old => !old)}
        ></circle>
      </svg>
      <Quickbar anchorElement={anchorRef.current} open={selectedElement}>
        <Flex gap={4}>
          <Flex gap={1}>
            <Button icon={IvyIcons.Trash} size='large' />
            <Button icon={IvyIcons.InfoCircle} size='large' />
          </Flex>
          <Flex gap={1}>
            <Button icon={IvyIcons.Label} size='large' />
            <Button icon={IvyIcons.ColorDrop} size='large' />
          </Flex>
          <Flex gap={1}>
            <Button icon={IvyIcons.EventStart} size='large' />
            <Button icon={IvyIcons.ActivitiesGroup} size='large' />
          </Flex>
        </Flex>
      </Quickbar>
    </>
  );
};
