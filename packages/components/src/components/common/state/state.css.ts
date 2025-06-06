import { vars } from '@/styles/theme.css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const dot = recipe({
  base: {
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '50%',
    backgroundColor: 'transparent'
  },

  variants: {
    state: {
      configured: { backgroundColor: vars.color.n400 },
      warning: { backgroundColor: vars.color.warning },
      error: { backgroundColor: vars.color.error }
    },
    size: {
      normal: {
        width: '0.5rem',
        height: '0.5rem'
      },
      small: {
        width: '0.4rem',
        height: '0.4rem'
      }
    }
  }
});

export type DotVariants = RecipeVariants<typeof dot>;
