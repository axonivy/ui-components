import { useShortcut } from '@/utils/useShortcut';
import { render } from '@testing-library/react';
import { userEvent } from 'test-utils';

type TestComponentProps = {
  shortcutKey: string;
  callback: () => void;
  modifiers?: { ctrl?: boolean; alt?: boolean; shift?: boolean };
};

const TestComponent = ({ shortcutKey: key, callback, modifiers }: TestComponentProps) => {
  useShortcut(key, callback, modifiers);
  return <div>Test Component</div>;
};

test('default', async () => {
  let shortcutTriggered = false;
  render(<TestComponent shortcutKey={'a'} callback={() => (shortcutTriggered = true)} />);

  await userEvent.keyboard('{Control>}{Shift>}{a}');
  expect(shortcutTriggered).toBeFalsy();

  await userEvent.keyboard('{Alt>}{Shift>}{a}');
  expect(shortcutTriggered).toBeFalsy();

  await userEvent.keyboard('{Control>}{Alt>}{z}');
  expect(shortcutTriggered).toBeFalsy();

  await userEvent.keyboard('{Control>}{Alt>}{a}');
  expect(shortcutTriggered).toBeTruthy();
});

test('custom', async () => {
  let shortcutTriggered = false;
  render(<TestComponent shortcutKey={'a'} callback={() => (shortcutTriggered = true)} modifiers={{ shift: true }} />);

  await userEvent.keyboard('{Control>}{a}');
  expect(shortcutTriggered).toBeFalsy();

  await userEvent.keyboard('{Alt>}{a}');
  expect(shortcutTriggered).toBeFalsy();

  await userEvent.keyboard('{Shift>}{z}');
  expect(shortcutTriggered).toBeFalsy();

  await userEvent.keyboard('{Shift>}{a}');
  expect(shortcutTriggered).toBeTruthy();
});

test('mac', async () => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: 'Mac'
  });

  let shortcutTriggered = false;
  render(<TestComponent shortcutKey={'a'} callback={() => (shortcutTriggered = true)} />);

  await userEvent.keyboard('{Control>}{Alt>}{a}');
  expect(shortcutTriggered).toBeFalsy();

  await userEvent.keyboard('{Meta>}{Alt>}{a}');
  expect(shortcutTriggered).toBeTruthy();
});
