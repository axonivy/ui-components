import { composeStory } from '@storybook/react';
import { act, customRender, screen, userEvent } from 'test-utils';
import Meta, { Default, WithLabel, Search, Password } from './input.stories';

const Input = composeStory(Default, Meta);
const LabelInput = composeStory(WithLabel, Meta);
const SearchInput = composeStory(Search, Meta);
const PasswordInput = composeStory(Password, Meta);

test('by label', async () => {
  customRender(<LabelInput />);
  const label = screen.getByLabelText('Name');
  const input = screen.getByRole('textbox');
  expect(input).not.toHaveFocus();

  await act(async () => await userEvent.click(label));
  expect(input).toHaveFocus();
});

test('readonly mode', () => {
  customRender(<Input />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('disabled mode', () => {
  customRender(<Input disabled={true} />);
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('search', async () => {
  customRender(<SearchInput />);
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

test('search readonly', async () => {
  customRender(<SearchInput />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('textbox')).not.toBeDisabled();
});

test('password', async () => {
  customRender(<PasswordInput />);
  const input = screen.getByLabelText('Password');
  expect(input).toHaveAttribute('type', 'password');
  await act(async () => await userEvent.click(screen.getByRole('button', { name: 'Show password' })));
  expect(input).toHaveAttribute('type', 'text');
});
