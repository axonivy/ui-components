import { useSticky, type UseStickyProps } from '@/components/common/accordion/useSticky';
import { ButtonGroup, type ButtonGroupProps } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';
import {
  content,
  contentData,
  controls as controlsClass,
  header,
  item,
  root,
  state as stateClass,
  trigger,
  triggerChevron
} from './accordion.css';

/**
 * Accordion, based on {@link https://www.radix-ui.com/docs/primitives/components/accordion | Radix UI Accordion}
 */
const Accordion = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) => (
  <AccordionPrimitive.Root className={cn(root, className, 'ui-accordion')} {...props} />
);
Accordion.displayName = 'AccordionRoot';

const AccordionItem = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item className={cn(item, className, 'ui-accordion-item')} {...props} />
);
AccordionItem.displayName = 'AccordionItem';

export type AccordionControlProps = { className: string };

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  state?: React.ReactNode;
  control?: (props: AccordionControlProps) => React.ReactNode;
};

const AccordionTrigger = ({ state, control, className, children, ...props }: AccordionTriggerProps) => (
  <AccordionPrimitive.Header className={cn(header, 'ui-accordion-header')}>
    <AccordionPrimitive.Trigger className={cn(trigger, className, 'ui-accordion-trigger')} {...props}>
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
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionState = ({ className, ...props }: React.ComponentProps<typeof StateDot>) => (
  <StateDot className={cn(stateClass, className)} {...props} />
);
AccordionState.displayName = 'AccordionState';

type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content>;

const AccordionContent = ({ className, children, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Content className={cn(content, className, 'ui-accordion-content')} {...props}>
    <div className={contentData}>{children}</div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export type BasicAccordionItemProps = AccordionContentProps &
  Partial<Pick<ButtonGroupProps, 'controls'>> & {
    label: string;
    state?: StateDotProps;
    stickyOptions?: UseStickyProps;
  };

const BasicAccordionItem = ({ label, state, controls, stickyOptions, ...props }: BasicAccordionItemProps) => {
  const { ref, isSticky } = useSticky(stickyOptions);
  return (
    <AccordionItem value={label} data-sticky={isSticky ? 'true' : undefined}>
      <AccordionTrigger
        ref={ref}
        control={props => controls && <ButtonGroup controls={controls} {...props} />}
        state={<AccordionState {...state} />}
      >
        {label}
      </AccordionTrigger>
      <AccordionContent {...props} />
    </AccordionItem>
  );
};
BasicAccordionItem.displayName = 'BasicAccordionItem';

export { Accordion, AccordionContent, AccordionItem, AccordionState, AccordionTrigger, BasicAccordionItem };
