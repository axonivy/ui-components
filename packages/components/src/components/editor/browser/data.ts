import { IvyIcons } from '@axonivy/ui-icons';
import type { BrowserNode } from './browser';

export const attrData: Array<BrowserNode> = [
  {
    value: 'param',
    info: '<>',
    icon: IvyIcons.Attribute,
    children: [
      {
        value: 'out',
        info: 'ProcurementRequest',
        icon: IvyIcons.Attribute,
        children: [
          { value: 'accepted', info: 'Boolean', icon: IvyIcons.Attribute, children: [] },
          {
            value: 'requester',
            info: 'User',
            icon: IvyIcons.Attribute,
            children: [
              { value: 'email', info: 'String', icon: IvyIcons.Attribute, children: [] },
              { value: 'fullName', info: 'String', icon: IvyIcons.Attribute, children: [] },
              { value: 'role', info: 'String', icon: IvyIcons.Attribute, children: [] }
            ]
          }
        ]
      }
    ]
  }
];

export const funcData: Array<BrowserNode> = [
  {
    value: 'ivy',
    info: 'Ivy',
    icon: IvyIcons.FolderOpen,
    children: [
      {
        value: 'cms',
        info: 'ContentManagement',
        icon: IvyIcons.FolderOpen,
        children: [
          { value: 'co(String)', info: 'String', icon: IvyIcons.Function, children: [] },
          {
            value: 'root()',
            info: 'ContentObject',
            icon: IvyIcons.Function,
            children: [{ value: 'child()', info: 'ContentObjectChildAccessor', icon: IvyIcons.Function, children: [] }]
          }
        ]
      },
      {
        value: 'var',
        info: 'IGlobalVariableContext',
        icon: IvyIcons.FolderOpen,
        children: [{ value: 'all()', info: 'List', icon: IvyIcons.Function, children: [] }]
      },
      {
        value: 'wf',
        info: 'IWorkflowContext',
        icon: IvyIcons.FolderOpen,
        children: [
          {
            value: 'currnt()',
            info: 'IWorkflowContext',
            icon: IvyIcons.Function,
            children: []
          }
        ]
      }
    ]
  }
];

export const roleData: Array<BrowserNode> = [
  {
    value: 'Everybody',
    info: 'Everybody',
    icon: IvyIcons.Users,
    children: [
      {
        value: 'Employee',
        info: 'All employees',
        icon: IvyIcons.Users,
        children: [{ value: 'Developer', info: 'ivy team', icon: IvyIcons.Users, children: [] }]
      },
      { value: 'Teamleader', info: 'All teamleaders', icon: IvyIcons.Users, children: [] },
      { value: 'Boss', info: 'All bosses', icon: IvyIcons.Users, children: [] }
    ]
  }
];

type CmsBrowserNode = Omit<BrowserNode, 'children'> & { children: Array<CmsBrowserNode>; cmsValues: Record<string, string> };

export const isCmsBrowserNode = (node: BrowserNode): node is CmsBrowserNode => 'cmsValues' in node;

export const cmsData: Array<CmsBrowserNode> = [
  {
    value: 'workflow-demos',
    info: 'FOLDER',
    icon: IvyIcons.FolderOpen,
    children: [
      {
        value: 'Emails',
        info: 'FOLDER',
        icon: IvyIcons.FolderOpen,
        children: [
          { value: 'accepted', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'akzeptiert', en: 'accepted' } },
          { value: 'deslined', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'abgelehnt', en: 'deslined' } }
        ],
        cmsValues: {}
      },
      {
        value: 'Images',
        info: 'FOLDER',
        icon: IvyIcons.FolderOpen,
        children: [{ value: 'Logo', info: 'FILE', icon: IvyIcons.File, children: [], cmsValues: {} }],
        cmsValues: {}
      }
    ],
    cmsValues: {}
  }
];
