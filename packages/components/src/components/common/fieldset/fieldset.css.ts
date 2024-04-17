import { vars } from '@/styles/theme.css';
import { assignVars, style } from '@vanilla-extract/css';

export const fieldset = style({
  selectors: {
    '&[data-message-state="warning"]': {
      vars: assignVars(vars.dynamic, {
        inputBorder: vars.border.warning
      })
    },
    '&[data-message-state="error"]': {
      vars: assignVars(vars.dynamic, {
        inputBorder: vars.border.error
      })
    }
  }
});
