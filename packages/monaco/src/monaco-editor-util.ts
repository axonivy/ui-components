import type { editor } from 'monaco-editor';
import { ivyMacroConf, ivyMacroLang } from './ivy-macro-language';
import { ivyScriptConf, ivyScriptLang } from './ivy-script-language';

import type * as monacoEditorReact from '@monaco-editor/react';
import { Deferred } from './utils/promises-util';
import { ConsoleTimer } from './utils/console-util';
export type MonacoEditorReactApi = typeof monacoEditorReact;

type ThemeMode = 'light' | 'dark';

export const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  glyphMargin: false,
  lineNumbers: 'off',
  minimap: { enabled: false },
  overviewRulerBorder: false,
  overviewRulerLanes: 1,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  folding: false,
  renderLineHighlight: 'none',
  fontFamily:
    "'Droid Sans Mono', 'monospace', monospace, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: 12,
  tabSize: 2,
  renderWhitespace: 'all',
  fixedOverflowWidgets: true,
  scrollbar: {
    useShadows: false
  }
};

export const MAXIMIZED_MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  ...MONACO_OPTIONS,
  lineNumbers: 'on',
  folding: true,
  showFoldingControls: 'always'
};

export const SINGLE_LINE_MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  ...MONACO_OPTIONS,
  overviewRulerLanes: 0,
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollBeyondLastColumn: 0,
  scrollbar: {
    horizontal: 'hidden',
    vertical: 'hidden',
    alwaysConsumeMouseWheel: false
  },
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: 'never',
    seedSearchStringFromSelection: 'never'
  },
  links: false,
  renderLineHighlight: 'none',
  contextmenu: false
};

export namespace MonacoEditorUtil {
  export const DEFAULT_THEME_NAME = 'axon-input';

  export function themeData(theme?: ThemeMode): editor.IStandaloneThemeData {
    if (theme === 'dark') {
      return {
        base: 'vs-dark',
        colors: {
          'editor.foreground': '#FFFFFF',
          'editorCursor.foreground': '#FFFFFF',
          'editor.background': '#333333'
        },
        inherit: true,
        rules: []
      };
    }
    return {
      base: 'vs',
      colors: {
        'editor.foreground': '#202020',
        'editorCursor.foreground': '#202020',
        'editor.background': '#fafafa'
      },
      inherit: true,
      rules: []
    };
  }

  const instance: Deferred<monacoEditorReact.Monaco> = new Deferred<monacoEditorReact.Monaco>();
  export async function getInstance(): Promise<monacoEditorReact.Monaco> {
    return instance.promise;
  }

  let configureCalled = false;
  export async function configureInstance(): Promise<monacoEditorReact.Monaco> {
    if (configureCalled) {
      console.warn(
        'MonacoEditorUtil.configureInstance should only be called once. The caller will receive the first, configured instance. If you want to configure additional instances, call "configureMonacoReactEditor" instead.'
      );
    } else {
      configureCalled = true;
      configureMonacoReactEditor().then(instance.resolve).catch(instance.reject);
    }
    return instance.promise;
  }

  // We want to avoid an import to import { KeyCode } from 'monaco-editor/esm/vs/editor/editor.api'.
  // So we replicate the necessary Key codes here since they are very stable.
  export enum KeyCode {
    Tab = 2,
    Enter = 3,
    Escape = 9,
    F2 = 60
  }

  let monacoEditorReactApiPromise: Promise<MonacoEditorReactApi>;
  export async function monacoEditorReactApi(): Promise<MonacoEditorReactApi> {
    if (!monacoEditorReactApiPromise) {
      monacoEditorReactApiPromise = import('@monaco-editor/react');
    }
    return monacoEditorReactApiPromise;
  }

  export async function setTheme(theme?: ThemeMode): Promise<void> {
    const monacoApi = await getInstance();
    monacoApi.editor.defineTheme(MonacoEditorUtil.DEFAULT_THEME_NAME, MonacoEditorUtil.themeData(theme));
  }
}

export async function configureMonacoReactEditor() {
  const timer = new ConsoleTimer(true, 'Configure Monaco React Editor');
  timer.start();

  timer.step('Start loading Monaco Editor React API...');
  const reactEditorApi = await MonacoEditorUtil.monacoEditorReactApi();

  timer.step('Start loading Monaco Editor API...');
  const reactEditorLoader = reactEditorApi.loader;

  timer.step('Initialize Monaco React Editor...');
  const monacoApi = await reactEditorLoader.init();
  monacoApi.languages.register({
    id: 'ivyScript',
    extensions: ['.ivyScript', '.ivyScript'],
    aliases: ['IvyScript', 'ivyScript']
  });
  monacoApi.languages.register({
    id: 'ivyMacro',
    extensions: ['.ivyMacro', '.ivyMacro'],
    aliases: []
  });
  monacoApi.languages.setLanguageConfiguration('ivyScript', ivyScriptConf);
  monacoApi.languages.setMonarchTokensProvider('ivyScript', ivyScriptLang);
  monacoApi.languages.setLanguageConfiguration('ivyMacro', ivyMacroConf);
  monacoApi.languages.setMonarchTokensProvider('ivyMacro', ivyMacroLang);
  monacoApi.editor.defineTheme(MonacoEditorUtil.DEFAULT_THEME_NAME, MonacoEditorUtil.themeData('light'));
  const transport = await monacoApi.lsp.WebSocketTransport.connectTo({
    address: `ws://localhost:8080/~Developer-test/ivy-script-lsp`
    // address: `wss://neo.ivyteam.io/~Developer-workflow-demos/ivy-script-lsp`
  });
  new monacoApi.lsp.MonacoLspClient(transport);
  timer.end();
  return monacoApi;
}
