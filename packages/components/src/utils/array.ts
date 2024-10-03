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
