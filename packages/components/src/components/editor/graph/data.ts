import type { EdgeData } from '@/components/editor/graph/graph';
export interface DataClass {
  id: string;
  name: string;
  fields: Field[];
}

export interface Field {
  name: string;
  type: string;
}

export const dataClasses: Array<DataClass> = [
  {
    id: 'user',
    name: 'User',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'password', type: 'string' },
      { name: 'createdAt', type: 'date' },
      { name: 'address', type: 'address' } // Reference to Address dataclass
    ]
  },
  {
    id: 'order',
    name: 'Order',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'user', type: 'user' }, // Reference to User dataclass
      { name: 'status', type: 'string' },
      { name: 'totalAmount', type: 'number' },
      { name: 'createdAt', type: 'date' },
      { name: 'shippingAddress', type: 'address' }, // Reference to Address dataclass
      { name: 'paymentStatus', type: 'string' }
    ]
  },
  {
    id: 'product',
    name: 'Product',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'price', type: 'number' },
      { name: 'quantity', type: 'number' },
      { name: 'supplier', type: 'supplier' }, // Reference to Supplier dataclass
      { name: 'category', type: 'category' }, // Reference to Category dataclass
      { name: 'createdAt', type: 'date' }
    ]
  },
  {
    id: 'category',
    name: 'Category',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' }
    ]
  },
  {
    id: 'payment',
    name: 'Payment',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'order', type: 'order' }, // Reference to Order dataclass
      { name: 'paymentMethod', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'amount', type: 'number' },
      { name: 'paymentDate', type: 'date' }
    ]
  },
  {
    id: 'shipment',
    name: 'Shipment',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'order', type: 'order' }, // Reference to Order dataclass
      { name: 'shipmentDate', type: 'date' },
      { name: 'status', type: 'string' },
      { name: 'trackingNumber', type: 'string' }
    ]
  },
  {
    id: 'review',
    name: 'Review',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'user', type: 'user' }, // Reference to User dataclass
      { name: 'product', type: 'product' }, // Reference to Product dataclass
      { name: 'rating', type: 'number' },
      { name: 'comment', type: 'string' },
      { name: 'createdAt', type: 'date' }
    ]
  },
  {
    id: 'address',
    name: 'Address',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'user', type: 'user' }, // Reference to User dataclass
      { name: 'street', type: 'string' },
      { name: 'city', type: 'string' },
      { name: 'state', type: 'string' },
      { name: 'zipCode', type: 'string' },
      { name: 'country', type: 'string' }
    ]
  },
  {
    id: 'supplier',
    name: 'Supplier',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'contactInfo', type: 'string' },
      { name: 'address', type: 'string' }
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'product', type: 'product' }, // Reference to Product dataclass
      { name: 'quantity', type: 'number' },
      { name: 'lastUpdated', type: 'date' }
    ]
  },
  {
    id: 'cart',
    name: 'Cart',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'user', type: 'user' }, // Reference to User dataclass
      { name: 'totalAmount', type: 'number' },
      { name: 'createdAt', type: 'date' }
    ]
  },
  {
    id: 'discount',
    name: 'Discount',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'product', type: 'product' }, // Reference to Product dataclass
      { name: 'order', type: 'order' }, // Reference to Order dataclass
      { name: 'discountAmount', type: 'number' },
      { name: 'startDate', type: 'date' },
      { name: 'endDate', type: 'date' }
    ]
  }
];

export const dataClassRelations: Array<EdgeData> = [
  { source: 'user', target: 'order', label: '1:M' },
  { source: 'order', target: 'product', label: 'M:M' },
  { source: 'product', target: 'category', label: 'M:1' },
  { source: 'order', target: 'payment', label: '1:1' },
  { source: 'order', target: 'shipment', label: '1:1' },
  { source: 'user', target: 'review', label: '1:M' },
  { source: 'review', target: 'product', label: 'M:1' },
  { source: 'user', target: 'address', label: '1:M' },
  { source: 'supplier', target: 'product', label: '1:M' },
  { source: 'supplier', target: 'inventory', label: '1:M' },
  { source: 'cart', target: 'product', label: 'M:M' },
  { source: 'cart', target: 'user', label: '1:1' },
  { source: 'discount', target: 'product', label: 'M:M' },
  { source: 'discount', target: 'order', label: 'M:1' }
];
