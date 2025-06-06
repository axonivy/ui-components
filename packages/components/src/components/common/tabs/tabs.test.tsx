import { composeStory } from '@storybook/react-vite';
import { customRender, screen, userEvent } from 'test-utils';
import Meta, { Default, InscriptionTabs } from './tabs.stories';

const Tabs = composeStory(Default, Meta);

test('toggle', async () => {
  customRender(<Tabs />);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
  const func = screen.getByRole('tab', { name: /Function/ });
  await userEvent.click(func);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Function list');

  const attr = screen.getByRole('tab', { name: /Attribute/ });
  await userEvent.click(attr);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
});

test('toggled with keyboard', async () => {
  customRender(<Tabs />);

  const attr = screen.getByRole('tab', { name: /Attribute/ });
  const func = screen.getByRole('tab', { name: /Function/ });

  await userEvent.tab();
  expect(attr).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');

  await userEvent.keyboard('[ArrowRight]');
  expect(func).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Function list');

  await userEvent.keyboard('[ArrowLeft]');
  expect(attr).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
});

const BasicTabs = composeStory(InscriptionTabs, Meta);

test('toggle basic inscription tabs', async () => {
  customRender(<BasicTabs />);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('General Content');
  const header = screen.getByRole('tab', { name: 'Header' });
  await userEvent.click(header);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Header Content');

  const general = screen.getByRole('tab', { name: /General/ });
  await userEvent.click(general);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('General Content');
});
