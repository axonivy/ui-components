import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { IvyIcons } from '@axonivy/ui-icons';
import { cn } from '@/utils/class-name';
import { Button, StateDot, Flex, IvyIcon, type Control } from '@/components/common';
import {
  root,
  header,
  trigger,
  content,
  contentData,
  controls as controlsClass,
  state as stateClass,
  item,
  triggerChevron
} from './accordion.css';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => <AccordionPrimitive.Root ref={ref} className={cn(root, className)} {...props} />);
Accordion.displayName = 'AccordionRoot';

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn(item, className)} {...props} />);
AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerProps = {
  state?: React.ReactNode;
  control?: React.ReactNode;
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & AccordionTriggerProps
>(({ state, control, className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className={cn(header)}>
    <AccordionPrimitive.Trigger ref={ref} className={cn(trigger, className)} {...props}>
      <Flex alignItems='center' gap={2}>
        {children}
        {state}
      </Flex>
    </AccordionPrimitive.Trigger>
    {control}
    <AccordionPrimitive.Trigger asChild className={triggerChevron}>
      <IvyIcon icon={IvyIcons.Chevron} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionState = React.forwardRef<React.ElementRef<typeof StateDot>, React.ComponentPropsWithoutRef<typeof StateDot>>(
  ({ className, ...props }, ref) => <StateDot ref={ref} className={cn(stateClass, className)} {...props} />
);
AccordionState.displayName = 'AccordionState';

type AccordionControlProps = { controls: Array<Control> };

const AccordionControl = React.forwardRef<
  React.ElementRef<typeof Flex>,
  React.ComponentPropsWithoutRef<typeof Flex> & AccordionControlProps
>(({ controls, className, ...props }, ref) => (
  <Flex gap={1} className={cn(controlsClass, className)} ref={ref} {...props}>
    {controls.map(control => (
      <Button key={control.title} {...control} />
    ))}
  </Flex>
));
AccordionControl.displayName = 'AccordionControl';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={cn(content, className)} {...props}>
    <div className={contentData}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionState, AccordionControl, AccordionContent };
