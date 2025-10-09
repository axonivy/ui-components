import { defineConfig } from 'eslint/config';
import { base } from './base.mjs';
import { i18n } from './i18n.mjs';
import { reactHooksLatest } from './react-hooks-latest.mjs';

export default {
  defineConfig,
  base,
  i18n,
  reactHooksLatest
};
