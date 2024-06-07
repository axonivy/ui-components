import * as React from 'react';
import { anchor, quickbar } from './quickbar.css';
import { cn } from '@/utils/class-name';
import { Popover, PopoverAnchor, PopoverContent } from '@/components';

export type QuickbarProps = {
  anchorElement: Element | null;
  open: boolean;
  children: React.ReactNode;
};

const Quickbar = ({ anchorElement, children, ...props }: QuickbarProps) => {
  const [position, setPosition] = React.useState(anchorElement?.getBoundingClientRect());
  React.useEffect(() => {
    console.log(anchorElement?.getBoundingClientRect());
    setPosition(anchorElement?.getBoundingClientRect());
  }, [anchorElement]);
  return (
    <Popover {...props}>
      <PopoverAnchor asChild>
        <div
          className={anchor}
          style={position && { top: position.top + position.height, left: position.left, width: position.width }}
        ></div>
      </PopoverAnchor>
      <PopoverContent collisionPadding={10}>
        <div className={cn(quickbar)}>{children}</div>
      </PopoverContent>
    </Popover>
  );
};
Quickbar.displayName = 'Quickbar';

export { Quickbar };
