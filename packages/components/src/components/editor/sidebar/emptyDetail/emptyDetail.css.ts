import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const emptyDetail = style({
  height: '100%',
  color: vars.color.n800,
  margin: '20px'
});

export const emptyDetailIcon = recipe({
  base: {
    fontSize: '54px',
    textAlign: 'center'
  },
  variants: {
    mode: {
      row: { fontSize: '20px' },
      column: { fontSize: '54px' }
    }
  }
});

export const emptyDetailMessage = style({
  fontSize: '14px',
  textAlign: 'center'
});
