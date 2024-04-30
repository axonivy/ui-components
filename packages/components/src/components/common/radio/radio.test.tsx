import { composeStory } from '@storybook/react';
import { act, render, screen, userEvent } from 'test-utils';
import { expect, test } from 'vitest';
import Meta, { Default } from './radio.stories';

const Radio = composeStory(Default, Meta);

test('toggle', async () => {
  render(<Radio />);
  const radios = screen.getAllByRole('radio');
  expect(radios.at(0)).toBeChecked();
  expect(radios.at(1)).not.toBeChecked();
  expect(radios.at(2)).not.toBeChecked();

  await act(async () => await userEvent.click(radios.at(1)!));
  expect(radios.at(0)).not.toBeChecked();
  expect(radios.at(1)).toBeChecked();
  expect(radios.at(2)).not.toBeChecked();

  await act(async () => await userEvent.click(radios.at(2)!));
  expect(radios.at(0)).not.toBeChecked();
  expect(radios.at(1)).not.toBeChecked();
  expect(radios.at(2)).toBeChecked();
});

test('toggle by label', async () => {
  render(<Radio />);
  const radios = screen.getAllByRole('radio');
  const label = screen.getByLabelText('Option Two');

  await act(async () => await userEvent.click(label));
  expect(radios.at(0)).not.toBeChecked();
  expect(radios.at(1)).toBeChecked();
  expect(radios.at(2)).not.toBeChecked();
});

test('toggled with keyboard', async () => {
  render(<Radio />);
  const radios = screen.getAllByRole('radio');
  await userEvent.tab();
  expect(radios.at(0)).toHaveFocus();
  expect(radios.at(0)).toBeChecked();

  await act(async () => await userEvent.keyboard('[ArrowRight]'));
  await act(async () => await userEvent.keyboard('[Space]'));
  expect(radios.at(1)).toHaveFocus();
  expect(radios.at(1)).toBeChecked();

  await act(async () => await userEvent.keyboard('[ArrowLeft]'));
  await act(async () => await userEvent.keyboard('[Space]'));
  expect(radios.at(0)).toHaveFocus();
  expect(radios.at(0)).toBeChecked();
});

test('readonly mode', () => {
  render(<Radio />, { wrapperProps: { readonly: true } });
  screen.debug();
  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  expect(screen.getAllByRole('radio').at(0)).toBeDisabled();
});

test('disabled mode', () => {
  render(<Radio disabled={true} />);
  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  expect(screen.getAllByRole('radio').at(0)).toBeDisabled();
});
