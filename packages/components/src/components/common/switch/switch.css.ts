import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

const size = createVar();

export const switchSize = recipe({
  base: {
    vars: {
      [size]: '32px'
    }
  },
  variants: {
    size: {
      small: { vars: { [size]: '24px' } },
      large: { vars: { [size]: '42px' } }
    }
  }
});

export type SwitchVariants = RecipeVariants<typeof switchSize>;

export const root = style({
  all: 'unset',
  width: size,
  height: `calc(${size} * 0.5 + 4px)`,
  backgroundColor: vars.color.n100,
  borderRadius: 9999,
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '0.15s',
  cursor: 'pointer',
  ':focus-visible': {
    boxShadow: vars.shadow.focus
  },
  ':disabled': disabled,
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.p75
    }
  }
});

export const thumb = style({
  display: 'block',
  width: `calc(${size} * 0.5)`,
  aspectRatio: '1 / 1',
  backgroundColor: vars.color.background,
  borderRadius: 9999,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.p300,
      transform: `translateX(calc(${size} - (${size} * 0.5) - 2px))`
    }
  }
});
