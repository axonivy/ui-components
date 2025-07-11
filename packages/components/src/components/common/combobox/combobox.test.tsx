import { composeStory } from '@storybook/react-vite';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { Default, WithExtendedItem, WithFieldset } from './combobox.stories';

const Combobox = composeStory(Default, Meta);
const CustomItemCombobox = composeStory(WithExtendedItem, Meta);
const LabelCombobox = composeStory(WithFieldset, Meta);

test('open / close', async () => {
  customRender(<Combobox />);
  const input = screen.getByRole('combobox');
  const trigger = screen.getByRole('button', { name: 'toggle menu' });
  expect(input).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await userEvent.click(trigger);
  expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('dialog')).toHaveTextContent('en');
  expect(screen.getAllByRole('option')).toHaveLength(9);

  await userEvent.click(trigger);
  expect(input).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('select', async () => {
  customRender(<Combobox />);
  const input = screen.getByRole('combobox');
  const trigger = screen.getByRole('button', { name: 'toggle menu' });

  await userEvent.click(trigger);
  await userEvent.click(screen.getByRole('option', { name: 'fr' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(input).toHaveValue('fr');
});

test('keyboard', async () => {
  customRender(<Combobox />);
  const input = screen.getByRole('combobox');
  await userEvent.tab();
  expect(input).toHaveFocus();

  await userEvent.keyboard('e');
  expect(screen.getAllByRole('option')).toHaveLength(3);

  await userEvent.keyboard('[ArrowDown]');
  expect(screen.getAllByRole('option')[0]).toHaveAttribute('data-highlighted');
  expect(screen.getAllByRole('option')[1]).not.toHaveAttribute('data-highlighted');

  await userEvent.keyboard('[Enter]');
  expect(input).toHaveValue('en');
});

test('custom item and filter', async () => {
  customRender(<CustomItemCombobox />);
  const input = screen.getByRole('combobox');
  await userEvent.type(input, 'crazy');
  expect(screen.getAllByRole('option')).toHaveLength(1);

  await userEvent.click(screen.getByRole('option'));
  expect(input).toHaveValue('fr');
});

test('unknown input will not update', async () => {
  let data = 'test';
  customRender(<Combobox value={data} onChange={(change: string) => (data = change)} />);
  const input = screen.getByRole('combobox');
  await userEvent.type(input, '123');
  expect(input).toHaveValue('123');
  expect(data).toEqual('test');
});

test('readonly mode', () => {
  customRender(<Combobox />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('combobox')).toBeDisabled();
});

test('disabled mode', () => {
  customRender(<Combobox disabled={true} />);
  expect(screen.getByRole('combobox')).toBeDisabled();
});

test('label', async () => {
  customRender(<LabelCombobox />);
  const input = screen.getByRole('combobox', { name: 'Many entries' });
  expect(input).toBeInTheDocument();
});
