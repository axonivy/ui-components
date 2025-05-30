import { composeStory } from '@storybook/react-vite';
import { act, customRender, screen, userEvent } from 'test-utils';
import Meta, { Default } from './tabs.stories';

const Tabs = composeStory(Default, Meta);

test('toggle', async () => {
  customRender(<Tabs />);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
  const func = screen.getByRole('tab', { name: /Function/ });
  await act(async () => await userEvent.click(func));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Function list');

  const attr = screen.getByRole('tab', { name: /Attribute/ });
  await act(async () => await userEvent.click(attr));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
});

test('toggled with keyboard', async () => {
  customRender(<Tabs />);

  const attr = screen.getByRole('tab', { name: /Attribute/ });
  const func = screen.getByRole('tab', { name: /Function/ });

  await act(async () => await userEvent.tab());
  expect(attr).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');

  await act(async () => await userEvent.keyboard('[ArrowRight]'));
  expect(func).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Function list');

  await act(async () => await userEvent.keyboard('[ArrowLeft]'));
  expect(attr).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
});
