import type { Meta } from '@storybook/react';
import { Toolbar, ToolbarContainer, ToolbarTitle } from './toolbar';
import { Button, Separator, Flex } from '@/components/common';
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
