import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Button, Flex, ThemeProvider, useTheme } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { EditorChooser } from './EditorChooser';

export async function start(): Promise<void> {
  const root = createRoot(document.getElementById('root')!);
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme={systemTheme}>
        <Playground />
      </ThemeProvider>
    </React.StrictMode>
  );
}

const Playground = () => {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  return (
    <div style={{ padding: '1rem' }}>
      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <h1>CodeMirror Playground</h1>
        <Button icon={IvyIcons.DarkMode} onClick={changeTheme} size='large' />
      </Flex>
      <EditorChooser />
    </div>
  );
};

start();
