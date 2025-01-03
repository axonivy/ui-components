import { resolve } from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [visualizer(), dts({ tsconfigPath: './tsconfig.production.json' })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'lib',
    sourcemap: true,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('monaco-languageclient') || id.includes('vscode')) {
            return 'monaco-chunk';
          }
        }
      },
      external: [
        '@axonivy/ui-icons',
        '@axonivy/ui-components',
        '@axonivy/jsonrpc',
        'react',
        'react/jsx-runtime',
        'react-dom'
        // 'monaco-languageclient',
        // 'monaco-editor',
        // 'vscode'
      ]
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'monaco',
      formats: ['es']
    }
  }
});
