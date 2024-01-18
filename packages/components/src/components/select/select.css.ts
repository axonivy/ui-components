import { style } from '@vanilla-extract/css';
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '../../styles/keyframes.css';
import { disabled } from '../../styles/disabled';

export const trigger = style({
  cursor: 'pointer',
  padding: 'var(--input-padding)',
  fontSize: 12,
  borderRadius: 'var(--border-radius)',
  border: 'var(--basic-border)',
  background: 'var(--background)',
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--size-1)',
  width: '100%',
  ':disabled': disabled,
  ':focus': {
    border: 'var(--activ-border)'
  }
});

export const scrollButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--size-1)'
});

export const content = style({
  maxHeight: '20rem',
  width: 'var(--radix-popper-anchor-width)',
  backgroundColor: 'var(--background)',
  padding: 0,
  zIndex: 10,
  boxShadow: 'var(--editor-shadow)',
  borderRadius: 'var(--border-radius)',
  overflow: 'hidden',
  position: 'relative',
  borderWidth: 1,
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
  padding: 'var(--size-1)'
});

export const label = style({
  padding: 'var(--size-2)',
  paddingLeft: '2rem',
  fontWeight: 'bold'
});

export const item = style({
  display: 'flex',
  position: 'relative',
  padding: 'var(--size-2)',
  paddingLeft: '2rem',
  alignItems: 'center',
  outline: 0,
  userSelect: 'none',
  ':hover': {
    background: 'var(--A50)'
  },
  ':focus': {
    background: 'var(--A300)',
    color: 'var(--selected-row-text-color)'
  },
  selectors: {
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
  marginBlock: 'var(--size-1)',
  marginInline: 'calc(-1 * var(--size-1))',
  height: 1,
  backgroundColor: 'var(--N300)'
});
