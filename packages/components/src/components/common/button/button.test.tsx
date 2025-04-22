import { composeStory } from '@storybook/react';
import { customRender, screen } from 'test-utils';
import Meta, { Default } from './button.stories';

const Button = composeStory(Default, Meta);

test('toggle', async () => {
  customRender(<Button toggle={undefined}>Button</Button>);
  const checkbox = screen.getByRole('button');
  expect(checkbox).not.toHaveAttribute('data-state');
  expect(checkbox).not.toHaveAttribute('aria-pressed');
});

test('toggle off', async () => {
  customRender(<Button toggle={false}>Button</Button>);
  const checkbox = screen.getByRole('button');
  expect(checkbox).toHaveAttribute('data-state', 'off');
  expect(checkbox).toHaveAttribute('aria-pressed', 'false');
});

test('toggle on', async () => {
  customRender(<Button toggle={true}>Button</Button>);
  const checkbox = screen.getByRole('button');
  expect(checkbox).toHaveAttribute('data-state', 'on');
  expect(checkbox).toHaveAttribute('aria-pressed', 'true');
});

test('readonly mode', () => {
  customRender(<Button />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('button')).not.toBeDisabled();
});

test('disabled mode', () => {
  customRender(<Button disabled={true} />);
  expect(screen.getByRole('button')).toBeDisabled();
});
