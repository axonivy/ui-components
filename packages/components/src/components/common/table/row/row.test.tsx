import { composeStory } from '@storybook/react';
import { act, render, screen, userEvent } from 'test-utils';
import Meta, { Select, Message, Reorder } from './row.stories';

const SelectTable = composeStory(Select, Meta);
const MessageTable = composeStory(Message, Meta);
const ReorderTable = composeStory(Reorder, Meta);

test('select', async () => {
  render(<SelectTable />);
  const row = screen.getAllByRole('row')[1];
  expect(row).toHaveAttribute('data-state', 'unselected');
  await act(async () => await userEvent.click(row));
  expect(row).toHaveAttribute('data-state', 'selected');
});

test('message', async () => {
  render(<MessageTable />);
  const row = screen.getAllByRole('row')[4];
  expect(row).toHaveClass('ui-message-row');
  expect(row).toHaveTextContent('This is an error');
});

test('reorder', async () => {
  render(<ReorderTable />);
  const row = screen.getAllByRole('row')[1];
  expect(row).toHaveAttribute('draggable', 'true');
  expect(row).toHaveAttribute('data-drag-state', 'false');
  expect(row).toHaveAttribute('data-drop-target-state', 'false');
});
