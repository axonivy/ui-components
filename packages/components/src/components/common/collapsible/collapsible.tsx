import { ButtonGroup, type ButtonGroupProps } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';

/**
 * Collapsible, based on {@link https://www.radix-ui.com/docs/primitives/components/collapsible | Radix UI Collapsible}
 */
const Collapsible = ({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) => (
  <CollapsiblePrimitive.Root className={cn('group ui-collapsible rounded-sm border-1 border-solid border-n100', className)} {...props} />
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
  <div className={cn('ui-collapsible-header flex items-center gap-2 overflow-hidden')}>
    <CollapsiblePrimitive.CollapsibleTrigger
      className={cn(
        'ui-collapsible-trigger flex-1 cursor-pointer p-2 focus-visible:outline-2 data-[state=open]:font-bold data-[state=open]:text-p300',
        className
      )}
      {...props}
    >
      <Flex alignItems='center' gap={2}>
        {children}
        {state}
      </Flex>
    </CollapsiblePrimitive.CollapsibleTrigger>
    {control && control({ className: 'group-has-data-[state=closed]:hidden' })}
    <CollapsiblePrimitive.CollapsibleTrigger asChild className={cn('cursor-pointer p-2 data-[state=open]:rotate-90')}>
      <IvyIcon icon={IvyIcons.Chevron} />
    </CollapsiblePrimitive.CollapsibleTrigger>
  </div>
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleState = ({ className, ...props }: React.ComponentProps<typeof StateDot>) => (
  <StateDot className={cn('shrink-0 group-has-data-[state=open]:hidden', className)} {...props} />
);
CollapsibleState.displayName = 'CollapsibleState';

type CollapsibleContentProps = React.ComponentProps<typeof CollapsiblePrimitive.Content>;

const CollapsibleContent = ({ className, children, style, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Content>) => (
  <CollapsiblePrimitive.Content
    className={cn(
      'ui-collapsible-content overflow-hidden transition-all data-[state=closed]:motion-safe:animate-collapsible-up data-[state=open]:motion-safe:animate-collapsible-down',
      className
    )}
    role='region'
    {...props}
  >
    <div className={'overflow-auto p-2 pt-0'} style={style}>
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

export { BasicCollapsible, Collapsible, CollapsibleContent, CollapsibleState, CollapsibleTrigger };
