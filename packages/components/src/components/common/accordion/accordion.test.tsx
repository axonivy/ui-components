import { composeStory } from '@storybook/react-vite';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { Controls, Default, State } from './accordion.stories';

const Accordion = composeStory(Default, Meta);
const StateAccordion = composeStory(State, Meta);
const ControlAccordion = composeStory(Controls, Meta);

test('open', async () => {
  userEvent.setup();
  customRender(<Accordion />);
  const items = screen.getAllByRole('button');
  expect(items).toHaveLength(3);
  expect(items.at(0)).toHaveAttribute('data-state', 'closed');
  expect(screen.queryByRole('region')).not.toBeInTheDocument();

  await userEvent.click(items[0]!);
  expect(items.at(0)).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('WAI-ARIA design pattern');

  await userEvent.click(items[1]!);
  expect(items.at(0)).toHaveAttribute('data-state', 'closed');
  expect(items.at(1)).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('default styles');
});

test('keyboard', async () => {
  userEvent.setup();
  customRender(<Accordion />);
  const items = screen.getAllByRole('button');
  expect(screen.queryByRole('region')).not.toBeInTheDocument();

  await userEvent.tab();
  expect(items.at(0)).toHaveFocus();

  await userEvent.tab();
  expect(items.at(1)).toHaveFocus();

  await userEvent.keyboard('[Enter]');
  expect(items.at(1)).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('default styles');

  await userEvent.keyboard('[Space]');
  expect(items.at(1)).toHaveAttribute('data-state', 'closed');
});

test('state', async () => {
  userEvent.setup();
  customRender(<StateAccordion />);
  const states = screen.getAllByRole('status');
  expect(states).toHaveLength(3);
  expect(states.at(0)).toHaveAttribute('data-state', 'configured');
  expect(states.at(1)).toHaveAttribute('data-state', 'warning');
  expect(states.at(2)).toHaveAttribute('data-state', 'error');
});

test('control', async () => {
  customRender(<ControlAccordion />);
  expect(screen.getByRole('button', { name: 'Reset' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'With control' })).toBeVisible();
});
