import { style } from '@vanilla-extract/css';

export const expandButton = style({
  transform: 'rotate(90deg)',
  selectors: {
    '&[data-state=collapsed]': {
      transform: 'rotate(0deg)'
    }
  }
});

export const cellIcon = style({
  fontSize: '16px'
});
