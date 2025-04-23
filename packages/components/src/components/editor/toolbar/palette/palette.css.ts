import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const palette = style({
  width: 'min(372px, calc(var(--radix-popover-content-available-width) - 2 * var(--size-2)))',
  maxHeight: 'min(500px, calc(var(--radix-popover-content-available-height) - 2 * var(--size-2)))',
  overflowY: 'auto'
});

export const paletteSectionSeparator = style({
  selectors: {
    [`${palette} &:last-child`]: {
      display: 'none'
    }
  },
  flexShrink: 0
});

export const paletteTitle = style({
  fontSize: 12,
  fontWeight: 500,
  margin: 0
});

export const paletteItem = style({
  cursor: 'pointer',
  fontSize: 10,
  flexDirection: 'column',
  padding: 0,
  border: 'none',
  color: 'inherit',
  background: 'inherit',
  ':focus-visible': {
    outline: 'none'
  }
});

export const paletteItemIcon = style({
  background: vars.color.n50,
  borderRadius: vars.border.r2,
  border: `1px solid ${vars.color.n50}`,
  height: 32,
  width: 72,
  selectors: {
    [`${paletteItem}:where(:hover, :focus-visible) &`]: {
      border: `1px solid ${vars.color.body}`
    }
  }
});

export const paletteItemIvyIcon = style({
  selectors: {
    [`${paletteItemIcon} &`]: {
      textAlign: 'center',
      fontSize: 24
    }
  }
});

export const paletteButton = style({
  gap: '0.125rem',
  justifyContent: 'space-evenly'
});

export const paletteButtonLabel = style({
  selectors: {
    [`${paletteButton} &`]: {
      fontSize: 10,
      color: vars.color.n900,
      whiteSpace: 'nowrap'
    }
  }
});

export const paletteButtonButton = style({
  selectors: {
    [`${paletteButton} &`]: {
      height: 22
    }
  }
});
