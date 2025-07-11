import { arraymove, arrayMoveMultiple, groupBy, indexOf } from './array';

test('indexOf', () => {
  const array = [{ a: 1 }, { a: 2 }];
  expect(indexOf(array, obj => obj.a === 1)).toEqual(0);
  expect(indexOf(array, obj => obj.a === 2)).toEqual(1);
  expect(indexOf(array, obj => obj.a === 3)).toEqual(-1);
});

test('arraymove', () => {
  const array = [{ a: 1 }, { a: 2 }];
  expect(array).toEqual(array);
  arraymove(array, 0, 1);
  expect(array).toEqual([{ a: 2 }, { a: 1 }]);
});

test('arrayMoveMultiple', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(array).toEqual(array);
  arrayMoveMultiple(array, [2, 3], 5);
  expect(array).toEqual([0, 1, 4, 5, 2, 3, 6, 7, 8, 9]);

  arrayMoveMultiple(array, [2, 3], 0);
  expect(array).toEqual([4, 5, 0, 1, 2, 3, 6, 7, 8, 9]);
});

const car1 = { type: 'suv', vendor: 'bmw' } as const;
const car2 = { type: 'suv', vendor: 'volvo', price: 1000 } as const;
const car3 = { type: 'combi', vendor: 'bmw', price: 500 } as const;

test('groupBy', () => {
  expect(groupBy([], () => 'bla')).to.deep.equals({});
  expect(groupBy([car1, car2, car3], item => item.type)).to.deep.equals({ combi: [car3], suv: [car1, car2] });
  expect(groupBy([car1, car2, car3], item => item.vendor)).to.deep.equals({ bmw: [car1, car3], volvo: [car2] });

  const groupKey = (item: { vendor: string }) => item.vendor.substring(0, 1);
  expect(groupBy([car1, car2, car3], groupKey)).to.deep.equals({ b: [car1, car3], v: [car2] });
});
