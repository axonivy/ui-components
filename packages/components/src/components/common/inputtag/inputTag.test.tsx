import { composeStory } from '@storybook/react';
import { render, screen } from 'test-utils';
import Meta, { Default, TagArea } from './inputTag.stories';

const InputTag = composeStory(Default, Meta);
const InputTagArea = composeStory(TagArea, Meta);

test('InputTag', () => {
  render(<InputTag />);
  expect(screen.getByText('tag1')).toHaveClass('input-tag');
  expect(screen.getByText('noTag')).toHaveClass('input-text');
});

test('InputTagArea', () => {
  render(<InputTagArea />);
  expect(screen.getByText('tag2')).toHaveClass('input-tag');
  expect(screen.getByText('noTag1')).toHaveClass('input-text');
  expect(screen.getAllByRole('row')).toHaveLength(3);
});
