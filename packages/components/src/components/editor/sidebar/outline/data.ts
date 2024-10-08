import type { OutlineNode } from '@/components/editor/sidebar/outline/outline';
import { IvyIcons } from '@axonivy/ui-icons';

export const outlineData: Array<OutlineNode> = [
  {
    id: '1',
    title: 'Form Container',
    icon: IvyIcons.Note,
    children: [
      {
        id: '2',
        title: 'Title Container',
        info: 'More info',
        icon: IvyIcons.LaneSwimlanes,
        children: [
          {
            id: '3',
            title: 'Post',
            icon: IvyIcons.List,
            children: []
          }
        ]
      },
      {
        id: '4',
        title: 'Two Columns Container',
        icon: IvyIcons.LaneSwimlanes,
        children: [
          {
            id: '5',
            title: 'Input Field',
            icon: IvyIcons.Comment,
            children: [
              {
                id: '6',
                title: 'First Name',
                icon: IvyIcons.List,
                children: []
              }
            ]
          },
          {
            id: '7',
            title: 'Input Field',
            icon: IvyIcons.Comment,
            children: [
              {
                id: '8',
                title: 'Second Name',
                icon: IvyIcons.List,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '9',
        title: 'One Columns Container',
        icon: IvyIcons.LaneSwimlanes,
        children: [
          {
            id: '10',
            title: 'Input Field',
            icon: IvyIcons.Comment,
            children: [
              {
                id: '11',
                title: 'Email',
                icon: IvyIcons.List,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '12',
        title: 'Two Columns Container',
        icon: IvyIcons.LaneSwimlanes,
        children: [
          {
            id: '13',
            title: 'Input Field',
            icon: IvyIcons.Comment,
            children: [
              {
                id: '14',
                title: 'UserId',
                icon: IvyIcons.List,
                children: []
              }
            ]
          },
          {
            id: '15',
            title: 'Input Field',
            icon: IvyIcons.Comment,
            children: [
              {
                id: '16',
                title: 'Second Name',
                icon: IvyIcons.List,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '17',
        title: 'Buttons Container',
        icon: IvyIcons.LaneSwimlanes,
        children: [
          {
            id: '18',
            title: 'Cancel',
            icon: IvyIcons.List,
            children: []
          },
          {
            id: '19',
            title: 'Submit Form',
            icon: IvyIcons.List,
            children: []
          }
        ]
      }
    ]
  }
];
