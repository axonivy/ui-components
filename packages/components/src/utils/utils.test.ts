import { generateId } from './utils';

test('generateId', () => {
  expect(generateId()).toEqual('0');
  expect(generateId()).toEqual('1');
  expect(generateId()).toEqual('2');
});
