import { style } from '@vanilla-extract/css';
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '../../styles/keyframes.css';

export const tooltipContent = style({
  borderRadius: 'var(--border-radius)',
  padding: 'var(--size-1) var(--size-2)',
  backgroundColor: 'var(--N100)',
  boxShadow: 'var(--box-shadow)',
  userSelect: 'none',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  selectors: {
    '&[data-state="delayed-open"][data-side="top"]': {
      animationName: slideDownAndFade
    },
    '&[data-state="delayed-open"][data-side="right"]': {
      animationName: slideLeftAndFade
    },
    '&[data-state="delayed-open"][data-side="bottom"]': {
      animationName: slideUpAndFade
    },
    '&[data-state="delayed-open"][data-side="left"]': {
      animationName: slideRightAndFade
    }
  }
});
