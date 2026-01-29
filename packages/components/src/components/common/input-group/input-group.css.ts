import { vars } from '@/styles/theme.css';
import { transitionColors } from '@/styles/transition.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const inputGroup = style([
  transitionColors,
  {
    position: 'relative',
    display: 'flex',
    width: '100%',
    minWidth: 0,
    alignItems: 'center',
    outline: 'none',
    height: 32,
    borderRadius: vars.border.r2,
    border: vars.dynamic.inputBorder,
    backgroundColor: vars.color.n25,
    selectors: {
      '&:has([data-slot=input-group-control]:focus-visible)': {
        borderColor: vars.color.p300,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.p300}, transparent 50%)`
      },
      '&:has([data-slot][aria-invalid=true])': {
        borderColor: vars.color.error,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.error}, transparent 80%)`
      },
      '&:has(:disabled)': {
        backgroundColor: vars.color.n100,
        opacity: 0.5
      },
      '&:has(> textarea)': {
        height: 'auto'
      },
      '&:has(> [data-align=block-end]), &:has(> [data-align=block-start])': {
        height: 'auto',
        flexDirection: 'column'
      },
      '&[data-disabled=true]': {
        opacity: 0.5
      },
      '[data-slot=combobox-content] &:focus-within': {
        borderColor: 'inherit',
        boxShadow: 'none'
      }
    }
  }
]);

// Global styles for input adjustments based on addon alignment
globalStyle(`${inputGroup}:has(> [data-align=block-end]) > input`, {
  paddingTop: vars.size.s3
});

globalStyle(`${inputGroup}:has(> [data-align=block-start]) > input`, {
  paddingBottom: vars.size.s3
});

globalStyle(`${inputGroup}:has(> [data-align=inline-end]) > input`, {
  paddingRight: vars.size.s1
});

globalStyle(`${inputGroup}:has(> [data-align=inline-start]) > input`, {
  paddingLeft: vars.size.s1
});

export const inputGroupAddon = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.size.s2,
    height: 'auto',
    padding: `${vars.size.s1} 0`,
    fontSize: '14px',
    fontWeight: 500,
    color: vars.color.n700,
    cursor: 'text',
    userSelect: 'none',
    selectors: {
      '.ui-input-group[data-disabled=true] &': {
        opacity: 0.5
      }
    }
  },
  variants: {
    align: {
      'inline-start': {
        paddingLeft: vars.size.s2,
        order: -1,
        selectors: {
          '&:has(> button)': {
            marginLeft: '-0.3rem'
          },
          '&:has(> kbd)': {
            marginLeft: '-0.15rem'
          }
        }
      },
      'inline-end': {
        paddingRight: vars.size.s2,
        order: 9999,
        selectors: {
          '&:has(> button)': {
            marginRight: '-0.3rem'
          },
          '&:has(> kbd)': {
            marginRight: '-0.15rem'
          }
        }
      },
      'block-start': {
        padding: `${vars.size.s2} 10px`,
        paddingBottom: 0,
        order: -1,
        width: '100%',
        justifyContent: 'flex-start',
        selectors: {
          '&.border-b': {
            paddingBottom: vars.size.s2
          }
        }
      },
      'block-end': {
        padding: `0 10px`,
        paddingBottom: vars.size.s2,
        order: 9999,
        width: '100%',
        justifyContent: 'flex-start',
        selectors: {
          '&.border-t': {
            paddingTop: vars.size.s2
          }
        }
      }
    }
  },
  defaultVariants: {
    align: 'inline-start'
  }
});

export type InputGroupAddonVariants = RecipeVariants<typeof inputGroupAddon>;

// Styles for svg icons within addon
globalStyle(`${inputGroupAddon.classNames.base} > svg:not([class*='size-'])`, {
  width: 16,
  height: 16
});

// Styles for kbd within addon
globalStyle(`${inputGroupAddon.classNames.base} > kbd`, {
  borderRadius: `calc(${vars.border.r2} - 5px)`
});

export const inputGroupButton = recipe({
  base: [
    transitionColors,
    {
      display: 'flex',
      alignItems: 'center',
      gap: vars.size.s2,
      fontSize: '14px',
      boxShadow: 'none',
      borderRadius: vars.border.r2,
      fontWeight: 500,
      userSelect: 'none',
      border: 'none',
      outline: 'none',
      color: 'currentColor',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: `color-mix(in srgb, transparent, ${vars.color.body} 15%)`
      },
      ':focus-visible': {
        backgroundColor: `color-mix(in srgb, transparent, ${vars.color.body} 15%)`,
        boxShadow: vars.shadow.focus
      },
      ':disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
      }
    }
  ],
  variants: {
    size: {
      xs: {
        height: 24,
        gap: vars.size.s1,
        borderRadius: `calc(${vars.border.r2} - 3px)`,
        padding: `0 ${vars.size.s1}`
      },
      sm: {},
      'icon-xs': {
        width: 24,
        height: 24,
        borderRadius: `calc(${vars.border.r2} - 3px)`,
        padding: 0
      },
      'icon-sm': {
        width: 32,
        height: 32,
        padding: 0
      }
    }
  },
  defaultVariants: {
    size: 'xs'
  }
});

export type InputGroupButtonVariants = RecipeVariants<typeof inputGroupButton>;

// Icon size for xs button
globalStyle(`${inputGroupButton.classNames.variants.size.xs} > svg:not([class*='size-'])`, {
  width: 14,
  height: 14
});

export const inputGroupText = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.size.s2,
  fontSize: '14px',
  color: vars.color.n700
});

globalStyle(`${inputGroupText} svg:not([class*='size-'])`, {
  width: 16,
  height: 16
});

globalStyle(`${inputGroupText} svg`, {
  pointerEvents: 'none'
});

export const inputGroupInput = style({
  flex: 1,
  borderRadius: 0,
  border: 'none',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  fontSize: 12,
  lineHeight: '12px',
  color: vars.color.body,
  textAlign: 'start',
  padding: vars.padding.input,
  ':focus': {
    outline: 'none'
  },
  ':focus-visible': {
    boxShadow: 'none'
  },
  ':disabled': {
    backgroundColor: 'transparent'
  },
  selectors: {
    '&[aria-invalid=true]': {
      boxShadow: 'none'
    }
  }
});

export const inputGroupTextarea = style({
  flex: 1,
  resize: 'none',
  borderRadius: 0,
  border: 'none',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  padding: vars.size.s2,
  fontSize: 12,
  lineHeight: '12px',
  color: vars.color.body,
  textAlign: 'start',
  ':focus': {
    outline: 'none'
  },
  ':focus-visible': {
    boxShadow: 'none'
  },
  ':disabled': {
    backgroundColor: 'transparent'
  },
  selectors: {
    '&[aria-invalid=true]': {
      boxShadow: 'none'
    }
  }
});
