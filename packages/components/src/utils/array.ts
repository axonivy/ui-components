export function indexOf<TArr>(array: TArr[], find: (obj: TArr) => boolean): number {
  const cond = array.find(find);
  if (cond) {
    return array.indexOf(cond);
  }
  return -1;
}

export function arraymove<TArr>(arr: TArr[], fromIndex: number, toIndex: number) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

export function groupBy<T>(artifacts: T[], resolveKey: (t: T) => string) {
  return artifacts.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = resolveKey(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}

export function arrayMoveMultiple<TArr>(arr: TArr[], fromIndexes: number[], toIndex: number) {
  const sortedFromIndexes = [...fromIndexes].sort((a, b) => a - b);
  const elementsToMove = sortedFromIndexes.map(index => arr[index]);
  for (let i = sortedFromIndexes.length - 1; i >= 0; i--) {
    arr.splice(sortedFromIndexes[i], 1);
  }
  const index = sortedFromIndexes[sortedFromIndexes.length - 1] < toIndex ? toIndex - elementsToMove.length + 1 : toIndex;
  arr.splice(index, 0, ...elementsToMove);
  return arr;
}

// Finds the new index with gaps between indices
export function findNewIndexWithGap(indices: number[], direction: -1 | 1, arrayCount: number): number {
  let gapFound = false;

  for (let i = 0; i < indices.length - 1; i++) {
    if (indices[i + 1] - indices[i] > 1) {
      gapFound = true;
      return direction === -1 ? indices[i + 1] - 1 : indices[i] + 1;
    }
  }

  return direction === -1
    ? indices[0] - 1 < 0
      ? arrayCount
      : indices[0] - 1
    : indices[indices.length - 1] + 1 > arrayCount
    ? 0
    : indices[indices.length - 1] + 1;
}
