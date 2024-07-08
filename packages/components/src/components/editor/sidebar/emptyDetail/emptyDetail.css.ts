import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const emptyDetail = style({
  height: '100%',
  color: vars.color.n800
});

export const emptyDetailIcon = style({
  fontSize: '54px'
});

export const emptyDetailMessage = style({
  fontSize: '14px',
  textAlign: 'center',
  width: '70%'
});
