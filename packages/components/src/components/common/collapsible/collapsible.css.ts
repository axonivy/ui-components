import { globalStyle, keyframes, style } from '@vanilla-extract/css';

export const root = style({});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--size-1)',
  selectors: {
    [`${root}[data-state='open'] &`]: {
      justifyContent: 'space-between'
    }
  }
});

export const trigger = style({});

globalStyle(`${trigger} .ivy-toggle`, {
  fontSize: '20px',
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)'
});

globalStyle(`${trigger}[data-state="open"] .ivy-toggle`, {
  transform: 'rotate(90deg)'
});

export const state = style({
  selectors: {
    [`${root}[data-state='open'] &`]: {
      display: 'none'
    }
  }
});

export const controls = style({
  selectors: {
    [`${root}[data-state='closed'] &`]: {
      display: 'none'
    }
  }
});

const collapsableSlideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' }
});

const collapsableSlideUp = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 }
});

export const content = style({
  overflow: 'hidden',
  padding: '1px',
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
      animationName: collapsableSlideDown
    },
    '&[data-state="closed"]': {
      animationName: collapsableSlideUp
    }
  }
});
