import { renderHook } from 'test-utils';
import { expect, test } from 'vitest';
import { useReadonly } from './useReadonly';

test('off', async () => {
  const { result } = renderHook(useReadonly);
  expect(result.current).toBeFalsy();
});

test('on', async () => {
  const { result } = renderHook(useReadonly, { wrapperProps: { readonly: true } });
  expect(result.current).toBeTruthy();
});
