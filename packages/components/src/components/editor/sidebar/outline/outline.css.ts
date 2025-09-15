import { cell, root, row, table } from '@/components/common/table/table.css';
import { vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const outlineContainer = style({
  overflow: 'auto',
  paddingInline: vars.size.s2,
  paddingBlockStart: vars.size.s2
});

globalStyle(`${outlineContainer} ${root}`, {
  border: 'none'
});

globalStyle(`${outlineContainer} ${table}`, {
  background: vars.color.background,
  width: 'unset'
});

globalStyle(`${outlineContainer} ${row}`, {
  border: 'none',
  height: 28
});

globalStyle(`${outlineContainer} ${cell}`, {
  padding: 0
});

globalStyle(`${outlineContainer} ${cell} > .ui-flex`, {
  height: 28
});
