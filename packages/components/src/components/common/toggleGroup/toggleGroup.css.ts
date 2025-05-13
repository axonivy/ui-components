import { vars } from '@/styles/theme.css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const toggleGroup = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.size.s2
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

export type ToggleGroupVariants = RecipeVariants<typeof toggleGroup>;
