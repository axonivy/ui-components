import type { Meta } from '@storybook/react';
import { BasicPalette, Palette, type PaletteConfig } from './palette';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Palette> = {
  title: 'Editor/Toolbar/Palette',
  component: Palette
};

export default meta;

const sections: PaletteConfig['sections'] = {
  'Workflow Activities': [
    { name: 'User Task', description: 'User Task', icon: IvyIcons.UserTaskOutline },
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

export const Default = () => <BasicPalette sections={sections} />;
