import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useShortcut = (key: string, callback: () => void) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === key) {
        callbackRef.current();
      }
    },
    [key]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  });
};
