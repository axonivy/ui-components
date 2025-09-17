import { Button } from '@/components/common/button/button';
import { Combobox } from '@/components/common/combobox/combobox';
import { BasicField } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { Input } from '@/components/common/input/input';
import { BasicSelect } from '@/components/common/select/select';
import { Textarea } from '@/components/common/textarea/textarea';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BasicDialogContent,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
  component: Dialog,
  args: {
    modal: true
  }
};

const title = 'This is our Title';

const description =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
  'em Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown ' +
  'printer took a galley of type and scrambled it to make a type specimen book.';

const CancelButton = (props: React.ComponentProps<typeof Button>) => (
  <Button variant='outline' size='large' {...props}>
    Cancel
  </Button>
);

const SubmitButton = (props: React.ComponentProps<typeof Button>) => (
  <Button variant='primary' size='large' icon={IvyIcons.Check} {...props}>
    Save
  </Button>
);

const fruits: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
];

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: props => (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <Flex direction='column' gap={4}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <Flex direction='column' gap={2}>
            <BasicField label='Name'>
              <Input />
            </BasicField>
            <BasicField label='Comment'>
              <Textarea />
            </BasicField>
            <BasicField label='Fruit'>
              <BasicSelect items={fruits} />
            </BasicField>
            <BasicField label='Car'>
              <Combobox value='' onChange={() => {}} options={[{ value: 'bmv' }, { value: 'volvo' }]} />
            </BasicField>
          </Flex>

          <DialogFooter>
            <DialogClose asChild>
              <CancelButton />
            </DialogClose>
            <DialogClose asChild>
              <SubmitButton />
            </DialogClose>
          </DialogFooter>
        </Flex>
      </DialogContent>
    </Dialog>
  )
};

export const WithBasicDialogContent: Story = {
  render: props => (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <BasicDialogContent
          title={title}
          description={description}
          cancel={<CancelButton />}
          submit={<SubmitButton />}
          style={{ overflow: 'auto' }}
        >
          <BasicField label='Name'>
            <Input />
          </BasicField>
          <BasicField label='Comment'>
            <Textarea />
          </BasicField>
          <BasicField label='Fruit'>
            <BasicSelect items={fruits} />
          </BasicField>
          <BasicField label='Car'>
            <Combobox value='' onChange={() => {}} options={[{ value: 'bmv' }, { value: 'volvo' }]} />
          </BasicField>
        </BasicDialogContent>
      </DialogContent>
    </Dialog>
  )
};
