import { configKeySanitize } from '@/utils/config-key';

test('sanitize config key', () => {
  expect(configKeySanitize('すすすすすすすす')).toEqual('');
  expect(configKeySanitize('')).toEqual('');
  expect(configKeySanitize('abc')).toEqual('abc');
  expect(configKeySanitize('Deepl v3 Connecter (really nice!)')).toEqual('Deepl-v3-Connecter-really-nice');
  expect(configKeySanitize('#special!=?')).toEqual('special');
  expect(configKeySanitize("let's go")).toEqual('lets-go');
  expect(configKeySanitize('ä')).toEqual('a');
  expect(configKeySanitize('-_')).toEqual('-_');
  expect(configKeySanitize('    abc    ')).toEqual('abc');
});
