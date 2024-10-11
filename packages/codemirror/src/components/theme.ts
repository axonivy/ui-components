import { vscodeDarkStyle, vscodeLightStyle } from '@uiw/codemirror-theme-vscode';
import { createTheme } from '@uiw/codemirror-themes';

export const ivyDark = createTheme({
  theme: 'dark',
  settings: { foreground: '#FFFFFF', caret: '#FFFFFF', background: '#333333', selection: '#264f78' },
  styles: vscodeDarkStyle
});

export const ivyLight = createTheme({
  theme: 'light',
  settings: { foreground: '#202020', caret: '#202020', background: '#fafafa', selection: '#add6ff' },
  styles: vscodeLightStyle
});
