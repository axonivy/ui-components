import React from 'react';
import { createRoot } from 'react-dom/client';
import { MonacoEditorUtil } from '../monaco-editor-util';
import './index.css';
// import { webSocketConnection, type Connection } from '@axonivy/jsonrpc';
// import { IvyScriptLanguage } from '../ivy-script-client';
// import { URLParams } from './url-helper';
import { EditorChooser } from './EditorChooser';
import { Button, Flex, ThemeProvider, useTheme } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

export async function start(): Promise<void> {
  // const server = URLParams.webSocketBase();
  const root = createRoot(document.getElementById('root')!);

  const worker = await import('monaco-editor/esm/vs/editor/editor.worker?worker');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  /*const instance = */ MonacoEditorUtil.configureInstance({
    theme: systemTheme,
    debug: true,
    worker: { workerConstructor: worker.default }
  });
  // const initializeScript = async (connection: Connection) => {
  //   return await IvyScriptLanguage.startClient(connection, instance);
  // };
  // const reconnectScript = async (connection: Connection, oldClient: MonacoLanguageClient) => {
  //   try {
  //     await oldClient.stop(0);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  //   return initializeScript(connection);
  // };
  // webSocketConnection<MonacoLanguageClient>(IvyScriptLanguage.webSocketUrl(server)).listen({
  //   onConnection: initializeScript,
  //   onReconnect: reconnectScript,
  //   logger: console
  // });

  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme={systemTheme}>
        <Playground />
      </ThemeProvider>
    </React.StrictMode>
  );
}

start();

const Playground = () => {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    MonacoEditorUtil.setTheme(newTheme);
  };
  return (
    <div style={{ padding: '1rem' }}>
      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <h1>Monaco Playground</h1>
        <Button icon={IvyIcons.DarkMode} onClick={changeTheme} size='large' />
      </Flex>
      <EditorChooser />
    </div>
  );
};
