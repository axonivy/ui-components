import { useState } from 'react';
import { useHotkeysContext } from 'react-hotkeys-hook';

export { HotkeysProvider, isHotkeyPressed, useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';

export const useHotkeyLocalScopes = (scopes: string[]) => {
  const { enabledScopes, enableScope, disableScope } = useHotkeysContext();
  const [restorableScopes, setRestorableScopes] = useState(enabledScopes);

  const activateLocalScopes = () => {
    setRestorableScopes(enabledScopes);
    scopes.forEach(scope => enableScope(scope));

    enabledScopes.forEach(scope => {
      if (!scopes.includes(scope)) {
        disableScope(scope);
      }
    });
  };

  const restoreLocalScopes = () => {
    restorableScopes.forEach(scope => enableScope(scope));

    enabledScopes.forEach(scope => {
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
