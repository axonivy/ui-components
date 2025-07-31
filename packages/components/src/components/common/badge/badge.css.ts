import { vars } from '@/styles/theme.css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const badge = recipe({
  base: [
    {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: vars.size.s1,
      width: 'fit-content',
      color: vars.color.background,
      backgroundColor: vars.color.p300,
      border: '1px solid transparent',
      borderRadius: vars.border.r2,
      whiteSpace: 'nowrap',
      fontSize: '12px',
      padding: vars.size.s1,
      height: 15
    }
  ],
  variants: {
    variant: {
      default: {},
      primary: {
        color: vars.color.p300,
        backgroundColor: vars.color.p50
      },
      secondary: {
        color: vars.color.body,
        backgroundColor: vars.color.n100
      },
      destructive: {
        backgroundColor: vars.color.error
      },
      outline: {
        color: vars.color.body,
        backgroundColor: 'transparent',
        borderColor: vars.color.n100
      }
    },
    size: {
      default: {},
      s: {
        fontSize: '11px',
        padding: '2px',
        height: 13,
        borderRadius: vars.border.r2
      },
      xs: {
        fontSize: '10px',
        padding: '2px',
        height: 10,
        borderRadius: vars.border.r1
      }
    },
    round: {
      false: {},
      true: {
        borderRadius: 9999,
        aspectRatio: '1 / 1'
      }
    }
  }
});

export type BadgeVariants = RecipeVariants<typeof badge>;
