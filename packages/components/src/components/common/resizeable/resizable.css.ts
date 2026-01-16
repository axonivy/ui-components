import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const resizableLine = style({
  width: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: vars.color.n200,
  selectors: {
    '&[aria-orientation="horizontal"]': {
      width: '100%',
      height: 1
    },
    '&[data-separator=hover]': {
      backgroundColor: vars.color.p300
    },
    '&[data-separator=active]': {
      backgroundColor: vars.color.p300
    }
  }
});

export const resizableHandle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: vars.color.n200,
  borderWidth: '1px',
  borderRadius: '3px',
  width: '.75rem',
  height: '1rem',
  zIndex: 10,
  selectors: {
    [`${resizableLine}[aria-orientation="horizontal"] &`]: {
      transform: 'rotate(90deg)'
    }
  }
});
