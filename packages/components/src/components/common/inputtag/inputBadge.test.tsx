import { composeStory } from '@storybook/react';
import { render, screen } from 'test-utils';
import Meta, { BadgeArea, Default } from './inputBadge.stories';
import { inputBadge } from './inputBadge.css';

const InputBadge = composeStory(Default, Meta);
const InputBadgeArea = composeStory(BadgeArea, Meta);

test('InputBadge', () => {
  render(<InputBadge />);
  expect(screen.getByText('ivy.log.info()')).toHaveClass(inputBadge);
  expect(screen.getByText('demoData')).toHaveClass(inputBadge);
  expect(screen.getByText('demoLogic')).toHaveClass(inputBadge);
  expect(screen.getByText('noBadge1')).not.toHaveClass(inputBadge);
});

test('InputBadgeArea', () => {
  render(<InputBadgeArea />);
  expect(screen.getByText('ivy.log.info()')).toHaveClass(inputBadge);
  expect(screen.getByText('demoData')).toHaveClass(inputBadge);
  expect(screen.getByText('demoLogic')).toHaveClass(inputBadge);
  expect(screen.getByText('noBadge1')).not.toHaveClass(inputBadge);
  expect(screen.getAllByRole('row')).toHaveLength(2);
});
