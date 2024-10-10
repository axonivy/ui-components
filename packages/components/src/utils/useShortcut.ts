import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useShortcut = (key: string, callback: () => void, modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean }) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const ctrl = modifiers ? modifiers.ctrl : true;
      const alt = modifiers ? modifiers.alt : true;
      const shift = modifiers ? modifiers.shift : false;

      const ctrlNotRequiredOrPressed = !ctrl || (isMac() ? event.metaKey : event.ctrlKey);
      const altNotRequiredOrPressed = !alt || event.altKey;
      const shiftNotRequiredOrPressed = !shift || event.shiftKey;

      if (ctrlNotRequiredOrPressed && altNotRequiredOrPressed && shiftNotRequiredOrPressed && event.key === key) {
        callbackRef.current();
      }
    },
    [key, modifiers]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  });
};

const isMac = () => {
  return window.navigator.userAgent.indexOf('Mac') !== -1;
};
