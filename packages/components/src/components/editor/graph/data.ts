import type { GraphEdge, GraphNodeData } from '@/components/editor/graph/graph';

export const dataClasses: Array<GraphNodeData> = [
  { id: 'user', label: 'User' },
  { id: 'order', label: 'Order' },
  { id: 'product', label: 'Product' },
  { id: 'category', label: 'Category' },
  { id: 'payment', label: 'Payment' },
  { id: 'shipment', label: 'Shipment' },
  { id: 'review', label: 'Review' },
  { id: 'address', label: 'Address' },
  { id: 'supplier', label: 'Supplier' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'cart', label: 'Cart' },
  { id: 'discount', label: 'Discount' }
];

export const dataClassRelations: Array<GraphEdge> = [
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
