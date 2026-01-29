import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { vars } from '@/styles/theme.css';
import { transitionColors } from '@/styles/transition.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const comboboxInput = style({
  width: 'auto'
});

export const trigger = style({});

globalStyle(`${trigger} svg:not([class*='size-'])`, {
  width: 16,
  height: 16
});

export const triggerIcon = style({
  width: 16,
  height: 16,
  color: vars.color.n700,
  pointerEvents: 'none'
});

export const clearIcon = style({
  pointerEvents: 'none'
});

export const content = style({
  position: 'relative',
  isolation: 'isolate',
  zIndex: 50,
  maxHeight: 'var(--available-height)',
  width: 'var(--anchor-width)',
  maxWidth: 'var(--available-width)',
  minWidth: `calc(var(--anchor-width) + ${vars.size.s4} + ${vars.size.s3})`,
  overflow: 'hidden',
  backgroundColor: vars.color.background,
  borderRadius: vars.border.r2,
  boxShadow: vars.shadow.popover,
  border: vars.border.basic,
  transformOrigin: 'var(--transform-origin)',
  animationDuration: '100ms',
  selectors: {
    '&[data-open][data-side="top"]': {
      animationName: slideDownAndFade
    },
    '&[data-open][data-side="right"], &[data-open][data-side="inline-end"]': {
      animationName: slideLeftAndFade
    },
    '&[data-open][data-side="bottom"]': {
      animationName: slideUpAndFade
    },
    '&[data-open][data-side="left"], &[data-open][data-side="inline-start"]': {
      animationName: slideRightAndFade
    },
    '&[data-closed]': {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    '&[data-chips=true]': {
      minWidth: 'var(--anchor-width)'
    }
  },
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'none'
    }
  }
});

// Styles for input-group within content
globalStyle(`${content} > [data-slot=input-group]`, {
  margin: vars.size.s1,
  marginBottom: 0,
  height: 32,
  boxShadow: 'none',
  backgroundColor: `color-mix(in srgb, ${vars.color.n100}, transparent 70%)`,
  borderColor: `color-mix(in srgb, ${vars.color.n100}, transparent 70%)`
});

export const list = style({
  maxHeight: `min(calc(${vars.size.s4} * 18 - ${vars.size.s4} * 2.25), calc(var(--available-height) - ${vars.size.s4} * 2.25))`,
  scrollPaddingBlock: vars.size.s1,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: vars.size.s1,
  selectors: {
    '&[data-empty]': {
      padding: 0
    }
  }
});

// Hide scrollbar
globalStyle(`${list}::-webkit-scrollbar`, {
  display: 'none'
});

export const item = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  padding: vars.size.s2,
  paddingLeft: '2rem',
  height: 15,
  outline: 'none',
  userSelect: 'none',
  selectors: {
    '&[data-highlighted]': {
      backgroundColor: vars.color.p50
    },
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: 0.5
    }
  }
});

globalStyle(`${item} svg:not([class*='size-'])`, {
  width: 16,
  height: 16
});

globalStyle(`${item} svg`, {
  pointerEvents: 'none',
  flexShrink: 0
});

export const itemIndicator = style({
  position: 'absolute',
  left: '0.5rem',
  display: 'flex',
  width: '0.875rem',
  height: '0.875rem',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none'
});

export const indicatorIcon = style({
  pointerEvents: 'none'
});

export const label = style({
  paddingInline: vars.size.s2,
  paddingBlock: 6,
  fontSize: '12px',
  color: vars.color.n700
});

export const empty = style({
  display: 'none',
  width: '100%',
  justifyContent: 'center',
  paddingBlock: vars.size.s2,
  textAlign: 'center',
  fontSize: '14px',
  color: vars.color.n700,
  selectors: {
    '.group\\/combobox-content[data-empty] &, [data-slot=combobox-content][data-empty] &': {
      display: 'flex'
    }
  }
});

export const separator = style({
  height: 1,
  marginInline: `-${vars.size.s1}`,
  marginBlock: vars.size.s1,
  backgroundColor: vars.color.n200
});

export const chips = style([
  transitionColors,
  {
    display: 'flex',
    minHeight: 32,
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: vars.size.s1,
    borderRadius: vars.border.r2,
    border: vars.dynamic.inputBorder,
    backgroundColor: 'transparent',
    backgroundClip: 'padding-box',
    paddingInline: 10,
    paddingBlock: vars.size.s1,
    fontSize: '14px',
    selectors: {
      '&:focus-within': {
        borderColor: vars.color.p300,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.p300}, transparent 50%)`
      },
      '&:has([aria-invalid=true])': {
        borderColor: vars.color.error,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.error}, transparent 80%)`
      },
      '&:has([data-slot=combobox-chip])': {
        paddingInline: vars.size.s1
      }
    }
  }
]);

export const chip = style({
  display: 'flex',
  height: 21,
  width: 'fit-content',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.size.s1,
  borderRadius: vars.border.r1,
  paddingInline: 6,
  fontSize: '12px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  backgroundColor: vars.color.n100,
  color: vars.color.body,
  selectors: {
    '&:has([data-slot=combobox-chip-remove])': {
      paddingRight: 0
    },
    '&:has(:disabled)': {
      pointerEvents: 'none',
      cursor: 'not-allowed',
      opacity: 0.5
    }
  }
});

export const chipRemove = style({
  marginLeft: `-${vars.size.s1}`,
  opacity: 0.5,
  ':hover': {
    opacity: 1
  }
});

export const chipsInput = style({
  minWidth: 64,
  flex: 1,
  outline: 'none'
});

// For button within trigger that should hide when clear is visible
globalStyle(`.ui-input-group:has([data-slot=combobox-clear]) [data-slot=input-group-button]`, {
  display: 'none'
});

// Pressed state for trigger button
globalStyle(`[data-slot=input-group-button][data-pressed]`, {
  backgroundColor: 'transparent'
});
