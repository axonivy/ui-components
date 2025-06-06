import type { InscriptionTabProps } from '@/components/common/inscription-tabs/inscriptionTabs';
import { IvyIcons } from '@axonivy/ui-icons';

export const insciptionTabsData: InscriptionTabProps[] = [
  {
    id: 'General',
    name: 'General',
    state: { state: 'configured', messages: [] },
    reset: { dirty: false, action: () => {} },
    content: <div>General Content</div>,
    icon: IvyIcons.InfoCircle
  },
  {
    id: 'Header',
    name: 'Header',
    state: { state: undefined, messages: [] },
    reset: { dirty: false, action: () => {} },
    content: <div>Header Content</div>,
    icon: IvyIcons.EMail
  },
  {
    id: 'Error',
    name: 'Error',
    state: { state: undefined, messages: [] },
    reset: { dirty: false, action: () => {} },
    content: <div>Error Content</div>,
    icon: IvyIcons.Error
  },
  {
    id: 'Content',
    name: 'Content',
    state: { state: 'error', messages: [] },
    reset: { dirty: false, action: () => {} },
    content: <div>Content Content</div>,
    icon: IvyIcons.Note
  },
  {
    id: 'Attachments',
    name: 'Attachments',
    state: { state: 'warning', messages: [] },
    reset: { dirty: false, action: () => {} },
    content: <div>Attachments Content</div>,
    icon: IvyIcons.Attribute
  }
];
