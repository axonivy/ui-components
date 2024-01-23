import { style } from '@vanilla-extract/css';

export const seperator = style({
  backgroundColor: 'var(--N300)',
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: 1,
      width: '100%',
      marginBlock: 'var(--size-4)'
    },
    '&[data-orientation="vertical"]': {
      height: '100%',
      width: 1,
      marginInline: 'var(--size-4)'
    }
  }
});
