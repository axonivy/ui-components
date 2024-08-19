import { composeStory } from '@storybook/react';
import { act, render, screen, userEvent } from 'test-utils';
import { expect, test } from 'vitest';
import Meta, { Default } from './edit.stories';

const Table = composeStory(Default, Meta);

test('select', async () => {
  render(<Table />);
  const select = screen.getAllByRole('combobox')[0];
  expect(select).toHaveTextContent('Success');

  await act(async () => await userEvent.click(select));
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  await act(async () => await userEvent.keyboard('[ArrowDown]'));
  await act(async () => await userEvent.keyboard('[Enter]'));
  expect(screen.getAllByRole('row')[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('combobox')[0]).toHaveTextContent('Failed');
});

test('input', async () => {
  render(<Table />);
  const input = screen.getAllByRole('textbox')[0];
  expect(input).toHaveValue('ken99@yahoo.com');

  await act(async () => await userEvent.click(input));
  await act(async () => await userEvent.keyboard('1'));
  await act(async () => await userEvent.tab());
  expect(screen.getAllByRole('row')[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('textbox')[0]).toHaveValue('ken99@yahoo.com1');
});

test('combobox', async () => {
  render(<Table />);
  const combobox = screen.getAllByRole('combobox')[1];
  expect(combobox).toHaveValue('316');

  await act(async () => await userEvent.click(combobox));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await act(async () => await userEvent.keyboard('[ArrowDown]'));
  await act(async () => await userEvent.keyboard('[Enter]'));
  expect(screen.getAllByRole('row')[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('combobox')[1]).toHaveValue('123');
});
