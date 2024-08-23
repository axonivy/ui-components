import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { Input } from '@/components/common/input/input';
import { BasicSelect } from '@/components/common/select/select';
import { Textarea } from '@/components/common/textarea/textarea';
import { BasicField } from '@/components/common/field/field';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    modal: true
  }
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: props => (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant='outline'>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Flex direction='column' gap={2}>
          <BasicField label='Name'>
            <Input />
          </BasicField>
          <BasicField label='Comment'>
            <Textarea />
          </BasicField>
          <BasicField label='Comment'>
            <BasicSelect
              items={[
                { value: 'apple', label: 'Apple' },
                { value: 'banana', label: 'Banana' }
              ]}
            />
          </BasicField>
        </Flex>
        <DialogFooter>
          <Button variant='primary' size='large' type='submit'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
