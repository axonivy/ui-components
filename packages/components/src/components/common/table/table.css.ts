import { vars } from '@/styles/theme.css';
import { transitionColors } from '@/styles/transition.css';
import { style } from '@vanilla-extract/css';

export const root = style({
  borderRadius: vars.border.radius,
  overflow: 'auto',
  border: vars.border.basic
});

export const table = style({
  overflow: 'auto',
  maxHeight: '100%',
  width: '100%',
  maxWidth: '100%',
  borderSpacing: 0,
  background: vars.color.background,
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
  fontSize: '12px'
});

export const header = style({
  textAlign: 'left',
  borderBottom: vars.border.basic
});

export const body = style({
  borderBottom: vars.border.basic
});

export const footer = style({
  backgroundColor: vars.color.n100
});

export const row = style([
  transitionColors,
  {
    borderBottom: vars.border.basic,
    ':last-child': {
      borderBottom: 'none'
    }
  }
]);

export const head = style({
  height: 20,
  padding: vars.size.s2,
  fontWeight: 'normal',
  verticalAlign: 'middle'
});

export const cell = style({
  verticalAlign: 'middle',
  padding: vars.size.s2,
  selectors: {
    [`&:has(.ui-table-edit-cell)`]: {
      padding: 0
    }
  }
});
