import React from 'react';
import { createRoot } from 'react-dom/client';
import { MonacoEditorUtil } from '../monaco-editor-util';
import './index.css';
import { EditorChooser } from './EditorChooser';
import { Button, Flex, ThemeProvider, useTheme } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

export async function start(): Promise<void> {
  // const server = URLParams.webSocketBase();
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('root element not found');
  }
  const root = createRoot(rootElement);

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  await MonacoEditorUtil.configureInstance();

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
