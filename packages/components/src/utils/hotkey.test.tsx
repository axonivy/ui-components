import { hotkeyText } from '@/utils/hotkey';

test('hotkeyText', () => {
  expect(hotkeyText('a')).toEqual('a');
  expect(hotkeyText('ctrl+a')).toEqual('ctrl+a');
  expect(hotkeyText('shift+a')).toEqual('⇧+a');
  expect(hotkeyText('alt+a')).toEqual('ALT+a');
  expect(hotkeyText('options+a')).toEqual('options+a');
  expect(hotkeyText('mod+a')).toEqual('CTRL+a');

  vi.stubGlobal('navigator', { userAgent: 'Mac' });
  expect(hotkeyText('mod+a')).toEqual('⌘+a');
  expect(hotkeyText('mod+shift+a')).toEqual('⌘+⇧+a');
  expect(hotkeyText('mod+alt+a')).toEqual('⌘+⌥+a');
});
