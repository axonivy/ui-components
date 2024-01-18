import { style } from '@vanilla-extract/css';
import { disabled } from '../../styles/disabled';

export const input = style({
  all: 'unset',
  borderRadius: 'var(--border-radius)',
  border: 'var(--basic-border)',
  background: 'var(--background)',
  fontSize: 12,
  lineHeight: '12px',
  color: 'var(--body)',
  textAlign: 'start',
  padding: 'var(--input-padding)',
  width: 'calc(100% - 2 * var(--input-padding) - 2px)',
  ':disabled': disabled,
  ':focus': {
    border: 'var(--activ-border)'
  }
});
