import type { Meta, StoryObj } from '@storybook/react';
import { BrowsersView, useBrowser } from './browser';
import { attrData, cmsData, funcData, roleData } from './data';
import { IvyIcons } from '@axonivy/ui-icons';
import { CmsInfoProvider, FunctionInfoProvider } from './browser-info-provider';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, InputGroup } from '@/components/common';
import { useState } from 'react';

const meta: Meta<typeof BrowsersView> = {
  title: 'Editor/BrowsersView',
  component: BrowsersView
};

export default meta;

type Story = StoryObj<typeof BrowsersView>;

const DefaultBrowser = ({ applyFn }: { applyFn?: (value?: string) => void }) => {
  const roles = useBrowser(roleData);
  const attrs = useBrowser(attrData);
  const funcs = useBrowser(funcData);
  const cms = useBrowser(cmsData);
  return (
    <BrowsersView
      browsers={[
        { name: 'Roles', icon: IvyIcons.Users, browser: roles },
        { name: 'Attribute', icon: IvyIcons.Attribute, browser: attrs },
        {
          name: 'Functions',
          icon: IvyIcons.Function,
          browser: funcs,
          infoProvider: row => <FunctionInfoProvider row={row} />,
          applyModifier: value => ({ cursor: `function: ${value}` })
        },
        {
          name: 'CMS',
          icon: IvyIcons.Cms,
          browser: cms,
          infoProvider: row => <CmsInfoProvider row={row} />,
          applyModifier: value => ({ cursor: `<%= ivy.co('${value}') %>` })
        }
      ]}
      apply={(value, type) => {
        console.log('apply', value, type);
        if (applyFn) applyFn(value?.cursor);
        else if (value) alert(`Browser '${type}' apply: ${value.cursor}`);
      }}
    />
  );
};

export const Default: Story = {
  render: () => <DefaultBrowser />
};

export const DialogBrowser: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <InputGroup>
          <Input value={input} onChange={e => setInput(e.target.value)} />
          <DialogTrigger asChild>
            <Button icon={IvyIcons.ListSearch} aria-label='Browser' />
          </DialogTrigger>
        </InputGroup>
        <DialogContent style={{ height: '80vh' }}>
          <DefaultBrowser
            applyFn={value => {
              if (value) setInput(value);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
};

export const DialogBrowserWithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <InputGroup>
          <Input value={input} onChange={e => setInput(e.target.value)} />
          <DialogTrigger asChild>
            <Button icon={IvyIcons.ListSearch} aria-label='Browser' />
          </DialogTrigger>
        </InputGroup>
        <DialogContent style={{ height: '80vh', gridTemplateRows: 'auto 1fr' }}>
          <DialogHeader>
            <DialogTitle>Choose a browser...</DialogTitle>
          </DialogHeader>
          <DefaultBrowser
            applyFn={value => {
              if (value) setInput(value);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
};
