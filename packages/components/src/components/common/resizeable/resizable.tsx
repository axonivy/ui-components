import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ComponentProps } from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';
import { resizableHandle, resizableLine } from './resizable.css';

/**
 * ResizablePanelGroup, based on {@link https://github.com/bvaughn/react-resizable-panels | React Resizable Panels}
 */
const ResizableGroup = ({ className, ...props }: ComponentProps<typeof ResizablePrimitive.Group>) => (
  <ResizablePrimitive.Group className={cn(className, 'ui-resizable')} {...props} />
);

const ResizablePanel = ResizablePrimitive.Panel;

export type ResizableHandleProps = ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean;
};

const ResizableHandle = ({ withHandle, children, className, ...props }: ResizableHandleProps) => (
  <>
    <ResizablePrimitive.Separator className={cn(resizableLine, className, 'ui-resizable-handle')} {...props}>
      {withHandle && (
        <div className={resizableHandle}>
          <IvyIcon icon={IvyIcons.EditDots} />
        </div>
      )}
    </ResizablePrimitive.Separator>
    {children}
  </>
);

const useGroupRef = ResizablePrimitive.useGroupRef;
const usePanelRef = ResizablePrimitive.usePanelRef;
const useDefaultLayout = ResizablePrimitive.useDefaultLayout;

export { ResizableGroup, ResizableHandle, ResizablePanel, useDefaultLayout, useGroupRef, usePanelRef };
