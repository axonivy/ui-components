const isMac = () => window.navigator.userAgent.indexOf('Mac') !== -1;

type ModKey = '⌘' | 'CTRL';

const modKey = (): ModKey => (isMac() ? '⌘' : 'CTRL');

const optKey = (): string => (isMac() ? '⌥' : 'ALT');

export const hotkeyText = (hotkey: string): string => hotkey.replace('mod', modKey()).replace('alt', optKey()).replace('shift', '⇧');
