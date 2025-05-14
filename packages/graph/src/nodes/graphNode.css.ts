import { style } from '@vanilla-extract/css';
import { vars } from '@axonivy/ui-components';

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
