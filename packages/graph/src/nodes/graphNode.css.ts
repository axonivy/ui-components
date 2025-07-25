import { vars } from '@axonivy/ui-components';
import { style } from '@vanilla-extract/css';

export const node = style({
  width: '100%',
  height: '100%',
  textAlign: 'left',
  borderRadius: '5px',
  background: vars.color.background,
  display: 'inline-block',
  border: `1px solid ${vars.color.body}`,
  selectors: {
    '&[data-highlight="true"]': {
      borderColor: vars.color.success
    },
    '&[data-selected="true"]': {
      borderColor: vars.color.p300
    }
  }
});

export const customNodeHeaderLabel = style({
  fontWeight: 'bold'
});

export const customNodeHeaderInfo = style({
  color: vars.color.n700
});

export const expander = style({
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)',
  transform: 'rotate(90deg)',
  selectors: {
    '&[aria-expanded="true"]': {
      transform: 'rotate(270deg)'
    }
  }
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
