import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { IvyIcon } from '../icon/icon';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components';

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  argTypes: {
    orientation: { control: 'select', defaultValue: 'horizontal', options: ['horizontal', 'vertical'] }
  }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: props => (
    <Tabs defaultValue='attribute' {...props}>
      <Flex direction={props.orientation === 'horizontal' ? 'column' : 'row'} gap={4}>
        <TabsList>
          <TabsTrigger value='attribute'>
            <IvyIcon icon={IvyIcons.Attribute} />
            Attribute
          </TabsTrigger>
          <TabsTrigger value='functions'>
            <IvyIcon icon={IvyIcons.Function} />
            Functions
          </TabsTrigger>
        </TabsList>
        <TabsContent value='attribute'>Attribute list</TabsContent>
        <TabsContent value='functions'>Function list</TabsContent>
      </Flex>
    </Tabs>
  )
};
