import { composeStory } from '@storybook/react-vite';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { Default, WithLink } from './message.stories';

const Message = composeStory(Default, Meta);
const LinkMessage = composeStory(WithLink, Meta);

test('message', () => {
  customRender(<Message />);
  expect(screen.getByRole('paragraph')).not.toHaveAttribute('data-state');
  expect(screen.getByRole('paragraph')).toHaveTextContent('This is a message');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('description', () => {
  customRender(<Message variant='description' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'description');
});

test('info', () => {
  customRender(<Message variant='info' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'info');
});

test('warning', () => {
  customRender(<Message variant='warning' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'warning');
});

test('error', () => {
  customRender(<Message variant='error' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'error');
});

test('link', async () => {
  customRender(<LinkMessage />);
  expect(screen.getByRole('link')).toHaveTextContent('embedded');
});

test('reference shows its tooltip on hover and calls openUrl on click', async () => {
  const user = userEvent.setup();
  const openUrl = vi.fn();
  customRender(<Message reference={{ tooltip: 'Open documentation', openUrl }} variant='warning' singleLine />);

  const reference = screen.getByRole('button', { name: 'Open documentation' });
  expect(screen.getByRole('paragraph')).toContainElement(reference);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  await user.hover(reference);
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Open documentation');
  expect(openUrl).not.toHaveBeenCalled();
  await user.click(reference);
  expect(openUrl).toHaveBeenCalledTimes(1);
});
