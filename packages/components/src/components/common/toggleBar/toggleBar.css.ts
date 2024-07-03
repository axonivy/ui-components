import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const buttonBg = createVar();
const backgroundMix = `color-mix(in srgb, ${buttonBg}, ${vars.color.body} 15%)`;

export const button = style({
  all: 'unset'
});

export const toggleBar = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.size.s2,
    padding: '10px',
    backgroundColor: vars.color.background,
    borderRadius: vars.border.r2
  },
  variants: {
    gap: {
      1: { gap: vars.size.s1 },
      2: { gap: vars.size.s2 },
      3: { gap: vars.size.s3 },
      4: { gap: vars.size.s4 }
    }
  }
});

export const toggleBarItem = style({
  borderRadius: vars.border.r1,
  gap: '5px',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  border: 'none',
  outline: 'none',
  color: 'currentColor',
  padding: vars.size.s1,
  vars: {
    [buttonBg]: 'transparent'
  },
  backgroundColor: buttonBg,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: backgroundMix
  },
  ':focus-visible': {
    backgroundColor: backgroundMix,
    boxShadow: vars.shadow.focus
  },
  ':disabled': disabled,
  selectors: {
    '&[data-state="on"]': {
      backgroundColor: backgroundMix
    }
  }
});

export const iconOnly = recipe({
  base: {
    height: 20,
    aspectRatio: '1 / 1',
    fontSize: '16px'
  },
  variants: {
    size: {
      small: {},
      large: { height: 26 }
    }
  }
});
