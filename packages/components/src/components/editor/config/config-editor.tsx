import { Button } from '@/components/common/button/button';
import { Field } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Label } from '@/components/common/label/label';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@/components/common/popover/popover';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/common/resizeable/resizable';
import { Switch } from '@/components/common/switch/switch';
import {
  detailContainer,
  detailContent as detailContentClass,
  masterContent as masterContentClass,
  masterPanel,
  masterWrapper
} from '@/components/editor/config/config-editor.css';
import { SidebarHeader } from '@/components/editor/sidebar/header/header';
import { Toolbar, ToolbarTitle } from '@/components/editor/toolbar/toolbar';
import { ReadonlyProvider } from '@/context/useReadonly';
import { useTheme } from '@/context/useTheme';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState, type ReactElement } from 'react';

export type ConfigEditorProps = {
  masterTitle: string;
  masterContent: ReactElement;
  detailTitle: string;
  detailContent: ReactElement;
};

const ConfigEditor = ({ masterTitle, masterContent, detailTitle, detailContent }: ConfigEditorProps) => {
  const [sidebar, setSidebar] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <ResizablePanelGroup direction='horizontal' style={{ height: `100vh` }}>
      <ResizablePanel defaultSize={75} minSize={50} className={cn(masterPanel)} data-testid='master-panel'>
        <Flex className={cn(masterWrapper)} direction='column'>
          <Toolbar>
            <ToolbarTitle>{masterTitle}</ToolbarTitle>
            <Flex gap={1}>
              {theme !== 'system' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button icon={IvyIcons.Settings} size='large' aria-label='Settings' />
                  </PopoverTrigger>
                  <PopoverContent sideOffset={12}>
                    <ReadonlyProvider readonly={false}>
                      <Flex direction='column' gap={2}>
                        <Field direction='row' alignItems='center' justifyContent='space-between' gap={4}>
                          <Label>
                            <Flex alignItems='center' gap={1}>
                              <IvyIcon icon={IvyIcons.DarkMode} />
                              Theme
                            </Flex>
                          </Label>
                          <Switch
                            defaultChecked={theme === 'dark'}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            size='small'
                            aria-label='Theme'
                          />
                        </Field>
                      </Flex>
                      <PopoverArrow />
                    </ReadonlyProvider>
                  </PopoverContent>
                </Popover>
              )}
              <Button
                icon={IvyIcons.LayoutSidebarRightCollapse}
                size='large'
                onClick={() => setSidebar(!sidebar)}
                aria-label='Details toggle'
              />
            </Flex>
          </Toolbar>
          <Flex direction='column' gap={4} className={cn(masterContentClass)}>
            {masterContent}
          </Flex>
        </Flex>
      </ResizablePanel>
      {sidebar && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} minSize={10}>
            <Flex direction='column' className={cn(detailContainer)} data-testid='details-container'>
              <SidebarHeader icon={IvyIcons.PenEdit} title={detailTitle} data-testid='Detail title' />
              <Flex direction='column' gap={4} className={cn(detailContentClass)}>
                {detailContent}
              </Flex>
            </Flex>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};

export { ConfigEditor };
