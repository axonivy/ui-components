import { style } from '@vanilla-extract/css';
import { disabled } from '../../styles/disabled';

export const textarea = style({
  all: 'unset',
  display: 'flex',
  borderRadius: 'var(--border-radius)',
  border: 'var(--basic-border)',
  background: 'var(--background)',
  fontSize: 12,
  lineHeight: '14px',
  color: 'var(--body)',
  textAlign: 'start',
  padding: 'var(--input-padding)',
  width: 'calc(100% - 2 * var(--input-padding) - 2px)',
  resize: 'vertical',
  whiteSpace: 'pre-wrap',
  ':disabled': disabled,
  ':focus': {
    border: 'var(--activ-border)'
  }
});
