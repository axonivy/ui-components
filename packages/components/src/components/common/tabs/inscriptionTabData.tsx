import type { InscriptionTabProps } from '@/components/common/tabs/tabs';
import { IvyIcons } from '@axonivy/ui-icons';

export const insciptionTabsData: InscriptionTabProps[] = [
  {
    id: 'General',
    name: 'General',
    state: { state: 'configured', messages: [] },
    content: <div>General Content</div>,
    icon: IvyIcons.InfoCircle
  },
  {
    id: 'Header',
    name: 'Header',
    content: <div>Header Content</div>,
    icon: IvyIcons.EMail
  },
  {
    id: 'Error',
    name: 'Error',
    content: <div>Error Content</div>,
    icon: IvyIcons.Error
  },
  {
    id: 'Content',
    name: 'Content',
    state: { state: 'error', messages: [{ message: 'This is a error', variant: 'error' }] },
    content: <div>Content Content</div>,
    icon: IvyIcons.Note
  },
  {
    id: 'Attachments',
    name: 'Attachments',
    state: { state: 'warning', messages: [{ message: 'This is a warning', variant: 'warning' }] },
    content: <div>Attachments Content</div>,
    icon: IvyIcons.Attribute
  }
];
