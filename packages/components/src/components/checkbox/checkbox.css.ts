import { globalStyle, style } from '@vanilla-extract/css';
import { disabled } from '../../styles/disabled';

export const checkboxRoot = style({
  backgroundColor: 'var(--background)',
  borderRadius: 'var(--border-radius)',
  border: 'var(--basic-border)',
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'var(--background-radio-checkbox)',
    border: 'var(--radio-checkbox-border)'
  },
  ':focus-visible': {
    boxShadow: 'var(--focus-shadow)'
  },
  ':disabled': disabled,
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: 'var(--background-radio-checkbox)',
      border: 'var(--radio-checkbox-border)'
    }
  }
});

export const checkboxIndicator = style({});

globalStyle(`${checkboxIndicator} svg path`, {
  fill: 'var(--radio-checkbox-icon-color)'
});
