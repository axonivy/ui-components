import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const inputBadgeOutput = style({
  borderRadius: vars.border.r1,
  border: vars.border.basic,
  background: vars.color.n25,
  fontSize: '12px',
  lineHeight: '12px',
  color: vars.color.body,
  textAlign: 'start',
  padding: vars.padding.input,
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  minHeight: '14px'
});

export const inputBadgeLine = style({
  height: '20px',
  whiteSpace: 'pre-wrap'
});

export const inputBadge = style({
  color: vars.color.body,
  padding: '2px 0.24em',
  backgroundColor: vars.color.n75,
  borderRadius: vars.border.r1,
  userSelect: 'none',
  border: vars.border.basic
});

export const inputBadgeIcon = style({
  marginRight: vars.size.s1,
  display: 'inline-block',
  width: '1em',
  height: '1em',
  verticalAlign: 'bottom'
});
