import { style } from '@vanilla-extract/css';

export const dot = style({
  height: '0.5rem',
  width: '0.5rem',
  borderRadius: '50%',
  backgroundColor: 'var(--transparent)',
  selectors: {
    '&.configured': {
      backgroundColor: 'var(--N400)'
    },
    '&.warning': {
      backgroundColor: 'var(--warning-color)'
    },
    '&.error': {
      backgroundColor: 'var(--error-color)'
    }
  }
});
