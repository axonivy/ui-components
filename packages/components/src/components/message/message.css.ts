import { style } from '@vanilla-extract/css';

export const message = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--size-1)',
  margin: 0,
  paddingInline: 'var(--size-1)',
  fontSize: 12,
  fontWeight: 400,
  selectors: {
    '&.error': {
      color: 'var(--error-color)'
    },
    '&.warning': {
      color: 'var(--warning-color)'
    },
    '&.description': {
      color: 'var(--N700)'
    }
  }
});
