import { composeStory } from '@storybook/react-vite';
import { act } from 'react';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { Default, Global, Scoped, WithScopes } from '../hooks/hotkey.stories';

const Hotkey = composeStory(Default, Meta);
const GlobalHotkey = composeStory(Global, Meta);
const ScopedHotkey = composeStory(Scoped, Meta);
const WithScopesHotkey = composeStory(WithScopes, Meta);

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

test('withScopes simple', async () => {
  userEvent.setup();
  customRender(<WithScopesHotkey />);
  const text = screen.getByText(/Count:/);
  const activeScopes = screen.getByTitle('active-scopes');

  expect(text).toHaveTextContent('1');
  expect(activeScopes).toHaveTextContent('global | multiply');
  await userEvent.keyboard('q');
  expect(text).toHaveTextContent('1');
  await userEvent.keyboard('w');
  expect(text).toHaveTextContent('1');
  await userEvent.keyboard('e');
  expect(text).toHaveTextContent('2');
  act(() => screen.getByRole('button', { name: 'activate count scope' }).click());
  expect(activeScopes).toHaveTextContent('count');
  await userEvent.keyboard('e');
  expect(text).toHaveTextContent('2');
  await userEvent.keyboard('q');
  expect(text).toHaveTextContent('3');
  await userEvent.keyboard('w');
  expect(text).toHaveTextContent('2');

  act(() => screen.getByRole('button', { name: 'restore local scope' }).click());
  expect(activeScopes).toHaveTextContent('global | multiply');
  await userEvent.keyboard('q');
  expect(text).toHaveTextContent('2');
  await userEvent.keyboard('w');
  expect(text).toHaveTextContent('2');
  await userEvent.keyboard('e');
  expect(text).toHaveTextContent('4');
});

test('withScopes add scopes', async () => {
  userEvent.setup();
  customRender(<WithScopesHotkey />);
  const activeScopes = screen.getByTitle('active-scopes');
  const restorableScopes = screen.getByTitle('restorable-scopes');

  expect(activeScopes).toHaveTextContent('global | multiply');
  expect(restorableScopes).toHaveTextContent('global | multiply');
  act(() => screen.getByRole('button', { name: 'enable something scope' }).click());
  expect(activeScopes).toHaveTextContent('global | multiply | something');
  expect(restorableScopes).toHaveTextContent('global | multiply');

  act(() => screen.getByRole('button', { name: 'activate count scope' }).click());
  expect(activeScopes).toHaveTextContent('count');
  expect(restorableScopes).toHaveTextContent('global | multiply | something');

  act(() => screen.getByRole('button', { name: 'restore local scope' }).click());
  expect(activeScopes).toHaveTextContent('global | multiply | something');
  expect(restorableScopes).toHaveTextContent('global | multiply | something');

  act(() => screen.getByRole('button', { name: 'disable something scope' }).click());
  expect(activeScopes).toHaveTextContent('global | multiply');
  expect(restorableScopes).toHaveTextContent('global | multiply | something');

  act(() => screen.getByRole('button', { name: 'activate count scope' }).click());
  expect(activeScopes).toHaveTextContent('count');
  expect(restorableScopes).toHaveTextContent('global | multiply');

  act(() => screen.getByRole('button', { name: 'enable something scope' }).click());
  expect(activeScopes).toHaveTextContent('count | something');
  expect(restorableScopes).toHaveTextContent('global | multiply');

  act(() => screen.getByRole('button', { name: 'restore local scope' }).click());
  expect(activeScopes).toHaveTextContent('global | multiply');
  expect(restorableScopes).toHaveTextContent('global | multiply');
});
