import { composeStory } from '@storybook/react-vite';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { Default } from './dialog.stories';

const BasicDialog = composeStory(Default, Meta);

test('BasicDialog', async () => {
  customRender(<BasicDialog />);
  expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Open Dialog' }));
  expect(screen.getByRole('button', { name: 'Close' })).be.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
});
