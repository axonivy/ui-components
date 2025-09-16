import { defineConfig, presetWind4 } from 'unocss';
import { presetClassCompletion } from 'unocss-preset-completion';

export default defineConfig({
  presets: [presetWind4(), presetClassCompletion({ autocompleteFunctions: ['clsx', 'cn', 'cva'] })],
  theme: {
    colors: {
      body: 'var(--body)',
      background: 'var(--background)',
      n25: 'var(--N25)',
      n50: 'var(--N50)',
      n75: 'var(--N75)',
      n100: 'var(--N100)',
      n200: 'var(--N200)',
      n300: 'var(--N300)',
      n400: 'var(--N400)',
      n500: 'var(--N500)',
      n600: 'var(--N600)',
      n700: 'var(--N700)',
      n800: 'var(--N800)',
      n900: 'var(--N900)',
      p50: 'var(--P50)',
      p75: 'var(--P75)',
      p300: 'var(--P300)',
      p500: 'var(--P500)',
      error: 'var(--error-color)',
      warning: 'var(--warning-color)',
      success: 'var(--success-color)'
    }
  }
});
