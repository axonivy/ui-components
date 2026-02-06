import { ButtonGroup, type ButtonGroupProps } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { type ComponentProps, type ReactNode, useState } from 'react';

/**
 * Collapsible, based on {@link https://www.radix-ui.com/docs/primitives/components/collapsible | Radix UI Collapsible}
 */
function Collapsible({ className, ...props }: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot='collapsible'
      className={cn('group rounded-sm border border-solid border-n100', className, 'ui-collapsible')}
      {...props}
    />
  );
}

export type CollapsibleControlProps = { className: string };

type CollapsibleTriggerProps = {
  state?: ReactNode;
  control?: (props: CollapsibleControlProps) => ReactNode;
};

function CollapsibleTrigger({
  state,
  control,
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & CollapsibleTriggerProps) {
  return (
    <div className={cn('flex items-center gap-2 overflow-hidden')}>
      <CollapsiblePrimitive.CollapsibleTrigger
        data-slot='collapsible-trigger'
        className={cn(
          'flex-1 cursor-pointer p-2 focus-visible:outline-2 data-[state=open]:font-bold data-[state=open]:text-p300',
          className,
          'ui-collapsible-trigger'
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
}

const CollapsibleState = ({ className, ...props }: ComponentProps<typeof StateDot>) => (
  <StateDot data-slot='collapsible-state' className={cn('shrink-0 group-has-data-[state=open]:hidden', className)} {...props} />
);
CollapsibleState.displayName = 'CollapsibleState';

type CollapsibleContentProps = ComponentProps<typeof CollapsiblePrimitive.Content>;

function CollapsibleContent({ className, children, style, ...props }: ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot='collapsible-content'
      className={cn(
        'overflow-hidden transition-all data-[state=closed]:motion-safe:animate-collapsible-up data-[state=open]:motion-safe:animate-collapsible-down',
        className,
        'ui-collapsible-content'
      )}
      role='region'
      {...props}
    >
      <div className='overflow-auto p-2 pt-0' style={style}>
        {children}
      </div>
    </CollapsiblePrimitive.Content>
  );
}

export type BasicCollapsibleProps = CollapsibleContentProps &
  Partial<Pick<ButtonGroupProps, 'controls'>> & {
    label: string;
    open?: boolean;
    defaultOpen?: boolean;
    state?: StateDotProps;
  };

const BasicCollapsible = ({ label, defaultOpen, state, controls, ...props }: BasicCollapsibleProps) => {
  const [openState, setOpenState] = useState(defaultOpen !== undefined ? defaultOpen : (state?.messages?.length ?? 0) > 0);
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
