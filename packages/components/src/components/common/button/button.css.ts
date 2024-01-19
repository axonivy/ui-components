import { style } from '@vanilla-extract/css';
import { disabled } from '@/styles/disabled';

export const button = style({
  all: 'unset',
  borderRadius: 'var(--border-radius)',
  fontWeight: 500,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--size-1)',
  padding: 'var(--size-1) var(--size-2)',
  userSelect: 'none',
  vars: {
    '--button-bg': 'transparent'
  },
  backgroundColor: 'var(--button-bg)',
  transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '0.15s',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'color-mix(in srgb, var(--button-bg), var(--body) 15%)'
  },
  ':focus-visible': {
    backgroundColor: 'color-mix(in srgb, var(--button-bg), var(--body) 15%)',
    boxShadow: 'var(--focus-shadow)'
  },
  ':disabled': disabled,
  selectors: {
    '&.small': {
      fontSize: '12px',
      paddingBlock: 0,
      paddingInline: 'var(--size-1)'
    },
    '&.large': {
      fontSize: '16px'
    },
    '&.primary': {
      vars: {
        '--button-bg': 'var(--A300)'
      },
      color: 'white'
    },
    '&.outline': {
      border: '1px solid var(--N200)'
    },
    '&[data-state="on"]': {
      backgroundColor: 'color-mix(in srgb, var(--button-bg), var(--body) 15%)'
    }
  }
});

export const iconOnly = style({
  selectors: {
    [`${button}&`]: {
      height: 20,
      aspectRatio: '1 / 1',
      fontSize: '16px',
      padding: 0
    },
    [`${button}.large&`]: {
      height: 26
    }
  }
});
