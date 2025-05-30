import { composeStory } from '@storybook/react-vite';
import { customRender, screen } from 'test-utils';
import Meta, { Default, WithLink } from './message.stories';

const Message = composeStory(Default, Meta);
const LinkMessage = composeStory(WithLink, Meta);

test('message', () => {
  customRender(<Message />);
  expect(screen.getByRole('paragraph')).not.toHaveAttribute('data-state');
  expect(screen.getByRole('paragraph')).toHaveTextContent('This is a message');
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
