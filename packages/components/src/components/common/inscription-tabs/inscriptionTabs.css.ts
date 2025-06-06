import { vars } from '@/styles/theme.css';
import { createContainer, globalStyle, style } from '@vanilla-extract/css';

const tabsListContainer = createContainer();
const tabsTriggerContainer = createContainer();

export const inscriptionTabsRoot = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.size.s2,
  flex: 1,
  overflow: 'hidden',
  selectors: {
    '&:has(.ui-inscription-tabs-trigger:focus-visible)': {
      boxShadow: vars.shadow.focus
    }
  }
});

export const inscriptionTabsList = style({
  display: 'flex',
  overflow: 'hidden',
  padding: vars.size.s1,
  backgroundColor: vars.color.n25,
  border: vars.border.basic,
  borderRadius: vars.border.r3,
  marginBottom: vars.size.s3,
  containerName: tabsListContainer,
  containerType: 'inline-size'
});

export const inscriptionTabsTrigger = style({
  all: 'unset',
  fontFamily: 'inherit',
  height: vars.size.s2,
  padding: `${vars.size.s3} ${vars.size.s1}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  fontWeight: 'bold',
  lineHeight: '1',
  color: vars.color.n700,
  userSelect: 'none',
  cursor: 'pointer',
  flex: 1,
  gap: vars.size.s1,
  minWidth: '1.65rem',
  position: 'relative',
  containerType: 'inline-size',
  containerName: tabsTriggerContainer,
  selectors: {
    '&:not([data-state="active"]):has(+ &:not([data-state="active"]))': {
      borderRight: vars.border.basic
    },
    '&:hover': {
      color: vars.color.p300
    },
    '&[data-state="active"]': {
      border: `1px solid ${vars.color.p75}`,
      borderRadius: vars.border.r2,
      backgroundColor: vars.color.p50,
      color: vars.color.p300,
      minWidth: '6.5rem'
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

export const tabsTriggerLabel = style({
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

globalStyle(`${inscriptionTabsTrigger} i`, {
  fontSize: '16px'
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
      flex: 1
    }
  }
});

export const inscriptionTabsContentScrollArea = style({
  flex: 1,
  overflowY: 'auto'
});
