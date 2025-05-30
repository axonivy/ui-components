import { composeStory } from '@storybook/react-vite';
import Meta, { Default, Global, Scoped } from '../hooks/hotkey.stories';
import { customRender, screen, userEvent } from 'test-utils';

const Hotkey = composeStory(Default, Meta);
const GlobalHotkey = composeStory(Global, Meta);
const ScopedHotkey = composeStory(Scoped, Meta);

test('hotkey', async () => {
  userEvent.setup();
  customRender(<Hotkey />);
  const text = screen.getByText(/Pressed the/);
  expect(text).toHaveTextContent('0 times');

  await userEvent.keyboard('{Control>}{Alt>}{n}');
  expect(text).toHaveTextContent('1 times');
});

test('global', async () => {
  userEvent.setup();
  customRender(<GlobalHotkey />);
  const text = screen.getByText(/Count:/);
  expect(text).toHaveTextContent('0');
  await userEvent.keyboard('q');
  expect(text).toHaveTextContent('1');
  await userEvent.keyboard('w');
  expect(text).toHaveTextContent('0');
  await userEvent.keyboard('w');
  expect(text).toHaveTextContent('-1');
});

test('scoped', async () => {
  userEvent.setup();
  customRender(<ScopedHotkey />);
  const text = screen.getByText(/Count:/);
  expect(text).toHaveTextContent('0');
  await userEvent.keyboard('c');
  expect(text).toHaveTextContent('0');
  await userEvent.click(text);
  await userEvent.keyboard('c');
  expect(text).toHaveTextContent('1');
});
