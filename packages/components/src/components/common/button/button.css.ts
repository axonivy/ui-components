import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';
import { transitionColors } from '@/styles/transition.css';
import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

const buttonBg = createVar();
const backgroundMix = `color-mix(in srgb, ${buttonBg}, ${vars.color.body} 15%)`;

export const button = recipe({
  base: [
    transitionColors,
    {
      borderRadius: vars.border.radius,
      fontWeight: 500,
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: vars.size.s1,
      padding: `${vars.size.s1} ${vars.size.s2}`,
      userSelect: 'none',
      border: 'none',
      outline: 'none',
      color: 'currentColor',
      vars: {
        [buttonBg]: vars.color.transparent
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
    }
  ],

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
