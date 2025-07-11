import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

const sonnerAttrs = '[data-sonner-toast][data-styled=true]';

export const toaster = style({
  selectors: {
    [`&${sonnerAttrs}`]: {
      backgroundColor: vars.color.n75
    }
  }
});

export const description = style({
  selectors: {
    [`&${sonnerAttrs}`]: {
      color: vars.color.n800
    }
  }
});

export const error = style({
  selectors: {
    [`&${sonnerAttrs}`]: {
      borderColor: vars.color.error
    }
  }
});

export const warning = style({
  selectors: {
    [`&${sonnerAttrs}`]: {
      borderColor: vars.color.warning
    }
  }
});

export const success = style({
  selectors: {
    [`&${sonnerAttrs}`]: {
      borderColor: vars.color.success
    }
  }
});

export const closeBtn = style({
  selectors: {
    [`&${sonnerAttrs}`]: {
      backgroundColor: vars.color.background,
      color: 'var(--normal-text)',
      border: '1px solid var(--normal-border)',
      [`${toaster} &:hover`]: {
        backgroundColor: vars.color.n75,
        borderColor: 'var(--normal-border)'
      }
    }
  }
});
