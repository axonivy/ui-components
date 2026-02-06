import { useSticky, type UseStickyProps } from '@/components/common/accordion/useSticky';
import { ButtonGroup, type ButtonGroupProps } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot, type StateDotProps } from '@/components/common/state/state';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { ComponentProps, ReactNode } from 'react';

/**
 * Accordion, based on {@link https://www.radix-ui.com/docs/primitives/components/accordion | Radix UI Accordion}
 */
function Accordion({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' className={cn('flex flex-col', className, 'ui-accordion')} {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn('group border border-transparent border-b-border-basic data-[state=open]:border-n400', className, 'ui-accordion-item')}
      {...props}
    />
  );
}

export type AccordionControlProps = { className: string };

type AccordionTriggerProps = ComponentProps<typeof AccordionPrimitive.Trigger> & {
  state?: ReactNode;
  control?: (props: AccordionControlProps) => ReactNode;
  headerClassName?: string;
};

function AccordionTrigger({ state, control, headerClassName, className, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header
      className={cn(
        'ui-accordion-header m-0 flex items-center gap-1 bg-background select-none data-[state=open]:border-b-0',
        headerClassName,
        'ui-accordion-header'
      )}
    >
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(
          'ui-accordion-trigger flex h-full flex-1 cursor-pointer items-center gap-1 px-3 py-2 text-sm font-normal focus-visible:outline-2 data-[state=open]:font-semibold data-[state=open]:text-p300',
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
        <IvyIcon
          data-slot='accordion-trigger-icon'
          icon={IvyIcons.Chevron}
          className='cursor-pointer px-3 text-base! data-[state=open]:rotate-90'
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionState({ className, ...props }: ComponentProps<typeof StateDot>) {
  return <StateDot data-slot='accordion-state' className={cn('group-has-data-[state=open]:hidden', className)} {...props} />;
}

type AccordionContentProps = ComponentProps<typeof AccordionPrimitive.Content>;

function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className={cn(
        'ui-accordion-content overflow-hidden transition-all data-[state=closed]:motion-safe:animate-accordion-up data-[state=open]:motion-safe:animate-accordion-down',
        className,
        'ui-accordion-content'
      )}
      {...props}
    >
      <div className='px-2 py-3'>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export type BasicAccordionItemProps = AccordionContentProps &
  Partial<Pick<ButtonGroupProps, 'controls'>> & {
    label: string;
    state?: StateDotProps;
    stickyOptions?: UseStickyProps;
  };

function BasicAccordionItem({ label, state, controls, stickyOptions, ...props }: BasicAccordionItemProps) {
  const { ref, isSticky } = useSticky(stickyOptions);
  return (
    <AccordionItem value={label} data-sticky={isSticky ? 'true' : undefined}>
      <AccordionTrigger
        ref={ref}
        control={props => controls && <ButtonGroup controls={controls} {...props} />}
        state={<AccordionState {...state} />}
        headerClassName={cn(isSticky && 'sticky -top-px z-2 shadow-sm')}
      >
        {label}
      </AccordionTrigger>
      <AccordionContent {...props} />
    </AccordionItem>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionState, AccordionTrigger, BasicAccordionItem };
