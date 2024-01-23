import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';
import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

const buttonBg = createVar();
const backgroundMix = `color-mix(in srgb, ${buttonBg}, ${vars.color.body} 15%)`;

export const button = recipe({
  base: {
    all: 'unset',
    borderRadius: vars.border.radius,
    fontWeight: 500,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.size.s1,
    padding: `${vars.size.s1} ${vars.size.s2}`,
    userSelect: 'none',
    vars: {
      [buttonBg]: vars.color.transparent
    },
    backgroundColor: buttonBg,
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '0.15s',
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
  },

  variants: {
    variant: {
      primary: {
        vars: {
          [buttonBg]: vars.color.p300
        },
        color: 'white'
      },
      outline: { border: vars.border.basic }
    },
    size: {
      small: {
        fontSize: '12px',
        paddingBlock: 0,
        paddingInline: vars.size.s1
      },
      large: { fontSize: '16px' }
    }
  }
});

export type ButtonVariants = RecipeVariants<typeof button>;

export const iconOnly = recipe({
  base: {
    height: 20,
    aspectRatio: '1 / 1',
    fontSize: '16px',
    padding: 0
  },
  variants: {
    size: {
      small: {},
      large: { height: 26 }
    }
  }
});
