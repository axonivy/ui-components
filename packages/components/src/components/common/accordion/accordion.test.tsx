import { composeStory } from '@storybook/react';
import { act, render, screen, userEvent } from 'test-utils';
import { expect, test } from 'vitest';
import Meta, { Default, State, Controls } from './accordion.stories';

const Accordion = composeStory(Default, Meta);
const StateAccordion = composeStory(State, Meta);
const ControlAccordion = composeStory(Controls, Meta);

test('open', async () => {
  userEvent.setup();
  render(<Accordion />);
  const items = screen.getAllByRole('button');
  expect(items).toHaveLength(3);
  expect(items.at(0)).toHaveAttribute('data-state', 'closed');
  expect(screen.queryByRole('region')).not.toBeInTheDocument();

  await act(async () => await userEvent.click(items.at(0)!));
  expect(items.at(0)).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('WAI-ARIA design pattern');

  await act(async () => await userEvent.click(items.at(1)!));
  expect(items.at(0)).toHaveAttribute('data-state', 'closed');
  expect(items.at(1)).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('default styles');
});

test('keyboard', async () => {
  userEvent.setup();
  render(<Accordion />);
  const items = screen.getAllByRole('button');
  expect(screen.queryByRole('region')).not.toBeInTheDocument();

  await userEvent.tab();
  expect(items.at(0)).toHaveFocus();

  await userEvent.tab();
  expect(items.at(1)).toHaveFocus();

  await act(async () => await userEvent.keyboard('[Enter]'));
  expect(items.at(1)).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('default styles');

  await act(async () => await userEvent.keyboard('[Space]'));
  expect(items.at(1)).toHaveAttribute('data-state', 'closed');
});

test('state', async () => {
  userEvent.setup();
  render(<StateAccordion />);
  const states = screen.getAllByRole('tooltip');
  expect(states).toHaveLength(3);
  expect(states.at(0)).toHaveAttribute('data-state', 'configured');
  expect(states.at(1)).toHaveAttribute('data-state', 'warning');
  expect(states.at(2)).toHaveAttribute('data-state', 'error');
});

test('control', async () => {
  render(<ControlAccordion />);
  expect(screen.getByRole('button', { name: 'Reset' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'With control' })).toBeVisible();
});
