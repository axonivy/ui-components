import type { Meta } from '@storybook/react';
import { Toolbar, ToolbarContainer, ToolbarTitle } from './toolbar';
import {
  Button,
  Separator,
  Flex,
  PopoverTrigger,
  Popover,
  PopoverContent,
  IvyIcon,
  PopoverArrow,
  Switch,
  Field,
  Label
} from '@/components/common';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Toolbar> = {
  title: 'Master/Toolbar',
  component: Toolbar
};

export default meta;

export const Default = ({ sideBarCollapse }: { sideBarCollapse?: () => void }) => (
  <Toolbar>
    <Flex>
      <Flex gap={1}>
        <Button icon={IvyIcons.SelectionTool} size='large' toggle={true} />
        <Button icon={IvyIcons.MultiSelection} size='large' />
      </Flex>
      <ToolbarContainer width={650}>
        <Flex>
          <Separator orientation='vertical' style={{ height: '26px' }} />
          <Flex gap={1}>
            <Button icon={IvyIcons.Undo} size='large' />
            <Button icon={IvyIcons.Redo} size='large' />
          </Flex>
        </Flex>
      </ToolbarContainer>
    </Flex>
    <Flex>
      <Popover>
        <PopoverTrigger asChild>
          <Button icon={IvyIcons.Settings} size='large' />
        </PopoverTrigger>
        <PopoverContent sideOffset={12}>
          <Flex direction='column' gap={2}>
            <Field direction='row' alignItems='center' justifyContent='space-between' gap={4}>
              <Label>
                <Flex alignItems='center' gap={1}>
                  <IvyIcon icon={IvyIcons.DarkMode} />
                  Theme
                </Flex>
              </Label>
              <Switch defaultChecked={false} size='small' />
            </Field>
            <Field direction='row' alignItems='center' justifyContent='space-between' gap={4}>
              <Label>
                <Flex alignItems='center' gap={1}>
                  <IvyIcon icon={IvyIcons.GridDots} />
                  Grid
                </Flex>
              </Label>
              <Switch defaultChecked={true} size='small' />
            </Field>
          </Flex>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
      <Button icon={IvyIcons.LayoutSidebarRightCollapse} size='large' onClick={sideBarCollapse} />
    </Flex>
  </Toolbar>
);

export const WithTitle = () => (
  <Toolbar>
    <Flex>
      <Flex gap={1}>
        <ToolbarTitle>Rest Clients Editor</ToolbarTitle>
      </Flex>
    </Flex>
    <Flex>
      <Button icon={IvyIcons.LayoutSidebarRightCollapse} size='large' />
    </Flex>
  </Toolbar>
);
