import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const content = style({
  border: vars.border.basic,
  borderRadius: vars.border.r2,
  maxWidth: `calc(var(--radix-dropdown-menu-content-available-width) - 2 * var(--size-1) - 2px)`,
  minWidth: '8rem',
  width: '12rem',
  backgroundColor: vars.color.background,
  boxShadow: vars.shadow.popover,
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  color: vars.color.body,
  padding: vars.size.s1,
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
      animation: 'none'
    }
  }
});

export const menuItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.size.s1,
  userSelect: 'none',
  padding: `6px ${vars.size.s2}`,
  borderRadius: vars.border.r1,
  backgroundColor: 'transparent',
  fontSize: 12,
  outline: 0,
  ':focus': {
    backgroundColor: vars.color.p50
  },
  selectors: {
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: '.5'
    },
    '&[data-state="open"]': {
      backgroundColor: vars.color.p50
    }
  }
});

export const shortcut = style({
  opacity: '.4',
  fontSize: 12,
  lineHeight: '1rem',
  marginLeft: 'auto'
});

export const menuItemSubTriggerChevron = style({
  marginLeft: 'auto',
  selectors: {
    [`${shortcut} ~ &`]: {
      marginLeft: 0
    }
  }
});

export const menuItemWithIndicator = style({
  paddingLeft: '1.5rem'
});

export const menuItemIndicator = style({
  display: 'flex',
  position: 'absolute',
  left: '.7rem',
  alignItems: 'center',
  justifyContent: 'center',
  width: 15
});

export const menuItemRadioIndicator = style({
  '::after': {
    content: '',
    display: 'block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: vars.color.body
  }
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.size.s1,
  fontWeight: 600,
  padding: `6px ${vars.size.s2}`
});

export const separator = style({
  height: 1,
  backgroundColor: vars.color.n200,
  marginBlock: vars.size.s1,
  marginInline: `calc(-1 * ${vars.size.s1})`
});
