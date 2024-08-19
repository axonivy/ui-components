import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { IvyIcons } from '@axonivy/ui-icons';
import { cn } from '@/utils/class-name';
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
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot } from '@/components/common/state/state';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => <AccordionPrimitive.Root ref={ref} className={cn(root, className, 'ui-accordion')} {...props} />);
Accordion.displayName = 'AccordionRoot';

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn(item, className, 'ui-accordion-item')} {...props} />);
AccordionItem.displayName = 'AccordionItem';

export type AccordionControlProps = { className: string };

type AccordionTriggerProps = {
  state?: React.ReactNode;
  control?: (props: AccordionControlProps) => React.ReactNode;
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & AccordionTriggerProps
>(({ state, control, className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className={cn(header, 'ui-accordion-header')}>
    <AccordionPrimitive.Trigger ref={ref} className={cn(trigger, className, 'ui-accordion-trigger')} {...props}>
      <Flex alignItems='center' gap={2}>
        {children}
        {state}
      </Flex>
    </AccordionPrimitive.Trigger>
    {control && control({ className: controlsClass })}
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

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={cn(content, className, 'ui-accordion-content')} {...props}>
    <div className={contentData}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionState, AccordionContent };
