import { style } from '@vanilla-extract/css';

export const node = style({
  width: '100%',
  height: '100%',
  textAlign: 'left',
  borderRadius: '5px',
  background: 'white',
  display: 'inline-block',
  border: '1px solid  var(--body)',
  selectors: {
    '&[data-highlight="true"]': {
      border: '2px solid var(--success-color)'
    },
    '&[data-selected="true"]': {
      border: '2px solid var(--P500)'
    }
  }
});

export const customNodeHeaderLabel = style({
  fontWeight: 'bold'
});

export const customNodeHeaderInfo = style({
  color: 'var(--N700)'
});

export const expander = style({
  cursor: 'pointer',
  fontSize: '16px'
});

export const expanderOpen = style({
  transform: 'rotate(270deg)',
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)'
});

export const expanderClose = style({
  transform: 'rotate(90deg)',
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)'
});

export const containerPadding = style({
  padding: '10px'
});

export const minWidth = style({
  minWidth: '150px'
});

export const iconHeight = style({
  height: '20px'
});

export const handle = style({
  pointerEvents: 'none',
  opacity: 1,
  selectors: {
    '&[data-handles="true"]': {
      opacity: 0
    }
  }
});
