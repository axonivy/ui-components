import { useShortcut } from '@/utils/useShortcut';
import { fireEvent, render } from '@testing-library/react';

type TestComponentProps = {
  shortcutKey: string;
  callback: () => void;
  modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean };
};

const TestComponent = ({ shortcutKey: key, callback, modifiers }: TestComponentProps) => {
  useShortcut(key, callback, modifiers);
  return <div>Test Component</div>;
};

test('default', () => {
  let shortcutTriggered = false;
  render(<TestComponent shortcutKey={'a'} callback={() => (shortcutTriggered = true)} />);

  fireEvent.keyDown(document, { key: 'a', ctrlKey: true, shiftKey: true });
  expect(shortcutTriggered).toBeFalsy();

  fireEvent.keyDown(document, { key: 'a', altKey: true, shiftKey: true });
  expect(shortcutTriggered).toBeFalsy();

  fireEvent.keyDown(document, { key: 'z', ctrlKey: true, altKey: true });
  expect(shortcutTriggered).toBeFalsy();

  fireEvent.keyDown(document, { key: 'a', ctrlKey: true, altKey: true });
  expect(shortcutTriggered).toBeTruthy();
});

test('custom', () => {
  let shortcutTriggered = false;
  render(<TestComponent shortcutKey={'a'} callback={() => (shortcutTriggered = true)} modifiers={{ shift: true }} />);

  fireEvent.keyDown(document, { key: 'a', ctrlKey: true });
  expect(shortcutTriggered).toBeFalsy();

  fireEvent.keyDown(document, { key: 'a', altKey: true });
  expect(shortcutTriggered).toBeFalsy();

  fireEvent.keyDown(document, { key: 'z', shiftKey: true });
  expect(shortcutTriggered).toBeFalsy();

  fireEvent.keyDown(document, { key: 'a', shiftKey: true });
  expect(shortcutTriggered).toBeTruthy();
});

test('mac', () => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: 'Mac'
  });

  let shortcutTriggered = false;
  render(<TestComponent shortcutKey={'a'} callback={() => (shortcutTriggered = true)} />);

  fireEvent.keyDown(document, { key: 'a', ctrlKey: true, altKey: true });
  expect(shortcutTriggered).toBeFalsy();

  fireEvent.keyDown(document, { key: 'a', metaKey: true, altKey: true });
  expect(shortcutTriggered).toBeTruthy();
});
