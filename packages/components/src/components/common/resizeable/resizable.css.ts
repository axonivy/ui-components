import { style } from '@vanilla-extract/css';

export const resizableGroup = style({});

export const resizableLine = style({
  width: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--N300)',
  ':hover': {
    backgroundColor: 'var(--A300)'
  },
  selectors: {
    '&[data-panel-group-direction="vertical"]': {
      width: '100%',
      height: 1
    },
    '&[data-resize-handle-active]': {
      backgroundColor: 'var(--A300)'
    }
  }
});

export const resizableHandle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--N300)',
  borderWidth: '1px',
  borderRadius: '3px',
  width: '.75rem',
  height: '1rem',
  zIndex: 10,
  selectors: {
    [`${resizableLine}[data-panel-group-direction="vertical"] &`]: {
      transform: 'rotate(90deg)'
    }
  }
});
