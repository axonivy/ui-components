import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useShortcut = (key: string, callback: () => void, modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean }) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const ctrl = modifiers ? modifiers.ctrl : true;
  const alt = modifiers ? modifiers.alt : true;
  const shift = modifiers ? modifiers.shift : false;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const ctrlNotRequiredOrPressed = !ctrl || (isMac() ? event.metaKey : event.ctrlKey);
      const altNotRequiredOrPressed = !alt || event.altKey;
      const shiftNotRequiredOrPressed = !shift || event.shiftKey;

      if (ctrlNotRequiredOrPressed && altNotRequiredOrPressed && shiftNotRequiredOrPressed && event.key === key) {
        callbackRef.current();
      }
    },
    [key, ctrl, alt, shift]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  });

  const shortcutParts = [ctrl ? (isMac() ? 'Cmd' : 'Ctrl') : '', alt ? 'Alt' : '', shift ? 'Shift' : '', key.toUpperCase()];
  return shortcutParts.filter(part => part.length !== 0).join('+');
};

const isMac = () => {
  return window.navigator.userAgent.indexOf('Mac') !== -1;
};
