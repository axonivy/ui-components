import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button, Fieldset, Flex, Input, Textarea } from '@/components';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
  component: Dialog,
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
          <Fieldset label='Name'>
            <Input />
          </Fieldset>
          <Fieldset label='Comment'>
            <Textarea />
          </Fieldset>
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
