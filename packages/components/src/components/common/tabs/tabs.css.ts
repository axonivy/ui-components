import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const tabs = recipe({
  variants: {
    variant: {
      slim: {}
    }
  }
});

export const tabsList = style({
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  selectors: {
    '&[data-orientation="vertical"]': {
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    [`${tabs.classNames.variants.variant.slim} &`]: {
      gap: vars.size.s4
    }
  }
});

export const tabsTrigger = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0',
  gap: vars.size.s1,
  padding: '0.5rem 1rem',
  fontSize: '14px',
  color: vars.color.n800,
  cursor: 'pointer',
  borderBottom: vars.border.basic,
  ':hover': {
    color: vars.color.body
  },
  ':focus-visible': {
    boxShadow: vars.shadow.focus
  },
  selectors: {
    '&[data-state="active"]': {
      fontWeight: 600,
      color: vars.color.body,
      borderBottom: `1px solid ${vars.color.body}`
    },
    '&[data-orientation="vertical"]': {
      borderBottom: 'none',
      borderRight: vars.border.basic,
      justifyContent: 'normal'
    },
    '&[data-orientation="vertical"][data-state="active"]': {
      borderRight: `1px solid ${vars.color.body}`
    },
    [`${tabs.classNames.variants.variant.slim} &`]: {
      padding: '6px 1px',
      fontWeight: 'normal'
    },
    [`${tabs.classNames.variants.variant.slim} &:not([data-state="active"])`]: {
      borderBottom: '1px solid transparent'
    }
  }
});

export type TabsVariants = RecipeVariants<typeof tabs>;
