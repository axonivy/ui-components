import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as ResizablePrimitive from 'react-resizable-panels';

/**
 * ResizablePanelGroup, based on {@link https://github.com/bvaughn/react-resizable-panels | React Resizable Panels}
 */
const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup className={cn('ui-resizable', className)} {...props} />
);

const ResizablePanel = ResizablePrimitive.Panel;

export type ResizableHandleProps = React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
};

const ResizableHandle = ({ withHandle, children, className, ...props }: ResizableHandleProps) => (
  <>
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        'ui-resizable-lane relative flex w-px items-center justify-center bg-n200 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[resize-handle-active]:bg-p300 data-[resize-handle-state=hover]:bg-p300',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className='ui-resizable-handle flex h-4 w-3 items-center justify-center rounded-xs bg-n200'>
          <IvyIcon icon={IvyIcons.EditDots} />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
    {children}
  </>
);

export type ImperativePanelHandle = ResizablePrimitive.ImperativePanelHandle;

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
