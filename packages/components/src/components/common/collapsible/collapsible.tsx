import { ButtonGroup, type ButtonGroupProps } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { type ComponentProps, type ReactNode, useState } from 'react';
import {
  content,
  contentData,
  controls as controlsClass,
  header,
  root,
  state as stateClass,
  trigger,
  triggerChevron
} from './collapsible.css';

/**
 * Collapsible, based on {@link https://www.radix-ui.com/docs/primitives/components/collapsible | Radix UI Collapsible}
 */
const Collapsible = ({ className, ...props }: ComponentProps<typeof CollapsiblePrimitive.Root>) => (
  <CollapsiblePrimitive.Root className={cn(root, className, 'ui-collapsible')} {...props} />
);
Collapsible.displayName = 'CollapsibleRoot';

export type CollapsibleControlProps = { className: string };

type CollapsibleTriggerProps = {
  state?: ReactNode;
  control?: (props: CollapsibleControlProps) => ReactNode;
};

const CollapsibleTrigger = ({
  state,
  control,
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & CollapsibleTriggerProps) => (
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

const CollapsibleState = ({ className, ...props }: ComponentProps<typeof StateDot>) => (
  <StateDot className={cn(stateClass, className)} {...props} />
);
CollapsibleState.displayName = 'CollapsibleState';

type CollapsibleContentProps = ComponentProps<typeof CollapsiblePrimitive.Content>;

const CollapsibleContent = ({ className, children, style, ...props }: ComponentProps<typeof CollapsiblePrimitive.Content>) => (
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
  const [openState, setOpenState] = useState(open || (state?.messages?.length ?? 0) > 0 || defaultOpen);
  if (open !== undefined && open !== openState) {
    setOpenState(open);
  }
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

export { BasicCollapsible, Collapsible, CollapsibleContent, CollapsibleState, CollapsibleTrigger };
