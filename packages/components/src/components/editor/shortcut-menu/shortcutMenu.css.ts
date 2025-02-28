import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const title = style({
  fontWeight: 600,
  fontSize: '14px'
});

export const shortcutDescription = style({
  fontSize: '14px'
});

export const shortcutButton = style({
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.n200, // Adjust based on theme
      cursor: 'pointer'
    }
  }
});

export const noHover = style({
  selectors: {
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'default'
    }
  }
});
