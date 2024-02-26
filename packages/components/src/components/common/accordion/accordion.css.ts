import { vars } from '@/styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column'
});

export const item = style({
  border: '1px solid transparent',
  borderBottom: vars.border.basic,
  selectors: {
    '&[data-state="open"]': {
      border: `1px solid ${vars.color.n400}`
    }
  }
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  gap: vars.size.s1,
  backgroundColor: vars.color.background,
  userSelect: 'none',
  selectors: {
    '&[data-state="open"]': {
      borderBottom: 'none'
    }
  }
});

export const trigger = style({
  all: 'unset',
  padding: vars.size.s3,
  height: 16,
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  gap: vars.size.s1,
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1',
  cursor: 'pointer',
  ':focus-visible': {
    border: vars.border.active
  },
  selectors: {
    '&[data-state="open"]': {
      fontWeight: '600',
      color: vars.color.p300
    }
  }
});

export const triggerChevron = style({
  padding: vars.size.s3,
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    '&[data-state="open"]': {
      transform: 'rotate(90deg)'
    }
  }
});

export const state = style({
  selectors: {
    [`${item}[data-state='open'] &`]: {
      display: 'none'
    }
  }
});

export const controls = style({
  selectors: {
    [`${item}[data-state='closed'] &`]: {
      display: 'none'
    }
  }
});

const accordionSlideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' }
});

const accordionSlideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 }
});

export const content = style({
  overflow: 'hidden',
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.87, 0, 0.13, 1)',
  willChange: 'height',
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'none'
    }
  },
  selectors: {
    '&[data-state="open"]': {
      animationName: accordionSlideDown
    },
    '&[data-state="closed"]': {
      animationName: accordionSlideUp
    }
  }
});

export const contentData = style({
  padding: `${vars.size.s3} ${vars.size.s2}`
});
