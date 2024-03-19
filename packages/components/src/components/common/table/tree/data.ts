export interface Variable {
  name: string;
  value: string;
  children: Array<Variable>;
}

export const treeData: Array<Variable> = [
  {
    name: 'param.procurementRequest',
    value: '',
    children: [
      { name: 'accepted', children: [], value: 'true' },
      { name: 'amount', children: [], value: '1234' },
      { name: 'requester', value: '', children: [{ name: 'user', value: 'Admin', children: [] }] }
    ]
  }
];
