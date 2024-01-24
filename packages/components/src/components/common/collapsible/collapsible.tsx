import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '@/utils/class-name';
import { Button, StateDot, Flex } from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';
import { root, header, trigger, controls as controlsClass, state as stateClass, content } from './collapsible.css';

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => <CollapsiblePrimitive.Root ref={ref} className={cn(root, 'collapsible-root', className)} {...props} />);
Collapsible.displayName = 'CollapsibleRoot';

type CollapsibleTriggerProps = {
  state?: React.ReactNode;
  control?: React.ReactNode;
};

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & CollapsibleTriggerProps
>(({ state, control, className, children, ...props }, ref) => (
  <div className={cn(header)}>
    <CollapsiblePrimitive.CollapsibleTrigger ref={ref} className={cn(trigger, className)} asChild {...props}>
      <Button icon={IvyIcons.Toggle} size='small'>
        {children}
      </Button>
    </CollapsiblePrimitive.CollapsibleTrigger>
    {state}
    {control}
  </div>
));
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleState = React.forwardRef<React.ElementRef<typeof StateDot>, React.ComponentPropsWithoutRef<typeof StateDot>>(
  ({ className, ...props }, ref) => <StateDot ref={ref} className={cn(stateClass, className)} {...props} />
);
CollapsibleState.displayName = 'CollapsibleState';

type CollapsibleControlProps = {
  controls: { title: string; icon: IvyIcons; onClick: () => void }[];
};

const CollapsibleControl = React.forwardRef<
  React.ElementRef<typeof Flex>,
  React.ComponentPropsWithoutRef<typeof Flex> & CollapsibleControlProps
>(({ controls, className, ...props }, ref) => (
  <Flex gap={1} className={cn(controlsClass, className)} ref={ref} {...props}>
    {controls.map(control => (
      <Button key={control.title} {...control} />
    ))}
  </Flex>
));
CollapsibleControl.displayName = 'CollapsibleControl';

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content ref={ref} className={cn(content, className)} {...props}>
    {children}
  </CollapsiblePrimitive.Content>
));
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleControl, CollapsibleState, CollapsibleContent };
