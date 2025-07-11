import { composeStory } from '@storybook/react-vite';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { CustomValue, Default, Lazy, Search, Select } from './tree.stories';

const Tree = composeStory(Default, Meta);
const CustomTree = composeStory(CustomValue, Meta);
const LazyTree = composeStory(Lazy, Meta);
const SearchTree = composeStory(Search, Meta);
const SelectTree = composeStory(Select, Meta);

test('tree', async () => {
  customRender(<Tree />);
  expect(screen.getAllByRole('row')).toHaveLength(7);
  await userEvent.click(screen.getAllByRole('button', { name: 'Collapse row' })[0]!);
  expect(screen.getAllByRole('row')).toHaveLength(3);
  await userEvent.click(screen.getByRole('button', { name: 'Expand tree' }));
  expect(screen.getAllByRole('row')).toHaveLength(7);
});

test('custom', async () => {
  customRender(<CustomTree />);
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('rootScalarMore infovalue');
});

test('lazy', async () => {
  customRender(<LazyTree />);
  expect(screen.getAllByRole('row')).toHaveLength(8);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(9);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(10);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(11);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(12);
});

test('search', async () => {
  customRender(<SearchTree />);
  expect(screen.getAllByRole('row')).toHaveLength(7);
  const search = screen.getByRole('textbox');
  await userEvent.type(search, 'user');
  expect(screen.getAllByRole('row')).toHaveLength(4);

  await userEvent.clear(search);
  await userEvent.type(search, '1234');
  expect(screen.getAllByRole('row')).toHaveLength(3);

  await userEvent.clear(search);
  await userEvent.type(search, 'unknown');
  expect(screen.getAllByRole('row')).toHaveLength(1);
});

test('keyboard', async () => {
  customRender(<SelectTree />);
  const rows = screen.getAllByRole('row');
  const user = userEvent.setup();
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  await user.click(rows[1]!);
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');

  await user.keyboard('[ArrowDown]');
  await user.keyboard('[ArrowDown]');
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  expect(rows[3]).toHaveAttribute('data-state', 'selected');

  await user.keyboard('[ArrowDown]');
  await user.keyboard('[ArrowDown]');
  await user.keyboard('[ArrowDown]');
  await user.keyboard('[ArrowDown]');
  expect(rows[3]).toHaveAttribute('data-state', 'unselected');
  expect(rows[1]).toHaveAttribute('data-state', 'selected');

  await user.keyboard('[ArrowUp]');
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  expect(rows[6]).toHaveAttribute('data-state', 'selected');
});
