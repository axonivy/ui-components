import { hotkeyRedoFix, hotkeyUndoFix, isWindows } from '@/utils/hotkey';
import { useState } from 'react';
import { useHotkeys, useHotkeysContext, type Options } from 'react-hotkeys-hook';

export { HotkeysProvider, isHotkeyPressed, useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';

export const useHotkeyLocalScopes = (scopes: string[]) => {
  const { activeScopes, enableScope, disableScope } = useHotkeysContext();
  const [restorableScopes, setRestorableScopes] = useState(activeScopes);

  const activateLocalScopes = () => {
    setRestorableScopes(activeScopes);
    scopes.forEach(scope => enableScope(scope));

    activeScopes.forEach(scope => {
      if (!scopes.includes(scope)) {
        disableScope(scope);
      }
    });
  };

  const restoreLocalScopes = () => {
    restorableScopes.forEach(scope => enableScope(scope));

    activeScopes.forEach(scope => {
      if (!restorableScopes.includes(scope)) {
        disableScope(scope);
      }
    });
  };

  return { activateLocalScopes, restoreLocalScopes, restorableScopes };
};

export const useDialogHotkeys = (scopes: string[] = []) => {
  const [open, setOpen] = useState(false);
  const { activateLocalScopes, restoreLocalScopes } = useHotkeyLocalScopes(scopes);
  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      activateLocalScopes();
    } else {
      restoreLocalScopes();
    }
  };
  return { open, onOpenChange };
};

export const undoHotkey = () => 'mod+Z';

export const useUndoHotkey = (undo: () => void, options?: Omit<Options, 'useKey'>) => {
  return useHotkeys(undoHotkey(), e => hotkeyUndoFix(e, undo), { useKey: true, ...options });
};

export const redoHotkey = () => (isWindows() ? 'mod+Y' : 'mod+shift+Z');

export const useRedoHotkey = (redo: () => void, options?: Omit<Options, 'useKey'>) => {
  return useHotkeys(redoHotkey(), e => hotkeyRedoFix(e, redo), { useKey: true, ...options });
};
