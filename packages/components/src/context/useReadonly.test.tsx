import { customRenderHook } from 'test-utils';
import { useReadonly } from './useReadonly';

test('off', async () => {
  const { result } = customRenderHook(useReadonly);
  expect(result.current).toBeFalsy();
});

test('on', async () => {
  const { result } = customRenderHook(useReadonly, { wrapperProps: { readonly: true } });
  expect(result.current).toBeTruthy();
});
