import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const masterPanel = style({
  backgroundColor: vars.color.n75
});

const content = {
  margin: vars.size.s3
};

const scrollable = {
  flex: 1,
  flexBasis: 0,
  minHeight: 0,
  height: '100%'
};

export const masterContent = style({
  ...content,
  ...scrollable
});

export const masterWrapper = style({
  ...scrollable
});

export const detailContent = style({
  ...content,
  flex: 'auto'
});

export const detailContainer = style({
  height: '100%'
});
