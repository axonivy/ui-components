import { composeStory } from '@storybook/react-vite';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { Basic, Controls, Default, State } from './collapsible.stories';

const Collapsible = composeStory(Default, Meta);
const StateCollapsible = composeStory(State, Meta);
const ControlCollapsible = composeStory(Controls, Meta);
const BasicCollapsible = composeStory(Basic, Meta);

test('open', async () => {
  userEvent.setup();
  customRender(<Collapsible />);
  const trigger = screen.getByRole('button');
  expect(trigger).toHaveAttribute('data-state', 'closed');
  expect(screen.queryByRole('region')).not.toBeInTheDocument();

  await userEvent.click(trigger);
  expect(trigger).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('@radix-ui/colors');

  await userEvent.click(trigger);
  expect(trigger).toHaveAttribute('data-state', 'closed');
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
});

test('keyboard', async () => {
  userEvent.setup();
  customRender(<Collapsible />);
  const trigger = screen.getByRole('button');
  expect(screen.queryByRole('region')).not.toBeInTheDocument();

  await userEvent.tab();
  expect(trigger).toHaveFocus();

  await userEvent.keyboard('[Enter]');
  expect(trigger).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('region')).toHaveTextContent('@radix-ui/colors');

  await userEvent.keyboard('[Space]');
  expect(trigger).toHaveAttribute('data-state', 'closed');
});

test('state', async () => {
  userEvent.setup();
  customRender(<StateCollapsible />);
  const state = screen.getByRole('status');
  expect(state).toHaveAttribute('data-state', 'warning');
});

test('control', async () => {
  customRender(<ControlCollapsible />);
  expect(screen.getByRole('button', { name: 'Maximize' })).toBeVisible();
});

describe('basic', () => {
  test('closed', async () => {
    const view = customRender(<BasicCollapsible state={undefined} />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'closed');

    view.rerender(<BasicCollapsible state={undefined} open={false} />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'closed');

    view.rerender(<BasicCollapsible state={undefined} defaultOpen={false} />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'closed');
  });

  test('open', async () => {
    const view = customRender(<BasicCollapsible />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'open');

    view.rerender(<BasicCollapsible state={undefined} open={true} />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'open');

    view.rerender(<BasicCollapsible state={undefined} defaultOpen={true} />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'open');
  });

  test('change open state', async () => {
    const view = customRender(<BasicCollapsible state={undefined} open={false} />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'closed');

    view.rerender(<BasicCollapsible state={undefined} open={true} />);
    expect(screen.getByRole('button', { name: 'Basic' })).toHaveAttribute('data-state', 'open');
  });
});
