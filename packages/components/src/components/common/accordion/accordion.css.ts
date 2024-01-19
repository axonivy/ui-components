import { globalStyle, keyframes, style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column'
});

export const item = style({});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  gap: 'var(--size-1)',
  backgroundColor: 'var(--background)',
  borderBottom: 'var(--basic-border)',
  userSelect: 'none',
  selectors: {
    [`&[data-state='open']`]: {
      backgroundColor: 'var(--N75)',
      borderBottom: 'none'
    }
  }
});

globalStyle(`${header} .ivy-chevron`, {
  fontSize: '16px',
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)'
});

globalStyle(`${header}[data-state="open"] .ivy-chevron`, {
  transform: 'rotate(90deg)'
});

export const trigger = style({
  all: 'unset',
  padding: 'var(--size-3)',
  height: 16,
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--size-1)',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1',
  cursor: 'pointer',
  ':focus-visible': {
    border: 'var(--activ-border)'
  },
  selectors: {
    [`&[data-state='open']`]: {
      fontWeight: '600'
    }
  }
});

export const triggerContent = style({
  flex: '1 0 auto'
});

export const state = style({
  selectors: {
    [`${item}[data-state='open'] &`]: {
      display: 'none'
    }
  }
});

export const controls = style({
  marginRight: 'var(--size-3)',
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
  backgroundColor: 'var(--N75)',
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
  padding: 'var(--size-3) var(--size-2)',
  borderBottom: 'var(--basic-border)'
});
