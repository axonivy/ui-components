import type { Meta } from '@storybook/react';
import { ShortcutMenu, type Shortcut } from '@/components/editor/shortcut-menu/shortcutMenu';
import { Toolbar, ToolbarTitle } from '@/components/editor/toolbar/toolbar';
import { Flex } from '@/components/common/flex/flex';
import { Button } from '@/components/common/button/button';
import { IvyIcons } from '@axonivy/ui-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover/popover';

const meta: Meta<typeof ShortcutMenu> = {
  title: 'Editor/ShortcutMenu',
  component: ShortcutMenu
};

export default meta;

export const Default = () => (
  <Toolbar>
    <Flex>
      <Flex gap={1}>
        <ToolbarTitle>Shortcut Menu Example</ToolbarTitle>
      </Flex>
    </Flex>
    <Flex>
      <Popover>
        <PopoverTrigger asChild>
          <Button icon={IvyIcons.Settings} size='large' />
        </PopoverTrigger>
        <PopoverContent>
          <ShortcutMenu shortcuts={shortcuts} editor='CMS-Editor' withCloseButton={true} />
        </PopoverContent>
      </Popover>
    </Flex>
  </Toolbar>
);

const shortcuts: Shortcut[] = [
  { description: 'Focus on toolbar', shortcut: 'Ctrl + Alt + T', action: () => console.log('focus toolbar') },
  { description: 'Focus on main-part', shortcut: 'Ctrl + Alt + M', action: () => console.log('focus main') },
  { description: 'Focus on inscription', shortcut: 'Ctrl + Alt + I' },
  { description: 'Save Changes', shortcut: 'Ctrl +S', action: () => console.log('save') }
];
