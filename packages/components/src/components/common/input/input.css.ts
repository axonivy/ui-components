import { style } from '@vanilla-extract/css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

export const input = style({
  all: 'unset',
  borderRadius: vars.border.radius,
  border: vars.border.basic,
  background: vars.color.background,
  fontSize: 12,
  lineHeight: '12px',
  color: vars.color.body,
  textAlign: 'start',
  padding: vars.padding.input,
  width: `calc(100% - 2 * ${vars.padding.input} - 2px)`,
  ':disabled': disabled,
  ':focus': {
    border: vars.border.active
  }
});
