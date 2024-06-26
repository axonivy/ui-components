import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger, AccordionState, type AccordionControlProps } from './accordion';
import { IvyIcons } from '@axonivy/ui-icons';
import { ButtonGroup } from '..';

const meta: Meta<typeof Accordion> = {
  title: 'Common/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', defaultValue: 'single', options: ['single', 'multiple'] }
  }
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: ({ type }) => (
    <Accordion type={type} collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          <span>Yes. It comes with default styles that matches the other components&apos; aesthetic.</span>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          <span>Yes. It&apos;s animated by default, but you can disable it if you prefer.</span>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const State: Story = {
  render: () => {
    return (
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>No state</AccordionTrigger>
          <AccordionContent>
            <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger state={<AccordionState state='configured' />}>Configured</AccordionTrigger>
          <AccordionContent>
            <span>Yes. It comes with default styles that matches the other components&apos; aesthetic.</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger state={<AccordionState messages={[{ message: 'warning', variant: 'warning' }]} />}>Warning</AccordionTrigger>
          <AccordionContent>
            <span>Yes. It&apos;s animated by default, but you can disable it if you prefer.</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger
            state={
              <AccordionState
                messages={[
                  { message: 'warning', variant: 'warning' },
                  { message: 'error', variant: 'error' }
                ]}
              />
            }
          >
            Error
          </AccordionTrigger>
          <AccordionContent>
            <span>Yes. It&apos;s animated by default, but you can disable it if you prefer.</span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
};

export const Controls: Story = {
  render: () => {
    const control = (props: AccordionControlProps) => (
      <ButtonGroup
        {...props}
        controls={[
          { icon: IvyIcons.Undo, onClick: () => alert('Reset'), title: 'Reset' },
          { icon: IvyIcons.Search, onClick: () => console.log('yey'), title: 'Search', toggle: true }
        ]}
      />
    );
    return (
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>No control</AccordionTrigger>
          <AccordionContent>
            <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger control={control}>With control</AccordionTrigger>
          <AccordionContent>
            <span>Yes. It comes with default styles that matches the other components&apos; aesthetic.</span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
};
