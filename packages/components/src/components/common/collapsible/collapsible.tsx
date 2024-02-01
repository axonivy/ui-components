import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '@/utils/class-name';
import { Button, StateDot, Flex, IvyIcon, type Control } from '@/components/common';
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
    <CollapsiblePrimitive.CollapsibleTrigger ref={ref} className={cn(trigger, className)} {...props}>
      <Flex alignItems='center' gap={2}>
        {children}
        {state}
      </Flex>
    </CollapsiblePrimitive.CollapsibleTrigger>
    {control}
    <CollapsiblePrimitive.CollapsibleTrigger asChild className={triggerChevron}>
      <IvyIcon icon={IvyIcons.Chevron} />
    </CollapsiblePrimitive.CollapsibleTrigger>
  </div>
));
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleState = React.forwardRef<React.ElementRef<typeof StateDot>, React.ComponentPropsWithoutRef<typeof StateDot>>(
  ({ className, ...props }, ref) => <StateDot ref={ref} className={cn(stateClass, className)} {...props} />
);
CollapsibleState.displayName = 'CollapsibleState';

type CollapsibleControlProps = { controls: Array<Control> };

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
    <div className={contentData}>{children}</div>
  </CollapsiblePrimitive.Content>
));
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleControl, CollapsibleState, CollapsibleContent };
