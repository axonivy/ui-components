import type { EdgeData } from './graph';

export interface DataClass {
  id: string;
  name: string;
  fqName: { long: string; short: string };
  fields: Field[];
  relations?: EdgeData[];
}

export interface Field {
  name: string;
  type: string;
}

const namespace = 'com.example.dataclasses';

export const dataClasses: Array<DataClass> = [
  {
    id: 'user',
    name: 'User',
    fqName: { long: `${namespace}.User`, short: 'User' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'password', type: 'string' },
      { name: 'createdAt', type: 'date' },
      { name: 'address', type: 'address' }
    ],
    relations: [
      { id: 'order', label: '1:M' },
      { id: 'review', label: '1:M' },
      { id: 'address', label: '1:M' }
    ]
  },
  {
    id: 'user2',
    name: 'User2',
    fqName: { long: `${namespace}.User`, short: 'User' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'password', type: 'string' },
      { name: 'createdAt', type: 'date' },
      { name: 'address', type: 'address' }
    ],
    relations: [
      { id: 'order', label: '1:M' },
      { id: 'review', label: '1:M' },
      { id: 'address', label: '1:M' }
    ]
  },
  {
    id: 'order',
    name: 'Order',
    fqName: { long: `${namespace}.Order`, short: 'Order' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'user', type: 'user' },
      { name: 'status', type: 'string' },
      { name: 'amount', type: 'number' },
      { name: 'createdAt', type: 'date' },
      { name: 'shippingAddress', type: 'address' },
      { name: 'paymentStatus', type: 'string' }
    ],
    relations: [
      { id: 'product', label: 'M:M' },
      { id: 'payment', label: '1:1' },
      { id: 'shipment', label: '1:1' }
    ]
  },
  {
    id: 'product',
    name: 'Product',
    fqName: { long: `${namespace}.Product`, short: 'Product' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'price', type: 'number' },
      { name: 'quantity', type: 'number' },
      { name: 'supplier', type: 'supplier' },
      { name: 'category', type: 'category' },
      { name: 'createdAt', type: 'date' }
    ],
    relations: [{ id: 'category', label: 'M:1' }]
  },
  {
    id: 'category',
    name: 'Category',
    fqName: { long: `${namespace}.Category`, short: 'Category' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' }
    ]
  },
  {
    id: 'payment',
    name: 'Payment',
    fqName: { long: `${namespace}.Payment`, short: 'Payment' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'order', type: 'order' },
      { name: 'paymentMethod', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'amount', type: 'number' },
      { name: 'paymentDate', type: 'date' }
    ]
  },
  {
    id: 'shipmentverylonglonglonglonglonglongname',
    name: 'Shipmentverylonglonglonglonglonglongname',
    fqName: { long: `${namespace}.Shipment`, short: 'Shipment' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'order', type: 'order' },
      { name: 'shipmentDate', type: 'date' },
      { name: 'status', type: 'string' },
      { name: 'trackingNumber', type: 'string' }
    ]
  },
  {
    id: 'review',
    name: 'Review',
    fqName: { long: `${namespace}.Review`, short: 'Review' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'user', type: 'user' },
      { name: 'product', type: 'product' },
      { name: 'rating', type: 'number' },
      { name: 'comment', type: 'string' },
      { name: 'createdAt', type: 'date' }
    ],
    relations: [{ id: 'product', label: 'M:1' }]
  },
  {
    id: 'address',
    name: 'Address',
    fqName: { long: `${namespace}.Address`, short: 'Address' },
    fields: [
      { name: 'id', type: 'string' },
      { name: 'user', type: 'user' },
      { name: 'street', type: 'string' },
      { name: 'city', type: 'string' },
      { name: 'state', type: 'string' },
      { name: 'zipCode', type: 'string' },
      { name: 'country', type: 'string' }
    ]
  }
];
