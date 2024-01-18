import { style } from '@vanilla-extract/css';
import { disabled } from '../../styles/disabled';

export const radioGroup = style({
  display: 'flex',
  gap: 'var(--size-4)',
  selectors: {
    '&[data-orientation="vertical"]': {
      flexDirection: 'column',
      gap: 'var(--size-2)'
    }
  }
});

export const radioGroupItem = style({
  all: 'unset',
  backgroundColor: 'var(--background)',
  width: 15,
  height: 15,
  borderRadius: '100%',
  border: 'var(--basic-border)',
  flexShrink: 0,
  ':hover': {
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

export const radioGroupIdicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '::after': {
    content: '',
    display: 'block',
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: 'var(--radio-checkbox-icon-color)'
  }
});
