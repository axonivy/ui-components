import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default, CustomPalette, PopoverPalette } from './palette.stories';

const Palette = composeStory(Default, Meta);
const Custom = composeStory(CustomPalette, Meta);
const Popover = composeStory(PopoverPalette, Meta);

global.alert = vi.fn();

test('search', async () => {
  render(<Palette />);
  expect(screen.getAllByRole('heading')).toHaveLength(3);
  expect(screen.getAllByRole('button')).toHaveLength(8);

  await userEvent.type(screen.getByRole('textbox'), 'ser');
  expect(screen.getAllByRole('heading')).toHaveLength(2);
  expect(screen.getAllByRole('button')).toHaveLength(4);
  expect(screen.getAllByRole('button')[1]).toHaveAccessibleName('User Task');

  await userEvent.click(screen.getAllByRole('button')[1]);
  expect(global.alert).toHaveBeenCalledWith('User Task');
});

test('keyboard', async () => {
  render(<Palette />);
  await userEvent.tab();
  expect(screen.getByRole('textbox')).toHaveFocus();

  await userEvent.tab();
  expect(screen.getAllByRole('button')[0]).toHaveFocus();
  await userEvent.keyboard('[Enter]');
  expect(global.alert).toHaveBeenCalledWith('User Task');
});

test('custom', async () => {
  render(<Custom />);
  expect(screen.getAllByRole('heading')).toHaveLength(3);
  expect(screen.getAllByRole('button')).toHaveLength(8);
  expect(screen.getAllByRole('button')[0]).toHaveAccessibleName('Input');
  expect(screen.getAllByRole('button')[0]).toHaveAttribute('draggable', 'true');

  await userEvent.type(screen.getByRole('textbox'), 'custom');
  expect(screen.getAllByRole('heading')).toHaveLength(1);
  expect(screen.getAllByRole('button')).toHaveLength(2);
  expect(screen.getAllByRole('button')[1]).toHaveAccessibleName('Textarea');
});

test('popover', async () => {
  render(<Popover />);
  await userEvent.click(screen.getByRole('button', { name: 'Default Palette' }));
  expect(screen.getByRole('button', { name: 'User Task' })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Custom Palette' }));
  expect(screen.getByRole('button', { name: 'Input' })).toBeInTheDocument();
});
