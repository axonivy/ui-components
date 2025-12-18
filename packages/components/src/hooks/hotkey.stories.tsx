import { hotkeyRedoFix, hotkeyText, hotkeyUndoFix, isWindows } from '@/utils/hotkey';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { HotkeysProvider, useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { useHotkeyLocalScopes } from './hotkey';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';

const meta: Meta = {
  title: 'Hooks/useHotkeys',
  tags: ['autodocs']
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);
    useHotkeys('mod+alt+n', () => setCount(prevCount => prevCount + 1));
    const hotkey = hotkeyText('mod+alt+n');

    return (
      <span>
        Pressed the <b>{hotkey}</b> key {count} times.
      </span>
    );
  }
};

export const UndoRedo: StoryObj = {
  render: () => {
    const [undoCount, setUndoCount] = useState(0);
    const [redoCount, setRedoCount] = useState(0);
    useHotkeys('mod+z', e => hotkeyUndoFix(e, () => setUndoCount(prevCount => prevCount + 1)));
    useHotkeys(isWindows() ? 'mod+y' : 'mod+shift+z', e => hotkeyRedoFix(e, () => setRedoCount(prevCount => prevCount + 1)));
    const hotkeyUndo = hotkeyText('mod+z');
    const hotkeyRedo = hotkeyText(isWindows() ? 'mod+y' : 'mod+shift+z');

    return (
      <>
        <span>
          Pressed the <b>{hotkeyUndo}</b> key {undoCount} times.
        </span>
        <br />
        <span>
          Pressed the <b>{hotkeyRedo}</b> key {redoCount} times.
        </span>
      </>
    );
  }
};

export const Scoped: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);
    const ref = useHotkeys('c', () => setCount(prevCount => prevCount + 1));
    return (
      <div ref={ref} tabIndex={-1} style={{ border: '2px solid #9e768f' }}>
        <h1>Scoped Hotkeys</h1>
        <p>Focus me, and press c to increment the count</p>
        <p>Count: {count}</p>
      </div>
    );
  }
};

export const Global: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);
    useHotkeys('q', () => setCount(prevCount => prevCount + 1));
    useHotkeys('w', () => setCount(prevCount => prevCount - 1));
    return (
      <>
        <h1>Global Hotkeys</h1>
        <p>
          Press <b>q</b> to increment the count, and <b>w</b> to decrement it.
        </p>
        <p>Count: {count}</p>
      </>
    );
  }
};

export const WithScopes: StoryObj = {
  render: () => {
    return (
      <HotkeysProvider initiallyActiveScopes={['global', 'multiply']}>
        <Comp />
      </HotkeysProvider>
    );
  }
};

const Comp = () => {
  const [count, setCount] = useState(1);

  const { enabledScopes, enableScope, disableScope } = useHotkeysContext();
  const { activateLocalScopes, restoreLocalScopes, restorableScopes } = useHotkeyLocalScopes(['count']);
  useHotkeys('q', () => setCount(prevCount => prevCount + 1), { scopes: ['count'] });
  useHotkeys('w', () => setCount(prevCount => prevCount - 1), { scopes: ['count'] });
  useHotkeys('e', () => setCount(prevCount => prevCount * 2), { scopes: ['multiply'] });
  useHotkeys('s', () => setCount(prevCount => prevCount + 5), { scopes: ['something'] });
  return (
    <>
      <h1>Hotkeys with Scopes</h1>
      <p>
        Press <b>q</b> to increment the count, and <b>w</b> to decrement it. (w/q = scope: &apos;count&apos;)
      </p>
      <p>
        Press <b>e</b> to multiply the count x2. (e = scope: &apos;multiply&apos;)
      </p>
      <p>
        Press <b>s</b> to increment the count by 5. (s = scope: &apos;something&apos;)
      </p>
      <p>Count: {count}</p>
      <Flex direction='column' gap={2}>
        {enabledScopes.includes('count') && (
          <Button variant='outline' onClick={restoreLocalScopes}>
            restore local scope
          </Button>
        )}
        {!enabledScopes.includes('count') && (
          <Button variant='outline' onClick={activateLocalScopes}>
            activate count scope
          </Button>
        )}

        {!enabledScopes.includes('something') && (
          <Button variant='outline' onClick={() => enableScope('something')}>
            enable something scope
          </Button>
        )}
        {enabledScopes.includes('something') && (
          <Button variant='outline' onClick={() => disableScope('something')}>
            disable something scope
          </Button>
        )}
      </Flex>
      <p>
        Active Scopes:{' '}
        <b title='active-scopes'>
          {enabledScopes.map((s, index) => (
            <React.Fragment key={index}>
              {index !== 0 ? ' | ' : ''}
              {s}
            </React.Fragment>
          ))}
        </b>
      </p>
      <p>
        Restorable Scopes:{' '}
        <b title='restorable-scopes'>
          {restorableScopes.map((s, index) => (
            <React.Fragment key={index}>
              {index !== 0 ? ' | ' : ''}
              {s}
            </React.Fragment>
          ))}
        </b>
      </p>
    </>
  );
};
