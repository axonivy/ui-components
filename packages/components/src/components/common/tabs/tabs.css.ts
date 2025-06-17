import { vars } from '@/styles/theme.css';
import { createContainer, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const tabsListContainer = createContainer();
export const tabsTriggerContainer = createContainer();

export const tabs = recipe({
  variants: {
    variant: {
      slim: {},
      inscription: {}
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
    },
    [`${tabs.classNames.variants.variant.inscription} &`]: {
      overflow: 'hidden',
      border: 'none',
      alignItems: 'flex-end',
      borderTop: vars.border.basic,
      paddingTop: vars.size.s1,
      backgroundColor: vars.color.n25,
      marginBottom: vars.size.s2,
      containerName: tabsListContainer,
      containerType: 'inline-size'
    }
  }
});

export const tabsListPlaceholder = style({
  height: '100%',
  width: vars.size.s1,
  borderBottom: vars.border.basic
});

export const tabsTriggerSeparator = style({
  display: 'none',
  selectors: {
    [`${tabs.classNames.variants.variant.inscription} &`]: {
      display: 'block'
    },
    '&.ui-separator[data-orientation="vertical"]': {
      height: '1.2rem',
      marginInline: 'unset'
    },
    '.ui-tabs-trigger[data-state="active"] &': {
      display: 'none'
    },
    '.ui-tabs-trigger:nth-last-child(2) &': {
      display: 'none'
    },
    '.ui-tabs-trigger:has(+ .ui-tabs-trigger[data-state="active"]) &': {
      display: 'none'
    }
  }
});

export const tabsTrigger = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0',
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
    },
    [`${tabs.classNames.variants.variant.inscription} &`]: {
      flex: 1,
      padding: '0',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '1',
      userSelect: 'none'
    },
    [`${tabs.classNames.variants.variant.inscription} &[data-state="active"]`]: {
      backgroundColor: vars.color.background,
      borderTop: vars.border.basic,
      borderRadius: `${vars.border.r2} ${vars.border.r2} 0 0`,
      borderLeft: vars.border.basic,
      borderRight: vars.border.basic,
      borderBottom: `1px solid ${vars.color.background}`,
      color: vars.color.p300,
      minWidth: '6.5rem',
      fontWeight: 'bold'
    },
    [`${tabs.classNames.variants.variant.inscription} &:focus-visible`]: {
      borderRadius: `${vars.border.r2} ${vars.border.r2} 0 0`
    },
    [`${tabs.classNames.variants.variant.inscription} &:hover`]: {
      color: vars.color.p300
    },
    [`${tabs.classNames.variants.variant.inscription} &[data-state="inactive"]`]: {
      borderBottom: vars.border.basic
    }
  },
  '@container': {
    [`${tabsListContainer} (width <= 16rem)`]: {
      selectors: {
        '.tabs-many &[data-state="active"]': {
          minWidth: '1.65rem'
        }
      }
    },
    [`${tabsListContainer} (width <= 13rem)`]: {
      selectors: {
        '.tabs-few &[data-state="active"]': {
          minWidth: '1.65rem'
        }
      }
    }
  }
});

export const tabsTriggerContent = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.size.s1,
  flex: '0',
  selectors: {
    [`${tabs.classNames.variants.variant.inscription} &`]: {
      height: vars.size.s2,
      padding: `${vars.size.s3} ${vars.size.s1}`,
      flex: 1,
      minWidth: '1.65rem',
      position: 'relative',
      containerType: 'inline-size',
      containerName: tabsTriggerContainer
    }
  }
});

export const inscriptionTabsRoot = style({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden'
});

export const inscriptionTabsTriggerLabel = style({
  display: 'block',
  '@container': {
    [`${tabsTriggerContainer} (width <= 6.5rem)`]: {
      selectors: {
        '.ui-inscription-tabs-trigger:not([data-state="active"]) &': {
          display: 'none'
        }
      }
    },
    [`${tabsListContainer} (width <= 16rem)`]: {
      selectors: {
        '.tabs-many .ui-inscription-tabs-trigger[data-state="active"] &': {
          display: 'none'
        }
      }
    },
    [`${tabsListContainer} (width <= 13rem)`]: {
      selectors: {
        '.tabs-few .ui-inscription-tabs-trigger[data-state="active"] &': {
          display: 'none'
        }
      }
    }
  }
});

export const inscriptionTabStateDot = style({
  position: 'absolute',
  top: '4px',
  right: '4px'
});

export const inscriptionTabsContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.size.s3,
  minHeight: 0,
  overflow: 'hidden',
  selectors: {
    '&[data-state="active"]': {
      flex: 1,
      padding: vars.size.s2
    }
  }
});

export const inscriptionTabsContentScrollArea = style({
  flex: 1,
  overflowY: 'auto'
});

export type TabsVariants = RecipeVariants<typeof tabs>;
