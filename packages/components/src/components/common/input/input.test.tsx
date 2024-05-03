import { composeStory } from '@storybook/react';
import { act, render, screen, userEvent } from 'test-utils';
import { expect, test } from 'vitest';
import Meta, { Default, WithLabel, Search } from './input.stories';

const Input = composeStory(Default, Meta);
const LabelInput = composeStory(WithLabel, Meta);
const SearchInput = composeStory(Search, Meta);

test('by label', async () => {
  render(<LabelInput />);
  const label = screen.getByLabelText('Name');
  const input = screen.getByRole('textbox');
  expect(input).not.toHaveFocus();

  await act(async () => await userEvent.click(label));
  expect(input).toHaveFocus();
});

test('readonly mode', () => {
  render(<Input />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('disabled mode', () => {
  render(<Input disabled={true} />);
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('search', async () => {
  render(<SearchInput />);
  const input = screen.getByRole('textbox');
  expect(screen.queryByRole('button', { name: 'Clean' })).not.toBeInTheDocument();
  expect(input).toHaveAttribute('placeholder', 'Search...');

  await act(async () => await userEvent.type(input, 'test'));
  expect(input).toHaveValue('test');
  const cleanBtn = screen.getByRole('button', { name: 'Clean' });
  expect(cleanBtn).toBeVisible();

  await act(async () => await userEvent.click(cleanBtn));
  expect(input).toHaveValue('');
});
