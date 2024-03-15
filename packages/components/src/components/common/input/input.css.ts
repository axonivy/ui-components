import { style } from '@vanilla-extract/css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

const base = style({
  borderRadius: vars.border.radius,
  border: vars.border.basic,
  background: vars.color.background
});

export const inputGroup = style([
  base,
  {
    paddingInlineEnd: vars.size.s2,
    ':focus-within': {
      border: vars.border.active
    }
  }
]);

export const input = style([
  base,
  {
    fontSize: 12,
    lineHeight: '12px',
    color: vars.color.body,
    textAlign: 'start',
    padding: vars.padding.input,
    width: `calc(100% - 2 * ${vars.padding.input} - 2px)`,
    outline: 'none',
    ':disabled': disabled,
    ':focus': {
      border: vars.border.active
    },
    selectors: {
      [`${inputGroup} > &`]: {
        border: 'none'
      }
    }
  }
]);
