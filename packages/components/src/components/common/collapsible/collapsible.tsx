import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import {
  root,
  header,
  trigger,
  controls as controlsClass,
  state as stateClass,
  content,
  contentData,
  triggerChevron
} from './collapsible.css';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import { ButtonGroup, type ButtonGroupProps } from '@/components/common/button/button';

/**
 * Collapsible, based on {@link https://www.radix-ui.com/docs/primitives/components/collapsible | Radix UI Collapsible}
 */
const Collapsible = ({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) => (
  <CollapsiblePrimitive.Root className={cn(root, className, 'ui-collapsible')} {...props} />
);
Collapsible.displayName = 'CollapsibleRoot';

export type CollapsibleControlProps = { className: string };

type CollapsibleTriggerProps = {
  state?: React.ReactNode;
  control?: (props: CollapsibleControlProps) => React.ReactNode;
};

const CollapsibleTrigger = ({
  state,
  control,
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & CollapsibleTriggerProps) => (
  <div className={cn(header)}>
    <CollapsiblePrimitive.CollapsibleTrigger className={cn(trigger, className, 'ui-collapsible-trigger')} {...props}>
      <Flex alignItems='center' gap={2}>
        {children}
        {state}
      </Flex>
    </CollapsiblePrimitive.CollapsibleTrigger>
    {control && control({ className: controlsClass })}
    <CollapsiblePrimitive.CollapsibleTrigger asChild className={triggerChevron}>
      <IvyIcon icon={IvyIcons.Chevron} />
    </CollapsiblePrimitive.CollapsibleTrigger>
  </div>
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleState = ({ className, ...props }: React.ComponentProps<typeof StateDot>) => (
  <StateDot className={cn(stateClass, className)} {...props} />
);
CollapsibleState.displayName = 'CollapsibleState';

type CollapsibleContentProps = React.ComponentProps<typeof CollapsiblePrimitive.Content>;

const CollapsibleContent = ({ className, children, style, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Content>) => (
  <CollapsiblePrimitive.Content className={cn(content, className, 'ui-collapsible-content')} role='region' {...props}>
    <div className={contentData} style={style}>
      {children}
    </div>
  </CollapsiblePrimitive.Content>
);
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export type BasicCollapsibleProps = CollapsibleContentProps &
  Partial<Pick<ButtonGroupProps, 'controls'>> & {
    label: string;
    open?: boolean;
    defaultOpen?: boolean;
    state?: StateDotProps;
  };

const BasicCollapsible = ({ label, open, defaultOpen, state, controls, ...props }: BasicCollapsibleProps) => {
  const [openState, setOpenState] = React.useState(open || (state?.messages?.length ?? 0) > 0 || defaultOpen);
  React.useEffect(() => {
    if (open !== undefined) {
      setOpenState(open);
    }
  }, [open]);
  return (
    <Collapsible open={openState} onOpenChange={setOpenState}>
      <CollapsibleTrigger
        state={<CollapsibleState {...state} />}
        control={props => controls && <ButtonGroup controls={controls} {...props} />}
      >
        {label}
      </CollapsibleTrigger>
      <CollapsibleContent {...props} />
    </Collapsible>
  );
};
BasicCollapsible.displayName = 'BasicCollapsible';

export { Collapsible, CollapsibleTrigger, CollapsibleState, CollapsibleContent, BasicCollapsible };
