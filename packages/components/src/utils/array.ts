import { isNotUndefined } from '@/utils/guards';

export function indexOf<TArr>(array: TArr[], find: (obj: TArr) => boolean): number {
  const cond = array.find(find);
  if (cond) {
    return array.indexOf(cond);
  }
  return -1;
}

export function arraymove<TArr>(arr: TArr[], fromIndex: number, toIndex: number) {
  const element = arr.at(fromIndex);
  if (!element) {
    return;
  }
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

export function arrayMoveMultiple<TArr>(arr: TArr[], fromIndexes: number[], toIndex: number) {
  const sortedFromIndexes = [...fromIndexes].sort((a, b) => a - b);
  const elementsToMove = sortedFromIndexes.map(index => arr[index]).filter(isNotUndefined);
  for (const startIndex of sortedFromIndexes.reverse()) {
    arr.splice(startIndex, 1);
  }
  const index = (sortedFromIndexes.at(-1) ?? 0) < toIndex ? toIndex - elementsToMove.length + 1 : toIndex;
  arr.splice(index, 0, ...elementsToMove);
  return arr;
}

export function groupBy<TArr, TKey extends string>(artifacts: Array<TArr>, resolveKey: (t: TArr) => TKey) {
  return artifacts.reduce<Record<TKey, Array<TArr>>>(
    (prev, curr) => {
      const groupKey = resolveKey(curr);
      const group = prev[groupKey] || [];
      group.push(curr);
      return { ...prev, [groupKey]: group };
    },
    {} as Record<TKey, Array<TArr>>
  );
}
