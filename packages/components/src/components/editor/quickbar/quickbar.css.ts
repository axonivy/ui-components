import { style } from '@vanilla-extract/css';

export const quickbar = style({
  position: 'relative',
  inset: 0,
  width: '100%',
  zIndex: 10,
  userSelect: 'none'
});

export const anchor = style({
  position: 'absolute'
});
