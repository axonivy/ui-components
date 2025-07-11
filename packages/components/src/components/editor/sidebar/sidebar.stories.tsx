import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { PanelMessage } from '@/components/common/panelMessage/panelMessage';
import { Switch } from '@/components/common/switch/switch';
import { SidebarHeader } from '@/components/editor/sidebar/header/header';
import { outlineData } from '@/components/editor/sidebar/outline/data';
import { Outline } from '@/components/editor/sidebar/outline/outline';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta } from '@storybook/react-vite';
import * as React from 'react';

const meta: Meta = {
  title: 'Editor/Sidebar'
};

export default meta;

export const Default = () => {
  const [outline, setOutline] = React.useState(false);
  const [element, setElement] = React.useState<string>();
  return (
    <Flex direction='column' style={{ height: '100%' }}>
      <SidebarHeader icon={IvyIcons.Script} title='Script'>
        <Switch icon={{ icon: IvyIcons.List }} checked={outline} onCheckedChange={setOutline} />
        <Button icon={IvyIcons.Help} aria-label='Help' />
      </SidebarHeader>
      {outline ? (
        <Outline outline={outlineData} onClick={id => setElement(id)} onDoubleClick={() => setOutline(false)} />
      ) : (
        <PanelMessage mode='row' message={element ?? 'Selection from outline'} icon={IvyIcons.Settings} />
      )}
    </Flex>
  );
};
