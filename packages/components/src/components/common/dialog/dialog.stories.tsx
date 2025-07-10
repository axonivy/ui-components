import { Button } from '@/components/common/button/button';
import { Combobox } from '@/components/common/combobox/combobox';
import { BasicField } from '@/components/common/field/field';
import { Input } from '@/components/common/input/input';
import { BasicSelect } from '@/components/common/select/select';
import { Textarea } from '@/components/common/textarea/textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BasicDialog, BasicDialogContent, Dialog, DialogTrigger } from './dialog';
import { Flex } from '@/components/common/flex/flex';

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

const ButtonClose = (
  <Button variant='outline' size='large'>
    Cancel
  </Button>
);
const ButtonCustom = (
  <Button variant='primary' size='large'>
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
  render: props => {
    return (
      <BasicDialog
        contentProps={{
          title,
          description,
          buttonClose: ButtonClose,
          buttonCustom: ButtonCustom,
          style: { maxHeight: '80vh' }
        }}
        dialogTrigger={
          <DialogTrigger asChild>
            <Button variant={'outline'}>Open Dialog</Button>
          </DialogTrigger>
        }
        {...props}
      >
        <Flex direction='column' gap={2} style={{ overflow: 'auto' }}>
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
      </BasicDialog>
    );
  }
};

export const WithBasicDialogContent: Story = {
  render: props => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>Open Dialog</Button>
        </DialogTrigger>
        <BasicDialogContent
          title={title}
          description={description}
          buttonClose={ButtonClose}
          buttonCustom={ButtonCustom}
          {...props}
          style={{ maxHeight: '80vh' }}
        >
          <Flex direction='column' gap={2} style={{ overflow: 'auto' }}>
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
        </BasicDialogContent>
      </Dialog>
    );
  }
};
