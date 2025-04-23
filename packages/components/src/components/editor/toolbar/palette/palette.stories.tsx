import type { Meta } from '@storybook/react';
import {
  BasicPalette,
  Palette,
  PaletteButton,
  PaletteButtonLabel,
  PaletteSection,
  type PaletteConfig,
  type PaletteItemConfig,
  type PaletteItemProps
} from './palette';
import { IvyIcons } from '@axonivy/ui-icons';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@/components/common/popover/popover';
import { Flex } from '@/components/common/flex/flex';
import { cn } from '@/utils/class-name';

const meta: Meta<typeof Palette> = {
  title: 'Editor/Toolbar/Palette',
  component: Palette
};

export default meta;

const sections: PaletteConfig['sections'] = {
  'Workflow Activities': [
    { name: 'User Task', description: 'User Task', icon: IvyIcons.UserTaskOutline, onClick: () => alert('User Task') },
    { name: 'User Dialog', description: 'User Dialog', icon: IvyIcons.UserDialogOutline },
    { name: 'Script', description: 'Script', icon: IvyIcons.ScriptFileOutline },
    { name: 'Call', description: 'Call', icon: IvyIcons.CallOutline },
    { name: 'Trigger', description: 'Trigger', icon: IvyIcons.TriggerOutline }
  ],
  'Interface Events': [
    { name: 'Database', description: 'Database', icon: IvyIcons.DatabaseOutline },
    { name: 'Web Service', description: 'Web Service', icon: IvyIcons.WebService }
  ],
  'BPMN Activities': [{ name: 'Generic', description: 'Generic', icon: IvyIcons.CallOutline }]
};

export const Default = () => <BasicPalette sections={sections} options={{ searchPlaceholder: 'Search and click on an element' }} />;

type CustomPaletteItemConfig = PaletteItemConfig & {
  svgIcon: React.ReactNode;
};

const customSections: PaletteConfig<CustomPaletteItemConfig>['sections'] = {
  Input: [
    {
      name: 'Input',
      description: 'Input',
      svgIcon: (
        <svg width='47' height='17' viewBox='0 0 47 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect x='0.571636' y='0.571636' width='45.8579' height='15.3706' rx='1.26324' stroke='#A3A3A3' strokeWidth='1.14327' />
          <path d='M4.4458 3.81055L4.4458 12.7024' stroke='#A3A3A3' strokeWidth='1.4679' strokeLinecap='round' />
        </svg>
      )
    },
    { name: 'Textarea', description: 'This is a custom textarea', svgIcon: '' },
    { name: 'DatePicker', description: 'DatePicker', svgIcon: '' },
    { name: 'Combobox', description: 'Combobox', svgIcon: '' },
    { name: 'DataTable', description: 'DataTable', svgIcon: '' }
  ],
  Selection: [
    { name: 'Checkbox', description: 'Checkbox', svgIcon: '' },
    { name: 'Radio', description: 'Radio', svgIcon: '' }
  ],
  Text: [{ name: 'Text', description: 'Text', svgIcon: '' }]
};

export const CustomPalette = () => (
  <Palette
    sections={customSections}
    options={{
      searchPlaceholder: 'Search for description and drag an element',
      searchFilter: (item, term) => item.description.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    }}
  >
    {(title, items) => (
      <PaletteSection key={title} title={title} items={items}>
        {item => <CustomPaletteItem key={item.name} {...item} />}
      </PaletteSection>
    )}
  </Palette>
);

const CustomPaletteItem = ({ name, description, svgIcon, classNames }: PaletteItemProps<CustomPaletteItemConfig>) => (
  <button className={cn(classNames.paletteItem, 'ui-palette-item')} title={description} style={{ cursor: 'grab' }} draggable={true}>
    <Flex direction='column' gap={1} alignItems='center'>
      <Flex className={cn(classNames.paletteItemIcon, 'ui-palette-item-icon')} justifyContent='center' alignItems='center'>
        {svgIcon}
      </Flex>
      <Flex justifyContent='center'>{name}</Flex>
    </Flex>
  </button>
);

export const PopoverPalette = () => (
  <Flex gap={3}>
    <Popover>
      <PaletteButtonLabel label='Default Palette'>
        <PopoverTrigger asChild>
          <PaletteButton label='Default Palette' icon={IvyIcons.ActivitiesGroup} />
        </PopoverTrigger>
      </PaletteButtonLabel>
      <PopoverContent sideOffset={7} collisionPadding={10}>
        <PopoverArrow />
        <Default />
      </PopoverContent>
    </Popover>
    <Popover>
      <PaletteButtonLabel label='Custom Palette'>
        <PopoverTrigger asChild>
          <PaletteButton label='Custom Palette' icon={IvyIcons.LaneSwimlanes} withoutChevron={true} />
        </PopoverTrigger>
      </PaletteButtonLabel>
      <PopoverContent sideOffset={7} collisionPadding={10}>
        <PopoverArrow />
        <CustomPalette />
      </PopoverContent>
    </Popover>
  </Flex>
);
