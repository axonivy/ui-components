import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const flex = recipe({
  base: {
    display: 'flex'
  },

  variants: {
    direction: {
      column: { flexDirection: 'column' },
      row: { flexDirection: 'row' }
    },
    gap: {
      1: { gap: 'var(--size-1)' },
      2: { gap: 'var(--size-2)' },
      3: { gap: 'var(--size-3)' },
      4: { gap: 'var(--size-4)' }
    },
    alignItems: {
      center: { alignItems: 'center' }
    },
    justifyContent: {
      center: { justifyContent: 'center' }
    }
  }
});

export type FlexVariants = RecipeVariants<typeof flex>;
