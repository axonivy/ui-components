import { composeStory } from '@storybook/react';
import { render, screen } from 'test-utils';
import { expect, test } from 'vitest';
import Meta, { WithControl, WithMessage } from './fieldset.stories';

const ControlField = composeStory(WithControl, Meta);
const MessageField = composeStory(WithMessage, Meta);

test('control', () => {
  render(<ControlField />);
  expect(screen.getByRole('button', { name: 'Remove row' })).toBeVisible();
});

test('message', async () => {
  render(<MessageField />);
  const input = screen.getByRole('textbox');
  const message = screen.getByRole('paragraph');
  expect(input).toHaveAttribute('aria-describedby', message.id);
});
