import { composeStory } from '@storybook/react';
import Meta, { Default, Global, Scoped } from '../hooks/hotkey.stories';
import { act, render, screen, userEvent } from 'test-utils';

const Hotkey = composeStory(Default, Meta);
const GlobalHotkey = composeStory(Global, Meta);
const ScopedHotkey = composeStory(Scoped, Meta);

test('hotkey', async () => {
  userEvent.setup();
  render(<Hotkey />);
  const text = screen.getByText(/Pressed the/);
  expect(text).toHaveTextContent('0 times');

  await act(async () => await userEvent.keyboard('{Control>}{Alt>}{n}'));
  expect(text).toHaveTextContent('1 times');
});

test('global', async () => {
  userEvent.setup();
  render(<GlobalHotkey />);
  const text = screen.getByText(/Count:/);
  expect(text).toHaveTextContent('0');
  await act(async () => await userEvent.keyboard('q'));
  expect(text).toHaveTextContent('1');
  await act(async () => await userEvent.keyboard('w'));
  expect(text).toHaveTextContent('0');
  await act(async () => await userEvent.keyboard('w'));
  expect(text).toHaveTextContent('-1');
});

test('scoped', async () => {
  userEvent.setup();
  render(<ScopedHotkey />);
  const text = screen.getByText(/Count:/);
  expect(text).toHaveTextContent('0');
  await act(async () => await userEvent.keyboard('c'));
  expect(text).toHaveTextContent('0');
  await act(async () => await userEvent.click(text));
  await act(async () => await userEvent.keyboard('c'));
  expect(text).toHaveTextContent('1');
});