import { vars } from '@/styles/theme.css';
import { createVar, globalStyle, style } from '@vanilla-extract/css';

export const selectedRowBg = createVar();
export const selectedRowText = createVar();

export const selectedRow = style({
  vars: {
    [selectedRowBg]: vars.color.n25,
    [selectedRowText]: vars.color.body
  },
  backgroundColor: selectedRowBg,
  color: selectedRowText,
  ':hover': {
    vars: {
      [selectedRowBg]: vars.color.p50
    }
  },
  selectors: {
    '&[data-state="selected"]': {
      vars: {
        [selectedRowBg]: vars.color.p300,
        [selectedRowText]: vars.color.background
      }
    }
  }
});

export const dndRow = style({
  selectors: {
    '&[data-drop-target-state=true]': {
      borderTop: vars.border.active,
      borderTopWidth: 2
    }
  }
});

export const reorderHandle = style({});

globalStyle(`${reorderHandle} :first-child`, {
  width: '100%'
});

export const reorderHandleIcon = style({
  cursor: 'grab',
  fontSize: 15,
  height: 15,
  flex: '0 0 15'
});
