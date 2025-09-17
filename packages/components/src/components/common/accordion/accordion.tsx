import { useSticky, type UseStickyProps } from '@/components/common/accordion/useSticky';
import { ButtonGroup, type ButtonGroupProps } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';

/**
 * Accordion, based on {@link https://www.radix-ui.com/docs/primitives/components/accordion | Radix UI Accordion}
 */
const Accordion = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) => (
  <AccordionPrimitive.Root className={cn('flex flex-col', className, 'ui-accordion')} {...props} />
);
Accordion.displayName = 'AccordionRoot';

const AccordionItem = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    className={cn('group border-1 border-transparent border-b-border-basic data-[state=open]:border-n400', className, 'ui-accordion-item')}
    {...props}
  />
);
AccordionItem.displayName = 'AccordionItem';

export type AccordionControlProps = { className: string };

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  state?: React.ReactNode;
  control?: (props: AccordionControlProps) => React.ReactNode;
  headerClassName?: string;
};

const AccordionTrigger = ({ state, control, headerClassName, className, children, ...props }: AccordionTriggerProps) => (
  <AccordionPrimitive.Header
    className={cn(
      'm-0 flex items-center gap-1 bg-background select-none data-[state=open]:border-b-0',
      headerClassName,
      'ui-accordion-header'
    )}
  >
    <AccordionPrimitive.Trigger
      className={cn(
        'flex h-4 flex-1 cursor-pointer items-center gap-1 p-3 text-sm font-normal focus-visible:outline-2 data-[state=open]:font-semibold data-[state=open]:text-p300',
        className,
        'ui-accordion-trigger'
      )}
      {...props}
    >
      <Flex alignItems='center' gap={2}>
        {children}
        {state}
      </Flex>
    </AccordionPrimitive.Trigger>
    {control && control({ className: 'group-has-data-[state=closed]:hidden' })}
    <AccordionPrimitive.Trigger asChild>
      <IvyIcon icon={IvyIcons.Chevron} className='cursor-pointer p-3 text-base! data-[state=open]:rotate-90' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionState = ({ className, ...props }: React.ComponentProps<typeof StateDot>) => (
  <StateDot className={cn('group-has-data-[state=open]:hidden', className)} {...props} />
);
AccordionState.displayName = 'AccordionState';

type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content>;

const AccordionContent = ({ className, children, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={cn(
      'overflow-hidden transition-all data-[state=closed]:motion-safe:animate-accordion-up data-[state=open]:motion-safe:animate-accordion-down',
      className,
      'ui-accordion-content'
    )}
    {...props}
  >
    <div className='px-2 py-3'>{children}</div>
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
        headerClassName={cn(isSticky && 'sticky -top-[10px] z-2 shadow')}
      >
        {label}
      </AccordionTrigger>
      <AccordionContent {...props} />
    </AccordionItem>
  );
};
BasicAccordionItem.displayName = 'BasicAccordionItem';

export { Accordion, AccordionContent, AccordionItem, AccordionState, AccordionTrigger, BasicAccordionItem };
