import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { IvyIcons } from '@axonivy/ui-icons';
import IvyIcon from '../icon/icon.js';
import { cn } from '../../utils/class-name.js';
import './accordion.css';
import { Button } from '../button/button.js';
import type { WithClassName } from '../../types/types.js';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & WithClassName
>(({ className, ...props }, ref) => <AccordionPrimitive.Root ref={ref} className={cn('accordion-root', className)} {...props} />);
Accordion.displayName = 'AccordionRoot';

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & WithClassName
>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn('accordion-item', className)} {...props} />);
AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerProps = {
  state?: 'configured' | 'warning' | 'error';
  control?: { label: string; icon: IvyIcons; action: () => void };
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & AccordionTriggerProps & WithClassName
>(({ state, control, className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className='accordion-header'>
    <AccordionPrimitive.Trigger ref={ref} className={cn('accordion-trigger', className)} {...props}>
      <IvyIcon icon={IvyIcons.Chevron} />
      <div className='accordion-trigger-content'>{children}</div>
      {state && <div className='accordion-state' data-state={state} />}
    </AccordionPrimitive.Trigger>
    {control && (
      <div className='accordion-controls'>
        <Button icon={control.icon} size='icon' onClick={control.action} aria-label={control.label} />
      </div>
    )}
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & WithClassName
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className='accordion-content' {...props}>
    <div className={cn('accordion-content-data', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
