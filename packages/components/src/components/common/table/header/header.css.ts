import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const sortHead = style({
  width: '100%'
});

export const sortButton = style({
  color: vars.color.n300,
  ':hover': {
    color: vars.color.body
  },
  selectors: {
    '&[data-sort-state="desc"]': {
      transform: 'rotate(180deg)'
    },
    '&:not([data-sort-state="false"])': {
      color: vars.color.body
    }
  }
});

export const expandButton = style({
  transform: 'rotate(90deg)',
  selectors: {
    '&[data-state=collapsed]': {
      transform: 'rotate(0deg)'
    }
  }
});

export const resizer = style({
  width: 3,
  borderRadius: vars.border.radius,
  height: 18,
  backgroundColor: vars.color.n200,
  cursor: 'col-resize',
  userSelect: 'none',
  touchAction: 'none',
  selectors: {
    '&:where(:hover, [data-resize-state="active"])': {
      backgroundColor: vars.color.p300
    }
  }
});
