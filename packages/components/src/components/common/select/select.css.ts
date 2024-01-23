import { style } from '@vanilla-extract/css';
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

export const trigger = style({
  cursor: 'pointer',
  padding: vars.padding.input,
  fontSize: 12,
  borderRadius: vars.border.radius,
  border: vars.border.basic,
  background: vars.color.background,
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.size.s1,
  width: '100%',
  ':disabled': disabled,
  ':focus': {
    border: vars.border.active
  }
});

export const scrollButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.size.s1
});

export const content = style({
  maxHeight: '20rem',
  width: 'var(--radix-popper-anchor-width)',
  backgroundColor: vars.color.background,
  padding: 0,
  zIndex: 10,
  boxShadow: vars.shadow.editor,
  borderRadius: vars.border.radius,
  overflow: 'hidden',
  position: 'relative',
  border: vars.border.basic,
  animationDuration: '200ms',
  selectors: {
    '&[data-state="open"][data-side="top"]': {
      animationName: slideDownAndFade
    },
    '&[data-state="open"][data-side="right"]': {
      animationName: slideLeftAndFade
    },
    '&[data-state="open"][data-side="bottom"]': {
      animationName: slideUpAndFade
    },
    '&[data-state="open"][data-side="left"]': {
      animationName: slideRightAndFade
    }
  },
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'nome'
    }
  }
});

export const viewport = style({
  padding: vars.size.s1
});

export const label = style({
  padding: vars.size.s2,
  paddingLeft: '2rem',
  fontWeight: 'bold'
});

export const item = style({
  display: 'flex',
  position: 'relative',
  padding: vars.size.s2,
  paddingLeft: '2rem',
  alignItems: 'center',
  outline: 0,
  userSelect: 'none',
  selectors: {
    '&[data-highlighted]': {
      background: vars.color.p50
    },
    '&[data-state="checked"]': {
      background: vars.color.p300,
      color: 'white'
    },
    '&[data-disabled]': disabled
  }
});

export const itemIcon = style({
  display: 'flex',
  position: 'absolute',
  left: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  width: '0.875rem',
  height: '0.875rem'
});

export const seperator = style({
  marginBlock: vars.size.s1,
  marginInline: `calc(-1 * ${vars.size.s1})`,
  height: 1,
  backgroundColor: vars.color.n200
});
